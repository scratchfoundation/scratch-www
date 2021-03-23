const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const keyMirror = require('keymirror');
const FormattedMessage = require('react-intl').FormattedMessage;

const Formsy = require('formsy-react').default;
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const InplaceInput = require('../../../components/forms/inplace-input.jsx');
const Button = require('../../../components/forms/button.jsx');
const CommentingStatus = require('../../../components/commenting-status/commenting-status.jsx');
const MuteModal = require('../../../components/modal/mute/modal.jsx');
const formatTime = require('../../../lib/format-time');

const connect = require('react-redux').connect;

const api = require('../../../lib/api');

require('./comment.scss');

const onUpdate = update => update;

const MAX_COMMENT_LENGTH = 500;
const JUST_MUTED_ERROR = 'isBad';

const ComposeStatus = keyMirror({
    EDITING: null,
    SUBMITTING: null,
    REJECTED: null, // comment rejected for a reason other than muting (such as commenting too quickly)
    REJECTED_MUTE: null, // comment made in this ComposeComment was rejected and muted the user
    COMPOSE_DISALLOWED: null // user is already muted due to past behavior
});

class ComposeComment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePost',
            'handleCancel',
            'handleInput',
            'handleMuteClose',
            'handleMuteOpen',
            'isMuted',
            'setupMuteExpirationTimeout'
        ]);
        const muteExpiresAtMs = this.props.muteStatus.muteExpiresAt ?
            this.props.muteStatus.muteExpiresAt * 1000 : 0; // convert to ms
        this.state = {
            message: '',
            status: muteExpiresAtMs > Date.now() ? ComposeStatus.COMPOSE_DISALLOWED : ComposeStatus.EDITING,
            error: null,
            appealId: null,
            muteOpen: muteExpiresAtMs > Date.now() && this.props.isReply,
            muteExpiresAtMs: muteExpiresAtMs,
            muteType: this.props.muteStatus.currentMessageType,
            showWarning: this.props.muteStatus.showWarning ? this.props.muteStatus.showWarning : false
        };
        if (this.isMuted()) {
            this.setupMuteExpirationTimeout(muteExpiresAtMs);
        }
    }
    setupMuteExpirationTimeout (muteExpiresAtMs) {
        // Change state when the mute expiration fires if the user is still on the page.
        setTimeout(() => {
            this.setState(
                {message: '', muteExpiresAtMs: 0, muteOpen: false, status: ComposeStatus.EDITING, error: null});
        }, muteExpiresAtMs - Date.now());
    }
    handleInput (event) {
        this.setState({
            message: event.target.value,
            status: ComposeStatus.EDITING,
            error: null,
            appealId: null
        });
    }
    handlePost () {
        this.setState({status: ComposeStatus.SUBMITTING});
        api({
            uri: `/proxy/comments/project/${this.props.projectId}`,
            authentication: this.props.user.token,
            withCredentials: true,
            method: 'POST',
            useCsrf: true,
            json: {
                content: this.state.message,
                parent_id: this.props.parentId || '',
                commentee_id: this.props.commenteeId || ''
            }
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                body = {rejected: 'error'};
            }
            if (body.rejected && this.state.status === ComposeStatus.SUBMITTING) {
                let muteOpen = false;
                let muteExpiresAtMs = 0;
                let rejectedStatus = ComposeStatus.REJECTED;
                let justMuted = true;
                let showWarning = false;
                let muteType = null;
                if (body.status && body.status.mute_status) {
                    muteExpiresAtMs = body.status.mute_status.muteExpiresAt * 1000; // convert to ms

                    if (body.rejected === JUST_MUTED_ERROR) {
                        rejectedStatus = ComposeStatus.REJECTED_MUTE;
                    } else {
                        rejectedStatus = ComposeStatus.COMPOSE_DISALLOWED;
                        justMuted = false;
                    }

                    if (this.shouldShowMuteModal(body.status.mute_status, justMuted)) {
                        muteOpen = true;
                    }
                    
                    showWarning = body.status.mute_status.showWarning;
                    muteType = body.status.mute_status.currentMessageType;
                    this.setupMuteExpirationTimeout(muteExpiresAtMs);
                }
                // Note: does not reset the message state
                this.setState({
                    status: rejectedStatus,
                    error: body.rejected,
                    appealId: body.appealId,
                    muteOpen: muteOpen,
                    muteExpiresAtMs: muteExpiresAtMs,
                    muteType: muteType,
                    showWarning: showWarning
                });
                return;
            }

            // Clear the text field and reset status on successful submission
            this.setState({
                message: '',
                status: ComposeStatus.EDITING,
                error: null,
                appealId: null
            });

            // Add the username, which isn't included right now from scratch-api
            if (body.author) body.author.username = this.props.user.username;

            this.props.onAddComment(body);
        });
    }

    convertToMinutesFromNow (timeStampInSec) {
        return Math.ceil(((timeStampInSec * 1000) - Date.now()) / (60 * 1000));
    }

    isMuted () {
        return this.state.muteExpiresAtMs > Date.now();
    }

    handleMuteClose () {
        this.setState({
            muteOpen: false
        });

        // Cancel (i.e. complete) the reply action if the user clicked on the reply button while
        // alreay muted. This "closes" the reply.  If they just got muted, we want to leave it open
        // so the blue CommentingStatus box shows.
        if (this.props.isReply && this.state.status === ComposeStatus.COMPOSE_DISALLOWED) {
            this.handleCancel();
        }
    }

    handleMuteOpen () {
        this.setState({
            muteOpen: true
        });
    }
    shouldShowMuteModal (muteStatus, justMuted) {
        // We should show the mute modal if the user is in danger of being blocked or
        // when the user is newly muted or hasn't seen it for a while.
        // We don't want to show it more than about once a week.
        // A newly muted user has only 1 offense and it happened in the last coulpe of minutes.
        // If a user has more than 1 offense, it means that they have have been muted in the
        // last week.
        // Assumption: The offenses list is ordered by time with the most recent at the end.

        // This check is here just in case we somehow get bad data back from a backend.
        if (!muteStatus || !muteStatus.offenses) {
            return false;
        }

        // If the user is already muted (for example, in a different tab),
        // do not show modal unless the comment is a reply. We always want to show
        // the modal on replies when the user is already muted because the blue box
        // may be out-of-sight for them.
        if (!justMuted) {
            if (this.props.isReply) {
                return true;
            }
            return false;
        }

        // If the backend tells us to show a warning about getting blocked, we should show the modal
        // regardless of what the offenses list looks like.
        if (muteStatus.showWarning) {
            return true;
        }

        const offensesList = muteStatus.offenses;
        const numOffenses = offensesList.length;
        // This isn't intended to be called if there are no offenses, but
        // say no just in case.
        if (numOffenses === 0) {
            return false;
        }

        const mostRecent = offensesList[numOffenses - 1];
        const creationTimeMinutesAgo = this.convertToMinutesFromNow(mostRecent.createdAt);
        return creationTimeMinutesAgo < 2 && numOffenses === 1;
    }

    getMuteModalStartStep () {
        // Decides which step of the mute modal to start on. If this was a reply button click,
        // we show them the step that tells them how much time is left on their mute, otherwise
        // they start at the beginning of the progression.
        return this.props.isReply && this.state.status === ComposeStatus.COMPOSE_DISALLOWED ?
            MuteModal.steps.MUTE_INFO : MuteModal.steps.COMMENT_ISSUE;
    }

    getMuteMessageInfo (justMuted) {
        // return the ids for the messages that are shown for this mute type
        // If mute modals have more than one unique "step" we could pass an array of steps
        const messageInfo = {
            pii: {
                name: 'pii',
                commentType: justMuted ? 'comment.type.pii' : 'comment.type.pii.past',
                muteStepHeader: 'comment.pii.header',
                muteStepContent: ['comment.pii.content1', 'comment.pii.content2', 'comment.pii.content3']
            },
            unconstructive: {
                name: 'unconstructive',
                commentType: justMuted ? 'comment.type.unconstructive' : 'comment.type.unconstructive.past',
                muteStepHeader: 'comment.unconstructive.header',
                muteStepContent: [
                    justMuted ? 'comment.unconstructive.content1' : 'comment.type.unconstructive.past',
                    'comment.unconstructive.content2'
                ]
            },
            vulgarity: {
                name: 'vulgarity',
                commentType: justMuted ? 'comment.type.vulgarity' : 'comment.type.vulgarity.past',
                muteStepHeader: 'comment.vulgarity.header',
                muteStepContent: [
                    justMuted ? 'comment.vulgarity.content1' : 'comment.type.vulgarity.past',
                    'comment.vulgarity.content2'
                ]
            },
            spam: {
                name: 'spam',
                commentType: justMuted ? 'comment.type.spam' : 'comment.type.spam.past',
                muteStepHeader: 'comment.spam.header',
                muteStepContent: ['comment.spam.content1', 'comment.spam.content2']
            },
            general: {
                name: 'general',
                commentType: justMuted ? 'comment.type.general' : 'comment.type.general.past',
                muteStepHeader: 'comment.general.header',
                muteStepContent: ['comment.general.content1']
            }
        };

        if (this.state.muteType && messageInfo[this.state.muteType]) {
            return messageInfo[this.state.muteType];
        }
        return messageInfo.general;
    }

    handleCancel () {
        this.setState({
            message: '',
            status: ComposeStatus.EDITING,
            error: null,
            appealId: null
        });
        if (this.props.onCancel) this.props.onCancel();
    }

    render () {
        return (
            <React.Fragment>
                {/* If a user is muted, show the blue mute box, unless
                the comment is a reply and the user was already muted before attempting to make it. */}
                {(this.isMuted() && !(this.props.isReply && this.state.status === ComposeStatus.COMPOSE_DISALLOWED)) ? (
                    <FlexRow className="comment">
                        <CommentingStatus>
                            <p>
                                <FormattedMessage
                                    id={this.getMuteMessageInfo(this.state.status === ComposeStatus.REJECTED_MUTE).commentType}
                                />
                            </p>
                            <p>
                                <FormattedMessage
                                    id="comments.muted.duration"
                                    values={{
                                        inDuration:
                                        formatTime.formatRelativeTime(this.state.muteExpiresAtMs, window._locale)
                                    }}
                                /> <FormattedMessage id="comments.muted.commentingPaused" />
                            </p>
                            <p className="bottom-text">
                                <FormattedMessage
                                    id="comments.muted.moreInfoModal"
                                    values={{clickHereLink: (
                                        <a
                                            href="#comment"
                                            onClick={this.handleMuteOpen}
                                        >
                                            <FormattedMessage id="comments.muted.clickHereLinkText" />
                                        </a>
                                    )}}
                                />
                            </p>
                        </CommentingStatus>
                    </FlexRow>
                ) : null }
                {this.state.status === ComposeStatus.COMPOSE_DISALLOWED ? null : (
                    <div
                        className={classNames('flex-row',
                            'comment',
                            this.state.status === ComposeStatus.REJECTED_MUTE ?
                                'compose-disabled' : '')}
                    >
                        <a href={`/users/${this.props.user.username}`}>
                            <Avatar src={this.props.user.thumbnailUrl} />
                        </a>
                        <FlexRow className="compose-comment column">
                            {this.state.status === ComposeStatus.REJECTED ? (
                                <FlexRow className="compose-error-row">
                                    <div className="compose-error-tip">
                                        <FormattedMessage
                                            id={`comments.${this.state.error}`}
                                            values={{
                                                appealId: this.state.appealId
                                            }}
                                        />
                                    </div>
                                </FlexRow>
                            ) : null}
                            <Formsy className="full-width-form">
                                <InplaceInput
                                    className={classNames('compose-input',
                                        MAX_COMMENT_LENGTH - this.state.message.length >= 0 ?
                                            'compose-valid' : 'compose-invalid')}
                                    disabled={this.state.status === ComposeStatus.REJECTED_MUTE}
                                    handleUpdate={onUpdate}
                                    name="compose-comment"
                                    type="textarea"
                                    value={this.state.message}
                                    onInput={this.handleInput}
                                />
                                <FlexRow className="compose-bottom-row">
                                    <Button
                                        className="compose-post"
                                        disabled={
                                            this.state.status === ComposeStatus.SUBMITTING ||
                                            this.state.status === ComposeStatus.REJECTED_MUTE
                                        }
                                        onClick={this.handlePost}
                                    >
                                        {this.state.status === ComposeStatus.SUBMITTING ? (
                                            <FormattedMessage id="comments.posting" />
                                        ) : (
                                            <FormattedMessage id="comments.post" />
                                        )}
                                    </Button>
                                    <Button
                                        className="compose-cancel"
                                        disabled={this.state.status === ComposeStatus.REJECTED_MUTE}
                                        onClick={this.handleCancel}
                                    >
                                        <FormattedMessage id="comments.cancel" />
                                    </Button>
                                    <span
                                        className={classNames('compose-limit',
                                            MAX_COMMENT_LENGTH - this.state.message.length >= 0 ?
                                                'compose-valid' : 'compose-invalid')}
                                    >
                                        <FormattedMessage
                                            id="comments.lengthWarning"
                                            values={{
                                                remainingCharacters: MAX_COMMENT_LENGTH - this.state.message.length
                                            }}
                                        />
                                    </span>
                                </FlexRow>
                            </Formsy>
                        </FlexRow>
                    </div>
                )}
                {this.state.muteOpen ? (
                    <MuteModal
                        isOpen
                        showCloseButton
                        useStandardSizes
                        className="mod-mute"
                        commentContent={this.state.message}
                        muteModalMessages={this.getMuteMessageInfo(this.state.status === ComposeStatus.REJECTED_MUTE)}
                        shouldCloseOnOverlayClick={false}
                        showFeedback={
                            this.state.status === ComposeStatus.REJECTED_MUTE
                        }
                        showWarning={this.state.showWarning}
                        startStep={this.getMuteModalStartStep()}
                        timeMuted={formatTime.formatRelativeTime(this.state.muteExpiresAtMs, window._locale)}
                        user={this.props.user}
                        onRequestClose={this.handleMuteClose}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

ComposeComment.propTypes = {
    commenteeId: PropTypes.number,
    isReply: PropTypes.bool,
    muteStatus: PropTypes.shape({
        offenses: PropTypes.array,
        muteExpiresAt: PropTypes.number,
        currentMessageType: PropTypes.string,
        showWarning: PropTypes.bool
    }),
    onAddComment: PropTypes.func,
    onCancel: PropTypes.func,
    parentId: PropTypes.number,
    projectId: PropTypes.string,
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string
    })
};

const mapStateToProps = state => ({
    muteStatus: state.session.session.permissions.mute_status ?
        state.session.session.permissions.mute_status :
        {muteExpiresAt: 0, offenses: [], showWarning: false},
    user: state.session.session.user
});

const ConnectedComposeComment = connect(
    mapStateToProps
)(ComposeComment);

module.exports = ConnectedComposeComment;
