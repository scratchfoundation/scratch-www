var keyMirror = require('keymirror');
var pickBy = require('lodash.pickBy');

var Types = {
    SET_STATE: 'splash/activity/SET_LAYOUT',
    SET_ERROR: 'splash/activity/SET_ERROR'
};

function reducer (state, action) {
    if (typeof state === 'undefined') {
        state = reducer.getInitialState();
    }
    switch (action.type) {
    case Types.SET_STATE:
        return action.layout;
    case Types.SET_ERROR:
        return state;
    default:
        return state;
    }
}

reducer.Layouts = keyMirror({
    COLS4: null,
    COLS6: null,
    COLS8: null,
    COLS12: null
});

reducer.mediaQueries = {
    COLS4: window.matchMedia('screen and (max-width: 479px)'),
    COLS6: window.matchMedia('screen and (min-width: 480px) and (max-width: 639px)'),
    COLS8: window.matchMedia('screen and (min-width: 640px) and (max-width: 941px)'),
    COLS12: window.matchMedia('screen and (min-width: 942px)')
};

reducer.getInitialState = function () {
    return reducer.Layouts.COLS12;
};

reducer.setLayout = function (layout) {
    return {
        type: Types.SET_STATE,
        layout: layout
    };
};

reducer.setLayoutError = function (error) {
    return {
        type: Types.SET_ERROR,
        error: error
    };
};

reducer.getLayout = function () {
    return function (dispatch) {
        var matched = pickBy(reducer.mediaQueries, function (value, key) { //eslint-disable-line
            return value.matches;
        });
        dispatch(reducer.setLayout(Object.keys(matched)[0]));
    };
};

module.exports = reducer;
