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

var localeCompare = require('../../bin/lib/locale-compare');
var languagesToCheck = [
    'he', 'zh-cn', 'ja', 'pt-br', 'pl', 'nb'
];
var idsToCheck = [
    'general.about', 'general.create', 'general.help', 'general.joinScratch',
    'general.signIn', 'general.discuss'
];


var ids = require(path.resolve(__dirname, '../../src/l10n.json'));
var viewLocales = {
    general: {en: ids}
};
var idsWithICU = localeCompare.idToICUMap('general', ids);
var icuWithIds = localeCompare.icuToIdMap('general', ids);
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

ids = require(path.resolve(__dirname, '../../src/views/splash/l10n.json'));
viewLocales = {
    splash: {en: ids}
};
idsWithICU = localeCompare.idToICUMap('splash', ids);
icuWithIds = localeCompare.icuToIdMap('splash', ids);
md5WithIds = localeCompare.getMD5Map(icuWithIds);

tap.test('spotCheckNavBarFakeLanguage', function (t) {
    var translations = localeCompare.getTranslationsForLanguage('yum', idsWithICU, md5WithIds);
    for (var i in fakeLanguageIdsToCheck) {
        t.notEqual(
            translations['splash']['yum'][fakeLanguageIdsToCheck[i]],
            viewLocales['splash']['en'][fakeLanguageIdsToCheck[i]],
            'check localization of ' + fakeLanguageIdsToCheck[i] + ' for yum'
        );
    }
    t.end();
});
