var ReactIntl = require('react-intl');

var customLanguages = require('../../intl/custom-locales.json');

/**
 * Add custom locales to react-intl if it doesn't have them.
 */
for (var locale in customLanguages) {
    ReactIntl.addLocaleData(customLanguages[locale]);
}

module.exports = ReactIntl;
