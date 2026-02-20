const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');
const MembershipLabel = require('../../../components/membership-label/membership-label.jsx');

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
                    <span>
                        <a
                            className="social-messages-profile-link"
                            href={`/users/${props.actorUsername}/`}
                        >
                            {props.actorUsername}
                        </a>
                        {!!props.actorLabel && <MembershipLabel labelType={props.actorLabel} />}
                    </span>
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
    actorLabel: PropTypes.oneOf(Object.values(MembershipLabel.LABEL_TYPE)),
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = BecomeManagerMessage;
