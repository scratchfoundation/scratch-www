describe('fastly library', () => {
    let mockedFastlyRequest = {};

    jest.mock('fastly', () => (() => ({
        request: mockedFastlyRequest
    })));
    const fastlyExtended = require('../../../bin/lib/fastly-extended'); // eslint-disable-line global-require

    test('getLatestActiveVersion returns largest active VCL number, ' +
        'when called with VCLs in sequential order', done => {
        mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 1,
                    active: false
                },
                {
                    number: 2,
                    active: false
                },
                {
                    number: 3,
                    active: true
                },
                {
                    number: 4,
                    active: false
                }
            ]);
        });
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({
                number: 3,
                active: true
            });
            expect(mockedFastlyRequest).toHaveBeenCalledWith(
                'GET', '/service/service_id/version', expect.any(Function)
            );
            done();
        });
    });

    test('getLatestActiveVersion returns largest active VCL number, when called with VCLs in mixed up order', done => {
        mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 4,
                    active: false
                },
                {
                    number: 1,
                    active: false
                },
                {
                    number: 2,
                    active: true
                },
                {
                    number: 3,
                    active: false
                }
            ]);
        });
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({
                number: 2,
                active: true
            });
            expect(mockedFastlyRequest).toHaveBeenCalledWith(
                'GET', '/service/service_id/version', expect.any(Function)
            );
            done();
        });
    });

    test('getLatestActiveVersion returns null, when none of the VCL versions are active', done => {
        mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 4,
                    active: false
                },
                {
                    number: 1,
                    active: false
                },
                {
                    number: 2,
                    active: false
                },
                {
                    number: 3,
                    active: false
                }
            ]);
        });
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual(null);
            expect(mockedFastlyRequest).toHaveBeenCalledWith(
                'GET', '/service/service_id/version', expect.any(Function)
            );
            done();
        });
    });

    test('getLatestActiveVersion returns largest active VCL number, ' +
        'when called with a single active VCL', done => {
        mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 1,
                    active: true
                }
            ]);
        });
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual({
                number: 1,
                active: true
            });
            expect(mockedFastlyRequest).toHaveBeenCalledWith(
                'GET', '/service/service_id/version', expect.any(Function)
            );
            done();
        });
    });

    test('getLatestActiveVersion returns null, when called with a single inactive VCL', done => {
        mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 1,
                    active: false
                }
            ]);
        });
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        fastlyInstance.getLatestActiveVersion((err, response) => {
            expect(err).toBe(null);
            expect(response).toEqual(null);
            expect(mockedFastlyRequest).toHaveBeenCalledWith(
                'GET', '/service/service_id/version', expect.any(Function)
            );
            done();
        });
    });
});
