const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FollowUserMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-follow-user',
            props.className
        )}
        datetime={props.followDateTime}
        iconAlt="follow notification image"
        iconSrc="/svgs/messages/follow.svg"
    >
        <FormattedMessage
            id="messages.followText"
            values={{
                profileLink: (
                    <a
                        className="social-messages-profile-link"
                        href={`/users/${props.followerUsername}/`}
                    >
                        {props.followerUsername}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

FollowUserMessage.propTypes = {
    className: PropTypes.string,
    followDateTime: PropTypes.string.isRequired,
    followerUsername: PropTypes.string.isRequired
};

module.exports = FollowUserMessage;
