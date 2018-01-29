const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const MessagesPresentation = require('./presentation.jsx');

const messageActions = require('../../redux/messages.js');
const sessionActions = require('../../redux/session.js');

class Messages extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleFilterClick',
            'handleMessageDismiss',
            'handleLoadMoreMessages'
        ]);
        this.state = {
            filter: ''
        };
    }
    componentDidMount () {
        if (this.props.user.token) {
            this.props.dispatch(
                messageActions.getMessages(
                    this.props.user.username,
                    this.props.user.token,
                    {
                        messages: this.props.messages,
                        offset: this.props.messageOffset,
                        filter: this.state.filter
                    }
                )
            );
            this.props.dispatch(
                messageActions.getAdminMessages(
                    this.props.user.username, this.props.user.token, this.props.messageOffset
                )
            );
            this.props.dispatch(
                messageActions.getScractherInvite(this.props.user.username, this.props.user.token)
            );
        }
    }
    componentDidUpdate (prevProps) {
        if (this.props.user.username !== prevProps.user.username) {
            if (this.props.user.token) {
                this.props.dispatch(
                    messageActions.getMessages(
                        this.props.user.username,
                        this.props.user.token,
                        {
                            messages: this.props.messages,
                            offset: this.props.messageOffset,
                            filter: this.state.filter
                        }
                    )
                );
                this.props.dispatch(
                    messageActions.getAdminMessages(
                        this.props.user.username, this.props.user.token, this.props.messageOffset
                    )
                );
                this.props.dispatch(
                    messageActions.getScratcherInvite(this.props.user.username, this.props.user.token)
                );
            } else {
                // user is logged out, empty messages
                this.props.dispatch(messageActions.setMessages([]));
                this.props.dispatch(messageActions.setAdminMessages([]));
                this.props.dispatch(messageActions.setScratcherInvite({}));
                this.props.dispatch(messageActions.setMessagesOffset(0));
            }
        }
    }
    handleFilterClick (field, choice) {
        if (this.props.user.token) {
            this.props.dispatch(
                messageActions.getMessages(
                    this.props.user.username,
                    this.props.user.token,
                    {
                        filter: choice,
                        clearCount: false
                    }
                )
            );
        }
        this.setState({filter: choice});
    }
    handleMessageDismiss (messageType, messageId) {
        let adminMessages = null;
        if (messageType === 'notification') {
            adminMessages = this.props.adminMessages;
        }
        this.props.dispatch(
            messageActions.clearAdminMessage(
                messageType, messageId, this.props.numNewMessages, adminMessages
            )
        );
    }
    handleLoadMoreMessages () {
        this.props.dispatch(
            messageActions.getMessages(
                this.props.user.username,
                this.props.user.token,
                {
                    messages: this.props.messages,
                    offset: this.props.messageOffset,
                    filter: this.state.filter,
                    clearCount: false
                }
            )
        );
    }
    render () {
        let loadMore = true;
        if (this.props.messageOffset > this.props.messages.length && this.props.messageOffset > 0) {
            loadMore = false;
        }

        return (
            <MessagesPresentation
                adminMessages={this.props.adminMessages}
                filter={this.props.filter}
                loadMore={loadMore}
                messages={this.props.messages}
                numNewMessages={this.props.numNewMessages}
                requestStatus={this.props.requestStatus}
                scratcherInvite={this.props.invite}
                sessionStatus={this.props.sessionStatus}
                user={this.props.user}
                onAdminDismiss={this.handleMessageDismiss}
                onFilterClick={this.handleFilterClick}
                onLoadMoreMethod={this.handleLoadMoreMessages}
            />
        );
    }
}

Messages.propTypes = {
    adminMessages: PropTypes.arrayOf(PropTypes.object),
    dispatch: PropTypes.func.isRequired,
    filter: PropTypes.string,
    invite: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    messageOffset: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object),
    numNewMessages: PropTypes.number.isRequired,
    requestStatus: PropTypes.shape({
        admin: PropTypes.string,
        clear: PropTypes.string,
        message: PropTypes.string,
        delete: PropTypes.string
    }).isRequired,
    sessionStatus: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.number,
        banned: PropTypes.bool,
        username: PropTypes.string,
        token: PropTypes.string,
        thumbnailUrl: PropTypes.string,
        dateJoined: PropTypes.string,
        email: PropTypes.string,
        classroomId: PropTypes.string
    }).isRequired
};

Messages.defaultProps = {
    messageOffset: 0,
    numNewMessages: 0,
    sessionStatus: sessionActions.Status.NOT_FETCHED,
    user: {}
};

const mapStateToProps = state => ({
    sessionStatus: state.session.status,
    user: state.session.session.user,
    numNewMessages: state.messageCount.messageCount,
    messages: state.messages.messages.social,
    adminMessages: state.messages.messages.admin,
    invite: state.messages.messages.invite,
    messageOffset: state.messages.messages.socialOffset,
    requestStatus: state.messages.status
});

const ConnectedMessages = connect(mapStateToProps)(Messages);

render(
    <Page><ConnectedMessages /></Page>,
    document.getElementById('app'),
    {messages: messageActions.messagesReducer}
);
