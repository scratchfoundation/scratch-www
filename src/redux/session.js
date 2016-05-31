var keyMirror = require('keymirror');

var api = require('../mixins/api.jsx').api;
var tokenActions = require('./token.js');

var Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null
});

module.exports.sessionReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = {};
    }
    switch (action.type) {
    case Types.SET_SESSION:
        return action.session;
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
    session.loaded = true;
    return {
        type: Types.SET_SESSION,
        session: session
    };
};

module.exports.refreshSession = function () {
    return function (dispatch) {
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
                    return;
                }
            }
        });
    };
};
