var combineReducers = require('redux').combineReducers;

var authReducers = require('./auth.js');

var appReducer = combineReducers({
    session: authReducers.sessionReducer,
    token: authReducers.tokenReducer,
});

module.exports = appReducer;
