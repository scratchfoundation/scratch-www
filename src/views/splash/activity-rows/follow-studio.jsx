const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FollowStudioMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-follow-studio',
            props.className
        )}
        datetime={props.followDateTime}
    >
        <FormattedMessage
            id="messages.followStudioText"
            values={{
                profileLink: (
                    <a href={`/users/${props.followerUsername}/`}>
                        {props.followerUsername}
                    </a>
                ),
                studioLink: (
                    <a href={`/studios/${props.followeeId}`}>
                        {props.followeeTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

FollowStudioMessage.propTypes = {
    className: PropTypes.string,
    followDateTime: PropTypes.string.isRequired,
    followeeId: PropTypes.string.isRequired,
    followeeTitle: PropTypes.string.isRequired,
    followerUsername: PropTypes.string.isRequired
};

module.exports = FollowStudioMessage;
