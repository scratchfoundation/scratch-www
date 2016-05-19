var combineReducers = require('redux').combineReducers;

var authReducers = require('./auth.js');
var conferenceScheduleReducers = require('./conference-schedule.js');
var conferenceDetailsReducers = require('./conference-details.js');

var appReducer = combineReducers({
    session: authReducers.sessionReducer,
    token: authReducers.tokenReducer,
    day: conferenceScheduleReducers.dayReducer,
    schedule: conferenceScheduleReducers.scheduleReducer,
    details: conferenceDetailsReducers.detailsReducer
});

module.exports = appReducer;
