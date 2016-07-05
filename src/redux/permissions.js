var jar = require('../lib/jar.js');

var Types = {
    SET_STATE: 'www/permissions/SET_PERMISSIONS',
    SET_ERROR: 'www/permissions/SET_ERROR'
};

function reducer (state, action) {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_STATE:
        return action.permissions;
    case Types.SET_ERROR:
        return state;
    default:
        return state;
    }
}

reducer.getPermissions = function () {
    return function (dispatch) {
        jar.getUnsignedValue('scratchsessionsid', 'permissions', function (err, value) {
            if (err) return dispatch(reducer.setPermissionsError(err));
            return dispatch(reducer.setPermissions(value));
        });
    };
};

reducer.setPermissions = function (permissions) {
    return {
        type: Types.SET_STATE,
        permissions: permissions
    };
};

reducer.setPermissionsError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

module.exports = reducer;
