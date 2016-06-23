var combineReducers = require('redux').combineReducers;

var scheduleReducer = require('./conference-schedule.js').scheduleReducer;
var detailsReducer = require('./conference-details.js').detailsReducer;
var permissionsReducer = require('./permissions.js').permissionsReducer;
var sessionReducer = require('./session.js').sessionReducer;
var tokenReducer = require('./token.js').tokenReducer;
var rowReducer = require('./splash-rows.js').rowReducer;
var activityReducer = require('./activity.js').activityReducer;
var newsReducer = require('./news.js').newsReducer;
var dismissReducer = require('./handle-dismiss.js').dismissReducer;
var countReducer = require('./project-count.js').countReducer;
var cacheReducer = require('./homepage-cache.js').cacheReducer;

var appReducer = combineReducers({
    session: sessionReducer,
    token: tokenReducer,
    rows: rowReducer,
    activity: activityReducer,
    news: newsReducer,
    projectCount: countReducer,
    handleDismiss: dismissReducer,
    homepageCache: cacheReducer,
    permissions: permissionsReducer,
    conferenceSchedule: scheduleReducer,
    conferenceDetails: detailsReducer
});

module.exports = appReducer;
