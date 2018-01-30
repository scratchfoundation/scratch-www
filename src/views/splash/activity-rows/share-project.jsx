const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const ShareProjectMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-love-project',
            props.className
        )}
        datetime={props.loveDateTime}
    >
        <FormattedMessage
            id="messages.shareText"
            values={{
                profileLink: (
                    <a href={`/users/${props.actorUsername}`}>
                        {props.actorUsername}
                    </a>
                ),
                projectLink: (
                    <a href={`/projects/${props.projectId}`}>
                        {props.projectTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

ShareProjectMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    loveDateTime: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    projectTitle: PropTypes.string.isRequired
};

module.exports = ShareProjectMessage;
