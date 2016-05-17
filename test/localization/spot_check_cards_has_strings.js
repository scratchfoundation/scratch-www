/*
 * spot check that each language has values for the string id keys on Cards page
 * that are contained in English (i.e. make sure strings will show up, not ids")
 */
var merge = require('lodash.merge');
var path = require('path');
var tap = require('tap');

var languages = require('../../languages.json');
var localeCompare = require('../../bin/lib/locale-compare');

tap.test('spotCheckCardStrings', function (t) {
    var isoCodes = Object.keys(languages);
    isoCodes.splice(isoCodes.indexOf('en'), 1);
    
    var ids = path.resolve(__dirname, '../../views/cards/l10n.json');
    var viewLocales = {
        cards: {en: ids}
    };
    var idsWithICU = localeCompare.idToICUMap('cards', ids);
    var icuWithIds = localeCompare.icuToIdMap('cards', ids);
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
