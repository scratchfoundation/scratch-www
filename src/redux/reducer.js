const combineReducers = require('redux').combineReducers;
const defaults = require('lodash.defaults');

const messageCountReducer = require('./message-count.js').messageCountReducer;
const permissionsReducer = require('./permissions.js').permissionsReducer;
const sessionReducer = require('./session.js').sessionReducer;
const navigationReducer = require('./navigation.js').navigationReducer;

/**
 * Returns a combined reducer to be used for a page in `render.jsx`.
 * The reducers used globally are applied here - session and permissions
 * - and any reducers specific to the page should be passed into
 * `render()` as an object (which will then be passed to the function
 * below).
 * @param  {object} opts key/value where the key is the name of the
 *                       redux state, value is the reducer function.
 * @return {object}      combined reducer to be used in the redux store
 */
module.exports = opts => {
    opts = opts || {};
    return combineReducers(defaults(opts, {
        messageCount: messageCountReducer,
        navigation: navigationReducer,
        permissions: permissionsReducer,
        session: sessionReducer
    }));
};
