import keyMirror from 'keymirror';
import api from '../../../lib/api';

import {selectToken} from '../../../redux/session';
import {selectStudioId} from '../../../redux/studio';

import {projects} from './redux-modules';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null,
    UNKNOWN_PROJECT: null,
    RATE_LIMIT: null
});

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode === 404) return Errors.UNKNOWN_PROJECT;
    if (res.statusCode === 429) return Errors.RATE_LIMIT;
    if (res.statusCode !== 200) return Errors.SERVER;
    return null;
};

const loadProjects = () => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const projectCount = projects.selector(state).items.length;
    const projectsPerPage = 20;
    api({
        uri: `/studios/${studioId}/projects/`,
        params: {limit: projectsPerPage, offset: projectCount}
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(projects.actions.error(error));
        dispatch(projects.actions.append(body, body.length === projectsPerPage));
    });
});

/**
 * Generate a project list item matching the shape of the initial
 * project list request. The POST request that adds projects would
 * ideally respond with this format directly. For now, merge data
 * from the POST and a follow-up GET request for additional project data.
 *
 * @param {object} postBody - body of response to POST that adds the project
 * @param {object} infoBody - body of the follow-up GET for more project data.
 * @returns {object} project list item
 */
const generateProjectListItem = (postBody, infoBody) => ({
    // Fields from the POST to add the project to the studio
    id: parseInt(postBody.projectId, 10),
    actor_id: postBody.actorId,
    // Fields from followup GET for more project info
    title: infoBody.title,
    image: infoBody.image,
    creator_id: infoBody.author.id,
    username: infoBody.author.username,
    avatar: infoBody.author.profile.images
});
                        
const addProject = projectId => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const token = selectToken(state);
    api({
        uri: `/studios/${studioId}/project/${projectId}`,
        method: 'POST',
        authentication: token
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);

        // Would prefer if the POST returned the exact data / format we want...
        api({uri: `/projects/${projectId}`}, (infoErr, infoBody, infoRes) => {
            const infoError = normalizeError(infoErr, infoBody, infoRes);
            if (infoError) return reject(infoError);
            const newItem = generateProjectListItem(body, infoBody);
            dispatch(projects.actions.create(newItem));
            return resolve(newItem);
        });
    });
}));

const removeProject = projectId => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const token = selectToken(state);
    api({
        uri: `/studios/${studioId}/project/${projectId}`,
        method: 'DELETE',
        authentication: token
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);
        const index = projects.selector(getState()).items
            .findIndex(v => v.id === projectId);
        if (index !== -1) dispatch(projects.actions.remove(index));
        return resolve();
    });
}));

export {
    Errors,
    loadProjects,
    addProject,
    removeProject
};
