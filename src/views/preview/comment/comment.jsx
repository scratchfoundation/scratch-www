const React = require('react');
const PropTypes = require('prop-types');
const classNames = require('classnames');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const FormattedRelative = require('react-intl').FormattedRelative;

require('./comment.scss');

const Comment = ({
    author,
    deletable,
    deleted,
    content,
    datetimeCreated,
    onDelete,
    id
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
                >{author.username}</a>
                <div className="action-list">
                    {deletable ? (
                        <span
                            className="comment-delete"
                            onClick={onDelete}
                        >
                            Delete {/* TODO internationalize */}
                        </span>
                    ) : null}
                    <span className="comment-report">
                        Report {/* TODO internationalize */}
                    </span>
                </div>
            </FlexRow>
            <div
                className={classNames({
                    'comment-bubble': true,
                    'comment-bubble-deleted': deleted
                })}
            >
                {/* TODO: at the moment, comment content does not properly display
                  * emojis/easter eggs
                  * @user links in replies 
                  * links to scratch.mit.edu pages
                  */}
                <span className="comment-content">{content}</span>
                <FlexRow className="comment-bottom-row">
                    <span className="comment-time">
                        <FormattedRelative value={new Date(datetimeCreated)} />
                    </span>
                    <a
                        className="comment-reply"
                        href={`#comments-${id}`}
                    >
                        reply
                    </a>
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
    datetimeCreated: PropTypes.string,
    deletable: PropTypes.bool,
    deleted: PropTypes.bool,
    id: PropTypes.number,
    onDelete: PropTypes.func
};

module.exports = Comment;
