var combineReducers = require('redux').combineReducers;

var scheduleReducer = require('./conference-schedule.js').scheduleReducer;
var detailsReducer = require('./conference-details.js').detailsReducer;
var permissionsReducer = require('./permissions.js').permissionsReducer;
var sessionReducer = require('./session.js').sessionReducer;
var navigationReducer = require('./navigation.js').navigationReducer;

var appReducer = combineReducers({
    session: sessionReducer,
    permissions: permissionsReducer,
    conferenceSchedule: scheduleReducer,
    conferenceDetails: detailsReducer,
    navigation: navigationReducer
});

module.exports = appReducer;
