/**
 Given a timestamp in the future, calculate the largest, closest unit to show.
 On the high end we stop at hours. e.g. 15 days is still counted in hours not days or weeks.
 On the low end we stop at minutes.
 This rounds duration to the nearest integer. e.g. 5.7 minutes => will return 6 as duration.
 @param {number} timeStamp A future time stamp in ms.
 @returns {object} containing the unit (min, hours) and how many. e.g. {unit: minutes, duration: 3}
 */
const getTimeUnitAndDuration = timeStamp => {
    const diff = timeStamp - Date.now();
    const oneHourInMs = 1000 * 60 * 60;
    const oneMinuteInMs = 1000 * 60;

    let unit = 'minute';
    let duration = diff / oneMinuteInMs;
    // We show minutes up to 2 hours, then switch to hours.
    if (diff >= 2 * oneHourInMs) {
        unit = 'hour';
        duration = diff / oneHourInMs;
    }
    // Round to nearest hour or minute.
    duration = Math.round(duration);
    return {
        unit: unit,
        duration: duration
    };
};

/**
* Given a future timestamp and a langauge, constructs a phrase to describe that time relative to now.
* e.g. in 2 days, in 3 minutes, en 2 horas.
* The largest time unit is days, the smallest is minutes.
* @param {number} futureTime a timestamp in ms to build a phrase for.
* @param {string} lang Langauge to build the phrase in.
* @returns {string} A phrase representing the relative time in the future. e.g. 3 days 5 hours.
*/
module.exports.formatRelativeTime = (futureTime, lang) => {
    if (typeof Intl.RelativeTimeFormat === 'undefined') {
        require('./relative-time-polyfill');
    }
    const formatter = new Intl.RelativeTimeFormat([lang].concat(window.navigator.languages), {
        localeMatcher: 'best fit',
        numeric: 'always',
        style: 'long'
    });
    const timeInfo = getTimeUnitAndDuration(futureTime);
    return formatter.format(timeInfo.duration, timeInfo.unit);
};
