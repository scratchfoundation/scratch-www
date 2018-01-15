var defaults = require('lodash.defaults');
var defaultsDeep = require('lodash.defaultsdeep');
var keyMirror = require('keymirror');

var api = require('../lib/api');
var log = require('../lib/log');
var messageCountActions = require('./message-count.js');

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    MESSAGES_ERROR: null,
    ADMIN_ERROR: null,
    INVITE_ERROR: null,
    CLEAR_ERROR: null,
    DELETE_ERROR: null
});

module.exports.getInitialState = function () {
    return {
        status: {
            admin: module.exports.Status.NOT_FETCHED,
            message: module.exports.Status.NOT_FETCHED,
            clear: module.exports.Status.NOT_FETCHED,
            delete: module.exports.Status.NOT_FETCHED
        },
        messages: {
            admin: [],
            social: [],
            invite: {}
        }
    };
};

module.exports.messagesReducer = function (state, action) {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
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
};

module.exports.setMessagesError = function (error) {
    return {
        type: 'ERROR',
        error: error
    };
};

module.exports.setMessages = function (messages) {
    return {
        type: 'SET_MESSAGES',
        messages: messages
    };
};

module.exports.setMessagesOffset = function (offset) {
    return {
        type: 'SET_MESSAGES_OFFSET',
        offset: offset
    };
};

module.exports.setAdminMessages = function (messages) {
    return {
        type: 'SET_ADMIN_MESSAGES',
        messages: messages
    };
};

module.exports.setScratcherInvite = function (invite) {
    return {
        type: 'SET_SCRATCHER_INVITE',
        invite: invite
    };
};

module.exports.setStatus = function (type, status){
    return {
        type: type,
        status: status
    };
};

/**
 * Sends a request to mark one's unread messages count as cleared.
 * @return {null} returns nothing
 */
module.exports.clearMessageCount = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHING));
        api({
            host: '',
            uri: '/site-api/messages/messages-clear/',
            method: 'POST',
            useCsrf: true
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.CLEAR_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (typeof body !== 'undefined' && !body.success) {
                dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.CLEAR_ERROR));
                dispatch(module.exports.setMessagesError('messages not cleared'));
                return;
            }
            dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHED));
        });
    };
};

/**
 * Marks an admin message as read, dismissing it from the page
 * @param  {string}   messageType   type of message to delete (invite or notification)
 * @param  {number}   messageId     id of the message to delete
 * @param  {number}   messageCount  current number of unread notifications
 * @param  {object[]} adminMessages current list of admin messages retrieved
 * @return {null}                   returns nothing
 */
module.exports.clearAdminMessage = function (messageType, messageId, messageCount, adminMessages) {
    return function (dispatch) {
        dispatch(module.exports.setStatus('CLEAR_STATUS', module.exports.Status.FETCHING));
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
                dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.DELETE_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (!body.success) {
                dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.DELETE_ERROR));
                dispatch(module.exports.setMessagesError('messages not cleared'));
                return;
            }

            if (messageType === 'invite') {
                // invite cleared, so set the invite prop to an empty object
                dispatch(module.exports.setScratcherInvite({}));
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
                dispatch(module.exports.setAdminMessages(adminMessages));
            }
            dispatch(messageCountActions.setCount(messageCount - 1));
            dispatch(module.exports.setStatus('DELETE_STATUS', module.exports.Status.FETCHED));
        });
    };
};

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
module.exports.getMessages = function (username, token, opts) {
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
        dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages?limit=40&offset=' + opts.offset + filterArg,
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.MESSAGES_ERROR));
                dispatch(module.exports.setMessagesError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.MESSAGES_ERROR));
                dispatch(module.exports.setMessagesError('No session content'));
                return;
            }
            dispatch(module.exports.setStatus('MESSAGE_STATUS', module.exports.Status.FETCHED));
            dispatch(module.exports.setMessages(opts.messages.concat(body)));
            dispatch(module.exports.setMessagesOffset(opts.offset + 40));
            if (opts.clearCount) {
                dispatch(module.exports.clearMessageCount(token)); // clear count once messages loaded
            }
        });
    };
};

/**
 * Gets the messages from the Scratch Team for a user
 * @param  {string} username user's username for whom to get the admin messages
 * @param  {string} token    the user's unique token for auth
 * @return {null}            returns nothing
 */
module.exports.getAdminMessages = function (username, token) {
    return function (dispatch) {
        dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.FETCHING));
        api({
            uri: '/users/' + username + '/messages/admin',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.ADMIN_ERROR));
                dispatch(module.exports.setMessagesError(err));
                dispatch(module.exports.setAdminMessages([]));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.ADMIN_ERROR));
                dispatch(module.exports.setMessagesError('No session content'));
                dispatch(module.exports.setAdminMessages([]));
                return;
            }
            dispatch(module.exports.setAdminMessages(body));
            dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.FETCHED));
        });
    };
};

/**
 * Gets the invitation to become a Scratcher for a user, if one exists
 * @param  {string} username user's username for whom to get the invite
 * @param  {string} token    the user's unique token for auth
 * @return {null}            returns nothing
 */
module.exports.getScratcherInvite = function (username, token) {
    return function (dispatch) {
        api({
            uri: '/users/' + username + '/invites',
            authentication: token
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setStatus('ADMIN_STATUS', module.exports.Status.INVITE_ERROR));
                dispatch(module.exports.setMessagesError(err));
                dispatch(module.exports.setScratcherInvite({}));
                return;
            }
            if (typeof body === 'undefined') return dispatch(module.exports.setMessagesError('No session content'));
            dispatch(module.exports.setScratcherInvite(body));
        });
    };
};
