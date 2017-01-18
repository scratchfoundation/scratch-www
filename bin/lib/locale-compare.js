// -----------------------------------------------------------------------------
// Helper Methods for build-locales node script.
// -----------------------------------------------------------------------------

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var po2icu = require('po2icu');
var isArray = require('lodash.isarray');

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

/**
 * Customizer for icuWithIds merge.
 * If icu key already has an id value, concatenate additional ids instead
 * of replacing.
 *
 * @param {array} objVal current value
 * @param {string} srcVal new value
 * @return {array} objVal with srcVal concatenated
 */
Helpers.customMerge = function (objVal, srcVal) {
    if (isArray(objVal)) {
        return objVal.concat(srcVal);
    }
};

/*
    Existing translations should be in the key value format specified by react-intl (i.e.
    formatted message id, with icu string as the value). New Translations should be in the
    format returned by po2icu (i.e. a source language icu string for key, and a localized
    language icu string for value).

    ICU Map is an object in the reverse react-intl formatting (icu string as key), which will
    help determine if the translation belongs in www currently.
*/
Helpers.mergeNewTranslations = function (existingTranslations, newTranslations, icuTemplate, md5Map) {
    for (var id in newTranslations) {
        var md5 = Helpers.getMD5(id);
        if (md5Map.hasOwnProperty(md5) && newTranslations[id].length > 0) {
            md5Map[md5].forEach(function (msgId) {
                existingTranslations[msgId] = newTranslations[id];
            });
        }
    }

    //Fill in defaults
    for (var icuId in icuTemplate) {
        if (!existingTranslations.hasOwnProperty(icuId)) existingTranslations[icuId] = icuTemplate[icuId];
    }
    return existingTranslations;
};

Helpers.mergeNewTranslationsWithoutDefaults = function (existingTranslations, newTranslations, icuTemplate, md5Map) {
    for (var id in newTranslations) {
        var md5 = Helpers.getMD5(id);
        if (md5Map.hasOwnProperty(md5) && newTranslations[id].length > 0) {
            md5Map[md5].forEach(function (msgId) {
                existingTranslations[msgId] = newTranslations[id];
            });
        }
    }

    //Fill in empty string for any missing translations
    for (var icuId in icuTemplate) {
        if (!existingTranslations.hasOwnProperty(icuId)) existingTranslations[icuId] = '';
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
 * @return  {object}
 */
Helpers.getMD5Map = function (ICUIdMap) {
    var md5Map = {};
    for (var icu in ICUIdMap) {
        var md5 = Helpers.getMD5(icu);
        md5Map[md5] = ICUIdMap[icu];
    }
    return md5Map;
};

/**
 * Grabs the translated strings from the po files for the given language and strings
 * @param  {str}    lang       iso code of the language to use
 * @param  {object} idsWithICU key: '<viewName>-<react-intl string id>'.
 *                             value: english strings for translation
 * @param  {object} md5WithIds key: md5 hash of the english strings for translation.
 *                             value: '<viewName>-<react-intl string id>'
 * @return {object}            translations – sub-objects by view containing:
 *                                          key: '<react-intl string id>'
 *                                          value: translated version of string
 */
Helpers.getTranslationsForLanguage = function (lang, idsWithICU, md5WithIds, separator) {
    var poUiDir = path.resolve(__dirname, '../../node_modules/scratchr2_translations/ui');
    var jsFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/djangojs.po');
    var pyFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/django.po');

    var translations = {};
    separator = separator || ':';

    try {
        fs.accessSync(jsFile, fs.R_OK);
        var jsTranslations = po2icu.poFileToICUSync(lang, jsFile);
        translations = Helpers.mergeNewTranslations(translations, jsTranslations, idsWithICU, md5WithIds);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    try {
        fs.accessSync(pyFile, fs.R_OK);
        var pyTranslations = po2icu.poFileToICUSync(lang, pyFile);
        translations = Helpers.mergeNewTranslations(translations, pyTranslations, idsWithICU, md5WithIds);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    var translationsByView = {};
    for (var id in translations) {
        var ids = id.split(separator); // [viewName, stringId]
        var viewName = ids[0];
        var stringId = ids[1];

        if (!translationsByView.hasOwnProperty(viewName)) {
            translationsByView[viewName] = {};
        }
        if (!translationsByView[viewName].hasOwnProperty(lang)) {
            translationsByView[viewName][lang] = {};
        }
        translationsByView[viewName][lang][stringId] = translations[id];
    }
    return translationsByView;
};

/**
 * Grabs the translated strings from the po files for the given language and strings
 * @param  {str}    lang       iso code of the language to use
 * @param  {object} idsWithICU key: '<viewName>-<react-intl string id>'.
 *                             value: english strings for translation
 * @param  {object} md5WithIds key: md5 hash of the english strings for translation.
 *                             value: '<viewName>-<react-intl string id>'
 * @return {object}            translations – sub-objects by view containing:
 *                                          key: '<react-intl string id>'
 *                                          value: translated version of string
 *                                                  empty if no translation present
 */
Helpers.getTranslationsForLanguageWithoutDefaults = function (lang, idsWithICU, md5WithIds, separator) {
    var poUiDir = path.resolve(__dirname, '../../node_modules/scratchr2_translations/ui');
    var jsFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/djangojs.po');
    var pyFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/django.po');

    var translations = {};
    separator = separator || ':';

    try {
        fs.accessSync(jsFile, fs.R_OK);
        var jsTranslations = po2icu.poFileToICUSync(lang, jsFile);
        translations = Helpers.mergeNewTranslationsWithoutDefaults(translations,
            jsTranslations, idsWithICU, md5WithIds);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    try {
        fs.accessSync(pyFile, fs.R_OK);
        var pyTranslations = po2icu.poFileToICUSync(lang, pyFile);
        translations = Helpers.mergeNewTranslationsWithoutDefaults(translations,
            pyTranslations, idsWithICU, md5WithIds);
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }

    var translationsByView = {};
    for (var id in translations) {
        var ids = id.split(separator); // [viewName, stringId]
        var viewName = ids[0];
        var stringId = ids[1];

        if (!translationsByView.hasOwnProperty(viewName)) {
            translationsByView[viewName] = {};
        }
        if (!translationsByView[viewName].hasOwnProperty(lang)) {
            translationsByView[viewName][lang] = {};
        }
        translationsByView[viewName][lang][stringId] = translations[id];
    }
    return translationsByView;
};

Helpers.writeTranslationsToJS = function (outputDir, viewName, translationObject) {
    var objectString = JSON.stringify(translationObject);
    var fileString = 'window._messages = ' + objectString + ';';
    fs.writeFileSync(outputDir + '/' + viewName + '.intl.js', fileString);
};

// Returns a FormattedMessage id with english string as value. Use for default values in translations
// Sample structure: { 'general-general.blah': 'blah', 'about-about.blah': 'blahblah' }
Helpers.idToICUMap = function (viewName, ids, separator) {
    var idsToICU = {};
    separator = separator || ':';

    for (var id in ids) {
        idsToICU[viewName + separator + id] = ids[id];
    }
    return idsToICU;
};

// Reuturns reverse (i.e. english string with message key as the value) object for searching po files.
// Sample structure: { 'blah': 'general-general.blah', 'blahblah': 'about-about.blah' }
Helpers.icuToIdMap = function (viewName, ids, separator) {
    var icuToIds = {};
    separator = separator || ':';

    for (var id in ids) {
        icuToIds[ids[id]] = [viewName + separator + id];
    }
    return icuToIds;
};

Helpers.writeTranslations = function (name, l10n, languages) {
    var ids = require(l10n);
    var idsWithICU = Helpers.idToICUMap(name, ids);
    var icuWithIds = Helpers.icuToIdMap(name, ids);
    var md5WithIds = Helpers.getMD5Map(icuWithIds);
    var isoCodes = Object.keys(languages);
    var outputDir = path.resolve(__dirname, '../../localizations/', name);
    try {
        fs.accessSync(outputDir, fs.F_OK);
    } catch (err) {
        // Doesn't exist - create it.
        fs.mkdirSync(outputDir);
    }
    process.stdout.write(`Writing translations to ${outputDir}\n`);

    for (var isoCode in isoCodes) {
        if (isoCodes[isoCode] !== 'en'){
            var translations = Helpers.getTranslationsForLanguageWithoutDefaults(
                isoCodes[isoCode], idsWithICU, md5WithIds);
            var fileString = JSON.stringify(translations[name][isoCodes[isoCode]]);
            fs.writeFileSync(outputDir + '/' + isoCodes[isoCode] + '.json', fileString);
        }
    }

};

module.exports = Helpers;
