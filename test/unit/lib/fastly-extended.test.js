describe('fastly-extended', () => {
    let mockListServiceVersions = jest.fn();
    // Recorded {api, method, args} for every recorded API call, reset per test.
    let mockCalls = [];
    // When true, the snippet-update PUT (callApi) rejects 404 so setSnippet's
    // create-on-missing fallback runs.
    let mockUpdateSnippet404 = false;

    // A fastly@15 API stub whose every method records its call and returns a promise.
    // VersionApi.listServiceVersions is routed to mockListServiceVersions so the
    // getLatestVersion / getWorkingVersion tests can control the version list.
    const mockApi = name => jest.fn(() => new Proxy({}, {
        get: (target, method) => (...args) => {
            const methodName = String(method);
            if (name === 'VersionApi' && methodName === 'listServiceVersions') {
                return mockListServiceVersions(...args);
            }
            const callArgs = args[0];
            mockCalls.push({api: name, method: methodName, args: callArgs});
            return Promise.resolve({name: callArgs && callArgs.name, number: 7, status: 'ok'});
        }
    }));

    // Stub for ApiClient.instance.callApi (the raw snippet-update PUT). Records the
    // meaningful positional args and resolves like the real client ({data, response});
    // rejects 404 when mockUpdateSnippet404 is set.
    const mockCallApi = (...args) => {
        mockCalls.push({
            api: 'ApiClient',
            method: 'callApi',
            callApi: {path: args[0], httpMethod: args[1], pathParams: args[2], formParams: args[6]}
        });
        if (mockUpdateSnippet404) {
            const err = new Error('not found');
            err.status = 404;
            return Promise.reject(err);
        }
        return Promise.resolve({data: {id: 'snip-id', name: args[2] && args[2].name}, response: {}});
    };

    jest.mock('fastly', () => ({
        ApiClient: {instance: {authenticate: jest.fn(), callApi: mockCallApi}},
        SnippetResponse: function SnippetResponse () {},
        VersionApi: mockApi('VersionApi'),
        SnippetApi: mockApi('SnippetApi'),
        ConditionApi: mockApi('ConditionApi'),
        HeaderApi: mockApi('HeaderApi'),
        ResponseObjectApi: mockApi('ResponseObjectApi'),
        PurgeApi: mockApi('PurgeApi')
    }));
    const fastlyExtended = require('../../../bin/lib/fastly-extended'); // eslint-disable-line global-require

    const withVersions = versions => {
        mockListServiceVersions = jest.fn(() => Promise.resolve(versions));
    };
    const lastCall = () => mockCalls[mockCalls.length - 1];

    beforeEach(() => {
        mockCalls = [];
        mockUpdateSnippet404 = false;
    });

    describe('getLatestVersion', () => {
        test('returns the highest-numbered version regardless of active state, sequential order', async () => {
            withVersions([
                {number: 1, active: false},
                {number: 2, active: true},
                {number: 3, active: false, locked: true},
                {number: 4, active: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestVersion()).toEqual({number: 4, active: false});
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
        });

        test('returns the highest-numbered version, mixed order', async () => {
            withVersions([
                {number: 4, active: false},
                {number: 1, active: false},
                {number: 2, active: true},
                {number: 3, active: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestVersion()).toEqual({number: 4, active: false});
        });

        test('returns null when there are no versions', async () => {
            withVersions([]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestVersion()).toEqual(null);
        });

        test('rejects when no serviceId is configured', async () => {
            const fastly = fastlyExtended('api_key', '');
            await expect(fastly.getLatestVersion()).rejects.toThrow(/No serviceId/);
        });
    });

    describe('getWorkingVersion', () => {
        test('reuses the latest version when it is an editable draft', async () => {
            withVersions([
                {number: 1, active: true, locked: true},
                {number: 2, active: false, locked: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getWorkingVersion()).toBe(2);
            // No clone call recorded when reusing the draft.
            expect(mockCalls.map(c => c.method)).not.toContain('cloneServiceVersion');
        });

        test('clones the latest version when it is active', async () => {
            withVersions([{number: 5, active: true, locked: true}]);
            const fastly = fastlyExtended('api_key', 'service_id');
            // The clone stub returns {number: 7}.
            expect(await fastly.getWorkingVersion()).toBe(7);
            expect(lastCall()).toEqual({
                api: 'VersionApi', method: 'cloneServiceVersion', args: {service_id: 'service_id', version_id: 5}
            });
        });

        test('clones the latest version when it is locked but not active', async () => {
            withVersions([{number: 5, active: false, locked: true}]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getWorkingVersion()).toBe(7);
            expect(lastCall().method).toBe('cloneServiceVersion');
        });

        test('throws when there is no version to build from', async () => {
            withVersions([]);
            const fastly = fastlyExtended('api_key', 'service_id');
            await expect(fastly.getWorkingVersion()).rejects.toThrow(/Failed to find a version/);
        });
    });

    describe('snippets and versions', () => {
        const fastly = fastlyExtended('api_key', 'service_id');

        test('setSnippet updates the snippet in place (preserving its id) via a PUT', async () => {
            await fastly.setSnippet(7, {name: 'app-routes-recv', type: 'recv', content: 'X', priority: '100'});
            // Only the update endpoint is hit -- no delete/create when it already exists.
            expect(mockCalls.map(c => `${c.api}.${c.method}`)).toEqual(['ApiClient.callApi']);
            expect(mockCalls[0].callApi).toEqual({
                path: '/service/{service_id}/version/{version_id}/snippet/{name}',
                httpMethod: 'PUT',
                pathParams: {service_id: 'service_id', version_id: 7, name: 'app-routes-recv'},
                formParams: {type: 'recv', content: 'X', priority: '100'}
            });
        });

        test('setSnippet falls back to createSnippet when the snippet does not exist (404)', async () => {
            mockUpdateSnippet404 = true;
            await fastly.setSnippet(7, {name: 'app-routes-recv', type: 'recv', content: 'X', priority: '100'});
            expect(mockCalls.map(c => `${c.api}.${c.method}`)).toEqual(
                ['ApiClient.callApi', 'SnippetApi.createSnippet']
            );
            expect(mockCalls[1].args).toEqual({
                service_id: 'service_id',
                version_id: 7,
                name: 'app-routes-recv',
                type: 'recv',
                content: 'X',
                priority: '100',
                dynamic: '0'
            });
        });

        test('validateVersion calls validateServiceVersion', async () => {
            await fastly.validateVersion(7);
            expect(lastCall()).toEqual({
                api: 'VersionApi', method: 'validateServiceVersion', args: {service_id: 'service_id', version_id: 7}
            });
        });

        test('cloneVersion and activateVersion hit the version API', async () => {
            await fastly.cloneVersion(7);
            expect(lastCall()).toEqual({
                api: 'VersionApi', method: 'cloneServiceVersion', args: {service_id: 'service_id', version_id: 7}
            });
            await fastly.activateVersion(7);
            expect(lastCall()).toEqual({
                api: 'VersionApi', method: 'activateServiceVersion', args: {service_id: 'service_id', version_id: 7}
            });
        });

        test('purgeKey calls purgeTag with the surrogate key', async () => {
            await fastly.purgeKey('service_id', 'static-assets');
            expect(lastCall()).toEqual({
                api: 'PurgeApi', method: 'purgeTag', args: {service_id: 'service_id', surrogate_key: 'static-assets'}
            });
        });
    });

    describe('legacy cleanup helpers', () => {
        const fastly = fastlyExtended('api_key', 'service_id');

        test('delete helpers pass the right *_name path param', async () => {
            await fastly.deleteCondition(7, 'routes/foo (request)');
            expect(lastCall()).toEqual({
                api: 'ConditionApi',
                method: 'deleteCondition',
                args: {service_id: 'service_id', version_id: 7, condition_name: 'routes/foo (request)'}
            });
            await fastly.deleteHeader(7, 'rewrites/foo');
            expect(lastCall()).toEqual({
                api: 'HeaderApi',
                method: 'deleteHeaderObject',
                args: {service_id: 'service_id', version_id: 7, header_name: 'rewrites/foo'}
            });
            await fastly.deleteResponseObject(7, 'redirects/foo');
            expect(lastCall()).toEqual({
                api: 'ResponseObjectApi',
                method: 'deleteResponseObject',
                args: {service_id: 'service_id', version_id: 7, response_object_name: 'redirects/foo'}
            });
        });

        test('list helpers call the version-scoped list endpoints', async () => {
            await fastly.listConditions(7);
            expect(lastCall()).toEqual({
                api: 'ConditionApi', method: 'listConditions', args: {service_id: 'service_id', version_id: 7}
            });
        });
    });
});
