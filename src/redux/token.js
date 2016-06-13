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
        jar.getUnsignedValue('scratchsessionsid', 'token', function (err, value) {
            if (err) return dispatch(module.exports.setTokenError(err));
            return dispatch(module.exports.setToken(value));
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
        type: Types.SET_TOKEN_ERROR,
        error: error
    };
};
