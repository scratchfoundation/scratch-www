const requireAll = require('./require-all');
const ReactIntl = require('react-intl');

const allLocaleData = requireAll(require.context('react-intl/locale-data', true, /^\.\/.*\.js$/));
const customLocaleData = require('../../custom-locales.json');

/**
  * Add all locales
  */
for (const locale in allLocaleData) {
    ReactIntl.addLocaleData(allLocaleData[locale]);
}

/**
 * Add custom locales to react-intl if it doesn't have them.
 */
for (const customLocale in customLocaleData) {
    ReactIntl.addLocaleData(customLocaleData[customLocale]);
}

module.exports = ReactIntl;
