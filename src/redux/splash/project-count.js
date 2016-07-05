var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = {
    SET_STATE: 'splash/project-count/SET_COUNT',
    SET_STATUS: 'splash/project-count/SET_STATUS',
    SET_ERROR: 'splash/project-count/SET_ERROR'
};

function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
    }
    switch (action.type) {
    case Types.SET_STATE:
        return defaultsDeep({projectCount: action.count}, state);
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
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

reducer.getInitialState = function () {
    return {status: reducer.Status.NOT_FETCHED, projectCount: 15000000};
};

reducer.setCountError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

reducer.setCount = function (count) {
    return {
        type: Types.SET_STATE,
        count: count
    };
};

reducer.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

reducer.getProjectCount = function () {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING));
        api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (err) return dispatch(reducer.setCountError(err));

            if (typeof body !== 'undefined') {
                dispatch(reducer.setCount(body.count));
                dispatch(reducer.setStatus(reducer.Status.FETCHED));
                return;
            }
        });
    };
};

module.exports = reducer;
