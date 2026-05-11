const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const Types = keyMirror({
    SET_READ_ONLY_ERROR: null
});

const getInitialState = () => ({
    readOnlyError: false
});

module.exports.apiErrorReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = getInitialState();
    }
    switch (action.type) {
    case Types.SET_READ_ONLY_ERROR:
        return defaults({readOnlyError: action.value}, state);
    default:
        return state;
    }
};

module.exports.setReadOnlyError = () => ({
    type: Types.SET_READ_ONLY_ERROR,
    value: true
});

module.exports.clearReadOnlyError = () => ({
    type: Types.SET_READ_ONLY_ERROR,
    value: false
});
