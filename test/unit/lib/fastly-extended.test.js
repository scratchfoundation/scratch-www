describe('fastly library', () => {
    let mockListServiceVersions = jest.fn();
    // Recorded {api, method, args} for every non-version API call, reset per test.
    let mockCalls = [];
    // When true, every update* call rejects with a 404 so the upsert falls back to create.
    let mockUpdate404 = false;

    // A fastly@15 API stub whose every method records its call and returns a promise.
    // listServiceVersions is routed to mockListServiceVersions so the getLatestActiveVersion
    // tests can control the version list.
    const mockApi = name => jest.fn(() => new Proxy({}, {
        get: (target, method) => (...args) => {
            if (name === 'VersionApi' && method === 'listServiceVersions') {
                return mockListServiceVersions(...args);
            }
            const callArgs = args[0];
            mockCalls.push({api: name, method: String(method), args: callArgs});
            if (String(method).startsWith('update') && mockUpdate404) {
                const err = new Error('not found');
                err.status = 404;
                return Promise.reject(err);
            }
            return Promise.resolve({name: callArgs && callArgs.name, number: 42});
        }
    }));

    // Mock the fastly@15 client surface that fastly-extended constructs.
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

    test('getLatestActiveVersion returns largest active VCL number, ' +
        'when called with VCLs in sequential order', done => {
        withVersions([
            {number: 1, active: false},
            {number: 2, active: false},
            {number: 3, active: true},
            {number: 4, active: false}
        ]);
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({number: 3, active: true});
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
            done();
        });
    });

    test('getLatestActiveVersion returns largest active VCL number, when called with VCLs in mixed up order', done => {
        withVersions([
            {number: 4, active: false},
            {number: 1, active: false},
            {number: 2, active: true},
            {number: 3, active: false}
        ]);
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({number: 2, active: true});
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
            done();
        });
    });

    test('getLatestActiveVersion returns null, when none of the VCL versions are active', done => {
        withVersions([
            {number: 4, active: false},
            {number: 1, active: false},
            {number: 2, active: false},
            {number: 3, active: false}
        ]);
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual(null);
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
            done();
        });
    });

    test('getLatestActiveVersion returns largest active VCL number, ' +
        'when called with a single active VCL', done => {
        withVersions([
            {number: 1, active: true}
        ]);
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({number: 1, active: true});
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
            done();
        });
    });

    test('getLatestActiveVersion returns null, when called with a single inactive VCL', done => {
        withVersions([
            {number: 1, active: false}
        ]);
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual(null);
            expect(mockListServiceVersions).toHaveBeenCalledWith({service_id: 'service_id'});
            done();
        });
    });

    describe('wrapper wiring to the fastly@15 API', () => {
        const fastlyInstance = fastlyExtended('api_key', 'service_id');
        // Bridge the wrapper's (err, result) callbacks into a promise for async tests.
        const call = fn => new Promise((resolve, reject) => {
            fn((err, result) => (err ? reject(err) : resolve(result)));
        });
        const lastCall = () => mockCalls[mockCalls.length - 1];

        beforeEach(() => {
            mockCalls = [];
            mockUpdate404 = false;
        });

        test('setCondition updates an existing condition with the merged params', async () => {
            await call(cb => fastlyInstance.setCondition(7, {
                name: 'routes/x (request)', statement: 'req.url ~ "x"', type: 'REQUEST', priority: 11
            }, cb));
            expect(mockCalls).toHaveLength(1);
            expect(lastCall()).toEqual({api: 'ConditionApi',
                method: 'updateCondition',
                args: {
                    service_id: 'service_id',
                    version_id: 7,
                    condition_name: 'routes/x (request)',
                    name: 'routes/x (request)',
                    statement: 'req.url ~ "x"',
                    type: 'REQUEST',
                    priority: 11
                }});
        });

        test('setCondition falls back to createCondition on a 404', async () => {
            mockUpdate404 = true;
            await call(cb => fastlyInstance.setCondition(7, {
                name: 'c', statement: 's', type: 'REQUEST', priority: 1
            }, cb));
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
            await call(cb => fastlyInstance.setFastlyHeader(7, {
                name: 'rewrites/a',
                action: 'set',
                ignore_if_set: 0,
                type: 'REQUEST',
                dst: 'url',
                src: '"/a.html"',
                request_condition: 'rc',
                priority: 10
            }, cb));
            expect(mockCalls[0].method).toBe('updateHeaderObject');
            expect(mockCalls[0].args.header_name).toBe('rewrites/a');
            expect(mockCalls[1].method).toBe('createHeaderObject');
            expect(mockCalls[1].args.dst).toBe('url');
            expect(mockCalls[1].args.header_name).toBeUndefined();
        });

        test('setResponseObject updates with response_object_name', async () => {
            await call(cb => fastlyInstance.setResponseObject(7, {
                name: 'redirects/a', status: 301, response: 'Moved Permanently', request_condition: 'rc'
            }, cb));
            expect(lastCall().method).toBe('updateResponseObject');
            expect(lastCall().args.response_object_name).toBe('redirects/a');
            expect(lastCall().args.status).toBe(301);
        });

        test('setCustomVCL updates with vcl_name and content', async () => {
            await call(cb => fastlyInstance.setCustomVCL(7, 'recv-condition', 'if (true) {}', cb));
            expect(lastCall().method).toBe('updateCustomVcl');
            expect(lastCall().args.vcl_name).toBe('recv-condition');
            expect(lastCall().args.content).toBe('if (true) {}');
        });

        test('purgeKey calls purgeTag with the surrogate key', async () => {
            await call(cb => fastlyInstance.purgeKey('service_id', 'static-assets', cb));
            expect(lastCall()).toEqual({api: 'PurgeApi',
                method: 'purgeTag',
                args: {
                    service_id: 'service_id', surrogate_key: 'static-assets'
                }});
        });

        test('cloneVersion and activateVersion hit the version API', async () => {
            await call(cb => fastlyInstance.cloneVersion(7, cb));
            expect(lastCall()).toEqual({api: 'VersionApi',
                method: 'cloneServiceVersion',
                args: {
                    service_id: 'service_id', version_id: 7
                }});
            await call(cb => fastlyInstance.activateVersion(7, cb));
            expect(lastCall()).toEqual({api: 'VersionApi',
                method: 'activateServiceVersion',
                args: {
                    service_id: 'service_id', version_id: 7
                }});
        });
    });
});
