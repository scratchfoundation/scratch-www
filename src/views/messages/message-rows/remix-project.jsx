const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');
const MembershipLabel = require('../../../components/membership-label/membership-label.jsx');

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
                theRemixLink: (
                    <a href={`/projects/${props.projectId}`}>
                        <FormattedMessage id="messages.theRemixLinkText" />
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
    actorLabel: PropTypes.oneOf(Object.values(MembershipLabel.LABEL_TYPE)),
    className: PropTypes.string,
    parentId: PropTypes.number.isRequired,
    parentTitle: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    remixDate: PropTypes.string.isRequired
};

module.exports = RemixProjectMessage;
