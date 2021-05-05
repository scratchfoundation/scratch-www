import keyMirror from 'keymirror';

import api from '../../../lib/api';
import {curators, managers} from './redux-modules';
import {selectUsername} from '../../../redux/session';
import {selectStudioId, setRoles} from '../../../redux/studio';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null,
    DUPLICATE: null
});

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode !== 200) return Errors.SERVER;
    if (body && body.status === 'error') {
        if (body.message.indexOf('already a curator') !== -1) {
            return Errors.DUPLICATE;
        }
        return Errors.UNHANDLED;
    }
    return null;
};

const loadManagers = () => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const managerCount = managers.selector(state).items.length;
    const managersPerPage = 20;
    api({
        uri: `/studios/${studioId}/managers/`,
        params: {limit: managersPerPage, offset: managerCount}
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(managers.actions.error(error));
        dispatch(managers.actions.append(body, body.length === managersPerPage));
    });
});

const loadCurators = () => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const curatorCount = curators.selector(state).items.length;
    const curatorsPerPage = 20;
    api({
        uri: `/studios/${studioId}/curators/`,
        params: {limit: curatorsPerPage, offset: curatorCount}
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(curators.actions.error(error));
        dispatch(curators.actions.append(body, body.length === curatorsPerPage));
    });
});

const removeManager = username => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    api({
        uri: `/site-api/users/curators-in/${studioId}/remove/`,
        method: 'PUT',
        withCredentials: true,
        useCsrf: true,
        params: {usernames: username}, // sic, ?usernames=<username>
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);

        // Note `body` is undefined, this endpoint returns an html fragment
        const index = managers.selector(getState()).items
            .findIndex(v => v.username === username);
        if (index !== -1) dispatch(managers.actions.remove(index));
        // If you are removing yourself, update roles so you stop seeing the manager UI
        if (selectUsername(state) === username) {
            dispatch(setRoles({manager: false}));
        }
        return resolve();
    });
}));

const removeCurator = username => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    api({
        uri: `/site-api/users/curators-in/${studioId}/remove/`,
        method: 'PUT',
        withCredentials: true,
        useCsrf: true,
        params: {usernames: username}, // sic, ?usernames=<username>
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);

        // Note `body` is undefined, this endpoint returns an html fragment
        const index = curators.selector(getState()).items
            .findIndex(v => v.username === username);
        if (index !== -1) dispatch(curators.actions.remove(index));
        return resolve();
    });
}));

const inviteCurator = username => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    api({
        uri: `/site-api/users/curators-in/${studioId}/invite_curator/`,
        method: 'PUT',
        withCredentials: true,
        useCsrf: true,
        params: {usernames: username}, // sic, ?usernames=<username>
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);
        // eslint-disable-next-line no-alert
        alert(`successfully invited ${username}`);
        return resolve(username);
    });
}));

const promoteCurator = username => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const studioId = selectStudioId(state);
    api({
        uri: `/site-api/users/curators-in/${studioId}/promote/`,
        method: 'PUT',
        withCredentials: true,
        useCsrf: true,
        params: {usernames: username}, // sic, ?usernames=<username>
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);
        const curatorList = curators.selector(getState()).items;
        const index = curatorList.findIndex(v => v.username === username);
        const curatorItem = curatorList[index];
        if (index !== -1) dispatch(curators.actions.remove(index));
        dispatch(managers.actions.create(curatorItem));
        return resolve();
    });
}));

const acceptInvitation = () => ((dispatch, getState) => new Promise((resolve, reject) => {
    const state = getState();
    const username = selectUsername(state);
    const studioId = selectStudioId(state);
    api({
        uri: `/site-api/users/curators-in/${studioId}/add/`,
        method: 'PUT',
        withCredentials: true,
        useCsrf: true,
        params: {usernames: username}, // sic, ?usernames=<username>
        host: '' // Not handled by the API, use existing infrastructure
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return reject(error);
        api({uri: `/users/${username}`}, (userErr, userBody, userRes) => {
            const userError = normalizeError(userErr, userBody, userRes);
            if (userError) return reject(userError);
            // Note: this assumes that the user items from the curator endpoint
            // are the same structure as the single user data returned from /users/:username
            dispatch(curators.actions.create(userBody));
            dispatch(setRoles({invited: false, curator: true}));
            return resolve();
        });
    });
}));

export {
    Errors,
    loadManagers,
    loadCurators,
    inviteCurator,
    acceptInvitation,
    promoteCurator,
    removeCurator,
    removeManager
};
