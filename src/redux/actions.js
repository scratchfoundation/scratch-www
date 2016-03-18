var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;

var Types = keyMirror({
    REFRESH_SESSION: null,
    SET_SESSION: null,
    SET_SESSION_ERROR: null
});

var Actions = {
    types: Types,

    setSessionError: function (error) {
        return {
            type: Types.SET_SESSION_ERROR,
            error: error
        }
    },

    setSession: function (session) {
        return {
            type: Types.SET_SESSION,
            session: session
        }
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
                        return window.location = url;
                    } else {
                        return dispatch(Actions.setSession(body));
                    }
                }
            });
        };
    },
};

module.exports = Actions;
