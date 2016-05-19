/*
 * spot check that each language has values for the string id keys on Splash page
 * that are contained in English (i.e. make sure strings will show up, not ids")
 */
var merge = require('lodash.merge');
var path = require('path');
var tap = require('tap');

var languages = require('../../languages.json');
var localeCompare = require('../../bin/lib/locale-compare');

tap.test('spotCheckSplashStrings', function (t) {
    var isoCodes = Object.keys(languages);
    isoCodes.splice(isoCodes.indexOf('en'), 1);
    
    var ids = require(path.resolve(__dirname, '../../src/views/splash/l10n.json'));
    var viewLocales = {
        splash: {en: ids}
    };
    var idsWithICU = localeCompare.idToICUMap('splash', ids);
    var icuWithIds = localeCompare.icuToIdMap('splash', ids);
    var md5WithIds = localeCompare.getMD5Map(icuWithIds);
    var keysToCheck = Object.keys(merge(viewLocales['splash']['en'])).sort();
    for (var i in isoCodes) {
        var translations = localeCompare.getTranslationsForLanguage(isoCodes[i], idsWithICU, md5WithIds);
        t.same(
            Object.keys(translations['splash'][isoCodes[i]]).sort(),
            keysToCheck,
            'check Splash keys for language ' + isoCodes[i]
        );
    }
    t.end();
});
