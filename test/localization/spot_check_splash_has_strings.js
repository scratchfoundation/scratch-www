/*
 * spot check that each language has values for the string id keys on Splash page
 * that are contained in English (i.e. make sure strings will show up, not ids")
 */
var tap = require('tap');
var languages = require('../../languages.json');
window = {};
require('../../intl/splash.intl.js');

tap.test('spotCheckSplashStrings', function (t) {
    var isoCodes = Object.keys(languages);
    var keysToCheck = Object.keys(window._messages['en']).sort();
    for (var i in isoCodes) {
        t.same(
            Object.keys(window._messages[isoCodes[i]]).sort(),
            keysToCheck,
            'check Splash keys for language ' + isoCodes[i]
        );
    }
    t.end();
});
