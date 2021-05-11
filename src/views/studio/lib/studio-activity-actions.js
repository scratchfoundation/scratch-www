import keyMirror from 'keymirror';

import api from '../../../lib/api';
import {activity} from './redux-modules';
import {selectStudioId} from '../../../redux/studio';

const Errors = keyMirror({
    NETWORK: null,
    SERVER: null,
    PERMISSION: null
});

const normalizeError = (err, body, res) => {
    if (err) return Errors.NETWORK;
    if (res.statusCode === 401 || res.statusCode === 403) return Errors.PERMISSION;
    if (res.statusCode !== 200) return Errors.SERVER;
    return null;
};

const loadActivity = () => ((dispatch, getState) => {
    const state = getState();
    const studioId = selectStudioId(state);
    const items = activity.selector(state).items;
    const params = {limit: 20};
    if (items.length > 0) {
        // dateLimit is the newest notification you want to get back, which is
        // the date of the oldest one we've already loaded
        params.dateLimit = items[items.length - 1].datetime_created;
    }
    api({
        uri: `/studios/${studioId}/activity/`,
        params
    }, (err, body, res) => {
        const error = normalizeError(err, body, res);
        if (error) return dispatch(activity.actions.error(error));
        const ids = items.map(item => item.id);
        // Deduplication is needed because pagination based on date can contain duplicates
        const deduped = body.filter(item => ids.indexOf(item.id) === -1);
        dispatch(activity.actions.append(deduped, body.length === params.limit));
    });
});

export {loadActivity};
