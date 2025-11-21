const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');
const MembershipLabel = require('../../../components/membership-label/membership-label.jsx');

const LoveProjectMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-love-project',
            props.className
        )}
        datetime={props.loveDateTime}
        iconAlt="love notification image"
        iconSrc="/svgs/messages/love.svg"
    >
        <FormattedMessage
            id="messages.loveText"
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
                projectLink: (
                    <a href={`/projects/${props.projectId}`}>
                        {props.projectTitle}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

LoveProjectMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    actorLabel: PropTypes.oneOf(Object.values(MembershipLabel.LABEL_TYPE)),
    className: PropTypes.string,
    loveDateTime: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    projectTitle: PropTypes.string.isRequired
};

module.exports = LoveProjectMessage;
