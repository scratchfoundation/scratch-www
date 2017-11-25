import keyMirror from 'keymirror';
import api from '../lib/api';

var Types = keyMirror({
    SET_DETAILS: null,
    SET_DETAILS_FETCHING: null,
    SET_DETAILS_ERROR: null
});

export function detailsReducer(state, action) {
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
}

export function setDetailsError(error) {
    return {
        type: Types.SET_DETAILS_ERROR,
        error: error
    };
}

export function setDetails(details) {
    return {
        type: Types.SET_DETAILS,
        details: details
    };
}

export function setDetailsFetching() {
    return {
        type: Types.SET_DETAILS_FETCHING,
        fetching: true
    };
}

export function startGetDetails(id) {
    return function (dispatch) {
        dispatch(setDetailsFetching());
        dispatch(getDetails(id));
    };
}

export function getDetails(id) {
    return function (dispatch) {
        api({
            uri: '/conference/' + id + '/details'
        }, function (err, body) {
            if (err) {
                dispatch(setDetailsError(err));
                return;
            }

            if (typeof body !== 'undefined') {
                var columns = body.columns;
                if (body.rows) {
                    var details = body.rows[0];
                    var detailsObject = details.reduce(function (prev, cur, index) {
                        prev[columns[index]] = cur;
                        return prev;
                    }, {});
                    dispatch(setDetails(detailsObject));
                } else {
                    dispatch(setDetailsError('Not Found'));
                }
                return;
            } else {
                dispatch(setDetailsError('An unexpected error occurred'));
                return;
            }
        });
    };
}
