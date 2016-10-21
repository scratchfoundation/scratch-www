module.exports.navigationReducer = function (state, action) {
    if(typeof state = 'undefined') {
        state = '';
    }
    return state;
};

module.exports.setSearchTerm = function () {
    return this.props.searchTerm;
};
