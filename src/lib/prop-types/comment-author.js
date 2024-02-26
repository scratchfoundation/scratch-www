const PropTypes = require('prop-types');

const commentAuthor = PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    scratchteam: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired
});

module.exports = commentAuthor;
