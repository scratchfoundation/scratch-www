const classNames = require('classnames');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const SocialMessage = require('../../../components/social-message/social-message.jsx');

const UserJoinMessage = props => (
    <SocialMessage
        className={classNames(
            'mod-user-join',
            props.className
        )}
        datetime={props.datetimeJoined}
    >
        <FormattedMessage
            id="messages.userJoinText"
            values={{
                exploreLink: (
                    <a href="/explore">
                        {props.intl.formatMessage({id: 'general.explore'})}
                    </a>
                ),
                makeProjectLink: (
                    <a href="/projects/editor/?tutorial=getStarted">
                        {props.intl.formatMessage({id: 'messages.userJoinMakeProject'})}
                    </a>
                )
            }}
        />
    </SocialMessage>
);

UserJoinMessage.propTypes = {
    className: PropTypes.string,
    datetimeJoined: PropTypes.string.isRequired,
    intl: intlShape
};

module.exports = injectIntl(UserJoinMessage);
