var ReactDOM = require('react-dom');

var IntlProvider = require('./intl.jsx').IntlProvider;

require('../main.scss');


var render = function (jsx, element) {
    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale || 'en';
    if (typeof window._messages[locale] === 'undefined') {
        // Fall back on the split
        locale = locale.split('-')[0];
    }
    if (typeof window._messages[locale] === 'undefined') {
        // Language appears to not be supported – fall back to 'en'
        locale = 'en';
    }
    var messages = window._messages[locale];

    // Render view component
    ReactDOM.render(
        <IntlProvider locale={locale} messages={messages}>
            {jsx}
        </IntlProvider>,
        element
    );

};

module.exports = render;
