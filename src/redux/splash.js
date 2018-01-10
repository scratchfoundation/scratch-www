var keyMirror = require('keymirror');

var api = require('../lib/api');
var log = require('../lib/log');

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    ERROR: null
});

module.exports.getInitialState = function () {
    return {
        activity: {
            status: module.exports.Status.NOT_FETCHED,
            rows: []
        },
        featured: {
            status: module.exports.Status.NOT_FETCHED,
            rows: {}
        },
        shared: {
            status: module.exports.Status.NOT_FETCHED,
            rows: []
        },
        loved: {
            status: module.exports.Status.NOT_FETCHED,
            rows: []
        },
        studios: {
            status: module.exports.Status.NOT_FETCHED,
            rows: []
        }
    };
};

module.exports.splashReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'SET_ROWS':
        state = JSON.parse(JSON.stringify(state));
        state[action.rowType].rows = action.rows;
        return state;
    case 'SET_FETCH_STATUS':
        state = JSON.parse(JSON.stringify(state));
        state[action.rowType].status = action.status;
        return state;
    case 'ERROR':
        log.error(action.error);
        return state;
    default:
        return state;
    }
};

module.exports.setError = function (error) {
    return {
        type: 'ERROR',
        error: error
    };
};

module.exports.setRows = function (type, rows) {
    return {
        type: 'SET_ROWS',
        rowType: type,
        rows: rows
    };
};

module.exports.setFetchStatus = function (type, status){
    return {
        type: 'SET_FETCH_STATUS',
        rowType: type,
        status: status
    };
};

module.exports.getActivity = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setFetchStatus('activity', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/following/users/activity?limit=5',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setFetchStatus('activity', module.exports.Status.ERROR));
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setFetchStatus('activity', module.exports.Status.ERROR));
                dispatch(module.exports.setError('No session content'));
                return;
            }
            dispatch(module.exports.setFetchStatus('activity', module.exports.Status.FETCHED));
            dispatch(module.exports.setRows('activity', body));
        });
    };
};

/**
 * Get global homepage rows
 */
module.exports.getFeaturedGlobal = function () {
    return function (dispatch) {
        dispatch(module.exports.setFetchStatus('featured', module.exports.Status.FETCHING));
        api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setFetchStatus('featured', module.exports.Status.ERROR));
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setFetchStatus('featured', module.exports.Status.ERROR));
                dispatch(module.exports.setError('No session content'));
                return;
            }
            dispatch(module.exports.setFetchStatus('featured', module.exports.Status.FETCHED));
            dispatch(module.exports.setRows('featured', body));
        });
    };
};

/**
 * Get list of projects shared by users the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getSharedByFollowing = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setFetchStatus('shared', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/following/users/projects',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setFetchStatus('shared', module.exports.Status.Status.ERROR));
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setFetchStatus('shared', module.exports.Status.ERROR));
                dispatch(module.exports.setError('No session content'));
                return;
            }
            dispatch(module.exports.setFetchStatus('shared', module.exports.Status.FETCHED));
            dispatch(module.exports.setRows('shared', body));
        });
    };
};

/**
 * Get list of projects in studios that the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getInStudiosFollowing = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setFetchStatus('studios', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/following/studios/projects',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setFetchStatus('studios', module.exports.Status.ERROR));
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setFetchStatus('studios', module.exports.Status.ERROR));
                dispatch(module.exports.setError('No session content'));
                return;
            }
            dispatch(module.exports.setFetchStatus('studios', module.exports.Status.FETCHED));
            dispatch(module.exports.setRows('studios', body));
        });
    };
};

/**
 * Get list of projects loved by users the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getLovedByFollowing = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/following/users/loves',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
                dispatch(module.exports.setError('No session content'));
                return;
            }
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
            dispatch(module.exports.setRows('loved', body));
        });
    };
};
