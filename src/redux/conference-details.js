var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;

var Types = keyMirror({
    SET_DETAILS: null,
    SET_DETAILS_FETCHING: null,
    SET_DETAILS_ERROR: null
});

module.exports.detailsReducer = function (state, action) {
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

module.exports.setDetailsError = function (error) {
    return {
        type: Types.SET_DETAILS_ERROR,
        error: error
    };
};

module.exports.setDetails = function (details) {
    return {
        type: Types.SET_DETAILS,
        details: details
    };
};

module.exports.setDetailsFetching = function () {
    return {
        type: Types.SET_DETAILS_FETCHING,
        fetching: true
    };
};

module.exports.startGetDetails = function (id) {
    return function (dispatch) {
        dispatch(module.exports.setDetailsFetching());
        dispatch(module.exports.getDetails(id));
    };
};

module.exports.getDetails = function (id) {
    return function (dispatch) {
        api({
            uri: '/conference/' + id + '/details'
        }, function (err, body) {
            if (err) {
                dispatch(module.exports.setDetailsError(err));
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
                    dispatch(module.exports.setDetails(detailsObject));
                } else {
                    dispatch(module.exports.setDetailsError('Not Found'));
                }
                return;
            }
        });
    };
};
