// -----------------------------------------------------------------------------
// Helper Methods for build-locales node script.
// -----------------------------------------------------------------------------

var crypto = require('crypto');

var Helpers = {};

/**
 * Get the md5 has of a string with whitespace removed.
 *
 * @param {string} string a string
 * @return {string} an md5 hash of the string in hex.
 */
Helpers.getMD5 = function (string) {
    var cleanedString = string.replace(/\s+/g, '');
    return crypto.createHash('md5').update(cleanedString, 'utf8').digest('hex');
};

/*
    Existing translations should be in the key value format specified by react-intl (i.e.
    formatted message id, with icu string as the value). New Translations should be in the
    format returned by po2icu (i.e. a source language icu string for key, and a localized
    language icu string for value).

    ICU Map is an object in the reverse react-intl formatting (icu string as key), which will
    help determine if the translation belongs in www currently.
*/
Helpers.mergeNewTranslations = function (existingTranslations, newTranslations, md5Map) {
    for (var id in newTranslations) {
        var md5 = Helpers.getMD5(id);
        if (md5Map.hasOwnProperty(md5) && newTranslations[id].length > 0) {
            existingTranslations[md5Map[md5]] = newTranslations[id];
        }
    }
    return existingTranslations;
};

/**
 * Converts a map of icu strings with react-intl id values into a map
 * with md5 hashes of the icu strings as keys and react-intl id values.
 * This is done so as to eliminate potential po conversion misses that
 * could be caused by different white space formatting between po and icu.
 *
 * The md5 is generated after all white space is removed from the string.
 *
 * @param   {object}    idICUMap    map where key=icuString, value=react-intl id
 *
 * @return  {objec}
 */
Helpers.getMD5Map = function (ICUIdMap) {
    var md5Map = {};
    for (var icu in ICUIdMap) {
        var md5 = Helpers.getMD5(icu);
        md5Map[md5] = ICUIdMap[icu];
    }
    return md5Map;
};

module.exports = Helpers;
