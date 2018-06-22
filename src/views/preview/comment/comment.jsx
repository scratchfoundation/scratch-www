const React = require('react');
const PropTypes = require('prop-types');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const FormattedRelative = require('react-intl').FormattedRelative;

require('./comment.scss');

const Comment = ({
    author,
    content,
    datetime_created,
    id,
    parent_id,
    reply_count
}) => (
    <div
        className="flex-row comment"
        id={`comments-${id}`}
    >
        <a href={`/users/${author.username}`}>
            <Avatar src={author.image} />
        </a>
        <FlexRow className="comment-body column">
            <FlexRow className="comment-top-row">
                <a
                    className="username"
                    href={`/users/${author.username}`}
                >@{author.username}</a>
                <div className="action-list">
                    <span>Delete</span>
                    <span>Report</span>
                </div>
            </FlexRow>
            <div className="comment-bubble">
                <span className="comment-content">{content}</span>
                <FlexRow className="comment-bottom-row">
                    <FormattedRelative value={new Date(datetime_created)} />
                    <a href={`#comments-${id}`}>reply</a>
                </FlexRow>
            </div>
        </FlexRow>
    </div>
);

Comment.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        username: PropTypes.string
    }),
    content: PropTypes.string,
    datetime_created: PropTypes.string,
    id: PropTypes.number,
    parent_id: PropTypes.number,
    reply_count: PropTypes.number
};

module.exports = Comment;
