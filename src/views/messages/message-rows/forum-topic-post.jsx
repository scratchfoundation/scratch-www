const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const ForumPostMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-forum-activity',
            props.className
        )}
        datetime={props.datetimeCreated}
        iconAlt="forum activity notification image"
        iconSrc="/svgs/messages/forum-activity.svg"
    >
        <FormattedMessage
            id="messages.forumPostText"
            values={{
                topicLink: (
                    <a href={`/discuss/topic/${props.topicId}/unread/`}>
                        {props.topicTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

ForumPostMessage.propTypes = {
    className: PropTypes.string,
    datetimeCreated: PropTypes.string.isRequired,
    topicId: PropTypes.number.isRequired,
    topicTitle: PropTypes.string.isRequired
};

module.exports = ForumPostMessage;
