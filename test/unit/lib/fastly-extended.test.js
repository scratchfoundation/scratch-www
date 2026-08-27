describe('fastly-extended', () => {
    let mockListServiceVersions = jest.fn();
    // Recorded {api, method, args} for every non-version-list API call, reset per test.
    let mockCalls = [];
    // When true, deleteSnippet rejects with a 404 so setSnippet's ignore-missing path runs.
    let mockDeleteSnippet404 = false;

    // A fastly@15 API stub whose every method records its call and returns a promise.
    // VersionApi.listServiceVersions is routed to mockListServiceVersions so the
    // getLatestActiveVersion tests can control the version list.
    const mockApi = name => jest.fn(() => new Proxy({}, {
        get: (target, method) => (...args) => {
            const methodName = String(method);
            if (name === 'VersionApi' && methodName === 'listServiceVersions') {
                return mockListServiceVersions(...args);
            }
            const callArgs = args[0];
            mockCalls.push({api: name, method: methodName, args: callArgs});
            if (name === 'SnippetApi' && methodName === 'deleteSnippet' && mockDeleteSnippet404) {
                const err = new Error('not found');
                err.status = 404;
                return Promise.reject(err);
            }
            return Promise.resolve({name: callArgs && callArgs.name, number: 7, status: 'ok'});
        }
    }));

    jest.mock('fastly', () => ({
        ApiClient: {instance: {authenticate: jest.fn()}},
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
        mockDeleteSnippet404 = false;
    });

    describe('getLatestActiveVersion', () => {
        test('returns the largest active version, sequential order', async () => {
            withVersions([
                {number: 1, active: false},
                {number: 2, active: false},
                {number: 3, active: true},
                {number: 4, active: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestActiveVersion()).toEqual({number: 3, active: true});
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
        });

        test('returns the largest active version, mixed order', async () => {
            withVersions([
                {number: 4, active: false},
                {number: 1, active: false},
                {number: 2, active: true},
                {number: 3, active: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestActiveVersion()).toEqual({number: 2, active: true});
        });

        test('returns null when no version is active', async () => {
            withVersions([
                {number: 1, active: false},
                {number: 2, active: false}
            ]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestActiveVersion()).toEqual(null);
        });

        test('returns the single active version', async () => {
            withVersions([{number: 1, active: true}]);
            const fastly = fastlyExtended('api_key', 'service_id');
            expect(await fastly.getLatestActiveVersion()).toEqual({number: 1, active: true});
        });

        test('rejects when no serviceId is configured', async () => {
            const fastly = fastlyExtended('api_key', '');
            await expect(fastly.getLatestActiveVersion()).rejects.toThrow(/No serviceId/);
        });
    });

    describe('snippets and versions', () => {
        const fastly = fastlyExtended('api_key', 'service_id');

        test('setSnippet deletes any existing snippet then creates it with dynamic 0', async () => {
            await fastly.setSnippet(7, {name: 'app-routes-recv', type: 'recv', content: 'X', priority: '100'});
            expect(mockCalls.map(c => `${c.api}.${c.method}`)).toEqual(
                ['SnippetApi.deleteSnippet', 'SnippetApi.createSnippet']
            );
            expect(mockCalls[0].args).toEqual({service_id: 'service_id', version_id: 7, name: 'app-routes-recv'});
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

        test('setSnippet ignores a 404 from the delete and still creates', async () => {
            mockDeleteSnippet404 = true;
            await fastly.setSnippet(7, {name: 'app-routes-recv', type: 'recv', content: 'X', priority: '100'});
            expect(mockCalls.map(c => c.method)).toEqual(['deleteSnippet', 'createSnippet']);
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
