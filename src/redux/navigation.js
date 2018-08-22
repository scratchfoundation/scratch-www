const keyMirror = require('keymirror');

const Types = keyMirror({
    SET_SEARCH_TERM: null
});

module.exports.navigationReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_SEARCH_TERM:
        return action.searchTerm;
    default:
        return state;
    }
};

module.exports.setSearchTerm = searchTerm => ({
    type: Types.SET_SEARCH_TERM,
    searchTerm: searchTerm
});
