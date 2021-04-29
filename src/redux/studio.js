const keyMirror = require('keymirror');

const api = require('../lib/api');
const log = require('../lib/log');

const {selectUsername, selectToken} = require('./session');

const Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    ERROR: null
});

const getInitialState = () => ({
    infoStatus: Status.FETCHING,
    title: '',
    description: '',
    openToAll: false,
    commentsAllowed: false,
    image: '',
    followers: 0,
    owner: null,

    rolesStatus: Status.NOT_FETCHED,
    manager: false,
    curator: false,
    following: false,
    invited: false
});

const studioReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = getInitialState();
    }

    switch (action.type) {
    case 'SET_INFO':
        return {
            ...state,
            ...action.info,
            infoStatus: Status.FETCHED
        };
    case 'SET_ROLES':
        return {
            ...state,
            ...action.roles,
            rolesStatus: Status.FETCHED
        };
    case 'SET_FETCH_STATUS':
        if (action.error) {
            log.error(action.error);
        }
        return {
            ...state,
            [action.fetchType]: action.fetchStatus
        };
    case 'COMPLETE_STUDIO_MUTATION':
        if (typeof state[action.field] === 'undefined') return state;
        return {
            ...state,
            [action.field]: action.value
        };
    default:
        return state;
    }
};

// Action Creators
const setFetchStatus = (fetchType, fetchStatus, error) => ({
    type: 'SET_FETCH_STATUS',
    fetchType,
    fetchStatus,
    error
});

const setInfo = info => ({
    type: 'SET_INFO',
    info: info
});

const setRoles = roles => ({
    type: 'SET_ROLES',
    roles: roles
});

// Data selectors
const selectStudioId = state => state.studio.id;
const selectStudioTitle = state => state.studio.title;
const selectStudioDescription = state => state.studio.description;
const selectStudioImage = state => state.studio.image;
const selectStudioOpenToAll = state => state.studio.openToAll;
const selectStudioCommentsAllowed = state => state.studio.commentsAllowed;
const selectIsFetchingInfo = state => state.studio.infoStatus === Status.FETCHING;
const selectIsFollowing = state => state.studio.following;
const selectIsFetchingRoles = state => state.studio.rolesStatus === Status.FETCHING;

// Thunks
const getInfo = () => ((dispatch, getState) => {
    const studioId = selectStudioId(getState());
    api({uri: `/studios/${studioId}`}, (err, body, res) => {
        if (err || typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(setFetchStatus('infoStatus', Status.ERROR, err));
            return;
        }
        dispatch(setInfo({
            title: body.title,
            description: body.description,
            image: body.image,
            openToAll: body.open_to_all,
            commentsAllowed: body.comments_allowed,
            updated: new Date(body.history.modified),
            followers: body.stats.followers,
            owner: body.owner
        }));
    });
});

const getRoles = () => ((dispatch, getState) => {
    dispatch(setFetchStatus('rolesStatus', Status.FETCHING));
    const state = getState();
    const studioId = selectStudioId(state);
    const username = selectUsername(state);
    const token = selectToken(state);
    api({
        uri: `/studios/${studioId}/users/${username}`,
        authentication: token
    }, (err, body, res) => {
        if (err || typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(setFetchStatus('rolesStatus', Status.ERROR, err));
            return;
        }
        dispatch(setRoles({
            manager: body.manager,
            curator: body.curator,
            following: body.following,
            invited: body.invited
        }));
    });
});

module.exports = {
    getInitialState,
    studioReducer,
    Status,

    // Thunks
    getInfo,
    getRoles,
    setInfo,
    setRoles,

    // Selectors
    selectStudioId,
    selectStudioTitle,
    selectStudioDescription,
    selectStudioImage,
    selectStudioOpenToAll,
    selectStudioCommentsAllowed,
    selectIsFetchingInfo,
    selectIsFetchingRoles,
    selectIsFollowing
};
