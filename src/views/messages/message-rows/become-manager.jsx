const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const BecomeManagerMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-become-manager',
            props.className
        )}
        datetime={props.datetimePromoted}
        iconAlt="become owner notification image"
        iconSrc="/svgs/messages/owner-invite.svg"
    >
        <FormattedMessage
            id="messages.becomeManagerText"
            values={{
                username: (
                    <a
                        className="social-messages-profile-link"
                        href={`/users/${props.actorUsername}/`}
                    >
                        {props.actorUsername}
                    </a>
                ),
                studio: (
                    <a href={`/studios/${props.studioId}/`}>
                        {props.studioTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

BecomeManagerMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = BecomeManagerMessage;
