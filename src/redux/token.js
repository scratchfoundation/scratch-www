var keyMirror = require('keymirror');
var jar = require('../lib/jar.js');

var Types = keyMirror({
    SET_TOKEN: null,
    SET_TOKEN_ERROR: null,
    USE_TOKEN: null
});

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
