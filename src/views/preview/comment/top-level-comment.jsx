const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');

require('./comment.scss');

class TopLevelComment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleExpandThread',
            'handleAddComment',
            'handleDeleteReply',
            'handleReportReply',
            'handleRestoreReply'
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

    handleDeleteReply (replyId) {
        // Only apply topLevelCommentId for deleting replies
        // The top level comment itself just gets passed onDelete directly
        this.props.onDelete(replyId, this.props.id);
    }

    handleReportReply (replyId) {
        // Only apply topLevelCommentId for reporting replies
        // The top level comment itself just gets passed onReport directly
        this.props.onReport(replyId, this.props.id);
    }

    handleRestoreReply (replyId) {
        this.props.onRestore(replyId, this.props.id);
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
            id,
            onDelete,
            onReport,
            onRestore,
            replies,
            projectId,
            visibility
        } = this.props;

        const canRestoreReplies = visibility === 'visible';

        return (
            <FlexRow className="comment-container">
                <Comment
                    projectId={projectId}
                    onAddComment={this.handleAddComment}
                    {...{
                        author,
                        content,
                        datetimeCreated,
                        deletable,
                        canReply,
                        id,
                        onDelete,
                        onReport,
                        onRestore,
                        visibility
                    }}
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
                                id={reply.id}
                                key={reply.id}
                                projectId={projectId}
                                visibility={reply.visibility}
                                onAddComment={this.handleAddComment}
                                onDelete={this.handleDeleteReply}
                                onReport={this.handleReportReply}
                                onRestore={canRestoreReplies && this.handleRestoreReply}
                            />
                        ))}
                    </FlexRow>
                }
                {!this.state.expanded && replies.length > 3 &&
                    <a
                        className="expand-thread"
                        onClick={this.handleExpandThread}
                    >
                        <FormattedMessage
                            id="comments.seeMoreReplies"
                            values={{
                                repliesCount: replies.length
                            }}
                        />
                    </a>
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
    id: PropTypes.number,
    onAddComment: PropTypes.func,
    onDelete: PropTypes.func,
    onReport: PropTypes.func,
    onRestore: PropTypes.func,
    parentId: PropTypes.number,
    projectId: PropTypes.string,
    replies: PropTypes.arrayOf(PropTypes.object),
    visibility: PropTypes.string
};

module.exports = TopLevelComment;
