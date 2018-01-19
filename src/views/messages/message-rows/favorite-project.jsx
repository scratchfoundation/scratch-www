const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FavoriteProjectMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-love-favorite',
            props.className
        )}
        datetime={props.favoriteDateTime}
        iconAlt="favorite notification image"
        iconSrc="/svgs/messages/favorite.svg"
    >
        <FormattedMessage
            id="messages.favoriteText"
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
                )
            }}
        />
    </SocialMessage>
);

FavoriteProjectMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    favoriteDateTime: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    projectTitle: PropTypes.string.isRequired
};

module.exports = FavoriteProjectMessage;
