var glob = require('glob');
var path = require('path');
var po2icu = require('po2icu');

var localeCompare = require('./bin/lib/locale-compare');

module.exports = function (source) {
    this.cacheable();

    var poUiDir = path.resolve(__dirname, './node_modules/scratchr2_translations/ui');
    var viewIds = JSON.parse(source);
    var viewLocales = {
        en: viewIds
    };
    var icuWithIds = {};
    for (var id in viewIds) {
        icuWithIds[viewIds[id]] = id;
    }
    var md5WithIds = localeCompare.getMD5Map(icuWithIds);
    
    var files = glob.sync(poUiDir + '/*');
    files.forEach(function (file) {
        var lang = file.split('/').pop();
        var jsFile = path.resolve(file, 'LC_MESSAGES/djangojs.po');
        var pyFile = path.resolve(file, 'LC_MESSAGES/django.po');

        var translations = {};
        try {
            var jsTranslations = po2icu.poFileToICUSync(lang, jsFile);
            translations = localeCompare.mergeNewTranslations(translations, jsTranslations, viewIds, md5WithIds);
        } catch (err) {
            process.stdout.write(lang + ': ' + err + '\n');
        }
        try {
            var pyTranslations = po2icu.poFileToICUSync(lang, pyFile);
            translations = localeCompare.mergeNewTranslations(translations, pyTranslations, viewIds, md5WithIds);
        } catch (err) {
            process.stdout.write(lang + ': ' + err + '\n');
        }

        viewLocales[lang] = translations;
    });

    return 'module.exports = ' + JSON.stringify(viewLocales, undefined, '\t') + ';';
};
