const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedNumber = require('react-intl').FormattedNumber;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Form = require('../../components/forms/form.jsx');
const Select = require('../../components/forms/select.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const messageStatuses = require('../../redux/messages').Status;

// Message Components
const AdminMessage = require('./message-rows/admin-message.jsx');
const BecomeManagerMessage = require('./message-rows/become-manager.jsx');
const CommentMessage = require('./message-rows/comment-message.jsx');
const CuratorInviteMessage = require('./message-rows/curator-invite.jsx');
const FavoriteProjectMessage = require('./message-rows/favorite-project.jsx');
const FollowUserMessage = require('./message-rows/follow-user.jsx');
const ForumPostMessage = require('./message-rows/forum-topic-post.jsx');
const LoveProjectMessage = require('./message-rows/love-project.jsx');
const RemixProjectMessage = require('./message-rows/remix-project.jsx');
const ScratcherInvite = require('./message-rows/scratcher-invite.jsx');
const StudioActivityMessage = require('./message-rows/studio-activity.jsx');
const UserJoinMessage = require('./message-rows/user-join.jsx');

require('./messages.scss');

class SocialMessagesList extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'getComponentForMessage',
            'renderLoadMore',
            'renderMessageCounter'
        ]);
    }
    getComponentForMessage (message, unread) {
        const className = (unread) ? 'mod-unread' : '';
        const key = `${message.type}_ ${message.id}`;

        switch (message.type) {
        case 'followuser':
            return (
                <FollowUserMessage
                    className={className}
                    followDateTime={message.datetime_created}
                    followerUsername={message.actor_username}
                    key={key}
                />
            );
        case 'loveproject':
            return (
                <LoveProjectMessage
                    actorUsername={message.actor_username}
                    className={className}
                    key={key}
                    loveDateTime={message.datetime_created}
                    projectId={message.project_id}
                    projectTitle={message.title}
                />
            );
        case 'favoriteproject':
            return (
                <FavoriteProjectMessage
                    actorUsername={message.actor_username}
                    className={className}
                    favoriteDateTime={message.datetime_created}
                    key={key}
                    projectId={message.project_id}
                    projectTitle={message.project_title}
                />
            );
        case 'addcomment':
            return (
                <CommentMessage
                    actorId={message.actor_id}
                    actorUsername={message.actor_username}
                    className={className}
                    commentDateTime={message.datetime_created}
                    commentId={message.comment_id}
                    commentText={message.comment_fragment}
                    commentee={message.commentee_username}
                    key={key}
                    objectId={message.comment_obj_id}
                    objectTitle={message.comment_obj_title}
                    objectType={message.comment_type}
                />
            );
        case 'curatorinvite':
            return (
                <CuratorInviteMessage
                    actorUsername={message.actor_username}
                    className={className}
                    datetimePromoted={message.datetime_created}
                    key={key}
                    studioId={message.gallery_id}
                    studioTitle={message.title}
                />
            );
        case 'remixproject':
            return (
                <RemixProjectMessage
                    actorUsername={message.actor_username}
                    className={className}
                    key={key}
                    parentId={message.parent_id}
                    parentTitle={message.parent_title}
                    projectId={message.project_id}
                    projectTitle={message.title}
                    remixDate={message.datetime_created}
                />
            );
        case 'studioactivity':
            return (
                <StudioActivityMessage
                    className={className}
                    datetimeCreated={message.datetime_created}
                    key={key}
                    studioId={message.gallery_id}
                    studioTitle={message.title}
                />
            );
        case 'forumpost':
            return (
                <ForumPostMessage
                    actorUsername={message.actor_username}
                    className={className}
                    datetimeCreated={message.datetime_created}
                    key={key}
                    topicId={message.topic_id}
                    topicTitle={message.topic_title}
                />
            );
        case 'becomeownerstudio':
            return (
                <BecomeManagerMessage
                    actorUsername={message.actor_username}
                    className={className}
                    datetimePromoted={message.datetime_created}
                    key={key}
                    studioId={message.gallery_id}
                    studioTitle={message.gallery_title}
                />
            );
        case 'userjoin':
            return (
                <UserJoinMessage
                    className={className}
                    datetimeJoined={message.datetime_created}
                    key={key}
                />
            );
        }
    }
    renderLoadMore (loadMore) {
        if (loadMore) {
            return (
                <Button
                    className="messages-social-loadmore"
                    key="load-more"
                    onClick={this.props.onLoadMoreMethod}
                >
                    <FormattedMessage id="general.loadMore" />
                </Button>
            );
        }
        return null;
    }
    renderMessageCounter (numNewMessages) {
        if (numNewMessages > 0) {
            return (
                <div className="messages-header-unread">
                    <FormattedNumber value={numNewMessages} />
                </div>
            );
        }
        return null;
    }
    render () {
        if (this.props.loadStatus === messageStatuses.MESSAGES_ERROR) {
            return (
                <section className="messages-social">
                    <div className="messages-social-title">
                        <h4>
                            <FormattedMessage id="messages.messageTitle" />
                        </h4>
                    </div>
                    <p><FormattedMessage id="messages.requestError" /></p>
                </section>
            );
        }

        return (
            <section className="messages-social">
                {this.props.messages.length > 0 ? [
                    <div
                        className="messages-social-title"
                        key="messages-social-title"
                    >
                        <h4 className="messages-header">
                            <FormattedMessage id="messages.messageTitle" />
                            {this.renderMessageCounter(this.props.numNewMessages)}
                        </h4>
                    </div>,
                    <ul
                        className="messages-social-list"
                        key="messages-social-list"
                    >
                        {this.props.messages.map((message, messageId) => {
                            if (messageId < this.props.numNewMessages) {
                                return this.getComponentForMessage(message, true);
                            }
                            return this.getComponentForMessage(message, false);
                        })}
                    </ul>
                ] : []}
                {this.renderLoadMore(this.props.loadMore)}
            </section>
        );
    }
}

SocialMessagesList.propTypes = {
    loadMore: PropTypes.bool.isRequired,
    loadStatus: PropTypes.string,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    numNewMessages: PropTypes.number,
    onLoadMoreMethod: PropTypes.func
};

SocialMessagesList.defaultProps = {
    loadStatus: messageStatuses.FETCHING,
    numNewMessages: 0
};

const MessagesPresentation = props => {
    let adminMessageLength = props.adminMessages.length;
    if (Object.keys(props.scratcherInvite).length > 0) {
        adminMessageLength = adminMessageLength + 1;
    }
    let numNewSocialMessages = props.numNewMessages - adminMessageLength;
    if (numNewSocialMessages < 0) {
        numNewSocialMessages = 0;
    }

    return (
        <div className="messages">
            <TitleBanner className="mod-messages">
                <FlexRow className="inner mod-messages-title">
                    <h1 className="title-banner-h1 mod-messages">
                        <FormattedMessage id="messages.messageTitle" />
                    </h1>
                    <div className="messages-title-filter">
                        <Form>
                            <Select
                                label={props.intl.formatMessage({id: 'messages.filterBy'})}
                                name="messages.filter"
                                options={[
                                    {
                                        label: props.intl.formatMessage({id: 'messages.activityAll'}),
                                        value: ''
                                    },
                                    {
                                        label: props.intl.formatMessage({id: 'messages.activityComments'}),
                                        value: 'comments'
                                    },
                                    {
                                        label: props.intl.formatMessage({id: 'messages.activityProjects'}),
                                        value: 'projects'
                                    },
                                    {
                                        label: props.intl.formatMessage({id: 'messages.activityStudios'}),
                                        value: 'studios'
                                    },
                                    {
                                        label: props.intl.formatMessage({id: 'messages.activityForums'}),
                                        value: 'forums'
                                    }
                                ]}
                                value={props.filter}
                                onChange={props.onFilterClick}
                            />
                        </Form>
                    </div>
                </FlexRow>
            </TitleBanner>
            <div className="messages-details inner">
                {props.adminMessages.length > 0 || Object.keys(props.scratcherInvite).length > 0 ? [
                    <section
                        className="messages-admin"
                        key="messages-admin"
                    >
                        <div className="messages-admin-title">
                            <h4 className="messages-header">
                                <FormattedMessage id="messages.scratchTeamTitle" />
                                <div className="messages-header-unread">
                                    <FormattedNumber value={adminMessageLength} />
                                </div>
                            </h4>
                        </div>
                        <ul className="messages-admin-list">
                            {Object.keys(props.scratcherInvite).length > 0 ? [
                                <ScratcherInvite
                                    datetimeCreated={props.scratcherInvite.datetime_created}
                                    id={props.scratcherInvite.id}
                                    key={`invite${props.scratcherInvite.id}`}
                                    username={props.user.username}
                                    onDismiss={() => { // eslint-disable-line react/jsx-no-bind
                                        props.onAdminDismiss('invite', props.scratcherInvite.id);
                                    }}
                                />
                            ] : []}
                            {props.adminMessages.map(item => (
                                <AdminMessage
                                    datetimeCreated={item.datetime_created}
                                    id={item.id}
                                    key={`adminmessage${item.id}`}
                                    message={item.message}
                                    onDismiss={() => { // eslint-disable-line react/jsx-no-bind
                                        props.onAdminDismiss('notification', item.id);
                                    }}
                                />
                            ))}
                        </ul>
                    </section>
                ] : []}
                {props.requestStatus.admin === messageStatuses.ADMIN_ERROR ? [
                    <section
                        className="messages-admin"
                        key="messages-admin-error"
                    >
                        <h4>
                            <FormattedMessage id="messages.scratchTeamTitle" />
                        </h4>
                        <p><FormattedMessage id="messages.requestError" /></p>
                    </section>
                ] : []}
                <SocialMessagesList
                    loadMore={props.loadMore}
                    loadStatus={props.requestStatus.message}
                    messages={props.messages}
                    numNewMessages={numNewSocialMessages}
                    onLoadMoreMethod={props.onLoadMoreMethod}
                />
            </div>
        </div>
    );
};

MessagesPresentation.propTypes = {
    adminMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.string,
    intl: intlShape,
    loadMore: PropTypes.bool.isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
    numNewMessages: PropTypes.number,
    onAdminDismiss: PropTypes.func.isRequired,
    onFilterClick: PropTypes.func.isRequired,
    onLoadMoreMethod: PropTypes.func,
    requestStatus: PropTypes.shape({
        admin: PropTypes.string,
        clear: PropTypes.string,
        message: PropTypes.string,
        delete: PropTypes.string
    }).isRequired,
    scratcherInvite: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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

MessagesPresentation.defaultProps = {
    filter: '',
    filterOpen: false,
    numNewMessages: 0
};

module.exports = injectIntl(MessagesPresentation);
