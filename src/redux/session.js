const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');
const get = require('lodash.get');

const {requestSession, requestSessionWithRetry} = require('../lib/session');
const messageCountActions = require('./message-count.js');
const permissionsActions = require('./permissions.js');

const Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_STATUS: null
});

const banGoodListPaths = [
    '/accounts/banned-response',
    '/community_guidelines',
    '/privacy_policy',
    '/terms_of_use'
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
        banGoodListPaths.every(goodPath => window.location.pathname.indexOf(goodPath) === -1)
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
module.exports.selectIsLoggedIn = state => !!get(state, ['session', 'session', 'user'], false);
module.exports.selectUsername = state => get(state, ['session', 'session', 'user', 'username'], null);
module.exports.selectToken = state => get(state, ['session', 'session', 'user', 'token'], null);
module.exports.selectIsAdmin = state => get(state, ['session', 'session', 'permissions', 'admin'], false);
module.exports.selectIsSocial = state => get(state, ['session', 'session', 'permissions', 'social'], false);
module.exports.selectIsEducator = state => get(state, ['session', 'session', 'permissions', 'educator'], false);
module.exports.selectProjectCommentsGloballyEnabled = state =>
    get(state, ['session', 'session', 'flags', 'project_comments_enabled'], false);
module.exports.selectMuteStatus = state => get(state, ['session', 'session', 'permissions', 'mute_status'],
    {muteExpiresAt: 0, offenses: [], showWarning: false});
module.exports.selectIsMuted = state => (module.exports.selectMuteStatus(state).muteExpiresAt || 0) * 1000 > Date.now();

module.exports.selectHasFetchedSession = state => state.session.status === module.exports.Status.FETCHED;

// NB logged out user id as NaN so that it can never be used in equality testing since NaN !== NaN
module.exports.selectUserId = state => get(state, ['session', 'session', 'user', 'id'], NaN);
