var combineReducers = require('redux').combineReducers;
var defaultsDeep = require('lodash.defaultsdeep');

var messageCountReducer = require('./message-count.js').messageCountReducer;
var permissionsReducer = require('./permissions.js').permissionsReducer;
var sessionReducer = require('./session.js').sessionReducer;

/**
 * Returns a combined reducer to be used for a page in `render.jsx`.
 * The reducers used globally are applied here - session and permissions
 * - and any reducers specific to the page should be passed into
 * `render()` as an object (which will then be passed to the function
 * below).
 * @param  {Object} opts key/value where the key is the name of the
 *                       redux state, value is the reducer function.
 * @return {Object}      combined reducer to be used in the redux store
 */
module.exports = function (opts) {
    opts = opts || {};
    return combineReducers(defaultsDeep({
        session: sessionReducer,
        permissions: permissionsReducer,
        messageCount: messageCountReducer
    }, opts));
};
