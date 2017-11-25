import {combineReducers} from 'redux';
import defaults from 'lodash.defaults';

import {messageCountReducer} from './message-count.js';
import {permissionsReducer} from './permissions.js';
import {sessionReducer} from './session.js';

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
export default function (opts) {
    opts = opts || {};
    return combineReducers(defaults(opts, {
        session: sessionReducer,
        permissions: permissionsReducer,
        messageCount: messageCountReducer
    }));
};
