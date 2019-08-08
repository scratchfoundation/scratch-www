const ReactIntl = require('react-intl');

// Add locale data to react intl for all supported languages
const localeData = require('scratch-l10n').localeData;
ReactIntl.addLocaleData(localeData);

module.exports = ReactIntl;
