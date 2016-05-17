var combineReducers = require('redux').combineReducers;

var actionTypes = require('./actions.js').types;


var sessionReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = {};
    }
    switch (action.type) {
    case actionTypes.SET_SESSION:
        return action.session;
    case actionTypes.SET_SESSION_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

var tokenReducer = function (state, action) {
    // Reducer for updating the api token
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case actionTypes.SET_TOKEN:
        return action.token;
    case actionTypes.SET_TOKEN_ERROR:
        // TODO: do something with the error
        return state;
    default:
        return state;
    }
};

var appReducer = combineReducers({
    session: sessionReducer,
    token: tokenReducer
});

module.exports = appReducer;
