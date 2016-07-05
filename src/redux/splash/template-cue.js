var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var sessionActions = require('../../redux/session.js');

var Types = {
    SET_STATUS: 'splash/template-cue/SET_STATUS',
    SET_ERROR: 'splash/template-cue/SET_ERROR'
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
    HANDLED: null,
    NOT_HANDLED: null,
    HANDLING: null
});

reducer.getInitialState = function () {
    return {status: reducer.Status.NOT_HANDLED};
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

reducer.handleDismiss = function (cue) {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.HANDLING));
        api({
            host: '',
            uri: '/site-api/users/set-template-cue/',
            method: 'post',
            useCsrf: true,
            json: {cue: cue, value: false}
        }, function (err) {
            if (err) {
                dispatch(reducer.setError(err));
            } else {
                dispatch(sessionActions.refreshSession());
                dispatch(reducer.setStatus(reducer.Status.HANDLED));
            }
        });
    };
};

module.exports = reducer;
