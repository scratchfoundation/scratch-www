var ReactDOM = require('react-dom');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;

module.exports = function (jsx, element) {
    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale;
    var messages = window._translations[locale];

    // Render component
    var component = ReactDOM.render(
        <IntlProvider locale={locale} messages={messages}>
            {jsx}
        </IntlProvider>,
        element
    );

    // If in production, provide list of rendered components
    if (process.env.NODE_ENV != 'production') {
        window._renderedComponents = window._renderedComponents || [];
        window._renderedComponents.push(component);
    }
};
