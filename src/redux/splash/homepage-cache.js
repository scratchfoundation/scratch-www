var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = {
    SET_STATUS: 'splash/cache/SET_STATUS',
    SET_ERROR: 'splash/cache/SET_ERROR'
};

function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
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
}

reducer.Status = keyMirror({
    PASS: null,
    NOT_REFRESHED: null,
    IN_PROGRESS: null,
    FAIL: null
});

reducer.getInitialState = function () {
    return {status: reducer.Status.NOT_REFRESHED};
};

reducer.setError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};


reducer.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

reducer.refreshHomepageCache = function () {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.IN_PROGRESS));
        api({
            host: '',
            uri: '/scratch_admin/homepage/clear-cache/',
            method: 'post',
            useCsrf: true
        }, function (err) {
            if (err) {
                dispatch(reducer.setStatus(reducer.Status.FAIL));
            } else {
                dispatch(reducer.setStatus(reducer.Status.PASS));
            }
        });
    };
};

module.exports = reducer;
