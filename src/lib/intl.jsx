var ReactIntl = require('react-intl');

var customLanguages = require('../../custom-locales.json');

for (var locale in customLanguages) {
    ReactIntl.addLocaleData(customLanguages[locale]);
}

module.exports = ReactIntl;
