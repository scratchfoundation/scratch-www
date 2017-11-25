import keyMirror from 'keymirror';
import api from '../lib/api';

var Types = keyMirror({
    SET_SCHEDULE: null,
    SET_SCHEDULE_FETCHING: null,
    SET_SCHEDULE_ERROR: null
});

export function scheduleReducer (state, action) {
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
}

export function setSchedule (schedule) {
    return {
        type: Types.SET_SCHEDULE,
        schedule: schedule
    };
}

export function setScheduleFetching () {
    return {
        type: Types.SET_SCHEDULE_FETCHING,
        fetching: true
    };
}

export function setScheduleError (error) {
    return {
        type: Types.SET_SCHEDULE_ERROR,
        error: error
    };
}

export function startGetSchedule (day) {
    return function (dispatch) {
        dispatch(setScheduleFetching());
        dispatch(getDaySchedule(day));
    };
}

// group periods of time by start time
export function sortTimeSlots (timeSlot1, timeSlot2) {
    var timeSlot1Am = (timeSlot1.time.substr(timeSlot1.time.length - 1, timeSlot1.time.length) === 'a') ? true : false;
    var timeSlot2Am = (timeSlot2.time.substr(timeSlot2.time.length - 1, timeSlot2.time.length) === 'a') ? true : false;
    var timeSlot1Time = parseInt(timeSlot1.time.substr(0, timeSlot1.time.length - 1));
    var timeSlot2Time = parseInt(timeSlot2.time.substr(0, timeSlot2.time.length - 1));
    
    // convert to 24-hour for sorting
    if (timeSlot1Time !== 12 && !timeSlot1Am) {
        timeSlot1Time = timeSlot1Time + 12;
    }
    if (timeSlot2Time !== 12 && !timeSlot2Am) {
        timeSlot2Time = timeSlot2Time + 12;
    }
    
    if (timeSlot1Time < timeSlot2Time) {
        return -1;
    } else {
        return 1;
    }
}

/**
 * Gets the schedule for the given day from the api
 * @param  {String} day  Day of the conference (Thursday, Friday or Satrurday)
 *
 *  @return {Object}     Schedule for the day, broken into chunks
 */
export function getDaySchedule (day) {
    return function (dispatch) {
        api({
            uri: '/conference/schedule/' + day
        }, function (err, body) {
            if (err) {
                dispatch(setScheduleError(err));
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
                    cleanedRow['uri'] = '/conference/2016/' + cleanedRow.rowid + '/details';
                    var timeSlot = cleanedRow.Chunk + cleanedRow.Start;
                    if (typeof prev.timeSlots[timeSlot] === 'undefined') {
                        prev.timeSlots[timeSlot] = [cleanedRow];
                        prev.info.push({
                            name: cleanedRow.Chunk,
                            time: cleanedRow.Start
                        });
                    } else {
                        prev.timeSlots[timeSlot].push(cleanedRow);
                    }
                    return prev;
                }, {timeSlots: [], info: []});

                scheduleByTimeSlot.info.sort(sortTimeSlots);
                var schedule = scheduleByTimeSlot.info.map(function (timeSlot) {
                    return {
                        info: timeSlot,
                        items: scheduleByTimeSlot.timeSlots[timeSlot.name + timeSlot.time]
                    };
                });
                dispatch(setSchedule({
                    timeSlots: schedule,
                    day: day
                }));
                return;
            } else {
                dispatch(setScheduleError('An unexpected error occurred'));
                return;
            }
        });
    };
}
