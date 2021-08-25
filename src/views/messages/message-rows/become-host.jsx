const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const BecomeHostMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-become-host',
            props.className
        )}
        datetime={props.datetimePromoted}
        iconAlt="become host notification image"
        iconSrc="/svgs/messages/host-transfer.svg"
    >
        <FormattedMessage
            id="messages.becomeHostText"
            values={{
                usernameOrScratchTeam: (
                    props.adminActor ?
                        <FormattedMessage id="messages.becomeHostScratchTeam" /> :
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

BecomeHostMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    adminActor: PropTypes.bool,
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = BecomeHostMessage;
