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

var appReducer = combineReducers({
    session: sessionReducer
});

module.exports = appReducer;
