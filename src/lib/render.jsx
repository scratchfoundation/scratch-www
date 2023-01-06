// JSX syntax transforms to React.createElement
const React = require('react'); // eslint-disable-line
const ReactDOM = require('react-dom');
const StoreProvider = require('react-redux').Provider;
const IntlProvider = require('react-intl').IntlProvider;

const {getLocale, scratchLocaleToIntlLocale} = require('./locales.js');
const permissionsActions = require('../redux/permissions.js');
const sessionActions = require('../redux/session.js');
const configureStore = require('./configure-store.js');
import intlPolyfill from '../lib/intl-polyfill';

require('../main.scss');

/**
 * Function to render views into a full page
 * @param  {object} jsx       jsx component of the view
 * @param  {object} element   html element to render to on the template
 * @param  {array}  reducers  list of view-specific reducers
 * @param  {object} initialState   optional initialState for store
 * @param  {bool}   enhancer  whether or not to apply redux-throttle middleware
 */
const render = (jsx, element, reducers, initialState, enhancer) => {
    // Get locale and messages from global namespace (see "init.js")
    const locale = getLocale();
    let messages = {};
    if (typeof window._messages !== 'undefined') {
        messages = window._messages[locale];
    }
    
    const intlLocale = scratchLocaleToIntlLocale(locale);
    // react-intl needs Intl before rendering
    intlPolyfill(intlLocale).then(() => {
        const store = configureStore(reducers, initialState, enhancer);

        // Render view component
        ReactDOM.render(
            <StoreProvider store={store}>
                <IntlProvider
                    locale={intlLocale}
                    messages={messages}
                >
                    {jsx}
                </IntlProvider>
            </StoreProvider>,
            element
        );
    
        // Get initial session & permissions
        store.dispatch(permissionsActions.getPermissions());
        store.dispatch(sessionActions.refreshSession());
    });
};

module.exports = render;
