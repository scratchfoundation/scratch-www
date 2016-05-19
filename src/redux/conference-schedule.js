var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;

var Types = keyMirror({
    SET_SCHEDULE: null,
    SET_SCHEDULE_FETCHING: null,
    SET_SCHEDULE_ERROR: null
});

module.exports.scheduleReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = {
            timeSlots: [],
            day: ''
        };
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

// group periods of time by start time
module.exports.sortTimeSlots = function (timeSlot1, timeSlot2) {
    var timeSlot1Am = (timeSlot1.time.substr(timeSlot1.time.length - 1, timeSlot1.time.length) === 'a') ? true : false;
    var timeSlot2Am = (timeSlot2.time.substr(timeSlot2.time.length - 1, timeSlot2.time.length) === 'a') ? true : false;
    var timeSlot1Time = parseInt(timeSlot1.time.substr(0, timeSlot1.time.length - 1));
    var timeSlot2Time = parseInt(timeSlot2.time.substr(0, timeSlot2.time.length - 1));

    if (timeSlot1Time < timeSlot2Time) {
        if (timeSlot2Am && !timeSlot1Am) {
            return 1;
        } else {
            return -1;
        }
    } else {
        if (timeSlot1Am && !timeSlot2Am) {
            return -1;
        } else {
            return 1;
        }
    }
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
                dispatch(module.exports.setScheduleError(err));
                return;
            }

            if (typeof body !== 'undefined') {
                var columns = body.columns;
                var rows = body.rows || [];
                // Group events by the time period in which they occur (for presentation)
                var scheduleByTimeSlot = rows.reduce(function (prev, cur) {
                    var cleanedRow = {};
                    for (var i = 0; i < columns.length; i++) {
                        if (cur[i].length > 0) {
                            cleanedRow[columns[i]] = cur[i];
                        }
                    }
                    cleanedRow['uri'] = '/conference/' + cleanedRow.rowid + '/details';
                    var timeSlot = cleanedRow.Chunk;
                    if (typeof prev.timeSlots[timeSlot] === 'undefined') {
                        prev.timeSlots[timeSlot] = [cleanedRow];
                        prev.info.push({
                            name: timeSlot,
                            time: cleanedRow.Start
                        });
                    } else {
                        prev.timeSlots[timeSlot].push(cleanedRow);
                    }
                    return prev;
                }, {timeSlots: [], info: []});

                scheduleByTimeSlot.info.sort(module.exports.sortTimeSlots);
                var schedule = scheduleByTimeSlot.info.map(function (timeSlot) {
                    return {
                        info: timeSlot,
                        items: scheduleByTimeSlot.timeSlots[timeSlot.name]
                    };
                });
                dispatch(module.exports.setSchedule({
                    timeSlots: schedule,
                    day: day
                }));
                return;
            } else {
                dispatch(module.exports.setScheduleError('An unexpected error occurred'));
                return;
            }
        });
    };
};
