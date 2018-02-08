const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const BecomeCuratorMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-become-curator',
            props.className
        )}
        datetime={props.datetimePromoted}
    >
        <FormattedMessage
            id="messages.becomeCuratorText"
            values={{
                username: (
                    <a href={`/users/${props.actorUsername}/`}>
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

BecomeCuratorMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = BecomeCuratorMessage;
