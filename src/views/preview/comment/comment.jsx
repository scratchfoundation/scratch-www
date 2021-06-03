const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const EmojiText = require('../../../components/emoji-text/emoji-text.jsx');
const FormattedRelative = require('react-intl').FormattedRelative;
const FormattedMessage = require('react-intl').FormattedMessage;
const ComposeComment = require('./compose-comment.jsx');
const DeleteCommentModal = require('../../../components/modal/comments/delete-comment.jsx');
const ReportCommentModal = require('../../../components/modal/comments/report-comment.jsx');
const decorateText = require('../../../lib/decorate-text.jsx');

require('./comment.scss');

class Comment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleDelete',
            'handleCancelDelete',
            'handleConfirmDelete',
            'handleReport',
            'handleConfirmReport',
            'handleCancelReport',
            'handlePostReply',
            'handleReply',
            'handleToggleReplying',
            'handleRestore',
            'setRef'
        ]);
        this.state = {
            deleting: false,
            reporting: false,
            reportConfirmed: false,
            replying: false
        };
    }

    componentDidMount () {
        if (this.props.highlighted) {
            this.ref.scrollIntoView({behavior: 'smooth'});
        }
    }

    handlePostReply (comment) {
        this.setState({replying: false});
        this.props.onAddComment(comment);
    }

    handleReply () {
        if (this.props.hasReachedThreadLimit) {
            this.props.onReply(this.props.id, (this.props.parentId || this.props.id));
        } else {
            this.handleToggleReplying();
        }
    }

    handleToggleReplying () {
        this.setState({replying: !this.state.replying});
    }

    handleDelete () {
        if (this.props.canDeleteWithoutConfirm) {
            this.props.onDelete(this.props.id);
        } else {
            this.setState({deleting: true});
        }
    }

    handleConfirmDelete () {
        this.setState({deleting: false});
        this.props.onDelete(this.props.id);
    }

    handleCancelDelete () {
        this.setState({deleting: false});
    }

    handleReport () {
        this.setState({reporting: true});
    }

    handleRestore () {
        this.props.onRestore(this.props.id);
    }

    handleConfirmReport () {
        this.setState({
            reporting: false,
            reportConfirmed: true,
            deleting: false // To close delete modal if reported from delete modal
        });

        this.props.onReport(this.props.id);
    }

    handleCancelReport () {
        this.setState({
            reporting: false,
            reportConfirmed: false
        });
    }
    setRef (ref) {
        this.ref = ref;
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
            highlighted,
            id,
            parentId,
            postURI,
            replyUsername,
            visibility
        } = this.props;

        // we allow comments that are fully visible, or markedByFilter (flagged by
        // our bad words filter, but not at the critical level of offensiveness)
        const markedByFilter = visibility === 'markedbyfilter';
        const visible = markedByFilter || visibility === 'visible';

        let commentText = content;
        if (replyUsername) {
            commentText = `@${replyUsername} ${commentText}`;
        }
        commentText = decorateText(commentText, {
            scratchLinks: true,
            usernames: true,
            hashtags: false
        });

        return (
            <div
                className={classNames('flex-row', 'comment', {
                    'highlighted-comment': highlighted
                })}
                id={`comments-${id}`}
                ref={this.setRef}
            >
                <a href={`/users/${author.username}`}>
                    <Avatar src={author.image} />
                </a>
                <FlexRow className="comment-body column">
                    <FlexRow className="comment-top-row">
                        <a
                            className="username"
                            href={`/users/${author.username}`}
                        >
                            {author.username}{author.scratchteam ? '*' : ''}
                        </a>
                        <div className="action-list">
                            {visible ? (
                                <React.Fragment>
                                    {canDelete && (
                                        <span
                                            className="comment-delete"
                                            onClick={this.handleDelete}
                                        >
                                            <FormattedMessage id="comments.delete" />
                                        </span>
                                    )}
                                    {canReport && (
                                        <span
                                            className="comment-report"
                                            onClick={this.handleReport}
                                        >
                                            <FormattedMessage id="general.report" />
                                        </span>
                                    )}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <span className="comment-visibility">
                                        <FormattedMessage id={`comments.status.${visibility}`} />
                                    </span>
                                    {canRestore && (
                                        <span
                                            className="comment-restore"
                                            onClick={this.handleRestore}
                                        >
                                            <FormattedMessage id="comments.restore" />
                                        </span>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    </FlexRow>
                    <div
                        className={classNames({
                            'comment-bubble': true,
                            'comment-bubble-markedbyfilter': markedByFilter,
                            'comment-bubble-reported': !visible
                        })}
                    >
                        {/* TODO: at the moment, comment content does not properly display
                          * emojis/easter eggs
                          * @user links in replies
                          * links to scratch.mit.edu pages
                          */}

                        <span className="comment-content">
                            {commentText.map((fragment, index) => {
                                if (typeof fragment === 'string') {
                                    return (
                                        <EmojiText
                                            as="span"
                                            key={`comments-${id}-fragment-${index}`}
                                            text={fragment}
                                        />
                                    );
                                }
                                return fragment;
                            })}
                        </span>
                        <FlexRow className="comment-bottom-row">
                            <span className="comment-time">
                                <FormattedRelative value={new Date(datetimeCreated)} />
                            </span>
                            {(canReply && visible) ? (
                                <span
                                    className="comment-reply"
                                    onClick={this.handleReply}
                                >
                                    <FormattedMessage id="comments.reply" />
                                </span>
                            ) : null}
                        </FlexRow>
                    </div>

                    {this.state.replying ? (
                        <FlexRow className="comment-reply-row">
                            <ComposeComment
                                isReply
                                commenteeId={author.id}
                                parentId={parentId || id}
                                postURI={postURI}
                                onAddComment={this.handlePostReply}
                                onCancel={this.handleToggleReplying}
                            />
                        </FlexRow>
                    ) : null}
                </FlexRow>
                {this.state.deleting ? (
                    <DeleteCommentModal
                        isOpen
                        key="delete-comment-modal"
                        onDelete={this.handleConfirmDelete}
                        onReport={this.handleConfirmReport}
                        onRequestClose={this.handleCancelDelete}
                    />
                ) : null}
                {(this.state.reporting || this.state.reportConfirmed) ? (
                    <ReportCommentModal
                        isOpen
                        isConfirmed={this.state.reportConfirmed}
                        key="report-comment-modal"
                        onReport={this.handleConfirmReport}
                        onRequestClose={this.handleCancelReport}
                    />
                ) : null}
            </div>
        );
    }
}

Comment.propTypes = {
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
    hasReachedThreadLimit: PropTypes.bool,
    highlighted: PropTypes.bool,
    id: PropTypes.number,
    onAddComment: PropTypes.func,
    onDelete: PropTypes.func,
    onReply: PropTypes.func,
    onReport: PropTypes.func,
    onRestore: PropTypes.func,
    parentId: PropTypes.number,
    postURI: PropTypes.string,
    replyUsername: PropTypes.string,
    visibility: PropTypes.string
};

module.exports = Comment;
