var keyMirror = require('keymirror');

var Types = keyMirror({
    SET_SEARCH_TERM: null
});

module.exports.navigationReducer = function (state, action) {
    if(typeof state = 'undefined') {
        state = '';
    }
    switch (action.type) {
        case Types.SET_SEARCH_TERM:
            return action.setSearchTerm;
        default:
            return state;
    }
};

module.exports.setSearchTerm = function (searchTerm) {
    return {
        type: Types.SET_SEARCH_TERM,
        searchTerm: searchTerm
    };
};
