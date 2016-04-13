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
var path = require('path');
var tap = require('tap');

var localeCompare = require('../../intl/locale-compare');
var viewLocales = {};
var idsWithICU = {};
var icuWithIds = {};

var languagesToCheck = [
    'he', 'zh-cn', 'ja', 'pt-br', 'pl', 'nb'
];
var idsToCheck = [
    'general.about', 'general.create', 'general.help', 'general.joinScratch',
    'general.signIn', 'general.discuss'
];


// Test nav for real languages.
localeCompare.getIdsForView(
    'general',
    path.resolve(__dirname, '../../src/l10n.json'),
    viewLocales,
    idsWithICU,
    icuWithIds
);
var md5WithIds = localeCompare.getMD5Map(icuWithIds);

tap.test('spotCheckNavBar', function (t) {
    for (var i in languagesToCheck) {
        var translations = localeCompare.getTranslationsForLanguage(languagesToCheck[i], idsWithICU, md5WithIds);
        for (var j in idsToCheck) {
            t.notEqual(
                translations['general'][languagesToCheck[i]][idsToCheck[j]],
                viewLocales['general']['en'][idsToCheck[j]],
                'check localization of ' + idsToCheck[j] + ' for ' + languagesToCheck[i]
            );
        }
    }
    t.end();
});


// Test splash items for fake language.
var fakeLanguageIdsToCheck = ['news.scratchNews', 'splash.featuredProjects', 'splash.featuredStudios'];

localeCompare.getIdsForView(
    'splash',
    path.resolve(__dirname, '../../src/views/splash/l10n.json'),
    viewLocales,
    idsWithICU,
    icuWithIds
);
md5WithIds = localeCompare.getMD5Map(icuWithIds);

tap.test('spotCheckNavBarFakeLanguage', function (t) {
    var translations = localeCompare.getTranslationsForLanguage('yum', idsWithICU, md5WithIds);
    for (var i in fakeLanguageIdsToCheck) {
        t.notEqual(
            translations['general']['yum'][fakeLanguageIdsToCheck[i]],
            viewLocales['splash']['en'][fakeLanguageIdsToCheck[i]],
            'check localization of ' + fakeLanguageIdsToCheck[i] + ' for yum'
        );
    }
    t.end();
});
