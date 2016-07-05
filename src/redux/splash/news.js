var keyMirror = require('keymirror');
var api = require('../../mixins/api.jsx').api;
var defaultsDeep = require('lodash.defaultsdeep');


function reducer (state, action) {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
    }
    switch (action.type) {
    case reducer.Types.SET_STATE:
        return defaultsDeep({news: action.news}, state);
    case reducer.Types.SET_STATUS:
        return defaultsDeep({status: action.status}, state);
    case reducer.Types.SET_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
}

reducer.Types = {
    SET_STATE: 'splash/news/SET_NEWS',
    SET_STATUS: 'splash/news/SET_STATUS',
    SET_ERROR: 'splash/news/SET_ERROR'
};

reducer.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

reducer.getInitialState = function () {
    return {status: reducer.Status.NOT_FETCHED, news: []};
};

reducer.setNewsError = function (error) {
    return {
        type: reducer.Types.SET_ERROR,
        error: error
    };
};

reducer.setNews = function (news) {
    return {
        type: reducer.Types.SET_STATE,
        news: news
    };
};

reducer.setStatus = function (status){
    return {
        type: reducer.Types.SET_STATUS,
        status: status
    };
};

reducer.getNews = function () {
    return function (dispatch) {
        dispatch(reducer.setStatus(reducer.Status.FETCHING));
        api({
            uri: '/news?limit=3'
        }, function (err, body) {
            if (err) return dispatch(reducer.setNewsError(err));

            if (typeof body !== 'undefined') {
                dispatch(reducer.setNews(body));
                dispatch(reducer.setStatus(reducer.Status.FETCHED));
                return;
            }
        });
    };
};

module.exports = reducer;
