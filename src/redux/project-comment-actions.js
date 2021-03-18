const eachLimit = require('async/eachLimit');

const api = require('../lib/api');
const log = require('../lib/log');

const COMMENT_LIMIT = 20;

const {
    Status,
    setFetchStatus,
    setCommentDeleted,
    setCommentReported,
    setCommentRestored,
    setMoreCommentsToLoad,
    setComments,
    setError,
    setReplies,
    setRepliesDeleted,
    setRepliesRestored
} = require('../redux/comments.js');

const getReplies = (projectId, commentIds, offset, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(setFetchStatus('replies', Status.FETCHING));
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
            dispatch(setFetchStatus('replies', Status.ERROR));
            dispatch(setError(err));
            return;
        }
        dispatch(setFetchStatus('replies', Status.FETCHED));
        dispatch(setReplies(fetchedReplies));
    });
});

const getTopLevelComments = (id, offset, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(setFetchStatus('comments', Status.FETCHING));
    api({
        uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${id}/comments`,
        authentication: token ? token : null,
        params: {offset: offset || 0, limit: COMMENT_LIMIT}
    }, (err, body, res) => {
        if (err) {
            dispatch(setFetchStatus('comments', Status.ERROR));
            dispatch(setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode >= 400) { // NotFound
            dispatch(setFetchStatus('comments', Status.ERROR));
            dispatch(setError('No comment info'));
            return;
        }
        dispatch(setFetchStatus('comments', Status.FETCHED));
        dispatch(setComments(body));
        dispatch(getReplies(id, body.map(comment => comment.id), 0, ownerUsername, isAdmin, token));

        // If we loaded a full page of comments, assume there are more to load.
        // This will be wrong (1 / COMMENT_LIMIT) of the time, but does not require
        // any more server query complexity, so seems worth it. In the case of a project with
        // number of comments divisible by the COMMENT_LIMIT, the load more button will be
        // clickable, but upon clicking it will go away.
        dispatch(setMoreCommentsToLoad(body.length === COMMENT_LIMIT));
    });
});

const getCommentById = (projectId, commentId, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(setFetchStatus('comments', Status.FETCHING));
    api({
        uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${projectId}/comments/${commentId}`,
        authentication: token ? token : null
    }, (err, body, res) => {
        if (err) {
            dispatch(setFetchStatus('comments', Status.ERROR));
            dispatch(setError(err));
            return;
        }
        if (!body || res.statusCode >= 400) { // NotFound
            dispatch(setFetchStatus('comments', Status.ERROR));
            dispatch(setError('No comment info'));
            return;
        }

        if (body.parent_id) {
            // If the comment is a reply, load the parent
            return dispatch(getCommentById(projectId, body.parent_id, ownerUsername, isAdmin, token));
        }

        // If the comment is not a reply, show it as top level and load replies
        dispatch(setFetchStatus('comments', Status.FETCHED));
        dispatch(setComments([body]));
        dispatch(getReplies(projectId, [body.id], 0, ownerUsername, isAdmin, token));
    });
});

const deleteComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
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
        dispatch(setCommentDeleted(commentId, topLevelCommentId));
        if (!topLevelCommentId) {
            dispatch(setRepliesDeleted(commentId));
        }
    });
});

const reportComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
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
        dispatch(setCommentReported(commentId, topLevelCommentId));
    });
});

const restoreComment = (projectId, commentId, topLevelCommentId, token) => (dispatch => {
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
        dispatch(setCommentRestored(commentId, topLevelCommentId));
        if (!topLevelCommentId) {
            dispatch(setRepliesRestored(commentId));
        }
    });
});

module.exports = {
    getTopLevelComments,
    getCommentById,
    getReplies,
    deleteComment,
    reportComment,
    restoreComment
};
