import keyMirror from 'keymirror';
import api from '../../../lib/api';
import {selectToken, selectUsername} from '../../../redux/session';
import {selectClassroomId} from '../../../redux/studio';
import {userProjects, projects} from './redux-modules';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null
});

const Filters = keyMirror({
    SHARED: null,
    FAVORITED: null,
    RECENT: null,
    STUDENTS: null
});

const Endpoints = {
    [Filters.SHARED]: state => ({
        uri: `/users/${selectUsername(state)}/projects`
    }),
    [Filters.FAVORITED]: state => ({
        uri: `/users/${selectUsername(state)}/favorites`
    }),
    [Filters.RECENT]: state => ({
        uri: `/users/${selectUsername(state)}/projects/recentlyviewed`,
        authentication: selectToken(state)
    }),
    [Filters.STUDENTS]: state => ({
        uri: `/classrooms/${selectClassroomId(state)}/projects`,
        authentication: selectToken(state)
    })
};

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode !== 200) return Errors.SERVER;
    return null;
};

const loadUserProjects = type => ((dispatch, getState) => {
    const state = getState();
    const projectCount = userProjects.selector(state).items.length;
    const projectsPerPage = 24;
    const opts = {
        ...Endpoints[type](state),
        params: {
            limit: projectsPerPage,
            offset: projectCount
        }
    };
    dispatch(userProjects.actions.loading());
    api(opts, (err, body, res) => {
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
