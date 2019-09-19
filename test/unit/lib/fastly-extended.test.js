describe('fastly library', () => {
    test('getLatestActiveVersion returns largest active VCL number', done => {

        const mockedFastlyRequest = jest.fn((method, url, cb) => {
            cb(null, [
                {
                    number: 4,
                    active: false
                },
                {
                    number: 1,
                    active: true
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

        jest.mock('fastly', () => (() => ({
            request: mockedFastlyRequest
        })));

        const fastlyExtended = require('../../../bin/lib/fastly-extended'); // eslint-disable-line global-require
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
});
