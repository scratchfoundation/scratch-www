var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = keyMirror({
    SET_COUNT: null,
    SET_COUNT_STATUS: null,
    SET_COUNT_ERROR: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = function () {
    return {status: module.exports.Status.FETCHING, projectCount: 15000000};
};

module.exports.countReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_COUNT:
        return defaultsDeep({projectCount: action.count}, state);
    case Types.SET_COUNT_STATUS:
        return defaultsDeep({status: action.status}, state);
    case Types.SET_COUNT_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setCountError = function (error) {
    return {
        type: Types.SET_COUNT_ERROR,
        error: error
    };
};

module.exports.setCount = function (count) {
    return {
        type: Types.SET_COUNT,
        count: count
    };
};

module.exports.setStatus = function (status){
    return {
        type: Types.SET_COUNT_STATUS,
        status: status
    };
};

module.exports.getProjectCount = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.NOT_FETCHED));
        api({
            uri: '/projects/count/all'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setCountError(err));

            if (typeof body !== 'undefined') {
                dispatch(module.exports.setCount(body.count));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
                return;
            }
        });
    };
};
