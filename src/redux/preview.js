const defaults = require('lodash.defaults');
const keyMirror = require('keymirror');
const async = require('async');
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
        project: module.exports.Status.NOT_FETCHED,
        comments: module.exports.Status.NOT_FETCHED,
        faved: module.exports.Status.NOT_FETCHED,
        loved: module.exports.Status.NOT_FETCHED,
        original: module.exports.Status.NOT_FETCHED,
        parent: module.exports.Status.NOT_FETCHED,
        remixes: module.exports.Status.NOT_FETCHED,
        report: module.exports.Status.NOT_FETCHED,
        projectStudios: module.exports.Status.NOT_FETCHED,
        curatedStudios: module.exports.Status.NOT_FETCHED,
        visibility: module.exports.Status.NOT_FETCHED,
        studioRequests: {}
    },
    projectInfo: {},
    remixes: [],
    comments: [],
    replies: {},
    faved: false,
    loved: false,
    original: {},
    parent: {},
    projectStudios: [],
    curatedStudios: [],
    currentStudioIds: [],
    moreCommentsToLoad: false,
    projectNotAvailable: false,
    visibilityInfo: {}
});

module.exports.previewReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'RESET_TO_INTIAL_STATE':
        return module.exports.getInitialState();
    case 'SET_PROJECT_INFO':
        return Object.assign({}, state, {
            projectInfo: action.info ? action.info : {},
            projectNotAvailable: !action.info
        });
    case 'UPDATE_PROJECT_INFO':
        return Object.assign({}, state, {
            projectInfo: Object.assign({}, state.projectInfo, action.info)
        });
    case 'SET_REMIXES':
        return Object.assign({}, state, {
            remixes: action.items
        });
    case 'SET_ORIGINAL':
        return Object.assign({}, state, {
            original: action.info
        });
    case 'SET_PARENT':
        return Object.assign({}, state, {
            parent: action.info
        });
    case 'SET_PROJECT_STUDIOS':
        // also initialize currentStudioIds, to keep track of which studios
        // the project is currently in.
        return Object.assign({}, state, {
            projectStudios: action.items,
            currentStudioIds: action.items.map(item => item.id)
        });
    case 'SET_CURATED_STUDIOS':
        return Object.assign({}, state, {curatedStudios: action.items});
    case 'ADD_PROJECT_TO_STUDIO':
        // add studio id to our studios-that-this-project-belongs-to set.
        return Object.assign({}, state, {
            currentStudioIds: state.currentStudioIds.concat(action.studioId)
        });
    case 'REMOVE_PROJECT_FROM_STUDIO':
        return Object.assign({}, state, {
            currentStudioIds: state.currentStudioIds.filter(item => (
                item !== action.studioId
            ))
        });
    case 'RESET_COMMENTS':
        return Object.assign({}, state, {
            comments: [],
            replies: {}
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
    case 'SET_LOVED':
        return Object.assign({}, state, {
            loved: action.info
        });
    case 'SET_FAVED':
        return Object.assign({}, state, {
            faved: action.info
        });
    case 'SET_FETCH_STATUS':
        state = JSON.parse(JSON.stringify(state));
        state.status[action.infoType] = action.status;
        return state;
    case 'SET_STUDIO_FETCH_STATUS':
        state = JSON.parse(JSON.stringify(state));
        state.status.studioRequests[action.studioId] = action.status;
        return state;
    case 'SET_MORE_COMMENTS_TO_LOAD':
        return Object.assign({}, state, {
            moreCommentsToLoad: action.moreCommentsToLoad
        });
    case 'SET_VISIBILITY_INFO':
        return Object.assign({}, state, {
            visibilityInfo: action.visibilityInfo
        });
    case 'ERROR':
        log.error(action.error);
        return state;
    default:
        return state;
    }
};

module.exports.setError = error => ({
    type: 'ERROR',
    error: error
});

module.exports.resetProject = () => ({
    type: 'RESET_TO_INTIAL_STATE'
});

module.exports.setProjectInfo = info => ({
    type: 'SET_PROJECT_INFO',
    info: info
});

module.exports.updateProjectInfo = info => ({
    type: 'UPDATE_PROJECT_INFO',
    info: info
});

module.exports.setOriginalInfo = info => ({
    type: 'SET_ORIGINAL',
    info: info
});

module.exports.setParentInfo = info => ({
    type: 'SET_PARENT',
    info: info
});

module.exports.setFaved = info => ({
    type: 'SET_FAVED',
    info: info
});

module.exports.setLoved = info => ({
    type: 'SET_LOVED',
    info: info
});

module.exports.setRemixes = items => ({
    type: 'SET_REMIXES',
    items: items
});

module.exports.setProjectStudios = items => ({
    type: 'SET_PROJECT_STUDIOS',
    items: items
});

module.exports.setComments = items => ({
    type: 'SET_COMMENTS',
    items: items
});

module.exports.setReplies = replies => ({
    type: 'SET_REPLIES',
    replies: replies
});

module.exports.setCuratedStudios = items => ({
    type: 'SET_CURATED_STUDIOS',
    items: items
});

module.exports.addProjectToStudio = studioId => ({
    type: 'ADD_PROJECT_TO_STUDIO',
    studioId: studioId
});

module.exports.removeProjectFromStudio = studioId => ({
    type: 'REMOVE_PROJECT_FROM_STUDIO',
    studioId: studioId
});

module.exports.setFetchStatus = (type, status) => ({
    type: 'SET_FETCH_STATUS',
    infoType: type,
    status: status
});

module.exports.setStudioFetchStatus = (studioId, status) => ({
    type: 'SET_STUDIO_FETCH_STATUS',
    studioId: studioId,
    status: status
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

module.exports.setVisibilityInfo = visibilityInfo => ({
    type: 'SET_VISIBILITY_INFO',
    visibilityInfo: visibilityInfo
});

module.exports.getProjectInfo = (id, token) => (dispatch => {
    const opts = {
        uri: `/projects/${id}`
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No project info'));
            dispatch(module.exports.setProjectInfo(null));
            return;
        }
        dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.setProjectInfo(body));

        // If the project is not public, make a follow-up request for why
        if (!body.public) {
            dispatch(module.exports.getVisibilityInfo(id, body.author.username, token));
        }
    });
});

module.exports.getVisibilityInfo = (id, ownerUsername, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('visibility', module.exports.Status.FETCHING));
    api({
        uri: `/users/${ownerUsername}/projects/${id}/visibility`,
        authentication: token
    }, (err, body, response) => {
        if (err || !body || response.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('visibility', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No visibility info available'));
            return;
        }
        dispatch(module.exports.setFetchStatus('visibility', module.exports.Status.FETCHED));
        dispatch(module.exports.setVisibilityInfo(body));
    });
});

module.exports.getOriginalInfo = id => (dispatch => {
    dispatch(module.exports.setFetchStatus('original', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('original', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('original', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No original info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('original', module.exports.Status.FETCHED));
        if (body && body.code === 'NotFound') {
            dispatch(module.exports.setOriginalInfo({}));
            return;
        }
        dispatch(module.exports.setOriginalInfo(body));
    });
});

module.exports.getParentInfo = id => (dispatch => {
    dispatch(module.exports.setFetchStatus('parent', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('parent', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('parent', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No parent info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('parent', module.exports.Status.FETCHED));
        if (body && body.code === 'NotFound') {
            dispatch(module.exports.setParentInfo({}));
            return;
        }
        dispatch(module.exports.setParentInfo(body));
    });
});

module.exports.getFavedStatus = (id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}/favorites/user/${username}`,
        authentication: token
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No faved info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHED));
        dispatch(module.exports.setFaved(body.userFavorite));
    });
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
    async.eachLimit(commentIds, 10, (parentId, callback) => {
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

module.exports.setFavedStatus = (faved, id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHING));
    if (faved) {
        api({
            uri: `/projects/${id}/favorites/user/${username}`,
            authentication: token,
            method: 'POST'
        }, (err, body) => {
            if (err) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set favorites returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHED));
            dispatch(module.exports.setFaved(body.userFavorite));
        });
    } else {
        api({
            uri: `/projects/${id}/favorites/user/${username}`,
            authentication: token,
            method: 'DELETE'
        }, (err, body) => {
            if (err) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set favorites returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHED));
            dispatch(module.exports.setFaved(false));
        });
    }
});

module.exports.setFavedStatusViaProxy = (faved, id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHING));
    if (faved) {
        api({
            uri: `/proxy/projects/${id}/favorites/user/${username}`,
            authentication: token,
            withCredentials: true,
            method: 'POST',
            useCsrf: true,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set favorites returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHED));
            dispatch(module.exports.setFaved(body.userFavorite));
        });
    } else {
        api({
            uri: `/proxy/projects/${id}/favorites/user/${username}`,
            authentication: token,
            withCredentials: true,
            method: 'DELETE',
            useCsrf: true,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set favorites returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('faved', module.exports.Status.FETCHED));
            dispatch(module.exports.setFaved(false));
        });
    }
});

module.exports.getLovedStatus = (id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}/loves/user/${username}`,
        authentication: token
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No loved info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
        dispatch(module.exports.setLoved(body.userLove));
    });
});

module.exports.setLovedStatus = (loved, id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHING));
    if (loved) {
        api({
            uri: `/projects/${id}/loves/user/${username}`,
            authentication: token,
            method: 'POST'
        }, (err, body) => {
            if (err) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set loved returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
            dispatch(module.exports.setLoved(body.userLove));
        });
    } else {
        api({
            uri: `/projects/${id}/loves/user/${username}`,
            authentication: token,
            method: 'DELETE'
        }, (err, body) => {
            if (err) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set loved returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
            dispatch(module.exports.setLoved(body.userLove));
        });
    }
});

module.exports.setLovedStatusViaProxy = (loved, id, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHING));
    if (loved) {
        api({
            uri: `/proxy/projects/${id}/loves/user/${username}`,
            authentication: token,
            withCredentials: true,
            method: 'POST',
            useCsrf: true,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set loved returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
            dispatch(module.exports.setLoved(body.userLove));
        });
    } else {
        api({
            uri: `/proxy/projects/${id}/loves/user/${username}`,
            authentication: token,
            withCredentials: true,
            method: 'DELETE',
            useCsrf: true,
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                dispatch(module.exports.setError(err));
                return;
            }
            if (typeof body === 'undefined') {
                dispatch(module.exports.setError('Set loved returned no data'));
                return;
            }
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
            dispatch(module.exports.setLoved(body.userLove));
        });
    }
});

module.exports.getRemixes = id => (dispatch => {
    dispatch(module.exports.setFetchStatus('remixes', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}/remixes?limit=5`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('remixes', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('remixes', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No remixes info'));
            return;
        }
        if (body.code === 'NotFound') {
            // no remixes found, set body to empty array
            body = [];
        }
        dispatch(module.exports.setFetchStatus('remixes', module.exports.Status.FETCHED));
        dispatch(module.exports.setRemixes(body));
    });
});

module.exports.getProjectStudios = (id, ownerUsername, isAdmin, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('projectStudios', module.exports.Status.FETCHING));
    api({
        uri: `${isAdmin ? '/admin' : `/users/${ownerUsername}`}/projects/${id}/studios`,
        authentication: token ? token : null
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('projectStudios', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('projectStudios', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No projectStudios info'));
            return;
        }
        if (res.statusCode === 404) { // NotFound
            body = [];
        }
        dispatch(module.exports.setFetchStatus('projectStudios', module.exports.Status.FETCHED));
        dispatch(module.exports.setProjectStudios(body));
    });
});

module.exports.getCuratedStudios = username => (dispatch => {
    dispatch(module.exports.setFetchStatus('curatedStudios', module.exports.Status.FETCHING));
    api({
        uri: `/users/${username}/studios/curate`
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('curatedStudios', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('curatedStudios', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No curated studios info'));
            return;
        }
        if (res.statusCode === 404) { // NotFound
            body = [];
        }
        dispatch(module.exports.setFetchStatus('curatedStudios', module.exports.Status.FETCHED));
        dispatch(module.exports.setCuratedStudios(body));
    });
});

module.exports.addToStudio = (studioId, projectId, token) => (dispatch => {
    dispatch(module.exports.setStudioFetchStatus(studioId, module.exports.Status.FETCHING));
    api({
        uri: `/studios/${studioId}/project/${projectId}`,
        authentication: token,
        method: 'POST'
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setError('Add to studio returned no data'));
            return;
        }
        dispatch(module.exports.setStudioFetchStatus(studioId, module.exports.Status.FETCHED));
        dispatch(module.exports.addProjectToStudio(studioId));
    });
});

module.exports.leaveStudio = (studioId, projectId, token) => (dispatch => {
    dispatch(module.exports.setStudioFetchStatus(studioId, module.exports.Status.FETCHING));
    api({
        uri: `/studios/${studioId}/project/${projectId}`,
        authentication: token,
        method: 'DELETE'
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setError('Leave studio returned no data'));
            return;
        }
        dispatch(module.exports.setStudioFetchStatus(studioId, module.exports.Status.FETCHED));
        dispatch(module.exports.removeProjectFromStudio(studioId));
    });
});

module.exports.updateProject = (id, jsonData, username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}`,
        authentication: token,
        method: 'PUT',
        json: jsonData
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No project info'));
            return;
        }
        if (res.statusCode >= 400) { // API responding with error
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError('API Error Response'));
            return;
        }
        dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.setProjectInfo(body));
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

module.exports.shareProject = (projectId, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHING));
    api({
        uri: `/proxy/projects/${projectId}/share`,
        authentication: token,
        withCredentials: true,
        method: 'PUT',
        useCsrf: true
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('project', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.updateProjectInfo(body));
    });
});

module.exports.reportProject = (id, jsonData, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('report', module.exports.Status.FETCHING));
    // scratchr2 will fail if no thumbnail base64 string provided. If there is not one
    // included for any reason, include this minimal blank image.
    defaults(jsonData, {
        thumbnail: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC' +
            '0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
    });
    api({
        uri: `/proxy/projects/${id}/report`,
        authentication: token,
        withCredentials: true,
        method: 'POST',
        useCsrf: true,
        json: jsonData
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('report', module.exports.Status.ERROR));
            return;
        }
        dispatch(module.exports.setFetchStatus('report', module.exports.Status.FETCHED));
    });
});

module.exports.updateProjectThumbnail = (id, blob) => (dispatch => {
    dispatch(module.exports.setFetchStatus('project-thumbnail', module.exports.Status.FETCHING));
    api({
        uri: `/internalapi/project/thumbnail/${id}/set/`,
        method: 'POST',
        headers: {
            'Content-Type': 'image/png'
        },
        withCredentials: true,
        useCsrf: true,
        body: blob,
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('project-thumbnail', module.exports.Status.ERROR));
            return;
        }
        dispatch(module.exports.setFetchStatus('project-thumbnail', module.exports.Status.FETCHED));
    });
});

module.exports.logProjectView = (id, authorUsername, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('project-log-view', module.exports.Status.FETCHING));
    api({
        uri: `/users/${authorUsername}/projects/${id}/views`,
        method: 'POST',
        authentication: token,
        withCredentials: true,
        useCsrf: true
    }, (err, body, res) => {
        if (err || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('project-log-view', module.exports.Status.ERROR));
            return;
        }
        dispatch(module.exports.setFetchStatus('project-log-view', module.exports.Status.FETCHED));
    });
});
