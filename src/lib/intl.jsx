var requireAll = require('./require-all');
var ReactIntl = require('react-intl');

var allLocaleData = requireAll(require.context('react-intl/locale-data', true, /^\.\/.*\.js$/));
var customLocaleData = require('../../custom-locales.json');

/**
  * Add all locales
  */
for (var locale in allLocaleData) {
    ReactIntl.addLocaleData(allLocaleData[locale]);
}

/**
 * Add custom locales to react-intl if it doesn't have them.
 */
for (var customLocale in customLocaleData) {
    ReactIntl.addLocaleData(customLocaleData[customLocale]);
}

module.exports = ReactIntl;
