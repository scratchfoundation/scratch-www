var buildLocales = require('./build-locales');

function BuildLocalePlugin (options) {
    this.options = options;
    return this;
}

BuildLocalePlugin.prototype.apply = function (compiler) {
    var languages = this.options.languages;
    var localizedUrls = this.options.localizedUrls;
    compiler.plugin('emit', function (compilation, callback) {
        var translations = buildLocales(languages, localizedUrls);
        Object.keys(translations).forEach(function (viewName) {
            var fileContents = 'window._messages=';
            fileContents += JSON.stringify(translations[viewName]);
            var fileName = 'js/' + viewName + '.intl.js';
            compilation.assets[fileName] = {
                source: function () {return fileContents},
                size: function () {return fileContents.length}
            };
        });
        callback();
    });
}

module.exports = BuildLocalePlugin;
