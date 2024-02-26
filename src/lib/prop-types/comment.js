const PropTypes = require('prop-types');

const commentAuthor = require('./comment-author');

const comment = PropTypes.shape({
    id: PropTypes.number.isRequired,
    parent_id: PropTypes.number,
    commentee_id: PropTypes.number,
    content: PropTypes.string.isRequired,
    datetime_created: PropTypes.string.isRequired,
    datetime_modified: PropTypes.string.isRequired,
    visibility: PropTypes.oneOf([
        'visible',
        'deleted',
        'reported'
    ]).isRequired,
    author: commentAuthor.isRequired,
    reply_count: PropTypes.number.isRequired
});

module.exports = comment;
