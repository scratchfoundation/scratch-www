var keyMirror = require('keymirror');
var api = require('../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');

var Types = keyMirror({
    SET_NEWS: null,
    SET_NEWS_STATUS: null,
    SET_NEWS_ERROR: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = function () {
    return {status: module.exports.Status.FETCHING, news: []};
};

module.exports.newsReducer = function (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_NEWS:
        return defaultsDeep({news: action.news}, state);
    case Types.SET_NEWS_STATUS:
        return defaultsDeep({status: action.status}, state);
    case Types.SET_NEWS_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setNewsError = function (error) {
    return {
        type: Types.SET_NEWS_ERROR,
        error: error
    };
};

module.exports.setNews = function (news) {
    return {
        type: Types.SET_NEWS,
        news: news
    };
};

module.exports.setStatus = function (status){
    return {
        type: Types.SET_NEWS_STATUS,
        status: status
    };
};

module.exports.getNews = function () {
    return function (dispatch) {
        dispatch(module.exports.setStatus(module.exports.Status.NOT_FETCHED));
        api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (err) return dispatch(module.exports.setNewsError(err));

            if (typeof body !== 'undefined') {
                dispatch(module.exports.setNews(body));
                dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
                return;
            }
        });
    };
};
