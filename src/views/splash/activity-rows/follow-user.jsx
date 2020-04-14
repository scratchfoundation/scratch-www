const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FollowUserMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-follow-user',
            props.className
        )}
        datetime={props.followDateTime}
    >
        <FormattedMessage
            id="messages.followProfileText"
            values={{
                profileLink: (
                    <a href={`/users/${props.followerUsername}/`}>
                        {props.followerUsername}
                    </a>
                ),
                followeeLink: (
                    <a href={`/users/${props.followeeId}/`}>
                        {props.followeeId}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

FollowUserMessage.propTypes = {
    className: PropTypes.string,
    followDateTime: PropTypes.string.isRequired,
    followeeId: PropTypes.string.isRequired,
    followerUsername: PropTypes.string.isRequired
};

module.exports = FollowUserMessage;
