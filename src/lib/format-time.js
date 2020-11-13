/**
 Given a timestamp in the future, calculate the largest, closest unit to show.
 On the high end we stop at days. e.g. 56 days is still counted in days not months or weeks.
 On the low end we stop at minutes.
 @param {number} timeStamp A future time stamp in ms.
 @returns {object} containing the unit (min, hours, days) and how many. e.g. {unit: minutes, duration: 3}
 */
const getTopLevelTimeUnit = timeStamp => {
    const diff = timeStamp - Date.now();
    const oneDayInMs = 1000 * 60 * 60 * 24;
    const oneHourInMs = 1000 * 60 * 60;
    const oneMinuteInMs = 1000 * 60;
    let unit = 'minute';
    let duration = diff / oneMinuteInMs;
    if (diff > oneDayInMs) {
        unit = 'day';
        duration = diff / oneDayInMs;
    } else if (diff > oneHourInMs) {
        unit = 'hour';
        duration = diff / oneHourInMs;
    }
    return {
        unit: unit,
        duration: duration
    };
};

/**
* This is used along with Intl.RelativeTimeFormat's formatToParts to extract
* the value from a given key.
* See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/formatToParts
* Also see examples in format-time.test.jsx.
* @param {string} key The name of the key you want to look up
* @param {Array} parts An array of parts from formatToParts.
* @returns {string} The value associated with the given key.
*/
const getValueFromKey = (key, parts) => {
    for (const item of parts) {
        if (item.type === key) {
            return item.value;
        }
    }
    // Just in case key doesn't exist.
    return '';
};

/**
* Given a future timestamp and a langauge, constructs a phrase to describe that time relative to now.
* e.g. 2 days 3 hours, 3 minutes, 7 hours 38 minutes, 2 horas 5 minutos.
* The largest time unit is days, the smallest is minutes.
* @param {number} futureTime a timestamp in ms to build a phrase for.
* @param {string} lang Langauge to build the phrase in.
* @returns {string} A phrase representing the relative time in the future. e.g. 3 days 5 hours.
*/
module.exports.formatTimeUntil = (futureTime, lang) => {
    const formatter = new Intl.RelativeTimeFormat(lang, {
        localeMatcher: 'best fit',
        numeric: 'always',
        style: 'long'
    });

    const timeInfo = getTopLevelTimeUnit(futureTime);
    let str = '';
    const parts = formatter.formatToParts(timeInfo.duration,
        timeInfo.unit);
    // This shouldn't happen, but is here for extra safety.
    if (parts.length === 0) {
        return '';
    }
    // Extract the whole number from formatToParts list.
    const topLevelValue = getValueFromKey('integer', parts);
    const units = parts[parts.length - 1].value;

    // Add value and unit to the string. e.g. 3 hours or 2 minutes
    str = `${topLevelValue} ${units}`;

    // Convert the part after the decimal to a number so we can use it to calculate the next unit
    const remainder = parseFloat(`.${getValueFromKey('fraction', parts)}`);

    // The smallest unit we show is minutes so we can stop if we're already there
    // or, our remainder is smaller than the next level down.
    // e.g. if it is 1 hour 30 sec, we just show 1 hour or
    // if it is 1 day 45 min, we only show 1 day.
    if (timeInfo.unit === 'minute' ||
       (timeInfo.unit === 'hour' && remainder < 1.0 / 60) ||
       (timeInfo.unit === 'day' && remainder < 1.0 / 24)) {
        return str;
    }

    // Now we need to go figure out what the second part of the string is
    // e.g. if we're 2 days 3 hours in the future, at this point we have "2 days"
    // and need to figure out how many hours.
    let remainingTime = 0;
    let unitsOfRemainingTime = '';

    if (timeInfo.unit === 'hour') {
        remainingTime = remainder * 60;
        unitsOfRemainingTime = 'minute';
    } else if (timeInfo.unit === 'day') {
        remainingTime = remainder * 24;
        unitsOfRemainingTime = 'hour';
    }

    const remainingParts = formatter.formatToParts(remainingTime, unitsOfRemainingTime);

    // This shouldn't happen, but is here for extra safety.
    if (remainingParts.length === 0) {
        return str;
    }
    // Concatenate 2nd level value and unit. e.g. add "3 hours" to "1 day" to get "1 day 3 hours".
    str = `${str} ${getValueFromKey('integer', remainingParts)} ${remainingParts[remainingParts.length - 1].value}`;

    return str;
};
