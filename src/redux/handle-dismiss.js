var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var sessionActions = require('./session.js');

var Types = keyMirror({
    SET_STATUS: null,
    SET_ERROR: null
});

module.exports.Status = keyMirror({
    HANDLED: null,
    NOT_HANDLED: null,
    HANDLING: null
});

module.exports.getInitialState = function () {
    return {status: module.exports.Status.NOT_HANDLED};
};

module.exports.dismissReducer = function (state, action) {
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

module.exports.handleDismiss = function (cue) {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.HANDLING));
        api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, function (err) {
            if (err) {
                dispatch(module.exports.setError(err));
            } else {
                dispatch(sessionActions.refreshSession());
                dispatch(module.exports.setStatus(module.exports.Status.HANDLED));
            }
        });
    };
};
