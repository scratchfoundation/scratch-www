const keyMirror = require('keymirror');

const api = require('../lib/api');
const log = require('../lib/log');

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    ERROR: null
});

module.exports.getInitialState = () => ({
    status: {
        project: module.exports.Status.NOT_FETCHED,
        credit: module.exports.Status.NOT_FETCHED,
        comments: module.exports.Status.NOT_FETCHED,
        remixes: module.exports.Status.NOT_FETCHED,
        studios: module.exports.Status.NOT_FETCHED
    },
    projectInfo: {},
    remixes: [],
    credit: {},
    comments: [],
    studios: []
});

module.exports.previewReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'SET_PROJECT_INFO':
        return Object.assign({}, state, {
            projectInfo: action.info
        });
    case 'SET_REMIXES':
        return Object.assign({}, state, {
            remixes: action.items
        });
    case 'SET_CREDIT':
        return Object.assign({}, state, {
            credit: action.info
        });
    case 'SET_COMMENTS':
        return Object.assign({}, state, {
            comments: action.items
        });
    case 'SET_FETCH_STATUS':
        state = JSON.parse(JSON.stringify(state));
        state.status[action.infoType] = action.status;
        return state;
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

module.exports.setProjectInfo = (info) => ({
    type: 'SET_PROJECT_INFO',
    info: info
});

module.exports.setCreditInfo = (info) => ({
    type: 'SET_CREDIT',
    info: info
});

module.exports.setRemixes = (items) => ({
    type: 'SET_REMIXES',
    items: items
});

module.exports.setFetchStatus = (type, status) => ({
    type: 'SET_FETCH_STATUS',
    infoType: type,
    status: status
});

module.exports.getProjectInfo = (id) => (dispatch => {
    dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}`
    }, (err, body) => {
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
        dispatch(module.exports.setFetchStatus('project', module.exports.Status.FETCHED));
        dispatch(module.exports.setProjectInfo(body));
    });
})

module.exports.getCreditInfo = (id) => (dispatch => {
    dispatch(module.exports.setFetchStatus('credit', module.exports.Status.FETCHING));
    api({
        uri: `/projects/${id}`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('credit', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined') {
            dispatch(module.exports.setFetchStatus('credit', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No credit info'));
            return;
        }
        dispatch(module.exports.setFetchStatus('credit', module.exports.Status.FETCHED));
        dispatch(module.exports.setCreditInfo(body));
    });
})

module.exports.getRemixes = (id) => (dispatch => {
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
})
