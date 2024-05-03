const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

/**
 * Determines the best unit (seconds, minutes, hours, days, months, or years)
 * and value to represent the time difference between two dates.
 * @param {Date} time - date to calculate relative units
 * @param {Date} [relativeTo] - optional relative date, defaults to now
 * @returns {object} calculated best unit and value
 */
const selectUnit = (time, relativeTo) => {
    // Default to now
    if (!relativeTo) relativeTo = new Date();

    const seconds = (time - relativeTo) / MILLISECONDS_PER_SECOND;
    if (Math.abs(seconds) < SECONDS_PER_MINUTE) {
        return {
            value: Math.trunc(seconds),
            unit: 'second'
        };
    }

    const minutes = seconds / SECONDS_PER_MINUTE;
    if (Math.abs(minutes) < MINUTES_PER_HOUR) {
        return {
            value: Math.trunc(minutes),
            unit: 'minute'
        };
    }

    const hours = minutes / MINUTES_PER_HOUR;
    if (Math.abs(hours) < HOURS_PER_DAY) {
        return {
            value: Math.trunc(hours),
            unit: 'hour'
        };
    }

    const days = hours / HOURS_PER_DAY;

    let years = time.getFullYear() - relativeTo.getFullYear();
    let months = time.getMonth() - relativeTo.getMonth() + (12 * years);

    // Handle calendar months different but less than a complete month elapsed
    if (months > 0 && time.getDate() < relativeTo.getDate()) months--;
    if (months < 0 && time.getDate() > relativeTo.getDate()) months++;

    if (Math.abs(months) < 1) {
        return {
            value: Math.trunc(days),
            unit: 'day'
        };
    }

    // Handle calendar years different but less than a complete year elapsed
    if (years > 0 && (time.getMonth() < relativeTo.getMonth() ||
        (time.getMonth() === relativeTo.getMonth() && time.getDate() < relativeTo.getDate()))) {
        years--;
    }
    if (years < 0 && (time.getMonth() > relativeTo.getMonth() ||
        (time.getMonth() === relativeTo.getMonth() && time.getDate() > relativeTo.getDate()))) {
        years++;
    }

    if (Math.abs(years) < 1) {
        return {
            value: months,
            unit: 'month'
        };
    }

    return {
        value: years,
        unit: 'year'
    };
};

module.exports = {
    selectUnit
};
