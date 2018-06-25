const React = require('react');
const PropTypes = require('prop-types');

const api = require('../../../lib/api');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

const CommentContainer = ({
    author,
    content,
    datetime_created,
    id,
    parent_id,
    reply_count
}) => (
    <FlexRow className="comment-container">
        <Comment {...{author, content, datetime_created, id}} />
        {reply_count > 0 && // eslint-disable-line camelcase
            <FlexRow
                className="replies column"
                key={parent_id} // eslint-disable-line camelcase
            >
                {[].map(reply => (
                    <Comment
                        {...reply}
                        key={reply.id}
                    />
                ))}
            </FlexRow>
        }
    </FlexRow>
);

CommentContainer.propTypes = {
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

module.exports = CommentContainer;
