import keyMirror from 'keymirror';

import api from '../../../lib/api';
import {curators, managers} from './redux-modules';
import {selectUsername, selectToken} from '../../../redux/session';
import {selectStudioId, setRoles, setInfo} from '../../../redux/studio';
import {withAdmin} from '../../../lib/admin-requests';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null,
    PASSWORD: null,
    DUPLICATE: null,
    USER_MUTED: null,
    UNKNOWN_USERNAME: null,
    RATE_LIMIT: null,
    MANAGER_LIMIT: null,
    CANNOT_BE_HOST: null,
    UNHANDLED: null
});

const PER_PAGE_LIMIT = 24;

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 400 && body.message === 'too many owners') {
        return Errors.MANAGER_LIMIT;
    }
    if (res.statusCode === 403 && body.mute_status) return Errors.USER_MUTED;
    if (res.statusCode === 401 && body.message === 'password incorrect') {
        return Errors.PASSWORD;
    }
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode === 404) return Errors.UNKNOWN_USERNAME;
    if (res.statusCode === 409) return Errors.CANNOT_BE_HOST;
    if (res.statusCode === 429) return Errors.RATE_LIMIT;
    if (res.statusCode !== 200) return Errors.SERVER;
    if (body && body.status === 'error') {
        if (body.message.indexOf('already a curator') !== -1) {
            return Errors.DUPLICATE;
        }
        return Errors.UNHANDLED;
    }
    return null;
};

const loadManagers = (reloadAll = false) => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const managerCount = reloadAll ? 0 : managers.selector(state).items.length;
    const opts = {
        uri: `/studios/${studioId}/managers/`,
        params: {limit: PER_PAGE_LIMIT, offset: managerCount}
    };
    api(withAdmin(opts, state), (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(managers.actions.error(error));
        if (reloadAll) dispatch(managers.actions.clear());
        dispatch(managers.actions.append(body, body.length === PER_PAGE_LIMIT));
    });
});

const loadCurators = () => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const curatorCount = curators.selector(state).items.length;
    const opts = {
        uri: `/studios/${studioId}/curators/`,
        params: {limit: PER_PAGE_LIMIT, offset: curatorCount}
    };
    api(withAdmin(opts, state), (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(curators.actions.error(error));
        dispatch(curators.actions.append(body, body.length === PER_PAGE_LIMIT));
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
        dispatch(setInfo({managers: state.studio.managers - 1}));
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
    username = username.trim();
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
        dispatch(managers.actions.create(curatorItem, true));
        dispatch(setInfo({managers: state.studio.managers + 1}));
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
            dispatch(curators.actions.create(userBody, true));
            setTimeout(() => {
                dispatch(setRoles({invited: false, curator: true}));
            }, 5 * 1000);
            return resolve();
        });
    });
}));

const transferHost = (password, newHostName, newHostId) =>
    ((dispatch, getState) => new Promise((resolve, reject) => {
        const state = getState();
        const studioId = selectStudioId(state);
        const token = selectToken(state);
        newHostName = newHostName.trim();
        api({
            uri: `/studios/${studioId}/transfer/${newHostName}`,
            method: 'PUT',
            authentication: token,
            withCredentials: true,
            useCsrf: true,
            json: {password: password}
        }, (err, body, res) => {
            const error = normalizeError(err, body, res);
            if (error) return reject(error);
            dispatch(setInfo({owner: newHostId}));
            return resolve();
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
    removeManager,
    transferHost
};
