import bowser from 'bowser';
import OS_ENUM from './os-enum.js';
import {CHROME_APP_RELEASED} from './feature-flags.js';

/**
 * Helper function to the current Operating System.
 * @returns {OS_ENUM} Returns the OS value, defaults to WINDOWS
 */
export default function () {
    // matching OS strings from https://github.com/lancedikson/bowser/blob/master/src/constants.js
    if (bowser.osname === 'macOS') return OS_ENUM.MACOS;
    if (CHROME_APP_RELEASED) {
        if (bowser.osname === 'Chrome OS') return OS_ENUM.CHROMEOS;
        if (bowser.osname === 'Android') return OS_ENUM.ANDROID;
    }
    // if (bowser.osname === 'iOS') return OS_ENUM.IOS; // @todo
    return OS_ENUM.WINDOWS;
}
