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

var Actions = {
    types: Types,

    setSessionError: function (error) {
        return {
            type: Types.SET_SESSION_ERROR,
            error: error
        };
    },

    setSession: function (session) {
        return {
            type: Types.SET_SESSION,
            session: session
        };
    },

    refreshSession: function () {
        return function (dispatch) {
            api({
                host: '',
                uri: '/session/'
            }, function (err, body) {
                if (err) return dispatch(Actions.setSessionError(err));

                if (typeof body !== 'undefined') {
                    if (body.banned) {
                        return window.location = body.redirectUrl;
                    } else {
                        dispatch(Actions.getToken());
                        dispatch(Actions.setSession(body));
                        return;
                    }
                }
            });
        };
    },

    getToken: function () {
        return function (dispatch) {
            jar.get('scratchsessionsid', function (err, value) {
                if (err) return dispatch(Actions.setTokenError(err));
                jar.unsign(value, function (err, contents) {
                    if (err) return dispatch(Actions.setTokenError(err));
                    try {
                        var sessionData = JSON.parse(contents);
                    } catch (err) {
                        return dispatch(Actions.setTokenError(err));
                    }
                    return dispatch(Actions.setToken(sessionData.token));
                });
            });
        };
    },

    setToken: function (token) {
        return {
            type: Types.SET_TOKEN,
            token: token
        };
    },

    setTokenError: function (error) {
        return {
            type: Types.SET_SESSION_ERROR,
            error: error
        };
    }
};

module.exports = Actions;
