import keyMirror from 'keymirror';
import api from '../../../lib/api';
import {selectUsername} from '../../../redux/session';
import {userProjects, projects} from './redux-modules';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null
});

const Filters = keyMirror({
    SHARED: null,
    FAVORITED: null,
    RECENT: null
});

const Uris = {
    [Filters.SHARED]: username => `/users/${username}/projects`,
    [Filters.FAVORITED]: username => `/users/${username}/favorites`,
    [Filters.RECENT]: username => `/users/${username}/recent`
};

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode !== 200) return Errors.SERVER;
    return null;
};

const loadUserProjects = type => ((dispatch, getState) => {
    const state = getState();
    const username = selectUsername(state);
    const projectCount = userProjects.selector(state).items.length;
    const projectsPerPage = 20;
    dispatch(userProjects.actions.loading());
    api({
        uri: Uris[type](username),
        params: {limit: projectsPerPage, offset: projectCount}
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(userProjects.actions.error(error));
        const moreToLoad = body.length === projectsPerPage;
        const studioProjectIds = projects.selector(getState()).items.map(item => item.id);
        const loadedProjects = body.map(item => Object.assign(item, {
            inStudio: studioProjectIds.indexOf(item.id) !== -1
        }));
        dispatch(userProjects.actions.append(loadedProjects, moreToLoad));
    });
});

// Re-export clear so that the consumer can manage filter changes
const clearUserProjects = userProjects.actions.clear;

export {
    Filters,
    loadUserProjects,
    clearUserProjects
};
