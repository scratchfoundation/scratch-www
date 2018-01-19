const keyMirror = require('keymirror');
const api = require('../lib/api');

const Types = keyMirror({
    SET_DETAILS: null,
    SET_DETAILS_FETCHING: null,
    SET_DETAILS_ERROR: null
});

module.exports.detailsReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = {};
    }
    switch (action.type) {
    case Types.SET_DETAILS:
        return action.details;
    case Types.SET_DETAILS_FETCHING:
        return {fetching: action.fetching};
    case Types.SET_DETAILS_ERROR:
        return {error: action.error};
    default:
        return state;
    }
};

module.exports.setDetailsError = error => ({
    type: Types.SET_DETAILS_ERROR,
    error: error
});

module.exports.setDetails = details => ({
    type: Types.SET_DETAILS,
    details: details
});

module.exports.setDetailsFetching = () => ({
    type: Types.SET_DETAILS_FETCHING,
    fetching: true
});

module.exports.getDetails = id => (dispatch => {
    api({
        uri: `/conference/${id}/details`
    }, (err, body) => {
        if (err) {
            dispatch(module.exports.setDetailsError(err));
            return;
        }

        if (typeof body !== 'undefined') {
            const columns = body.columns;
            if (body.rows) {
                const details = body.rows[0];
                const detailsObject = details.reduce((prev, cur, index) => {
                    prev[columns[index]] = cur;
                    return prev;
                }, {});
                dispatch(module.exports.setDetails(detailsObject));
            } else {
                dispatch(module.exports.setDetailsError('Not Found'));
            }
            return;
        }
        dispatch(module.exports.setDetailsError('An unexpected error occurred'));
        return;
    });
});

module.exports.startGetDetails = id => (dispatch => {
    dispatch(module.exports.setDetailsFetching());
    dispatch(module.exports.getDetails(id));
});
