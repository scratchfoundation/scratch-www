var keyMirror = require('keymirror');
var defaultsDeep = require('lodash.defaultsdeep');

var api = require('../mixins/api.jsx').api;
var tokenActions = require('./token.js');

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
    return {'status': module.exports.Status.NOT_FETCHED, 'results':{}};
};

module.exports.sessionReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_SESSION:
        return defaultsDeep({'results': action.session}, state);
    case Types.SET_STATUS:
        return defaultsDeep({'status': action.status}, state);
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

module.exports.setSession = function (results) {
    return {
        type: Types.SET_SESSION,
        session: results
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

            if (typeof body !== 'undefined') {
                if (body.banned) {
                    return window.location = body.url;
                } else {
                    dispatch(tokenActions.getToken());
                    dispatch(module.exports.setSession(body));
                    dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
                    return;
                }
            }
        });
    };
};
