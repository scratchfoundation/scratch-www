import keyMirror from 'keymirror';
import jar from '../lib/jar.js';

var Types = keyMirror({
    SET_PERMISSIONS: null,
    SET_PERMISSIONS_ERROR: null
});

export function permissionsReducer (state, action) {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_PERMISSIONS:
        return action.permissions;
    case Types.SET_PERMISSIONS_ERROR:
        return state;
    default:
        return state;
    }
}

export function storePermissions (permissions) {
    permissions = permissions || {};
    return function (dispatch) {
        jar.set('permissions', permissions, {
            encode: function (value) {
                return encodeURIComponent(JSON.stringify(value));
            }
        });
        return dispatch(setPermissions(permissions));
    };
}

export function getPermissions () {
    return function (dispatch) {
        jar.get('permissions', function (err, value) {
            if (err) return dispatch(setPermissionsError(err));

            try {
                value = JSON.parse(decodeURIComponent(value)) || {};
            } catch (e) {
                value = {};
            }
            return dispatch(setPermissions(value));
        });
    };
}

export function setPermissions (permissions) {
    return {
        type: Types.SET_PERMISSIONS,
        permissions: permissions
    };
}

export function setPermissionsError (error) {
    return {
        type: Types.SET_PERMISSIONS_ERROR,
        error: error
    };
}
