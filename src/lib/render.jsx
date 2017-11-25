import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// JSX syntax transforms to React.createElement
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import {Provider as StoreProvider} from 'react-redux';

import Intl from './intl.jsx';
import {getPermissions} from '../redux/permissions.js';
import {refreshSession} from '../redux/session.js';
import reducer from '../redux/reducer.js';

require('../main.scss');

var IntlProvider = Intl.IntlProvider;

var render = function (jsx, element, reducers) {
    // Get locale and messages from global namespace (see "init.js")
    var locale = window._locale || 'en';
    var messages = {};
    if (typeof window._messages !== 'undefined') {
        if (typeof window._messages[locale] === 'undefined') {
            // Fall back on the split
            locale = locale.split('-')[0];
        }
        if (typeof window._messages[locale] === 'undefined') {
            // Language appears to not be supported – fall back to 'en'
            locale = 'en';
        }
        messages = window._messages[locale];
    }

    var allReducers = reducer(reducers);
    var store = createStore(
        allReducers,
        applyMiddleware(thunk)
    );

    // Render view component
    ReactDOM.render(
        <StoreProvider store={store}>
            <IntlProvider locale={locale} messages={messages}>
                {jsx}
            </IntlProvider>
        </StoreProvider>,
        element
    );

    // Get initial session & permissions
    store.dispatch(getPermissions());
    store.dispatch(refreshSession());
};

export default render;
