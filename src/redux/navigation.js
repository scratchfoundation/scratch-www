import keyMirror from 'keymirror';

var Types = keyMirror({
    SET_SEARCH_TERM: null
});

export function navigationReducer (state, action) {
    if(typeof state === 'undefined') {
        state = '';
    }
    switch (action.type) {
    case Types.SET_SEARCH_TERM:
        return action.searchTerm;
    default:
        return state;
    }
}

export function setSearchTerm (searchTerm) {
    return {
        type: Types.SET_SEARCH_TERM,
        searchTerm: searchTerm
    };
}
