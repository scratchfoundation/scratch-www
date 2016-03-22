/*
 * spot check that each language has values for the string id keys on About page
 * that are contained in English (i.e. make sure strings will show up, not ids")
 */
var tap = require('tap');
var languages = require('../../languages.json');
window = {};
require('../../intl/about.intl.js');

tap.test('spotCheckAboutStrings', function (t) {
    var isoCodes = Object.keys(languages);
    var keysToCheck = Object.keys(window._messages['en']).sort();
    for (var i in isoCodes) {
        t.same(
            Object.keys(window._messages[isoCodes[i]]).sort(),
            keysToCheck,
            'check About keys for language ' + isoCodes[i]
        );
    }
    t.end();
});
