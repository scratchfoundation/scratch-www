var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;
var jar = require('../lib/jar.js');

var Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_TOKEN: null,
    SET_TOKEN_ERROR: null,
    USE_TOKEN: null
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

module.exports.tokenReducer = function (state, action) {
    // Reducer for updating the api token
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_TOKEN:
        return action.token;
    case Types.SET_TOKEN_ERROR:
        // TODO: do something with the error
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
                    dispatch(module.exports.getToken());
                    dispatch(module.exports.setSession(body));
                    return;
                }
            }
        });
    };
};

module.exports.getToken = function () {
    return function (dispatch) {
        jar.get('scratchsessionsid', function (err, value) {
            if (err) return dispatch(module.exports.setTokenError(err));
            jar.unsign(value, function (err, contents) {
                if (err) return dispatch(module.exports.setTokenError(err));
                try {
                    var sessionData = JSON.parse(contents);
                } catch (err) {
                    return dispatch(module.exports.setTokenError(err));
                }
                return dispatch(module.exports.setToken(sessionData.token));
            });
        });
    };
};

module.exports.setToken = function (token) {
    return {
        type: Types.SET_TOKEN,
        token: token
    };
};

module.exports.setTokenError = function (error) {
    return {
        type: Types.SET_SESSION_ERROR,
        error: error
    };
};
