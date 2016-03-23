// -----------------------------------------------------------------------------
// Helper Methods for build-locales node script.
// -----------------------------------------------------------------------------

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var po2icu = require('po2icu');

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
Helpers.mergeNewTranslations = function (existingTranslations, newTranslations, icuTemplate, md5Map) {
    for (var id in newTranslations) {
        var md5 = Helpers.getMD5(id);
        if (md5Map.hasOwnProperty(md5) && newTranslations[id].length > 0) {
            existingTranslations[md5Map[md5]] = newTranslations[id];
        }
    }

    //Fill in defaults
    for (var id in icuTemplate) {
        if (!existingTranslations.hasOwnProperty(id)) existingTranslations[id] = icuTemplate[id];
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
Helpers.getTranslationsForLanguage = function (lang, idsWithICU, md5WithIds) {
    var poUiDir = path.resolve(__dirname, '../../node_modules/scratchr2_translations/ui');
    var jsFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/djangojs.po');
    var pyFile = path.resolve(poUiDir, lang + '/LC_MESSAGES/django.po');

    var translations = {};
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
        var ids = id.split('-'); // [viewName, stringId]
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

Helpers.getIdsForView = function (viewName, viewFile, localeObject, idsWithICU, icuWithIds) {
    var ids = JSON.parse(fs.readFileSync(viewFile, 'utf8'));
    localeObject[viewName] = {
        en: ids
    };
    for (var id in ids) {
        idsWithICU[viewName + '-' + id] = ids[id];
        icuWithIds[ids[id]] = viewName + '-' + id; // add viewName to identifier for later
    }
};

module.exports = Helpers;
