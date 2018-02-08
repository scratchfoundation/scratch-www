const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const BecomeManagerMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-become-manager',
            props.className
        )}
        datetime={props.datetimePromoted}
    >
        <FormattedMessage
            id="messages.becomeManagerText"
            values={{
                username: (
                    <a href={`/users/${props.recipientUsername}/`}>
                        {props.recipientUsername}
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
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    recipientUsername: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = BecomeManagerMessage;
