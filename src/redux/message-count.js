var keyMirror = require('keymirror');
var defaults = require('lodash.defaults');

var api = require('../lib/api');

var Types = keyMirror({
    SET_MESSAGE_COUNT: null,
    SET_MESSAGE_COUNT_ERROR: null,
    SET_STATUS: null
});

module.exports.getInitialState = function (){
    return {messageCount: 0};
};

module.exports.messageCountReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_MESSAGE_COUNT:
        return defaults({messageCount: action.count}, state);
    case Types.SET_STATUS:
        return defaults({status: action.status}, state);
    case Types.SET_SESSION_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setSessionError = function (error) {
    return {
        type: Types.SET_MESSAGE_COUNT_ERROR,
        error: error
    };
};

module.exports.setCount = function (count) {
    return {
        type: Types.SET_MESSAGE_COUNT,
        count: count
    };
};

module.exports.setStatus = function (status){
    return {
        type: Types.SET_STATUS,
        status: status
    };
};

module.exports.getCount = function (username) {
    return function (dispatch) {
        api({
            method: 'get',
            uri: '/users/' + username + '/messages/count'
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setCount(0));
                dispatch(module.exports.setSessionError(err));
                return;
            }
            var count = parseInt(body.count, 10);
            dispatch(module.exports.setCount(count));
        });
    };
};
