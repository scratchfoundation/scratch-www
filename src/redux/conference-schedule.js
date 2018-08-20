const keyMirror = require('keymirror');
const api = require('../lib/api');

const Types = keyMirror({
    SET_SCHEDULE: null,
    SET_SCHEDULE_FETCHING: null,
    SET_SCHEDULE_ERROR: null
});

module.exports.scheduleReducer = (state, action) => {
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

module.exports.setSchedule = schedule => ({
    type: Types.SET_SCHEDULE,
    schedule: schedule
});

module.exports.setScheduleFetching = () => ({
    type: Types.SET_SCHEDULE_FETCHING,
    fetching: true
});

module.exports.setScheduleError = error => ({
    type: Types.SET_SCHEDULE_ERROR,
    error: error
});

// group periods of time by start time
module.exports.sortTimeSlots = (timeSlot1, timeSlot2) => {
    const timeSlot1Am = (timeSlot1.time.substr(timeSlot1.time.length - 1, timeSlot1.time.length) === 'a');
    const timeSlot2Am = (timeSlot2.time.substr(timeSlot2.time.length - 1, timeSlot2.time.length) === 'a');
    let timeSlot1Time = parseInt(timeSlot1.time.substr(0, timeSlot1.time.length - 1), 10);
    let timeSlot2Time = parseInt(timeSlot2.time.substr(0, timeSlot2.time.length - 1), 10);
    
    // convert to 24-hour for sorting
    if (timeSlot1Time !== 12 && !timeSlot1Am) {
        timeSlot1Time = timeSlot1Time + 12;
    }
    if (timeSlot2Time !== 12 && !timeSlot2Am) {
        timeSlot2Time = timeSlot2Time + 12;
    }
    
    if (timeSlot1Time < timeSlot2Time) {
        return -1;
    }
    return 1;
};

/**
 * Gets the schedule for the given day from the api
 * @param  {string} day  Day of the conference (Thursday, Friday or Satrurday)
 *
 *  @return {object}     Schedule for the day, broken into chunks
 */
module.exports.getDaySchedule = day => (dispatch => {
    api({
        uri: `/conference/schedule/${day}`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setScheduleError(err));
            return;
        }

        if (typeof body !== 'undefined') {
            const columns = body.columns;
            const rows = body.rows || [];
            // Group events by the time period in which they occur (for presentation)
            const scheduleByTimeSlot = rows.reduce((prev, cur) => {
                const cleanedRow = {};
                for (let i = 0; i < columns.length; i++) {
                    if (cur[i].length > 0) {
                        cleanedRow[columns[i]] = cur[i];
                    }
                }
                cleanedRow.uri = `/conference/2018/${cleanedRow.rowid}/details`;
                const timeSlot = cleanedRow.Chunk + cleanedRow.Start;
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

            scheduleByTimeSlot.info.sort(module.exports.sortTimeSlots);
            const schedule = scheduleByTimeSlot.info.map(timeSlot => ({
                info: timeSlot,
                items: scheduleByTimeSlot.timeSlots[timeSlot.name + timeSlot.time]
            }));
            dispatch(module.exports.setSchedule({
                timeSlots: schedule,
                day: day
            }));
            return;
        }
        dispatch(module.exports.setScheduleError('An unexpected error occurred'));
        return;
    });
});

module.exports.startGetSchedule = day => (dispatch => {
    dispatch(module.exports.setScheduleFetching());
    dispatch(module.exports.getDaySchedule(day));
});
