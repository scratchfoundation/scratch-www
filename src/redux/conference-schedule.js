var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;

var Types = keyMirror({
    SET_DAY: null,
    SET_SCHEDULE: null,
    SET_SCHEDULE_FETCHING: null,
    SET_DAY_ERROR: null,
    SET_SCHEDULE_ERROR: null
});

module.exports.dayReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_DAY:
        return action.day;
    case Types.SET_DAY_ERROR:
        return state;
    default:
        return state;
    }
};

module.exports.scheduleReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = [];
    }
    switch (action.type) {
    case Types.SET_SCHEDULE:
        return action.schedule;
    case Types.SET_SCHEDULE_FETCHING:
        return state;
    case Types.SET_SCHEDULE_ERROR:
        return state;
    default:
        return state;
    }
};

module.exports.setDayError = function (error) {
    return {
        type: Types.SET_DAY_ERROR,
        error: error
    };
};

module.exports.setDay = function (day) {
    return {
        type: Types.SET_DAY,
        day: day
    };
};

module.exports.setSchedule = function (schedule) {
    return {
        type: Types.SET_SCHEDULE,
        schedule: schedule
    };
};

module.exports.setScheduleFetching = function () {
    return {
        type: Types.SET_SCHEDULE_FETCHING,
        fetching: true
    };
};

module.exports.setScheduleError = function (error) {
    return {
        type: Types.SET_SCHEDULE_ERROR,
        error: error
    };
};

module.exports.startGetSchedule = function (day) {
    return function (dispatch) {
        dispatch(module.exports.setScheduleFetching());
        dispatch(module.exports.getDaySchedule(day));
    };
};

/**
 * Gets the schedule for the given day from the api
 * @param  {String} day  Day of the conference (Thursday, Friday or Satrurday)
 *
 *  @return {Object}     Schedule for the day, broken into chunks
 */
module.exports.getDaySchedule = function (day) {
    return function (dispatch) {
        api({
            uri: '/conference/schedule/' + day
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setDayError(err));
                dispatch(module.exports.setScheduleError(err));
                return;
            }

            if (typeof body !== 'undefined') {
                var columns = body.columns;
                var rows = body.rows || [];
                // Group events by the time period in which they occur (for presentation)
                var scheduleByChunk = rows.reduce(function (prev, cur) {
                    var cleanedRow = {};
                    for (var i = 0; i < columns.length; i++) {
                        if (cur[i].length > 0) {
                            cleanedRow[columns[i]] = cur[i];
                        }
                    }
                    cleanedRow['uri'] = '/conference/' + cleanedRow.rowid + '/details';
                    var chunk = cleanedRow.Chunk;
                    if (typeof prev.chunks[chunk] === 'undefined') {
                        prev.chunks[chunk] = [cleanedRow];
                        prev.info.push({
                            name: chunk,
                            time: cleanedRow.Start
                        });
                    } else {
                        prev.chunks[chunk].push(cleanedRow);
                    }
                    return prev;
                }, {chunks: [], info: []});
                // group periods of time by start time
                scheduleByChunk.info.sort(function compare (a, b) {
                    var aAm = (a.time.substr(a.time.length - 1, a.time.length) === 'a') ? true : false;
                    var bAm = (b.time.substr(b.time.length - 1, b.time.length) === 'a') ? true : false;
                    var aTime = parseInt(a.time.substr(0, a.time.length - 1));
                    var bTime = parseInt(b.time.substr(0, b.time.length - 1));

                    if (aTime < bTime) {
                        if (bAm && !aAm) {
                            return 1;
                        } else {
                            return -1;
                        }
                    } else {
                        if (aAm && !bAm) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
                var schedule = [];
                for (var i = 0; i < scheduleByChunk.info.length; i++) {
                    schedule.push({
                        info: scheduleByChunk.info[i],
                        items: scheduleByChunk.chunks[scheduleByChunk.info[i].name]
                    });
                }
                dispatch(module.exports.setDay(day));
                dispatch(module.exports.setSchedule(schedule));
                return;
            }
        });
    };
};
