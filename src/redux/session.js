var keyMirror = require('keymirror');
var defaults = require('lodash.defaults');

var api = require('../lib/api');
var permissionsActions = require('./permissions.js');

var Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_STATUS: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = function (){
    return {status: module.exports.Status.NOT_FETCHED, session:{}};
};

module.exports.sessionReducer = function (state, action) {
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

module.exports.setSessionError = function (error) {
    return {
        type: Types.SET_SESSION_ERROR,
        error: error
    };
};

module.exports.setSession = function (session) {
    return {
        type: Types.SET_SESSION,
        session: session
    };
};

module.exports.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

module.exports.refreshSession = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
        api({
            host: '',
            uri: '/session/'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setSessionError(err));
            if (typeof body === 'undefined') return dispatch(module.exports.setSessionError('No session content'));
            if (
                    body.user &&
                    body.user.banned &&
                    window.location.pathname !== '/accounts/banned-response/') {
                return window.location = '/accounts/banned-response/';
            } else if (
                    body.flags &&
                    body.flags.must_complete_registration &&
                    window.location.pathname !== '/classes/complete_registration') {
                return window.location = '/classes/complete_registration';
            } else if (
                    body.flags &&
                    body.flags.must_reset_password &&
                    !body.flags.must_complete_registration &&
                    window.location.pathname !== '/classes/student_password_reset/') {
                return window.location = '/classes/student_password_reset/';
            } else {
                dispatch(module.exports.setSession(body));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED));

                // get the permissions from the updated session
                dispatch(permissionsActions.getPermissions());
                return;
            }
        });
    };
};
