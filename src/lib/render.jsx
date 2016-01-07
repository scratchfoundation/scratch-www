var ReactDOM = require('react-dom');

var ReactIntl = require('./intl.jsx');
var IntlProvider = ReactIntl.IntlProvider;

var render = function (jsx, element, messages) {
    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale || 'en';
    if (typeof messages[locale] === 'undefined') {
        // Fall back on the split
        locale = locale.split('-')[0];
    }
    if (typeof messages[locale] === 'undefined') {
        // Language appears to not be supported – fall back to 'en'
        locale = 'en';
    }

    // Render component
    var component = ReactDOM.render(
        <IntlProvider locale={locale} messages={messages[locale]}>
            {jsx}
        </IntlProvider>,
        element
    );

    // Provide list of rendered components
    window._renderedComponents = window._renderedComponents || [];
    window._renderedComponents.push(component);
};

module.exports = render;
