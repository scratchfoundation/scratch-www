const keyMirror = require('keymirror');
const mergeWith = require('lodash.mergewith');
const uniqBy = require('lodash.uniqby');

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

// Selectors
module.exports.selectCommentCount = state => state.comments.comments.length;
