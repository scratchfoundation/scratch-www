/*
 * spot check that each language has values for the string id keys on Cards page
 * that are contained in English (i.e. make sure strings will show up, not ids")
 */
var merge = require('lodash.merge');
var path = require('path');
var tap = require('tap');

var languages = require('../../intl/languages.json');
var localeCompare = require('../../intl/locale-compare');

tap.test('spotCheckAboutStrings', function (t) {
    var isoCodes = Object.keys(languages);
    isoCodes.splice(isoCodes.indexOf('en'), 1);
    var viewLocales = {};
    var idsWithICU = {};
    var icuWithIds = {};
    localeCompare.getIdsForView(
        'cards',
        path.resolve(__dirname, '../../src/views/cards/l10n.json'),
        viewLocales,
        idsWithICU,
        icuWithIds
    );
    var md5WithIds = localeCompare.getMD5Map(icuWithIds);
    var keysToCheck = Object.keys(merge(viewLocales['cards']['en'])).sort();
    for (var i in isoCodes) {
        var translations = localeCompare.getTranslationsForLanguage(isoCodes[i], idsWithICU, md5WithIds);
        t.same(
            Object.keys(translations['cards'][isoCodes[i]]).sort(),
            keysToCheck,
            'check Cards keys for language ' + isoCodes[i]
        );
    }
    t.end();
});
