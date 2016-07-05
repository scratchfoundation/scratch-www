var keyMirror = require('keymirror');
var defaults = require('lodash.defaults');

var api = require('../mixins/api.jsx').api;
var tokenActions = require('./token.js');

var Types = {
    SET_STATE: 'www/session/SET_SESSION',
    SET_ERROR: 'www/session/SET_ERROR',
    SET_STATUS: 'www/session/SET_STATUS'
};

function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
    }
    switch (action.type) {
    case Types.SET_STATE:
        return defaults({session: action.session}, state);
    case Types.SET_STATUS:
        return defaults({status: action.status}, state);
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

reducer.getInitialState = function (){
    return {status: reducer.Status.NOT_FETCHED, session:{}};
};


reducer.setError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

reducer.setState = function (session) {
    return {
        type: Types.SET_STATE,
        session: session
    };
};

reducer.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

reducer.refreshSession = function () {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING));
        api({
            host: '',
            uri: '/session/'
        }, function (err, body) {
            if (err) return dispatch(reducer.setSessionError(err));

            if (typeof body !== 'undefined') {
                if (body.banned) {
                    return window.location = body.url;
                } else {
                    dispatch(tokenActions.getToken());
                    dispatch(reducer.setState(body));
                    dispatch(reducer.setStatus(reducer.Status.FETCHED));
                    return;
                }
            }
        });
    };
};

module.exports = reducer;
