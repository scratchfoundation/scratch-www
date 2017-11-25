import defaults from 'lodash.defaults';
import defaultsDeep from 'lodash.defaultsdeep';
import keyMirror from 'keymirror';

import api from '../lib/api';
import log from '../lib/log';
import {setCount as setMessageCount} from './message-count.js';

export var Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    MESSAGES_ERROR: null,
    ADMIN_ERROR: null,
    INVITE_ERROR: null,
    CLEAR_ERROR: null,
    DELETE_ERROR: null
});

export function getInitialState() {
    return {
        status: {
            admin: Status.NOT_FETCHED,
            message: Status.NOT_FETCHED,
            clear: Status.NOT_FETCHED,
            delete: Status.NOT_FETCHED
        },
        messages: {
            admin: [],
            social: [],
            invite: {}
        }
    };
}

export function messagesReducer(state, action) {
    if (typeof state === 'undefined') {
        state = getInitialState();
    }

    switch (action.type) {
    case 'SET_MESSAGES':
        state.messages.social = action.messages;
        return state;
    case 'SET_ADMIN_MESSAGES':
        state.messages.admin = action.messages;
        return state;
    case 'SET_MESSAGES_OFFSET':
        return defaultsDeep({
            messages: {socialOffset: action.offset}
        }, state);
    case 'SET_SCRATCHER_INVITE':
        state.messages.invite = action.invite;
        return state;
    case 'ADMIN_STATUS':
        return defaultsDeep({status: {admin: action.status}}, state);
    case 'MESSAGE_STATUS':
        return defaultsDeep({status: {message: action.status}}, state);
    case 'CLEAR_STATUS':
        return defaultsDeep({status: {clear: action.status}}, state);
    case 'DELETE_STATUS':
        return defaultsDeep({status: {delete: action.status}}, state);
    case 'ERROR':
        log.error(action.error);
        return state;
    default:
        return state;
    }
}

export function setMessagesError(error) {
    return {
        type: 'ERROR',
        error: error
    };
}

export function setMessages(messages) {
    return {
        type: 'SET_MESSAGES',
        messages: messages
    };
}

export function setMessagesOffset(offset) {
    return {
        type: 'SET_MESSAGES_OFFSET',
        offset: offset
    };
}

export function setAdminMessages(messages) {
    return {
        type: 'SET_ADMIN_MESSAGES',
        messages: messages
    };
}

export function setScratcherInvite(invite) {
    return {
        type: 'SET_SCRATCHER_INVITE',
        invite: invite
    };
}

export function setStatus(type, status) {
    return {
        type: type,
        status: status
    };
}

/**
 * Sends a request to mark one's unread messages count as cleared.
 * @return {null} returns nothing
 */
export function clearMessageCount() {
    return function (dispatch) {
        dispatch(setStatus('CLEAR_STATUS', Status.FETCHING));
        api({
            host: '',
            uri: '/site-api/messages/messages-clear/',
            method: 'POST',
            useCsrf: true
        }, function (err, body) {
            if (err) {
                dispatch(setStatus('CLEAR_STATUS', Status.CLEAR_ERROR));
                dispatch(setMessagesError(err));
                return;
            }
            if (typeof body !== 'undefined' && !body.success) {
                dispatch(setStatus('CLEAR_STATUS', Status.CLEAR_ERROR));
                dispatch(setMessagesError('messages not cleared'));
                return;
            }
            dispatch(setStatus('CLEAR_STATUS', Status.FETCHED));
        });
    };
}

/**
 * Marks an admin message as read, dismissing it from the page
 * @param  {string}   messageType   type of message to delete (invite or notification)
 * @param  {number}   messageId     id of the message to delete
 * @param  {number}   messageCount  current number of unread notifications
 * @param  {object[]} adminMessages current list of admin messages retrieved
 * @return {null}                   returns nothing
 */
export function clearAdminMessage(messageType, messageId, messageCount, adminMessages) {
    return function (dispatch) {
        dispatch(setStatus('CLEAR_STATUS', Status.FETCHING));
        api({
            host: '',
            uri: '/site-api/messages/messages-delete/',
            method: 'POST',
            useCsrf: true,
            json: {
                alertType: messageType,
                alertId: messageId
            }
        }, function (err, body) {
            if (err) {
                dispatch(setStatus('DELETE_STATUS', Status.DELETE_ERROR));
                dispatch(setMessagesError(err));
                return;
            }
            if (!body.success) {
                dispatch(setStatus('DELETE_STATUS', Status.DELETE_ERROR));
                dispatch(setMessagesError('messages not cleared'));
                return;
            }

            if (messageType === 'invite') {
                // invite cleared, so set the invite prop to an empty object
                dispatch(setScratcherInvite({}));
            } else {
                // find the admin message and remove it
                var toRemove = -1;
                for (var i in adminMessages) {
                    if (adminMessages[i].id === messageId) {
                        toRemove = i;
                        break;
                    }
                }
                adminMessages.splice(toRemove, 1);
                dispatch(setAdminMessages(adminMessages));
            }
            dispatch(setMessageCount(messageCount - 1));
            dispatch(setStatus('DELETE_STATUS', Status.FETCHED));
        });
    };
}

/**
 * Gets a user's messages to be displayed on the /messages page
 * @param  {string}   username           username of the user for whom the messages should be gotten
 * @param  {string}   token              the user's unique token for auth
 * @param  {object}   opts               optional args for the method
 * @param  {object[]} [opts.messages]    an array of existing messages on the page, if there are any
 * @param  {number}   [opts.offset]      offset of messages to get, based on the number retrieved already
 * @param  {string}   [opts.filter]      type of messages to return
 * @return {null}                     returns nothing
 */
export function getMessages(username, token, opts) {
    opts = defaults(opts, {
        messages: [],
        offset: 0,
        filter: '',
        clearCount: true
    });

    var filterArg = '';
    if (opts.filter.length > 0) {
        filterArg = '&filter=' + opts.filter;
    }

    return function (dispatch) {
        dispatch(setStatus('MESSAGE_STATUS', Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages?limit=40&offset=' + opts.offset + filterArg,
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(setStatus('MESSAGE_STATUS', Status.MESSAGES_ERROR));
                dispatch(setMessagesError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(setStatus('MESSAGE_STATUS', Status.MESSAGES_ERROR));
                dispatch(setMessagesError('No session content'));
                return;
            }
            dispatch(setStatus('MESSAGE_STATUS', Status.FETCHED));
            dispatch(setMessages(opts.messages.concat(body)));
            dispatch(setMessagesOffset(opts.offset + 40));
            if (opts.clearCount) {
                dispatch(clearMessageCount(token)); // clear count once messages loaded
            }
        });
    };
}

/**
 * Gets the messages from the Scratch Team for a user
 * @param  {string} username user's username for whom to get the admin messages
 * @param  {string} token    the user's unique token for auth
 * @return {null}            returns nothing
 */
export function getAdminMessages(username, token) {
    return function (dispatch) {
        dispatch(setStatus('ADMIN_STATUS', Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages/admin',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(setStatus('ADMIN_STATUS', Status.ADMIN_ERROR));
                dispatch(setMessagesError(err));
                dispatch(setAdminMessages([]));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(setStatus('ADMIN_STATUS', Status.ADMIN_ERROR));
                dispatch(setMessagesError('No session content'));
                dispatch(setAdminMessages([]));
                return;
            }
            dispatch(setAdminMessages(body));
            dispatch(setStatus('ADMIN_STATUS', Status.FETCHED));
        });
    };
}

/**
 * Gets the invitation to become a Scratcher for a user, if one exists
 * @param  {string} username user's username for whom to get the invite
 * @param  {string} token    the user's unique token for auth
 * @return {null}            returns nothing
 */
export function getScratcherInvite(username, token) {
    return function (dispatch) {
        api({
            uri: '/users/' + username + '/invites',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(setStatus('ADMIN_STATUS', Status.INVITE_ERROR));
                dispatch(setMessagesError(err));
                dispatch(setScratcherInvite({}));
                return;
            }
            if (typeof body === 'undefined') return dispatch(setMessagesError('No session content'));
            dispatch(setScratcherInvite(body));
        });
    };
}
