var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = keyMirror({
    SET_STATUS: null,
    SET_ERROR: null
});

module.exports.Status = keyMirror({
    PASS: null,
    NOT_REFRESHED: null,
    IN_PROGRESS: null,
    FAIL: null
});

module.exports.getInitialState = function () {
    return {status: module.exports.Status.NOT_REFRESHED};
};

module.exports.cacheReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_STATUS:
        return defaultsDeep({status: action.status}, state);
    case Types.SET_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};


module.exports.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

module.exports.refreshHomepageCache = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.IN_PROGRESS));
        api({
            host: '',
            uri: '/scratch_admin/homepage/clear-cache/',
            method: 'post',
            useCsrf: true
        }, function (err) {
            if (err) {
                dispatch(module.exports.setStatus(module.exports.Status.FAIL));
            } else {
                dispatch(module.exports.setStatus(module.exports.Status.PASS));
            }
        });
    };
};
