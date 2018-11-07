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
            error: null,
            appealId: null
        };
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
                // Note: does not reset the message state
                this.setState({
                    status: ComposeStatus.REJECTED,
                    error: body.rejected,
                    appealId: body.appealId
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
                                    <FormattedMessage id="comments.posting" />
                                ) : (
                                    <FormattedMessage id="comments.post" />
                                )}
                            </Button>
                            <Button
                                className="compose-cancel"
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
        );
    }
}

ComposeComment.propTypes = {
    commenteeId: PropTypes.number,
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
    user: state.session.session.user
});

const ConnectedComposeComment = connect(
    mapStateToProps
)(ComposeComment);

module.exports = ConnectedComposeComment;
