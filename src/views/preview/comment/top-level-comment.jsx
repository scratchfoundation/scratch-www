const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

class TopLevelComment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleExpandThread',
            'handleAddComment',
            'handleDeleteComment'
        ]);
        this.state = {
            expanded: false
        };
    }

    handleExpandThread () {
        this.setState({
            expanded: true
        });
    }

    handleDeleteReply (commentId) {
        // Only apply topLevelCommentId for deleting replies
        // The top level comment itself just gets passed onDelete directly
        this.props.onDelete(commentId, this.props.id);
    }

    handleAddComment (comment) {
        this.props.onAddComment(comment, this.props.id);
    }

    render () {
        const {
            author,
            canReply,
            content,
            datetimeCreated,
            deletable,
            deleted,
            id,
            onDelete,
            replies,
            projectId
        } = this.props;

        return (
            <FlexRow className="comment-container">
                <Comment
                    projectId={projectId}
                    onAddComment={this.handleAddComment}
                    {...{author, content, datetimeCreated, deletable, deleted, canReply, id, onDelete}}
                />
                {replies.length > 0 &&
                    <FlexRow
                        className={classNames(
                            'replies',
                            'column',
                            {collapsed: !this.state.expanded && replies.length > 3}
                        )}
                        key={id}
                    >
                        {(this.state.expanded ? replies : replies.slice(0, 3)).map(reply => (
                            <Comment
                                author={reply.author}
                                canReply={canReply}
                                content={reply.content}
                                datetimeCreated={reply.datetime_created}
                                deletable={deletable}
                                deleted={reply.deleted}
                                id={reply.id}
                                key={reply.id}
                                projectId={projectId}
                                onAddComment={this.handleAddComment}
                                onDelete={this.handleDeleteReply}
                            />
                        ))}
                    </FlexRow>
                }
                {!this.state.expanded && replies.length > 3 &&
                    <a
                        className="expand-thread"
                        onClick={this.handleExpandThread}
                    >See all {replies.length} replies</a>
                }
            </FlexRow>
        );
    }
}

TopLevelComment.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        image: PropTypes.string,
        username: PropTypes.string
    }),
    canReply: PropTypes.bool,
    content: PropTypes.string,
    datetimeCreated: PropTypes.string,
    deletable: PropTypes.bool,
    deleted: PropTypes.bool,
    id: PropTypes.number,
    onAddComment: PropTypes.func,
    onDelete: PropTypes.func,
    parentId: PropTypes.number,
    projectId: PropTypes.string,
    replies: PropTypes.arrayOf(PropTypes.object)
};

module.exports = TopLevelComment;
