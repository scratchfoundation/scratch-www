const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');

const Types = keyMirror({
    SET_MESSAGE_COUNT: null,
    SET_MESSAGE_COUNT_ERROR: null,
    SET_STATUS: null
});

const getInitialState = () => ({
    messageCount: 0
});

module.exports.messageCountReducer = (state, action) => {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = getInitialState();
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

module.exports.setSessionError = error => ({
    type: Types.SET_MESSAGE_COUNT_ERROR,
    error: error
});

module.exports.setCount = count => ({
    type: Types.SET_MESSAGE_COUNT,
    count: count
});

module.exports.setStatus = status => ({
    type: Types.SET_STATUS,
    status: status
});

module.exports.getCount = username => (dispatch => {
    api({
        method: 'get',
        uri: `/users/${username}/messages/count`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setCount(0));
            dispatch(module.exports.setSessionError(err));
            return;
        }
        const count = parseInt(body.count, 10);
        dispatch(module.exports.setCount(count));
    });
});
