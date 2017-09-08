var connect = require('react-redux').connect;
var React = require('react');

var messageActions = require('../../redux/messages.js');
var render = require('../../lib/render.jsx');
var sessionActions = require('../../redux/session.js');

var Page = require('../../components/page/www/page.jsx');
var MessagesPresentation = require('./presentation.jsx');

var Messages = React.createClass({
    type: 'ConnectedMessages',
    getInitialState: function () {
        return {
            filterValues: [],
            displayedMessages: []
        };
    },
    getDefaultProps: function () {
        return {
            sessionStatus: sessionActions.Status.NOT_FETCHED,
            user: {},
            flags: {},
            messageOffset: 0,
            numNewMessages: 0
        };
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.user != prevProps.user) {
            if (this.props.user.token) {
                this.props.dispatch(
                    messageActions.getMessages(
                        this.props.user.username,
                        this.props.user.token,
                        this.props.messages,
                        this.props.messageOffset
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
    },
    componentDidMount: function () {
        if (this.props.user.token) {
            this.props.dispatch(
                messageActions.getMessages(
                    this.props.user.username,
                    this.props.user.token,
                    this.props.messages,
                    this.props.messageOffset
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
    },
    handleFilterClick: function (field, choice) {
        switch (choice) {
        case 'comments':
            return this.setState({filterValues: ['addcomment']});
        case 'projects':
            return this.setState({filterValues: [
                'loveproject',
                'favoriteproject',
                'remixproject'
            ]});
        case 'studios':
            return this.setState({filterValues: [
                'curatorinvite',
                'studioactivity',
                'becomeownerstudio'
            ]});
        case 'forums':
            return this.setState({filterValues: ['forumpost']});
        default:
            return this.setState({filterValues: []});
        }
    },
    handleMessageDismiss: function (messageType, messageId) {
        var adminMessages = null;
        if (messageType === 'notification') {
            adminMessages = this.props.adminMessages;
        }
        this.props.dispatch(
            messageActions.clearAdminMessage(
                messageType, messageId, this.props.numNewMessages, adminMessages
            )
        );
    },
    handleLoadMoreMessages: function () {
        this.props.dispatch(
            messageActions.getMessages(
                this.props.user.username,
                this.props.user.token,
                this.props.messages,
                this.props.messageOffset
            )
        );
    },
    filterMessages: function (messages, typesAllowed) {
        var filteredMessages = [];
        for (var i in messages) {
            if (typesAllowed.indexOf(messages[i].type) > -1) {
                filteredMessages.push(messages[i]);
            }
        }
        return filteredMessages;
    },
    render: function () {
        var loadMore = true;
        if (this.props.messageOffset > this.props.messages.length && this.props.messageOffset > 0) {
            loadMore = false;
        }

        var messages = this.props.messages;
        if (this.state.filterValues.length > 0) {
            messages = this.filterMessages(messages, this.state.filterValues);
        }

        return(
            <MessagesPresentation
                sessionStatus={this.props.sessionStatus}
                user={this.props.user}
                messages={messages}
                adminMessages={this.props.adminMessages}
                scratcherInvite={this.props.invite}
                numNewMessages={this.props.numNewMessages}
                handleFilterClick={this.handleFilterClick}
                handleAdminDismiss={this.handleMessageDismiss}
                loadMore={loadMore}
                loadMoreMethod={this.handleLoadMoreMessages}
                requestStatus={this.props.requestStatus}
            />
        );
    }
});

var mapStateToProps = function (state) {
    return {
        sessionStatus: state.session.status,
        user: state.session.session.user,
        flags: state.session.session.flags,
        numNewMessages: state.messageCount.messageCount,
        messages: state.messages.messages.social,
        adminMessages: state.messages.messages.admin,
        invite: state.messages.messages.invite[0],
        messageOffset: state.messages.messages.socialOffset,
        requestStatus: state.messages.status
    };
};

var ConnectedMessages = connect(mapStateToProps)(Messages);
render(
    <Page><ConnectedMessages /></Page>,
    document.getElementById('app'),
    {messages: messageActions.messagesReducer}
);
