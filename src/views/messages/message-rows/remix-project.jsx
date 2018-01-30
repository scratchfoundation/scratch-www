const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const RemixProjectMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-remix-project',
            props.className
        )}
        datetime={props.remixDate}
        iconAlt="remix notification image"
        iconSrc="/svgs/messages/remix.svg"
    >
        <FormattedMessage
            id="messages.remixText"
            values={{
                profileLink: (
                    <a
                        className="social-messages-profile-link"
                        href={`/users/${props.actorUsername}`}
                    >
                        {props.actorUsername}
                    </a>
                ),
                projectLink: (
                    <a href={`/projects/${props.projectId}`}>
                        {props.projectTitle}
                    </a>
                ),
                remixedProjectLink: (
                    <a href={`/projects/${props.parentId}`}>
                        {props.parentTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

RemixProjectMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    parentId: PropTypes.number.isRequired,
    parentTitle: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    projectTitle: PropTypes.string.isRequired,
    remixDate: PropTypes.string.isRequired
};

module.exports = RemixProjectMessage;
