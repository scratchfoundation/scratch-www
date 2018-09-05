const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const log = require('../lib/log.js');
const messageCountActions = require('./message-count.js');
const permissionsActions = require('./permissions.js');

const Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_STATUS: null,
    SET_ACCOUNT_NAV_OPEN: null,
    SET_LOGIN_ERROR: null,
    SET_LOGIN_OPEN: null,
    TOGGLE_LOGIN_OPEN: null,
    SET_CANCELED_DELETION_OPEN: null,
    SET_REGISTRATION_OPEN: null
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
    accountNavOpen: false,
    canceledDeletionOpen: false,
    loginError: null,
    loginOpen: false,
    registrationOpen: false,
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
    case Types.SET_ACCOUNT_NAV_OPEN:
        return defaults({accountNavOpen: action.isOpen}, state);
    case Types.SET_LOGIN_ERROR:
        return defaults({loginError: action.loginError}, state);
    case Types.SET_LOGIN_OPEN:
        return defaults({loginOpen: action.isOpen}, state);
    case Types.TOGGLE_LOGIN_OPEN:
        return defaults({loginOpen: !state.loginOpen}, state);
    case Types.SET_CANCELED_DELETION_OPEN:
        return defaults({canceledDeletionOpen: action.isOpen}, state);
    case Types.SET_REGISTRATION_OPEN:
        return defaults({registrationOpen: action.isOpen}, state);
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

module.exports.setAccountNavOpen = isOpen => ({
    type: Types.SET_ACCOUNT_NAV_OPEN,
    isOpen: isOpen
});

module.exports.setLoginError = loginError => ({
    type: Types.SET_LOGIN_ERROR,
    loginError: loginError
});

module.exports.setLoginOpen = isOpen => ({
    type: Types.SET_LOGIN_OPEN,
    isOpen: isOpen
});

module.exports.setLoginOpenUsingToggle = () => ({
    type: Types.TOGGLE_LOGIN_OPEN
});

module.exports.setCanceledDeletionOpen = isOpen => ({
    type: Types.SET_CANCELED_DELETION_OPEN,
    isOpen: isOpen
});

module.exports.setRegistrationOpen = isOpen => ({
    type: Types.SET_REGISTRATION_OPEN,
    isOpen: isOpen
});

/*
functions called directly from views
*/

// can be called with or without a js click event
module.exports.handleOpenAccountNav = event => (dispatch => {
    if (event) {
        event.preventDefault();
    }
    dispatch(module.exports.setAccountNavOpen(true));
});

module.exports.handleCloseAccountNav = () => (dispatch => {
    dispatch(module.exports.setAccountNavOpen(false));
});

// can be called with or without a js click event
module.exports.handleOpenLogin = event => (dispatch => {
    if (event) {
        event.preventDefault();
    }
    dispatch(module.exports.setLoginOpen(true));
});

module.exports.handleCloseLogin = () => (dispatch => {
    dispatch(module.exports.setLoginOpen(false));
});

module.exports.handleToggleLoginOpen = () => (dispatch => {
    dispatch(module.exports.setLoginOpenUsingToggle());
});

module.exports.handleCloseCanceledDeletion = () => (dispatch => {
    dispatch(module.exports.setCanceledDeletionOpen(false));
});

// can be called with or without a js click event
module.exports.handleOpenRegistration = event => (dispatch => {
    if (event) {
        event.preventDefault();
    }
    dispatch(module.exports.setRegistrationOpen(true));
});

module.exports.handleCloseRegistration = () => (dispatch => {
    dispatch(module.exports.setRegistrationOpen(false));
});

module.exports.handleCompleteRegistration = () => (dispatch => {
    dispatch(module.exports.refreshSession());
    dispatch(module.exports.setRegistrationOpen(false));
});

module.exports.closeAccountMenus = () => (dispatch => {
    dispatch(module.exports.setAccountNavOpen(false));
    dispatch(module.exports.setRegistrationOpen(false));
});

module.exports.refreshSession = () => (dispatch => {
    dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    api({
        host: '',
        uri: '/session/'
    }, (err, body) => {
        if (err) return dispatch(module.exports.setSessionError(err));
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
    });
});

module.exports.handleLogIn = (formData, callback) => (dispatch => {
    dispatch(module.exports.setLoginError(null));
    formData.useMessages = true; // NOTE: this may or may not be being used anywhere else
    api({
        method: 'post',
        host: '',
        uri: '/accounts/login/',
        json: formData,
        useCsrf: true
    }, (err, body) => {
        if (err) dispatch(module.exports.setLoginError(err.message));
        if (body) {
            body = body[0];
            if (body.success) {
                dispatch(module.exports.setLoginOpen(false));
                body.messages.map(message => { // eslint-disable-line array-callback-return
                    if (message.message === 'canceled-deletion') {
                        dispatch(module.exports.setCanceledDeletionOpen(true));
                    }
                });
                dispatch(module.exports.refreshSession());
            } else {
                if (body.redirect) {
                    window.location = body.redirect;
                }
                // Update login error message to a friendlier one if it exists
                dispatch(module.exports.setLoginError(body.msg));
            }
        }
        // JS error already logged by api mixin
        callback();
    });
});

module.exports.handleLogOut = event => (dispatch => {
    event.preventDefault();
    api({
        host: '',
        method: 'post',
        uri: '/accounts/logout/',
        useCsrf: true
    }, err => {
        if (err) log.error(err);
        dispatch(module.exports.setLoginOpen(false));
        dispatch(module.exports.setAccountNavOpen(false));
        window.location = '/';
    });
});
