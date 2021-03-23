const keyMirror = require('keymirror');
const jar = require('../lib/jar.js');

const Types = keyMirror({
    SET_PERMISSIONS: null,
    SET_PERMISSIONS_ERROR: null
});

module.exports.permissionsReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = {};
    }
    switch (action.type) {
    case Types.SET_PERMISSIONS:
        return action.permissions;
    case Types.SET_PERMISSIONS_ERROR:
        return state;
    default:
        return state;
    }
};

module.exports.storePermissions = permissions => {
    permissions = permissions || {};
    return dispatch => {
        jar.set('permissions', permissions, {
            encode: value => (
                encodeURIComponent(JSON.stringify(value))
            )
        });
        return dispatch(module.exports.setPermissions(permissions));
    };
};

module.exports.getPermissions = () => (dispatch => {
    jar.get('permissions', (err, value) => {
        if (err) return dispatch(module.exports.setPermissionsError(err));

        try {
            value = JSON.parse(decodeURIComponent(value)) || {};
        } catch (e) {
            value = {};
        }
        return dispatch(module.exports.setPermissions(value));
    });
});

module.exports.setPermissions = permissions => ({
    type: Types.SET_PERMISSIONS,
    permissions: permissions
});

module.exports.setPermissionsError = error => ({
    type: Types.SET_PERMISSIONS_ERROR,
    error: error
});

// Selectors - Being extra cautious with stict truthiness
module.exports.selectIsAdmin = state => state.permissions.admin === true;
module.exports.selectIsSocial = state => state.permissions.social === true;
