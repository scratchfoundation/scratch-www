/*
    Converts the existing .po translation files in the module to JSON files.
    Requires po2json in order to work. Takes as input a directory
    in which to store the resulting json translation files.

    Takes in as an argument an output directory to put translation files.
    Searches for files named `l10n.json` in the `src/views/` directory to get
    template english strings (as well as the general template at `src/l10n.json`).

    It compiles the template strings into a flat object that is compared against the
    translations in the .po files from the `scratchr2_translations` dependency, using
    an md5 of the template string without whitespace, and an md5 of the .po msgid string
    without whitespace.

    The output files are javascript files that declare objects by locale. Each locale
    has a sub-object with FormattedMessage ids as keys, and translated strings as
    values. If no translation was found for a string, the default english will be the
    value.

    Output Example:
    '''
    var message = {
        en: {
            'general.inAWorld': 'In a world, where bears are invisible...',
            'general.question': 'Are there bears here?',
            'general.answer': 'I dunno, but there could be...'
        },
        es: {
            'general.inAWorld': 'En un mundo, donde hay osos invisibles',
            'general.question': 'Are there bears here?',
            'general.answer': 'No sé, pero es posible...'
        }
    }
    '''
*/
var fs = require('fs');
var glob = require('glob');
var merge = require('lodash.merge');
var path = require('path');

var localeCompare = require('./locale-compare');


var buildLocales = function (languages, localizedUrls) {
    // message key with english string values (i.e. default values)
    var viewLocales = {};
    // FormattedMessage id with english string as value. Use for default values in translations
    // Sample structure: { 'general-general.blah': 'blah', 'about-about.blah': 'blahblah' }
    var idsWithICU = {};
    // reverse (i.e. english string with message key as the value) object for searching po files.
    // Sample structure: { 'blah': 'general-general.blah', 'blahblah': 'about-about.blah' }
    var icuWithIds = {};

    // get global locale strings first.
    var globalTemplateFile = path.resolve(__dirname, '../src/l10n.json');
    localeCompare.getIdsForView('general', globalTemplateFile, viewLocales, idsWithICU, icuWithIds);


    // start with all views, and remove localized ones as they are iterated over
    var views = glob.sync(path.resolve(__dirname, '../src/views/*'));
    for (var i = 0; i < views.length; i++) {
        views[i] = views[i].split('/').pop();
    }

    // get view-specific locale strings.
    var files = glob.sync(path.resolve(__dirname, '../src/views/**/l10n.json'));
    files.forEach(function (file) {
        var dirPath = file.split('/');
        dirPath.pop();
        var view = dirPath.pop();
        localeCompare.getIdsForView(view, file, viewLocales, idsWithICU, icuWithIds);
    });

    // get asset url translations
    var localizedAssetUrls = {};
    files = glob.sync(path.resolve(__dirname, '../src/views/**/l10n-static.json'));
    files.forEach(function (file) {
        var dirPath = file.split('/');
        dirPath.pop();
        var view = dirPath.pop();
        localizedAssetUrls[view] = {};

        var assetUrls = JSON.parse(fs.readFileSync(file, 'utf8'));
        for (var lang in localizedUrls) {
            localizedAssetUrls[view][lang] = {};
            for (var key in assetUrls) {
                if (localizedUrls[lang].hasOwnProperty(key)) {
                    localizedAssetUrls[view][lang][key] = localizedUrls[lang][key];
                } else {
                    localizedAssetUrls[view][lang][key] = assetUrls[key];
                }
            }
        }
    });

    // md5 of english strings with message key as the value for searching po files.
    // Sample structure: { 'sdfas43534sdfasdf': 'general-general.blah', 'lkjfasdf4t342asdfa': 'about-about.blah' }
    var md5WithIds = localeCompare.getMD5Map(icuWithIds);

    // Get ui localization strings first
    var isoCodes = Object.keys(languages);
    for (i in isoCodes) {
        var translations = localeCompare.getTranslationsForLanguage(isoCodes[i], idsWithICU, md5WithIds);
        for (var key in translations) {
            viewLocales[key] = merge(viewLocales[key], translations[key]);
        }
    }

    var allTranslations = {};
    for (i in views) {
        var viewTranslations = viewLocales['general'];
        if (views[i] in viewLocales) {
            viewTranslations = merge(viewLocales[views[i]], viewTranslations);
        }
        if (views[i] in localizedAssetUrls) {
            viewTranslations = merge(viewTranslations, localizedAssetUrls[[views[i]]]);
        }
        allTranslations[views[i]] = viewTranslations;
    }
    return allTranslations;
}

module.exports = buildLocales;
