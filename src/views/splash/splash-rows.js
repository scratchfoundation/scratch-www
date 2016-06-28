var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = keyMirror({
    SET_GLOBAL_ROWS: null,
    SET_GLOBAL_STATUS: null,
    SET_CUSTOM_ROWS: null,
    SET_CUSTOM_STATUS: null,
    SET_ROWS_ERROR: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = function (){
    return {
        globalStatus: module.exports.Status.NOT_FETCHED,
        customStatus: module.exports.Status.NOT_FETCHED,
        global:{},
        custom:{}
    };
};

module.exports.reducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_GLOBAL_ROWS:
        return defaultsDeep({global: action.row}, state);
    case Types.SET_GLOBAL_STATUS:
        return defaultsDeep({globalStatus: action.status}, state);
    case Types.SET_CUSTOM_ROWS:
        return defaultsDeep({custom: action.row}, state);
    case Types.SET_CUSTOM_STATUS:
        return defaultsDeep({customStatus: action.status}, state);
    case Types.SET_ROWS_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setRowsError = function (error) {
    return {
        type: Types.SET_ROWS_ERROR,
        error: error
    };
};

module.exports.setRow = function (row, type) {
    return {
        type: type,
        row: row
    };
};

module.exports.setStatus = function (status, type){
    return {
        type: type,
        status: status
    };
};

module.exports.getGlobal = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.FETCHING, Types.SET_GLOBAL_STATUS));
        api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setRowsError(err));

            if (typeof body !== 'undefined') {
                dispatch(module.exports.setRow(body, Types.SET_GLOBAL_ROWS));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED, Types.SET_GLOBAL_STATUS));
                return;
            }
        });
    };
};

module.exports.getCustom = function (id) {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.FETCHING, Types.SET_CUSTOM_STATUS));
        api({
            uri: '/proxy/users/' + id + '/featured'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setRowsError(err));

            if (typeof body !== 'undefined') {
                dispatch(module.exports.setRow(body, Types.SET_CUSTOM_ROWS));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED, Types.SET_CUSTOM_STATUS));
                return;
            }
        });
    };
};
