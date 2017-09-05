var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedNumber = require('react-intl').FormattedNumber;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var Button = require('../../components/forms/button.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var Form = require('../../components/forms/form.jsx');
var Select = require('../../components/forms/select.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

var messageStatuses = require('../../redux/messages').Status;

// Message Components
var AdminMessage = require('./message-rows/admin-message.jsx');
var BecomeManagerMessage = require('./message-rows/become-manager.jsx');
var CommentMessage = require('./message-rows/comment-message.jsx');
var CuratorInviteMessage = require('./message-rows/curator-invite.jsx');
var FavoriteProjectMessage = require('./message-rows/favorite-project.jsx');
var FollowUserMessage = require('./message-rows/follow-user.jsx');
var ForumPostMessage= require('./message-rows/forum-topic-post.jsx');
var LoveProjectMessage = require('./message-rows/love-project.jsx');
var RemixProjectMessage = require('./message-rows/remix-project.jsx');
var ScratcherInvite = require('./message-rows/scratcher-invite.jsx');
var StudioActivityMessage = require('./message-rows/studio-activity.jsx');
var UserJoinMessage = require('./message-rows/user-join.jsx');

require('./messages.scss');

var SocialMessagesList = React.createClass({
    type: 'SocialMessagesList',
    propTypes: {
        loadStatus: React.PropTypes.string,
        messages: React.PropTypes.array.isRequired,
        numNewMessages: React.PropTypes.number,
        loadMore: React.PropTypes.bool.isRequired,
        loadMoreMethod: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            loadStatus: messageStatuses.FETCHING,
            numNewMessages: 0
        };
    },
    getComponentForMessage: function (message, unread) {
        var className = (unread) ? 'mod-unread' : '';
        var key = message.type + '_' + message.id;

        switch (message.type) {
        case 'followuser':
            return <FollowUserMessage
                key={key}
                className={className}
                followerUsername={message.actor_username}
                followDateTime={message.datetime_created}
            />;
        case 'loveproject':
            return <LoveProjectMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.title}
                loveDateTime={message.datetime_created}
            />;
        case 'favoriteproject':
            return <FavoriteProjectMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.project_title}
                favoriteDateTime={message.datetime_created}
            />;
        case 'addcomment':
            return <CommentMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                actorId={message.actor_id}
                objectType={message.comment_type}
                objectId={message.comment_obj_id}
                commentId={message.comment_id}
                commentText={message.comment_fragment}
                commentDateTime={message.datetime_created}
                objectTitle={message.comment_obj_title}
                commentee={message.commentee}
            />;
        case 'curatorinvite':
            return <CuratorInviteMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                studioId={message.gallery_id}
                studioTitle={message.title}
                datetimePromoted={message.datetime_created}
            />;
        case 'remixproject':
            return <RemixProjectMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                projectId={message.project_id}
                projectTitle={message.title}
                parentId={message.parent_id}
                parentTitle={message.parent_title}
                remixDate={message.datetime_created}
            />;
        case 'studioactivity':
            return <StudioActivityMessage
                key={key}
                className={className}
                studioId={message.gallery_id}
                studioTitle={message.title}
                datetimeCreated={message.datetime_created}
            />;
        case 'forumpost':
            return <ForumPostMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                topicId={message.topic_id}
                topicTitle={message.topic_title}
                datetimeCreated={message.datetime_created}
            />;
        case 'becomeownerstudio':
            return <BecomeManagerMessage
                key={key}
                className={className}
                actorUsername={message.actor_username}
                studioId={message.gallery_id}
                studioTitle={message.gallery_title}
                datetimePromoted={message.datetime_created}
            />;
        case 'userjoin':
            return <UserJoinMessage
                key={key}
                className={className}
                datetimeJoined={message.datetime_created}
            />;
        }
    },
    renderSocialMessages: function (messages, unreadCount) {
        var messageList = [];
        for (var i in messages) {
            if (i <= unreadCount) {
                messageList.push(this.getComponentForMessage(messages[i], true));
            } else {
                messageList.push(this.getComponentForMessage(messages[i], false));
            }
        }
        return messageList;
    },
    renderLoadMore: function (loadMore) {
        if (loadMore) {
            return <Button
                onClick={this.props.loadMoreMethod}
                className="messages-social-loadmore white"
                key="load-more"
            >
                <FormattedMessage id='general.loadMore' />
            </Button>;
        }
        return null;
    },
    render: function () {
        if (this.props.loadStatus === messageStatuses.MESSAGES_ERROR) {
            return (
                <section className="messages-social">
                    <div className="messages-social-title">
                        <h4>
                            <FormattedMessage id='messages.messageTitle' />
                        </h4>
                    </div>
                    <p><FormattedMessage id='messages.requestError' /></p>
                </section>
            );
        }

        return (
            <section className="messages-social">
                {this.props.messages.length > 0 ? [
                    <div className="messages-social-title" key="messages-social-title">
                        <h4 className="messages-header">
                            <FormattedMessage id='messages.messageTitle' />
                            <div className="messages-header-unread">
                                <FormattedNumber value={this.props.numNewMessages} />
                            </div>
                        </h4>
                    </div>,
                    <ul className="messages-social-list" key="messages-social-list">
                        {this.renderSocialMessages(this.props.messages, (this.props.numNewMessages - 1))}
                    </ul>,
                    this.renderLoadMore(this.props.loadMore)
                ] : []}
            </section>
        );
    }
});

var MessagesPresentation = injectIntl(React.createClass({
    type: 'MessagesPresentation',
    propTypes: {
        sessionStatus: React.PropTypes.string.isRequired,
        user: React.PropTypes.object.isRequired,
        messages: React.PropTypes.array.isRequired,
        adminMessages: React.PropTypes.array.isRequired,
        scratcherInvite: React.PropTypes.object.isRequired,
        numNewMessages: React.PropTypes.number,
        handleFilterClick: React.PropTypes.func.isRequired,
        handleAdminDismiss: React.PropTypes.func.isRequired,
        loadMore: React.PropTypes.bool.isRequired,
        loadMoreMethod: React.PropTypes.func,
        requestStatus: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        return {
            numNewMessages: 0,
            filterOpen: false
        };
    },
    render: function () {
        var adminMessageLength = this.props.adminMessages.length;
        if (Object.keys(this.props.scratcherInvite).length > 0) {
            adminMessageLength = adminMessageLength + 1;
        }
        var numNewSocialMessages = this.props.numNewMessages - adminMessageLength;
        if (numNewSocialMessages < 0) {
            numNewSocialMessages = 0;
        }

        return (
            <div className="messages">
                <TitleBanner className="mod-messages">
                    <FlexRow className="inner mod-messages-title">
                        <h1 className="title-banner-h1 mod-messages">
                            <FormattedMessage id='messages.messageTitle' />
                        </h1>
                        <div className="messages-title-filter">
                            <Form>
                                <Select
                                    label={this.props.intl.formatMessage({id: 'messages.filterBy'})}
                                    name="messages.filter"
                                    onChange={this.props.handleFilterClick}
                                    options={[
                                        {
                                            label: this.props.intl.formatMessage({id: 'messages.activityAll'}),
                                            value: ''
                                        },
                                        {
                                            label: this.props.intl.formatMessage({id: 'messages.activityComments'}),
                                            value: 'comments'
                                        },
                                        {
                                            label: this.props.intl.formatMessage({id: 'messages.activityProjects'}),
                                            value: 'projects'
                                        },
                                        {
                                            label: this.props.intl.formatMessage({id: 'messages.activityStudios'}),
                                            value: 'studios'
                                        },
                                        {
                                            label: this.props.intl.formatMessage({id: 'messages.activityForums'}),
                                            value: 'forums'
                                        }
                                    ]}
                                />
                            </Form>
                        </div>
                    </FlexRow>
                </TitleBanner>
                <div className="messages-details inner">
                    {this.props.adminMessages.length > 0 || Object.keys(this.props.scratcherInvite).length > 0 ? [
                        <section className="messages-admin">
                            <div className="messages-admin-title">
                                <h4 className="messages-header">
                                    <FormattedMessage id='messages.scratchTeamTitle' />
                                    <div className="messages-header-unread">
                                        <FormattedNumber value={adminMessageLength} />
                                    </div>
                                </h4>
                            </div>
                            <ul className="messages-admin-list">
                                {Object.keys(this.props.scratcherInvite).length > 0 ? [
                                    <ScratcherInvite
                                        id={this.props.scratcherInvite.id}
                                        username={this.props.user.username}
                                        datetimeCreated={this.props.scratcherInvite.datetime_created}
                                        onDismiss={function () {
                                            this.props.handleAdminDismiss('invite', this.props.scratcherInvite.id);
                                        }.bind(this)}
                                    />
                                ] : []}
                                {this.props.adminMessages.map(function (item) {
                                    return <AdminMessage
                                        key={'adminmessage' + item.id}
                                        id={item.id}
                                        message={item.message}
                                        datetimeCreated={item.datetime_created}
                                        onDismiss={function () {
                                            this.props.handleAdminDismiss('notification', item.id);
                                        }.bind(this)}
                                    />;
                                }.bind(this))}
                            </ul>
                        </section>
                    ] : []}
                    {this.props.requestStatus.admin === messageStatuses.ADMIN_ERROR ? [
                        <section className="messages-admin">
                            <h4>
                                <FormattedMessage id='messages.scratchTeamTitle' />
                            </h4>
                            <p><FormattedMessage id='messages.requestError' /></p>
                        </section>
                    ] : []}
                    <SocialMessagesList
                        loadStatus={this.props.requestStatus.messages}
                        messages={this.props.messages}
                        numNewMessages={numNewSocialMessages}
                        loadMore={this.props.loadMore}
                        loadMoreMethod={this.props.loadMoreMethod}
                    />
                </div>
            </div>
        );
    }
}));

module.exports = MessagesPresentation;
