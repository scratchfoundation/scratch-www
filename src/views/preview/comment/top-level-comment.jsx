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

        // A cache of {userId: username, ...} in order to show reply usernames
        this.authorUsernameCache = {};
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

    authorUsername (authorId) {
        if (this.authorUsernameCache[authorId]) return this.authorUsernameCache[authorId];

        // If the cache misses, rebuild it. Every reply has a parent id that is
        // either a reply to this top level comment or to one of the replies.
        this.authorUsernameCache[this.props.author.id] = this.props.author.username;
        const replies = this.props.replies;
        for (let i = 0; i < replies.length; i++) {
            this.authorUsernameCache[replies[i].author.id] = replies[i].author.username;
        }
        // Default to top level author if no author is found from authorId
        // This can happen if there is no commentee_id stored with the comment
        return this.authorUsernameCache[authorId] || this.props.author.username;
    }

    render () {
        const {
            author,
            canDelete,
            canReply,
            canReport,
            canRestore,
            content,
            datetimeCreated,
            id,
            onDelete,
            onReport,
            onRestore,
            replies,
            projectId,
            visibility
        } = this.props;

        const parentVisible = visibility === 'visible';

        return (
            <FlexRow className="comment-container">
                <Comment
                    projectId={projectId}
                    onAddComment={this.handleAddComment}
                    {...{
                        author,
                        content,
                        datetimeCreated,
                        canDelete,
                        canReply,
                        canReport,
                        canRestore,
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
                                canDelete={canDelete}
                                canReply={canReply}
                                canReport={canReport}
                                canRestore={canRestore && parentVisible}
                                content={reply.content}
                                datetimeCreated={reply.datetime_created}
                                id={reply.id}
                                key={reply.id}
                                parentId={id}
                                projectId={projectId}
                                replyUsername={this.authorUsername(reply.commentee_id)}
                                visibility={reply.visibility}
                                onAddComment={this.handleAddComment}
                                onDelete={this.handleDeleteReply}
                                onReport={this.handleReportReply}
                                onRestore={this.handleRestoreReply}
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
        scratchteam: PropTypes.bool,
        username: PropTypes.string
    }),
    canDelete: PropTypes.bool,
    canReply: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestore: PropTypes.bool,
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
