describe('fastly-extended', () => {
    let mockListServiceVersions = jest.fn();
    // Recorded {api, method, args} for every non-version-list API call, reset per test.
    let mockCalls = [];
    // When true, every update* call rejects with a 404 so the upsert falls back to create.
    let mockUpdate404 = false;

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
            if (methodName.startsWith('update') && mockUpdate404) {
                const err = new Error('not found');
                err.status = 404;
                return Promise.reject(err);
            }
            return Promise.resolve({name: callArgs && callArgs.name, number: 42});
        }
    }));

    jest.mock('fastly', () => ({
        ApiClient: {instance: {authenticate: jest.fn()}},
        VersionApi: mockApi('VersionApi'),
        ConditionApi: mockApi('ConditionApi'),
        HeaderApi: mockApi('HeaderApi'),
        ResponseObjectApi: mockApi('ResponseObjectApi'),
        VclApi: mockApi('VclApi'),
        PurgeApi: mockApi('PurgeApi')
    }));
    const fastlyExtended = require('../../../bin/lib/fastly-extended'); // eslint-disable-line global-require

    const withVersions = versions => {
        mockListServiceVersions = jest.fn(() => Promise.resolve(versions));
    };
    const lastCall = () => mockCalls[mockCalls.length - 1];

    beforeEach(() => {
        mockCalls = [];
        mockUpdate404 = false;
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

    describe('upserts and versions', () => {
        const fastly = fastlyExtended('api_key', 'service_id');

        test('setCondition updates an existing condition with the merged params', async () => {
            await fastly.setCondition(7, {
                name: 'routes/x (request)', statement: 'req.url ~ "x"', type: 'REQUEST', priority: 11
            });
            expect(mockCalls).toHaveLength(1);
            expect(lastCall()).toEqual({
                api: 'ConditionApi',
                method: 'updateCondition',
                args: {
                    service_id: 'service_id',
                    version_id: 7,
                    condition_name: 'routes/x (request)',
                    name: 'routes/x (request)',
                    statement: 'req.url ~ "x"',
                    type: 'REQUEST',
                    priority: 11
                }
            });
        });

        test('setCondition falls back to createCondition on a 404', async () => {
            mockUpdate404 = true;
            await fastly.setCondition(7, {name: 'c', statement: 's', type: 'REQUEST', priority: 1});
            expect(mockCalls.map(c => `${c.api}.${c.method}`)).toEqual(
                ['ConditionApi.updateCondition', 'ConditionApi.createCondition']
            );
            // The create body carries no *_name path param.
            expect(lastCall().args).toEqual({
                service_id: 'service_id', version_id: 7, name: 'c', statement: 's', type: 'REQUEST', priority: 1
            });
        });

        test('setFastlyHeader uses header_name to update and omits it when creating', async () => {
            mockUpdate404 = true;
            await fastly.setFastlyHeader(7, {
                name: 'rewrites/a', action: 'set', type: 'REQUEST', dst: 'url', src: '"/a.html"'
            });
            expect(mockCalls[0].method).toBe('updateHeaderObject');
            expect(mockCalls[0].args.header_name).toBe('rewrites/a');
            expect(mockCalls[1].method).toBe('createHeaderObject');
            expect(mockCalls[1].args.header_name).toBeUndefined();
        });

        test('setResponseObject updates with response_object_name', async () => {
            await fastly.setResponseObject(7, {name: 'redirects/a', status: 301, response: 'Moved Permanently'});
            expect(lastCall().method).toBe('updateResponseObject');
            expect(lastCall().args.response_object_name).toBe('redirects/a');
            expect(lastCall().args.status).toBe(301);
        });

        test('setCustomVCL updates with vcl_name and content', async () => {
            await fastly.setCustomVCL(7, 'recv-condition', 'if (true) {}');
            expect(lastCall().method).toBe('updateCustomVcl');
            expect(lastCall().args.vcl_name).toBe('recv-condition');
            expect(lastCall().args.content).toBe('if (true) {}');
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
});
