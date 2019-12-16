describe('session library', () => {
    // respond to session requests with empty session object
    let sessionNoUser = jest.fn((opts, callback) => {
        callback(null, {}, {statusCode: 200});
    });
    // respond to session requests with session object that indicates
    // successfully logged-in user
    let sessionYesUser = jest.fn((opts, callback) => {
        callback(null, {user: {username: 'test_username'}}, {statusCode: 200});
    });
    // respond to first two requests with empty session object; after that,
    // respond with user in object
    let sessionNoThenYes = jest.fn((opts, callback) => {
        if (sessionNoThenYes.mock.calls.length <= 2) {
            callback(null, {}, {statusCode: 200});
        } else {
            callback(null, {user: {username: 'test_username'}}, {statusCode: 200});
        }
    });
    // respond to session requests with response code 404, indicating no session
    // found for that user
    let sessionNotFound = jest.fn((opts, callback) => {
        callback(null, null, {statusCode: 404});
    });
    // respond to session requests with response code 503, indicating connection failure
    let sessionConnectFailure = jest.fn((opts, callback) => {
        callback(null, null, {statusCode: 503});
    });

    // by changing whichMockAPIRequest, we can simulate different api responses
    let whichMockAPIRequest = null;
    let mockAPIRequest = (opts, callback) => {
        whichMockAPIRequest(opts, callback);
    };

    // mock lib/api.js, and include our mocked version in lib/session.js
    jest.mock('../../../src/lib/api', () => {
        return mockAPIRequest;
    });
    const sessionLib = require('../../../src/lib/session'); // eslint-disable-line global-require

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('requestSessionOnce can call api 1 time, when session found', done => {
        whichMockAPIRequest = sessionYesUser;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionOnce(resolve, reject);
        }).then(body => {
            expect(sessionYesUser).toHaveBeenCalledTimes(1);
            expect(body).toEqual({user: {username: 'test_username'}});
            done();
        });
    });

    test('requestSessionOnce can call api 1 time, when session not found', done => {
        whichMockAPIRequest = sessionNoUser;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionOnce(resolve, reject);
        }).then(body => {
            expect(sessionNoUser).toHaveBeenCalledTimes(1);
            expect(body).toEqual({});
            done();
        });
    });

    test('requestSessionWithRetry can call api once', done => {
        whichMockAPIRequest = sessionNoUser;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 0, 0);
        }).then(() => {
            expect(sessionNoUser).toHaveBeenCalledTimes(1);
            done();
        });
    });

    test('requestSessionWithRetry can call api multiple times', done => {
        whichMockAPIRequest = sessionNoUser;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 2, 0);
        }).then(() => {
            expect(sessionNoUser).toHaveBeenCalledTimes(3);
            done();
        });
    });

    test('requestSessionWithRetry respects total delay time param within a reasonable tolerance', done => {
        whichMockAPIRequest = sessionNoUser;
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

    test('requestSessionWithRetry will retry if no user found, then stop when user is found', done => {
        whichMockAPIRequest = sessionNoThenYes;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 4, 3000);
        }).then(body => {
            expect(body).toEqual({user: {username: 'test_username'}});
            expect(sessionNoThenYes).toHaveBeenCalledTimes(3);
            done();
        });
    });

    test('requestSessionWithRetry handles session not found as immediate error', done => {
        whichMockAPIRequest = sessionNotFound;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 2, 0);
        }).then(() => {}, err => {
            expect(err).toBeFalsy();
            done();
        });
    });

    test('requestSessionWithRetry handles connection failure by retrying', done => {
        whichMockAPIRequest = sessionConnectFailure;
        new Promise((resolve, reject) => { // eslint-disable-line no-undef
            sessionLib.requestSessionWithRetry(resolve, reject, 2, 0);
        }).then(body => {
            expect(sessionConnectFailure).toHaveBeenCalledTimes(3);
            expect(body).toBeFalsy();
            done();
        });
    });

});
