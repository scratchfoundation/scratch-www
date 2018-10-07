const React = require('react');
const PropTypes = require('prop-types');
const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const keyMirror = require('keymirror');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Avatar = require('../../../components/avatar/avatar.jsx');
const InplaceInput = require('../../../components/forms/inplace-input.jsx');
const Button = require('../../../components/forms/button.jsx');

const connect = require('react-redux').connect;

const api = require('../../../lib/api');

require('./comment.scss');

const onUpdate = update => update;

const MAX_COMMENT_LENGTH = 500;

const ComposeStatus = keyMirror({
    EDITING: null,
    SUBMITTING: null,
    REJECTED: null
});

/* TODO translations */
const CommentErrorMessages = {
    isEmpty: "You can't post an empty comment",
    isFlood: "Woah, seems like you're commenting really quickly. Please wait longer between posts.",
    isBad: 'Hmm...the bad word detector thinks there is a problem with your comment. ' +
        'Please change it and remember to be respectful.',
    hasChatSite: 'Uh oh! This comment contains a link to a website with unmoderated chat.' +
        'For safety reasons, please do not link to these sites!',
    isSpam: "Hmm, seems like you've posted the same comment a bunch of times. Please don't spam.",
    isMuted: "Hmm, the filterbot is pretty sure your recent comments weren't ok for Scratch, " +
        'so your account has been muted for the rest of the day. :/',
    isUnconstructive: 'Hmm, the filterbot thinks your comment may be mean or disrespectful. ' +
        'Remember, most projects on Scratch are made by people who are just learning how to program.',
    isDisallowed: 'Hmm, it looks like comments have been turned off for this page. :/',
    // TODO implement the special modal for ip mute bans that includes links to appeals
    //      this is just a stub of the actual message
    isIPMuted: 'Sorry, the Scratch Team had to prevent your network from sharing comments or ' +
        'projects because it was used to break our community guidelines too many times.' +
        'You can still share comments and projects from another network.',
    isTooLong: "That's too long! Please find a way to shorten your text.",
    error: 'Oops! Something went wrong'
};

class ComposeComment extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handlePost',
            'handleCancel',
            'handleInput'
        ]);
        this.state = {
            message: '',
            status: ComposeStatus.EDITING,
            error: null
        };
    }
    handleInput (event) {
        this.setState({
            message: event.target.value,
            status: ComposeStatus.EDITING,
            error: null
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
                comentee_id: this.props.comenteeId || ''
            }
        }, (err, body, res) => {
            if (err || res.statusCode !== 200) {
                body = {rejected: 'error'};
            }

            if (body.rejected && this.state.status === ComposeStatus.SUBMITTING) {
                // Note: does not reset the message state
                this.setState({
                    status: ComposeStatus.REJECTED,
                    // If there is a special error message for the rejected reason,
                    // use it. Otherwise, use the generic 'error' ("Oops!...")
                    error: CommentErrorMessages[body.rejected] ?
                        body.rejected : 'error'
                });
                return;
            }

            // Clear the text field and reset status on successful submission
            this.setState({
                message: '',
                status: ComposeStatus.EDITING,
                error: null
            });

            // Add the username, which isn't included right now from scratch-api
            if (body.author) body.author.username = this.props.user.username;

            this.props.onAddComment(body);
        });
    }
    handleCancel () {
        this.setState({
            message: '',
            status: ComposeStatus.EDITING,
            error: null
        });
        if (this.props.onCancel) this.props.onCancel();
    }
    render () {
        return (
            <div
                className="flex-row comment"
            >
                <a href={`/users/${this.props.user.username}`}>
                    <Avatar src={this.props.user.thumbnailUrl} />
                </a>
                <FlexRow className="compose-comment column">
                    {this.state.error ? (
                        <FlexRow className="compose-error-row">
                            <div className="compose-error-tip">
                                {CommentErrorMessages[this.state.error] || 'Unknown error'}
                            </div>
                        </FlexRow>
                    ) : null}
                    <InplaceInput
                        className={classNames('compose-input',
                            MAX_COMMENT_LENGTH - this.state.message.length >= 0 ? 'compose-valid' : 'compose-invalid')}
                        handleUpdate={onUpdate}
                        name="compose-comment"
                        type="textarea"
                        value={this.state.message}
                        onInput={this.handleInput}
                    />
                    <FlexRow className="compose-bottom-row">
                        <Button
                            className="compose-post"
                            disabled={this.state.status === ComposeStatus.SUBMITTING}
                            onClick={this.handlePost}
                        >
                            {this.state.status === ComposeStatus.SUBMITTING ? (
                                'Posting...' /* TODO internationalize */
                            ) : (
                                'Post' /* TODO internationalize */
                            )}
                        </Button>
                        <Button
                            className="compose-cancel"
                            onClick={this.handleCancel}
                        >
                            Cancel {/* TODO internationalize */}
                        </Button>
                        <span
                            className={classNames('compose-limit',
                                MAX_COMMENT_LENGTH - this.state.message.length >= 0 ?
                                    'compose-valid' : 'compose-invalid')}
                        >
                            {/* TODO internationalize */}
                            {MAX_COMMENT_LENGTH - this.state.message.length} characters left
                        </span>
                    </FlexRow>
                </FlexRow>
            </div>
        );
    }
}

ComposeComment.propTypes = {
    comenteeId: PropTypes.number,
    onAddComment: PropTypes.func,
    onCancel: PropTypes.func,
    parentId: PropTypes.number,
    projectId: PropTypes.number,
    user: PropTypes.shape({
        id: PropTypes.number,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string
    })
};

const mapStateToProps = state => ({
    user: state.session.session.user
});

const ConnectedComposeComment = connect(
    mapStateToProps
)(ComposeComment);

module.exports = ConnectedComposeComment;
