import {selectIsAdmin, selectToken} from '../redux/session';

/**
 * Augment an `options` object that will be used by api.js
 * to automatically include admin authentication token and
 * /admin url prefix if the user is an admin.
 *
 * @param {object} opts Object argument for api.js request
 * @param {string} opts.uri A uri that may be prefixed with /admin
 * @param {object} state The full redux state tree to use with session selectors
 * @returns {object} The augmented options object
 */
const withAdmin = (opts, state) => {
    if (selectIsAdmin(state)) {
        return Object.assign({}, opts, {
            uri: `/admin${opts.uri}`,
            authentication: selectToken(state)
        });
    }
    return opts;
};

export {withAdmin};
