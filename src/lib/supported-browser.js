import bowser from 'bowser';

/**
 * Helper function to determine if the browser is supported.
 * @returns {boolean} False if the platform is definitely not supported.
 */
export default function () {
    return !bowser.msie;
}
