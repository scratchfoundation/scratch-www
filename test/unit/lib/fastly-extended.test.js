const fastlyExtended = require('../../../bin/lib/fastly-extended'); // eslint-disable-line global-require

const mockJsonResponse = body => ({
    ok: true,
    status: 200,
    text: jest.fn().mockResolvedValue(JSON.stringify(body))
});

describe('fastly library', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        delete global.fetch;
    });

    test('getLatestActiveVersion returns largest active VCL number for sequential VCLs', async () => {
        global.fetch.mockResolvedValueOnce(mockJsonResponse([
            {number: 1, active: false},
            {number: 2, active: false},
            {number: 3, active: true},
            {number: 4, active: false}
        ]));
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        await new Promise((resolve, reject) => {
            fastlyInstance.getLatestActiveVersion((err, response) => {
                if (err) return reject(err);
                expect(response).toEqual({
                    number: 3,
                    active: true
                });
                expect(global.fetch).toHaveBeenCalledWith(
                    'https://api.fastly.com/service/service_id/version',
                    expect.objectContaining({
                        method: 'GET',
                        headers: expect.objectContaining({
                            'Fastly-Key': 'api_key'
                        })
                    })
                );
                resolve();
            });
        });
    });

    test('getLatestActiveVersion returns largest active VCL number for shuffled VCLs', async () => {
        global.fetch.mockResolvedValueOnce(mockJsonResponse([
            {number: 4, active: false},
            {number: 1, active: false},
            {number: 2, active: true},
            {number: 3, active: false}
        ]));
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        await new Promise((resolve, reject) => {
            fastlyInstance.getLatestActiveVersion((err, response) => {
                if (err) return reject(err);
                expect(response).toEqual({
                    number: 2,
                    active: true
                });
                resolve();
            });
        });
    });

    test('getLatestActiveVersion returns null, when none of the VCL versions are active', async () => {
        global.fetch.mockResolvedValueOnce(mockJsonResponse([
            {number: 4, active: false},
            {number: 1, active: false},
            {number: 2, active: false},
            {number: 3, active: false}
        ]));
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        await new Promise((resolve, reject) => {
            fastlyInstance.getLatestActiveVersion((err, response) => {
                if (err) return reject(err);
                expect(response).toEqual(null);
                resolve();
            });
        });
    });

    test('getLatestActiveVersion returns largest active VCL number, when called with a single active VCL', async () => {
        global.fetch.mockResolvedValueOnce(mockJsonResponse([
            {number: 1, active: true}
        ]));
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        await new Promise((resolve, reject) => {
            fastlyInstance.getLatestActiveVersion((err, response) => {
                if (err) return reject(err);
                expect(response).toEqual({
                    number: 1,
                    active: true
                });
                resolve();
            });
        });
    });

    test('getLatestActiveVersion returns null, when called with a single inactive VCL', async () => {
        global.fetch.mockResolvedValueOnce(mockJsonResponse([
            {number: 1, active: false}
        ]));
        const fastlyInstance = fastlyExtended('api_key', 'service_id');

        await new Promise((resolve, reject) => {
            fastlyInstance.getLatestActiveVersion((err, response) => {
                if (err) return reject(err);
                expect(response).toEqual(null);
                resolve();
            });
        });
    });
});
