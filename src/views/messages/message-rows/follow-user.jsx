const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');
const MembershipLabel = require('../../../components/membership-label/membership-label.jsx');

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
                    <span>
                        <a
                            className="social-messages-profile-link"
                            href={`/users/${props.followerUsername}/`}
                        >
                            {props.followerUsername}
                        </a>
                        {!!props.followerLabel && <MembershipLabel labelType={props.followerLabel} />}
                    </span>
                )
            }}
        />
    </SocialMessage>
);

FollowUserMessage.propTypes = {
    className: PropTypes.string,
    followDateTime: PropTypes.string.isRequired,
    followerUsername: PropTypes.string.isRequired,
    followerLabel: PropTypes.number
};

module.exports = FollowUserMessage;
