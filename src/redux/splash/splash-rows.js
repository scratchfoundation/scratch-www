var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = {
    SET_GLOBAL_ROWS: 'splash/rows/global/SET_ROWS',
    SET_GLOBAL_STATUS: 'splash/rows/global/SET_STATUS',
    SET_CUSTOM_ROWS: 'splash/rows/custom/SET_ROWS',
    SET_CUSTOM_STATUS: 'splash/rows/custom/SET_STATUS',
    SET_ROWS_ERROR: 'splash/rows/SET_ERROR'
};


function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
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
}

reducer.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

reducer.getInitialState = function (){
    return {
        globalStatus: reducer.Status.NOT_FETCHED,
        customStatus: reducer.Status.NOT_FETCHED,
        global:{},
        custom:{}
    };
};

reducer.setRowsError = function (error) {
    return {
        type: Types.SET_ROWS_ERROR,
        error: error
    };
};

reducer.setRow = function (row, type) {
    return {
        type: type,
        row: row
    };
};

reducer.setStatus = function (status, type){
    return {
        type: type,
        status: status
    };
};

reducer.getGlobal = function () {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING, Types.SET_GLOBAL_STATUS));
        api({
            uri: '/proxy/featured'
        }, function (err, body) {
            if (err) return dispatch(reducer.setRowsError(err));

            if (typeof body !== 'undefined') {
                dispatch(reducer.setRow(body, Types.SET_GLOBAL_ROWS));
                dispatch(reducer.setStatus(reducer.Status.FETCHED, Types.SET_GLOBAL_STATUS));
                return;
            }
        });
    };
};

reducer.getCustom = function (id) {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING, Types.SET_CUSTOM_STATUS));
        api({
            uri: '/proxy/users/' + id + '/featured'
        }, function (err, body) {
            if (err) return dispatch(reducer.setRowsError(err));

            if (typeof body !== 'undefined') {
                dispatch(reducer.setRow(body, Types.SET_CUSTOM_ROWS));
                dispatch(reducer.setStatus(reducer.Status.FETCHED, Types.SET_CUSTOM_STATUS));
                return;
            }
        });
    };
};

module.exports = reducer;
