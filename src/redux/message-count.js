import keyMirror from 'keymirror';
import defaults from 'lodash.defaults';
import api from '../lib/api';

var Types = keyMirror({
    SET_MESSAGE_COUNT: null,
    SET_MESSAGE_COUNT_ERROR: null,
    SET_STATUS: null
});

export function getInitialState() {
    return {messageCount: 0};
}

export function messageCountReducer(state, action) {
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
}

export function setSessionError(error) {
    return {
        type: Types.SET_MESSAGE_COUNT_ERROR,
        error: error
    };
}

export function setCount(count) {
    return {
        type: Types.SET_MESSAGE_COUNT,
        count: count
    };
}

export function setStatus(status) {
    return {
        type: Types.SET_STATUS,
        status: status
    };
}

export function getCount(username) {
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
}
