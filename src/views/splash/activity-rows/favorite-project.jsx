const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const FavoriteProjectMessage = props => (
    <SocialMessage
        as="div"
        className={classNames(
            'mod-love-favorite',
            props.className
        )}
        datetime={props.favoriteDateTime}
    >
        <FormattedMessage
            id="messages.favoriteText"
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

FavoriteProjectMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    favoriteDateTime: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    projectTitle: PropTypes.string.isRequired
};

module.exports = FavoriteProjectMessage;
