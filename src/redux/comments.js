const keyMirror = require('keymirror');
const eachLimit = require('async/eachLimit');
const mergeWith = require('lodash.mergewith');
const uniqBy = require('lodash.uniqby');

const api = require('../lib/api');
const log = require('../lib/log');

const COMMENT_LIMIT = 20;

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    ERROR: null
});

module.exports.getInitialState = () => ({
    status: {
        comments: module.exports.Status.NOT_FETCHED
    },
    comments: [],
    replies: {},
    moreCommentsToLoad: false
});

module.exports.commentsReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'RESET_TO_INTIAL_STATE':
        return module.exports.getInitialState();
    case 'RESET_COMMENTS':
        return Object.assign({}, state, {
            comments: [],
            replies: {}
        });
    case 'SET_COMMENT_FETCH_STATUS':
        return Object.assign({}, state, {
            status: Object.assign({}, state.status, {
                [action.infoType]: action.status
            })
        });
    case 'SET_COMMENTS':
        return Object.assign({}, state, {
            comments: uniqBy(state.comments.concat(action.items), 'id')
        });
    case 'UPDATE_COMMENT':
        if (action.topLevelCommentId) {
            return Object.assign({}, state, {
                replies: Object.assign({}, state.replies, {
                    [action.topLevelCommentId]: state.replies[action.topLevelCommentId].map(comment => {
                        if (comment.id === action.commentId) {
                            return Object.assign({}, comment, action.comment);
                        }
                        return comment;
                    })
                })
            });
        }

        return Object.assign({}, state, {
            comments: state.comments.map(comment => {
                if (comment.id === action.commentId) {
                    return Object.assign({}, comment, action.comment);
                }
                return comment;
            })
        });
    case 'ADD_NEW_COMMENT':
        if (action.topLevelCommentId) {
            return Object.assign({}, state, {
                replies: Object.assign({}, state.replies, {
                    // Replies to comments go at the end  of the thread
                    [action.topLevelCommentId]: state.replies[action.topLevelCommentId].concat(action.comment)
                })
            });
        }

        // Reply to the top level project, put the reply at the beginning
        return Object.assign({}, state, {
            comments: [action.comment, ...state.comments],
            replies: Object.assign({}, state.replies, {[action.comment.id]: []})
        });
    case 'UPDATE_ALL_REPLIES':
        return Object.assign({}, state, {
            replies: Object.assign({}, state.replies, {
                [action.commentId]: state.replies[action.commentId].map(reply =>
                    Object.assign({}, reply, action.comment)
                )
            })
        });
    case 'SET_REPLIES':
        return Object.assign({}, state, {
            // Append new replies to the state.replies structure
            replies: mergeWith({}, state.replies, action.replies, (replies, newReplies) => (
                uniqBy((replies || []).concat(newReplies || []), 'id')
            )),
            // Also set the `moreRepliesToLoad` property on the top-level comments
            comments: state.comments.map(comment => {
                if (action.replies[comment.id]) {
                    return Object.assign({}, comment, {
                        moreRepliesToLoad: action.replies[comment.id].length === COMMENT_LIMIT
                    });
                }
                return comment;
            })
        });
    case 'SET_MORE_COMMENTS_TO_LOAD':
        return Object.assign({}, state, {
            moreCommentsToLoad: action.moreCommentsToLoad
        });
    default:
        return state;
    }
};

module.exports.setFetchStatus = (type, status) => ({
    type: 'SET_COMMENT_FETCH_STATUS',
    infoType: type,
    status: status
});

module.exports.setComments = items => ({
    type: 'SET_COMMENTS',
    items: items
});

module.exports.setReplies = replies => ({
    type: 'SET_REPLIES',
    replies: replies
});

module.exports.setCommentDeleted = (commentId, topLevelCommentId) => ({
    type: 'UPDATE_COMMENT',
    commentId: commentId,
    topLevelCommentId: topLevelCommentId,
    comment: {
        visibility: 'deleted'
    }
});

module.exports.setRepliesDeleted = commentId => ({
    type: 'UPDATE_ALL_REPLIES',
    commentId: commentId,
    comment: {
        visibility: 'deleted'
    }
});

module.exports.setCommentReported = (commentId, topLevelCommentId) => ({
    type: 'UPDATE_COMMENT',
    commentId: commentId,
    topLevelCommentId: topLevelCommentId,
    comment: {
        visibility: 'reported'
    }
});

module.exports.setCommentRestored = (commentId, topLevelCommentId) => ({
    type: 'UPDATE_COMMENT',
    commentId: commentId,
    topLevelCommentId: topLevelCommentId,
    comment: {
        visibility: 'visible'
    }
});

module.exports.setRepliesRestored = commentId => ({
    type: 'UPDATE_ALL_REPLIES',
    commentId: commentId,
    comment: {
        visibility: 'visible'
    }
});

module.exports.addNewComment = (comment, topLevelCommentId) => ({
    type: 'ADD_NEW_COMMENT',
    comment: comment,
    topLevelCommentId: topLevelCommentId
});

module.exports.setMoreCommentsToLoad = moreCommentsToLoad => ({
    type: 'SET_MORE_COMMENTS_TO_LOAD',
    moreCommentsToLoad: moreCommentsToLoad
});

module.exports.resetComments = () => ({
    type: 'RESET_COMMENTS'
});

module.exports.getTopLevelComments = (id, offset, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('comments', module.exports.Status.FETCHING));
    api({
        uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${id}/comments`,
        authentication: token ? token : null,
        params: {offset: offset || 0, limit: COMMENT_LIMIT}
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('comments', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode >= 400) { // NotFound
            dispatch(module.exports.setFetchStatus('comments', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No comment info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('comments', module.exports.Status.FETCHED));
        dispatch(module.exports.setComments(body));
        dispatch(module.exports.getReplies(id, body.map(comment => comment.id), 0, ownerUsername, isAdmin, token));

        // If we loaded a full page of comments, assume there are more to load.
        // This will be wrong (1 / COMMENT_LIMIT) of the time, but does not require
        // any more server query complexity, so seems worth it. In the case of a project with
        // number of comments divisible by the COMMENT_LIMIT, the load more button will be
        // clickable, but upon clicking it will go away.
        dispatch(module.exports.setMoreCommentsToLoad(body.length === COMMENT_LIMIT));
    });
});

module.exports.getCommentById = (projectId, commentId, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('comments', module.exports.Status.FETCHING));
    api({
        uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${projectId}/comments/${commentId}`,
        authentication: token ? token : null
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('comments', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (!body || res.statusCode >= 400) { // NotFound
            dispatch(module.exports.setFetchStatus('comments', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No comment info'));
            return;
        }

        if (body.parent_id) {
            // If the comment is a reply, load the parent
            return dispatch(module.exports.getCommentById(projectId, body.parent_id, ownerUsername, isAdmin, token));
        }

        // If the comment is not a reply, show it as top level and load replies
        dispatch(module.exports.setFetchStatus('comments', module.exports.Status.FETCHED));
        dispatch(module.exports.setComments([body]));
        dispatch(module.exports.getReplies(projectId, [body.id], 0, ownerUsername, isAdmin, token));
    });
});

module.exports.getReplies = (projectId, commentIds, offset, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('replies', module.exports.Status.FETCHING));
    const fetchedReplies = {};
    eachLimit(commentIds, 10, (parentId, callback) => {
        api({
            uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${projectId}/comments/${parentId}/replies`,
            authentication: token ? token : null,
            params: {offset: offset || 0, limit: COMMENT_LIMIT}
        }, (err, body, res) => {
            if (err) {
                return callback(`Error fetching comment replies: ${err}`);
            }
            if (typeof body === 'undefined' || res.statusCode >= 400) { // NotFound
                return callback('No comment reply information');
            }
            fetchedReplies[parentId] = body;
            callback(null, body);
        });
    }, err => {
        if (err) {
            dispatch(module.exports.setFetchStatus('replies', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        dispatch(module.exports.setFetchStatus('replies', module.exports.Status.FETCHED));
        dispatch(module.exports.setReplies(fetchedReplies));
    });
});

module.exports.deleteComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
    /* TODO fetching/fetched/error states updates for comment deleting */
    api({
        uri: `/proxy/comments/project/${projectId}/comment/${commentId}`,
        authentication: token,
        withCredentials: true,
        method: 'DELETE',
        useCsrf: true
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            log.error(err || res.body);
            return;
        }
        dispatch(module.exports.setCommentDeleted(commentId, topLevelCommentId));
        if (!topLevelCommentId) {
            dispatch(module.exports.setRepliesDeleted(commentId));
        }
    });
});

module.exports.reportComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
    api({
        uri: `/proxy/project/${projectId}/comment/${commentId}/report`,
        authentication: token,
        withCredentials: true,
        method: 'POST',
        useCsrf: true
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            log.error(err || res.body);
            return;
        }
        // TODO use the reportId in the response for unreporting functionality
        dispatch(module.exports.setCommentReported(commentId, topLevelCommentId));
    });
});

module.exports.restoreComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
    api({
        uri: `/proxy/admin/project/${projectId}/comment/${commentId}/undelete`,
        authentication: token,
        withCredentials: true,
        method: 'PUT',
        useCsrf: true
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            log.error(err || res.body);
            return;
        }
        dispatch(module.exports.setCommentRestored(commentId, topLevelCommentId));
        if (!topLevelCommentId) {
            dispatch(module.exports.setRepliesRestored(commentId));
        }
    });
});
