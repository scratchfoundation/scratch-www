var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;

var customLanguages = require('./custom-locales.json');

var render = function (jsx, element) {
    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale;
    var messages = window._translations[locale];

    if (customLanguages[locale] !== undefined) {
        ReactIntl.addLocaleData(customLanguages[locale]);
    }

    // Render component
    var component = ReactDOM.render(
        <IntlProvider locale={locale} messages={messages}>
            {jsx}
        </IntlProvider>,
        element
    );

    // Provide list of rendered components
    window._renderedComponents = window._renderedComponents || [];
    window._renderedComponents.push(component);
};

module.exports = render;
