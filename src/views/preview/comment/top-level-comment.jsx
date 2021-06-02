const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('./comment.jsx');
const CommentingStatus = require('../../../components/commenting-status/commenting-status.jsx');

require('./comment.scss');

// Thread limit only applies if hasThreadLimit prop is true
const THREAD_LIMIT = 25;

class TopLevelComment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleExpandThread',
            'handleAddComment',
            'handleDeleteReply',
            'handleReplyStatus',
            'handleReportReply',
            'handleRestoreReply'
        ]);
        this.state = {
            expanded: this.props.defaultExpanded,
            threadLimitCommentId: '',
            threadLimitParentId: ''
        };

        // A cache of {userId: username, ...} in order to show reply usernames
        this.authorUsernameCache = {};
    }

    handleExpandThread () {
        if (this.state.expanded) {
            this.props.onLoadMoreReplies(this.props.id, this.props.replies.length);
        } else {
            this.setState({expanded: true});
        }
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

    handleReplyStatus (id, parentId) {
        // Send the parentId up to track which thread got "reply" clicked on
        if (this.props.onReply) this.props.onReply(parentId);
        this.setState({threadLimitCommentId: id, threadLimitParentId: parentId});
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
            canDeleteWithoutConfirm,
            canReply,
            canReport,
            canRestore,
            content,
            datetimeCreated,
            hasThreadLimit,
            highlightedCommentId,
            id,
            moreRepliesToLoad,
            onDelete,
            onReport,
            onRestore,
            replies,
            postURI,
            threadHasReplyStatus,
            visibility
        } = this.props;

        const parentVisible = visibility === 'visible';

        // Check whether this comment thread has reached the thread limit
        const hasReachedThreadLimit = hasThreadLimit && replies.length >= THREAD_LIMIT;
        
        /*
            Check all the following conditions:
            - hasReachedThreadLimit: the thread has reached the limit
            - threadHasReplyStatus: this thread should be showing the status
                (false, if the user just clicked reply elsewhere and another thread/comment stole the status message)
            - Use the comment id and parent id of this particular comment in this thread
                to see if it has the reply status,
                only one comment in a thread can have the status

            All of these conditions together ensure that the user only sees one status message on the comments page.
        */
        const commentHasReplyStatus = (commentId, commentParentId) =>
            hasReachedThreadLimit &&
            threadHasReplyStatus &&
            (this.state.threadLimitCommentId === commentId) &&
            (this.state.threadLimitParentId === commentParentId);

        return (
            <FlexRow className="comment-container">
                <Comment
                    highlighted={highlightedCommentId === id}
                    postURI={postURI}
                    onAddComment={this.handleAddComment}
                    onReply={this.handleReplyStatus}
                    {...{
                        author,
                        content,
                        datetimeCreated,
                        canDelete,
                        canDeleteWithoutConfirm,
                        canReply,
                        canReport,
                        canRestore,
                        hasReachedThreadLimit,
                        id,
                        onDelete,
                        onReport,
                        onRestore,
                        visibility
                    }}
                />
                {commentHasReplyStatus(id, id) &&
                    <CommentingStatus className="thread-limit-status">
                        <p>
                            <FormattedMessage id="comments.replyLimitReached" />
                        </p>
                    </CommentingStatus>
                }
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
                            <React.Fragment
                                key={`reply-and-status-${reply.id}`}
                            >
                                <Comment
                                    author={reply.author}
                                    canDelete={canDelete}
                                    canDeleteWithoutConfirm={canDeleteWithoutConfirm}
                                    canReply={canReply}
                                    canReport={canReport}
                                    canRestore={canRestore && parentVisible}
                                    content={reply.content}
                                    datetimeCreated={reply.datetime_created}
                                    hasReachedThreadLimit={hasReachedThreadLimit}
                                    highlighted={highlightedCommentId === reply.id}
                                    id={reply.id}
                                    key={reply.id}
                                    parentId={id}
                                    postURI={postURI}
                                    replyUsername={this.authorUsername(reply.commentee_id)}
                                    visibility={reply.visibility}
                                    onAddComment={this.handleAddComment}
                                    onDelete={this.handleDeleteReply}
                                    onReply={this.handleReplyStatus}
                                    onReport={this.handleReportReply}
                                    onRestore={this.handleRestoreReply}
                                />
                                {commentHasReplyStatus(reply.id, id) &&
                                    <CommentingStatus className="thread-limit-status">
                                        <p>
                                            <FormattedMessage id="comments.replyLimitReached" />
                                        </p>
                                    </CommentingStatus>
                                }
                            </React.Fragment>
                        ))}
                        {((!this.state.expanded && replies.length > 3) ||
                            (this.state.expanded && moreRepliesToLoad)) &&
                            <a
                                className="expand-thread"
                                onClick={this.handleExpandThread}
                            >
                                <FormattedMessage id="comments.loadMoreReplies" />
                            </a>
                        }
                    </FlexRow>
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
    canDeleteWithoutConfirm: PropTypes.bool,
    canReply: PropTypes.bool,
    canReport: PropTypes.bool,
    canRestore: PropTypes.bool,
    content: PropTypes.string,
    datetimeCreated: PropTypes.string,
    defaultExpanded: PropTypes.bool,
    deletable: PropTypes.bool,
    hasThreadLimit: PropTypes.bool,
    highlightedCommentId: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    id: PropTypes.number,
    moreRepliesToLoad: PropTypes.bool,
    onAddComment: PropTypes.func,
    onDelete: PropTypes.func,
    onLoadMoreReplies: PropTypes.func,
    onReply: PropTypes.func,
    onReport: PropTypes.func,
    onRestore: PropTypes.func,
    parentId: PropTypes.number,
    postURI: PropTypes.string,
    replies: PropTypes.arrayOf(PropTypes.object),
    threadHasReplyStatus: PropTypes.bool,
    visibility: PropTypes.string
};

TopLevelComment.defaultProps = {
    canDeleteWithoutConfirm: false,
    defaultExpanded: false,
    hasThreadLimit: false,
    moreRepliesToLoad: false,
    threadHasReplyStatus: false
};

module.exports = TopLevelComment;
