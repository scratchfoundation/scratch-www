import {connect} from 'react-redux';
import React from 'react';

import {
    getMessages, getAdminMessages, getScratcherInvite,
    setMessages, setAdminMessages, setScratcherInvite, setMessagesOffset,
    clearAdminMessage, messagesReducer
} from '../../redux/messages.js';
import render from '../../lib/render.jsx';
import {Status} from '../../redux/session.js';

import Page from '../../components/page/www/page.jsx';
import MessagesPresentation from './presentation.jsx';

var Messages = React.createClass({
    type: 'ConnectedMessages',
    getInitialState: function () {
        return {
            filter: ''
        };
    },
    getDefaultProps: function () {
        return {
            sessionStatus: Status.NOT_FETCHED,
            user: {},
            flags: {},
            messageOffset: 0,
            numNewMessages: 0
        };
    },
    componentDidUpdate: function (prevProps) {
        if (this.props.user.username !== prevProps.user.username) {
            if (this.props.user.token) {
                this.props.dispatch(
                    getMessages(
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
                    getAdminMessages(
                        this.props.user.username, this.props.user.token, this.props.messageOffset
                    )
                );
                this.props.dispatch(
                    getScratcherInvite(this.props.user.username, this.props.user.token)
                );
            } else {
                // user is logged out, empty messages
                this.props.dispatch(setMessages([]));
                this.props.dispatch(setAdminMessages([]));
                this.props.dispatch(setScratcherInvite({}));
                this.props.dispatch(setMessagesOffset(0));
            }
        }
    },
    componentDidMount: function () {
        if (this.props.user.token) {
            this.props.dispatch(
                getMessages(
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
                getAdminMessages(
                    this.props.user.username, this.props.user.token, this.props.messageOffset
                )
            );
            this.props.dispatch(
                getScratcherInvite(this.props.user.username, this.props.user.token)
            );
        }
    },
    handleFilterClick: function (field, choice) {
        if (this.props.user.token) {
            this.props.dispatch(
                getMessages(
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
    },
    handleMessageDismiss: function (messageType, messageId) {
        var adminMessages = null;
        if (messageType === 'notification') {
            adminMessages = this.props.adminMessages;
        }
        this.props.dispatch(
            clearAdminMessage(
                messageType, messageId, this.props.numNewMessages, adminMessages
            )
        );
    },
    handleLoadMoreMessages: function () {
        this.props.dispatch(
            getMessages(
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
    },
    render: function () {
        var loadMore = true;
        if (this.props.messageOffset > this.props.messages.length && this.props.messageOffset > 0) {
            loadMore = false;
        }

        return(
            <MessagesPresentation
                sessionStatus={this.props.sessionStatus}
                user={this.props.user}
                messages={this.props.messages}
                adminMessages={this.props.adminMessages}
                scratcherInvite={this.props.invite}
                numNewMessages={this.props.numNewMessages}
                handleFilterClick={this.handleFilterClick}
                handleAdminDismiss={this.handleMessageDismiss}
                loadMore={loadMore}
                loadMoreMethod={this.handleLoadMoreMessages}
                requestStatus={this.props.requestStatus}
                filter={this.props.filter}
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
        invite: state.messages.messages.invite,
        messageOffset: state.messages.messages.socialOffset,
        requestStatus: state.messages.status
    };
};

var ConnectedMessages = connect(mapStateToProps)(Messages);
render(
    <Page><ConnectedMessages /></Page>,
    document.getElementById('app'),
    {messages: messagesReducer}
);
