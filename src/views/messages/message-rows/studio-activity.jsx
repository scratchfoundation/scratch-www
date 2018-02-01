const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const StudioActivityMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-studio-activity',
            props.className
        )}
        datetime={props.datetimeCreated}
        iconAlt="studio activity notification image"
        iconSrc="/svgs/messages/studio-activity.svg"
    >
        <FormattedMessage
            id="messages.studioActivityText"
            values={{
                studioLink: (
                    <a href={`/studios/${props.studioId}/activity`}>
                        {props.studioTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

StudioActivityMessage.propTypes = {
    className: PropTypes.string,
    datetimeCreated: PropTypes.string.isRequired,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = StudioActivityMessage;
