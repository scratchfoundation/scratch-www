var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = {
    SET_STATE: 'splash/activity/SET_ACTIVITY',
    SET_STATUS: 'splash/activity/SET_STATUS',
    SET_ERROR: 'splash/activity/SET_ERROR'
};

function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
    }
    switch (action.type) {
    case Types.SET_STATE:
        return defaultsDeep({activity: action.activity}, state);
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
    return {status: reducer.Status.NOT_FETCHED, activity: []};
};

reducer.setActivityError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

reducer.setActivity = function (activity) {
    return {
        type: Types.SET_STATE,
        activity: activity
    };
};

reducer.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

reducer.getActivity = function (username) {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING));
        api({
            uri: '/proxy/users/' + username + '/activity?limit=5'
        }, function (err, body) {
            if (err) return dispatch(reducer.setActivityError(err));

            if (typeof body !== 'undefined') {
                dispatch(reducer.setActivity(body));
                dispatch(reducer.setStatus(reducer.Status.FETCHED));
                return;
            }
        });
    };
};

module.exports = reducer;
