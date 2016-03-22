/*
 * spot checks the translation of the nav bar for a select set
 * of languages that cover a number of types of translations.
 *
 * Languages checked:
 *     - Hebrew
 *     - Edible Scratch (fake language)
 *     - Mandarin
 *     - Japanese
 *     - Brasilian Portuguese
 *     - Polish
 *     - Norwegian
 *     - German
 */
var tap = require('tap');
window = {};
require('../../intl/splash.intl.js');

var languagesToCheck = [
    'he', 'zh-cn', 'ja', 'pt-br', 'pl', 'nb'
];
var idsToCheck = [
    'general.about', 'general.create', 'general.help', 'general.joinScratch',
    'general.signIn', 'general.discuss'
];

tap.test('spotCheckNavBar', function (t) {
    for (var i in languagesToCheck) {
        for (var j in idsToCheck) {
            t.notEqual(
                window._messages[languagesToCheck[i]][idsToCheck[j]],
                window._messages['en'][idsToCheck[j]],
                'check localization of ' + idsToCheck[j] + ' for ' + languagesToCheck[i]
            );
        }
    }
    t.end();
});

var fakeLanguageIdsToCheck = ['news.scratchNews', 'splash.featuredProjects', 'splash.featuredStudios'];
tap.test('spotCheckNavBarFakeLanguage', function (t) {
    for (var i in fakeLanguageIdsToCheck) {
        t.notEqual(
            window._messages['yum'][fakeLanguageIdsToCheck[i]],
            window._messages['en'][fakeLanguageIdsToCheck[i]],
            'check localization of ' + fakeLanguageIdsToCheck[i] + ' for yum'
        );
    }
    t.end();
});
