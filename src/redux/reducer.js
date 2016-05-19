var combineReducers = require('redux').combineReducers;

var scheduleReducer = require('./conference-schedule.js').scheduleReducer;
var detailsReducer = require('./conference-details.js').detailsReducer;
var sessionReducer = require('./session.js').sessionReducer;
var tokenReducer = require('./token.js').tokenReducer;

var appReducer = combineReducers({
    session: sessionReducer,
    token: tokenReducer,
    conferenceSchedule: scheduleReducer,
    conferenceDetails: detailsReducer
});

module.exports = appReducer;
