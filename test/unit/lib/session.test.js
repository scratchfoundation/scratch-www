describe('session library', () => {
//    let mockAPIRequest = {};
    let mockAPIRequestNoSession = jest.fn((opts, callback) => {
        console.log(`mocked has been called ${mockAPIRequestNoSession.mock.calls.length} times`);
        callback(null, {}, {statusCode: 200});
    });
    // let mockAPIRequestYesSession = jest.fn((opts, callback) => {
    //     console.log(`Yes Session mocked has been called ${mockAPIRequestNoSession.mock.calls.length} times`);
    //     callback(null, {}, {statusCode: 200});
    // });
    // let whichMockAPIRequest = mockAPIRequestNoSession;
    // const mockCurrentAPIRequest = (() => {
    //     whichMockAPIRequest();
    // })();
    jest.mock('../../../src/lib/api', () => (
        mockAPIRequestNoSession
    ));
    const sessionLib = require('../../../src/lib/session'); // eslint-disable-line global-require
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('requestSessionOnce calls api 1 time', done => {
        //whichMockAPIRequest = mockAPIRequestNoSession;
        // mockAPIRequest = jest.fn((opts, callback) => {
        //     callback(null, {}, {statusCode: 200});
        // });
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionOnce(resolve, reject);
        }).then(() => {
            expect(mockAPIRequestNoSession).toHaveBeenCalledTimes(1);
            done();
        }, () => {
            console.log('sessionLib test: err');
        });
    });

    test('requestSessionWithRetry can call api multiple times', done => {
        // mockAPIRequest = jest.fn((opts, callback) => {
        //     callback(null, {}, {statusCode: 200});
        // });
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 2, 0);
        }).then(() => {
            expect(mockAPIRequestNoSession).toHaveBeenCalledTimes(3);
            done();
        });
    });

    test('requestSessionWithRetry respects total delay time param within a reasonable tolerance', done => {
        // mockAPIRequest = jest.fn((opts, callback) => {
        //     callback(null, {}, {statusCode: 200});
        // });
        const startTime = new Date().getTime();
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 2, 2500);
        }).then(() => {
            const endTime = new Date().getTime();
            expect(endTime - startTime > 2000).toBeTruthy();
            expect(endTime - startTime < 3000).toBeTruthy();
            done();
        });
    });
});
