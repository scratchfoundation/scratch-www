var jar = require('../lib/jar.js');

var Types = {
    SET_STATE: 'www/token/SET_TOKEN',
    SET_ERROR: 'www/token/SET_ERROR',
    USE_TOKEN: 'www/token/USE_TOKEN'
};

function reducer (state, action) {
    // Reducer for updating the api token
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_STATE:
        return action.token;
    case Types.SET_ERROR:
        // TODO: do something with the error
        return state;
    default:
        return state;
    }
}

reducer.getToken = function () {
    return function (dispatch) {
        jar.getUnsignedValue('scratchsessionsid', 'token', function (err, value) {
            if (err) return dispatch(reducer.setTokenError(err));
            return dispatch(reducer.setToken(value));
        });
    };
};

reducer.setToken = function (token) {
    return {
        type: Types.SET_STATE,
        token: token
    };
};

reducer.setTokenError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

module.exports = reducer;
