const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const FormattedRelative = require('react-intl').FormattedRelative;
const FormattedMessage = require('react-intl').FormattedMessage;
const ComposeComment = require('./compose-comment.jsx');
const DeleteCommentModal = require('../../../components/modal/comments/delete-comment.jsx');
const ReportCommentModal = require('../../../components/modal/comments/report-comment.jsx');

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
            'handleToggleReplying',
            'handleRestore'
        ]);
        this.state = {
            deleting: false,
            reporting: false,
            reportConfirmed: false,
            replying: false
        };
    }

    handlePostReply (comment) {
        this.setState({replying: false});
        this.props.onAddComment(comment);
    }

    handleToggleReplying () {
        this.setState({replying: !this.state.replying});
    }

    handleDelete () {
        this.setState({deleting: true});
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

    render () {
        const {
            author,
            deletable,
            canReply,
            content,
            datetimeCreated,
            id,
            projectId,
            visibility
        } = this.props;

        const visible = visibility === 'visible';

        return (
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
                            {visible ? (
                                <React.Fragment>
                                    {deletable ? (
                                        <span
                                            className="comment-delete"
                                            onClick={this.handleDelete}
                                        >
                                            <FormattedMessage id="comments.delete" />
                                        </span>
                                    ) : null}
                                    <span
                                        className="comment-report"
                                        onClick={this.handleReport}
                                    >
                                        <FormattedMessage id="comments.report" />
                                    </span>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <span className="comment-visibility">
                                        <FormattedMessage id={`comments.status.${visibility}`} />
                                    </span>
                                    {this.props.onRestore && (
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
                            'comment-bubble-reported': !visible
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
                            {(canReply && visible) ? (
                                <span
                                    className="comment-reply"
                                    onClick={this.handleToggleReplying}
                                >
                                    <FormattedMessage id="comments.reply" />
                                </span>
                            ) : null}
                        </FlexRow>
                    </div>

                    {this.state.replying ? (
                        <FlexRow className="comment-reply-row">
                            <ComposeComment
                                parentId={id}
                                projectId={projectId}
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
    projectId: PropTypes.string,
    visibility: PropTypes.string
};

module.exports = Comment;
