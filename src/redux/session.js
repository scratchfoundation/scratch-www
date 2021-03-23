const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const {requestSession, requestSessionWithRetry} = require('../lib/session');
const messageCountActions = require('./message-count.js');
const permissionsActions = require('./permissions.js');

const Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_STATUS: null
});

const banWhitelistPaths = [
    '/accounts/banned-response/',
    '/community_guidelines/',
    '/community_guidelines'
];

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    status: module.exports.Status.NOT_FETCHED,
    session: {}
});

module.exports.sessionReducer = (state, action) => {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_SESSION:
        return defaults({session: action.session}, state);
    case Types.SET_STATUS:
        return defaults({status: action.status}, state);
    case Types.SET_SESSION_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setSessionError = error => ({
    type: Types.SET_SESSION_ERROR,
    error: error
});

module.exports.setSession = session => ({
    type: Types.SET_SESSION,
    session: session
});

module.exports.setStatus = status => ({
    type: Types.SET_STATUS,
    status: status
});

const handleSessionResponse = (dispatch, body) => {
    if (typeof body === 'undefined') return dispatch(module.exports.setSessionError('No session content'));
    if (
        body.user &&
        body.user.banned &&
        banWhitelistPaths.indexOf(window.location.pathname) === -1
    ) {
        window.location = '/accounts/banned-response/';
        return;
    } else if (
        body.flags &&
        body.flags.must_complete_registration &&
        window.location.pathname !== '/classes/complete_registration'
    ) {
        window.location = '/classes/complete_registration';
        return;
    } else if (
        body.flags &&
        body.flags.must_reset_password &&
        !body.flags.must_complete_registration &&
        window.location.pathname !== '/classes/student_password_reset/'
    ) {
        window.location = '/classes/student_password_reset/';
        return;
    }
    dispatch(module.exports.setSession(body));
    dispatch(module.exports.setStatus(module.exports.Status.FETCHED));

    // get the permissions from the updated session
    dispatch(permissionsActions.storePermissions(body.permissions));
    if (typeof body.user !== 'undefined') {
        dispatch(messageCountActions.getCount(body.user.username));
    }
    return;
};

module.exports.refreshSession = () => (dispatch => {
    dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    return new Promise((resolve, reject) => {
        requestSession(resolve, reject);
    }).then(body => {
        handleSessionResponse(dispatch, body);
    }, err => {
        dispatch(module.exports.setSessionError(err));
    });
});

module.exports.refreshSessionWithRetry = () => (dispatch => {
    dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    return new Promise((resolve, reject) => {
        requestSessionWithRetry(resolve, reject, 4, 7500);
    }).then(body => {
        handleSessionResponse(dispatch, body);
    }, err => {
        dispatch(module.exports.setSessionError(err));
    });
});

// Selectors
module.exports.selectUserId = state =>
    state.session.session.user && state.session.session.user.id;
