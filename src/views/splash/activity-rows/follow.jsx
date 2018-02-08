const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FollowMessage = props => {
    let followeeLink = '';
    let followeeTitle = '';
    if (typeof props.followeeTitle === 'undefined') {
        followeeLink = `/users/${props.followeeId}`;
        followeeTitle = props.followeeId;
    } else {
        followeeLink = `/studios/${props.followeeId}`;
        followeeTitle = props.followeeTitle;
    }
        
    return (
        <SocialMessage
            as="div"
            className={classNames(
                'mod-follow-user',
                props.className
            )}
            datetime={props.followDateTime}
        >
            <FormattedMessage
                id="messages.followText"
                values={{
                    profileLink: (
                        <a href={`/users/${props.followerUsername}/`}>
                            {props.followerUsername}
                        </a>
                    ),
                    followeeLink: (
                        <a href={followeeLink}>
                            {followeeTitle}
                        </a>
                    )
                }}
            />
        </SocialMessage>
    );
};

FollowMessage.propTypes = {
    className: PropTypes.string,
    followDateTime: PropTypes.string.isRequired,
    followeeId: PropTypes.string.isRequired,
    followeeTitle: PropTypes.string,
    followerUsername: PropTypes.string.isRequired
};

module.exports = FollowMessage;
