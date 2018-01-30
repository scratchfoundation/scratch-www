const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const CuratorInviteMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-curator-invite',
            props.className
        )}
        datetime={props.datetimePromoted}
        iconAlt="curator invite notification image"
        iconSrc="/svgs/messages/curator-invite.svg"
    >
        <FormattedMessage
            id="messages.curatorInviteText"
            values={{
                actorLink: (
                    <a
                        className="social-messages-profile-link"
                        href={`/users/${props.actorUsername}/`}
                    >
                        {props.actorUsername}
                    </a>
                ),
                studioLink: (
                    <a href={`/studios/${props.studioId}/`}>
                        {props.studioTitle}
                    </a>
                ),
                tabLink: (
                    <a href={`/studios/${props.studioId}/curators/`}>
                        {props.intl.formatMessage({id: 'messages.curatorTabText'})}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

CuratorInviteMessage.propTypes = {
    actorUsername: PropTypes.string.isRequired,
    className: PropTypes.string,
    datetimePromoted: PropTypes.string.isRequired,
    intl: intlShape,
    studioId: PropTypes.number.isRequired,
    studioTitle: PropTypes.string.isRequired
};

module.exports = injectIntl(CuratorInviteMessage);
