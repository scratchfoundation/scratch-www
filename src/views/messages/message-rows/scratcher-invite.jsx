const FormattedDate = require('react-intl').FormattedDate;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const PropTypes = require('prop-types');
const React = require('react');

const Button = require('../../../components/forms/button.jsx');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');

const AdminMessage = props => (
    <li className="admin-message">
        <FlexRow className="admin-message-header">
            <span className="admin-message-date">
                <FormattedDate value={new Date(props.datetimeCreated)} />
            </span>
            <Button
                className="mod-scratcher-invite-dismiss"
                onClick={props.onDismiss}
            >
                <img
                    alt="close-icon"
                    className="mod-scratcher-invite-icon"
                    src="/svgs/modal/close-x.svg"
                />
            </Button>
        </FlexRow>
        <p className="admin-message-content">
            <FormattedMessage
                id="messages.scratcherInvite"
                values={{
                    learnMore: (
                        <a href={`/users/${props.username}#promote`}>
                            {props.intl.formatMessage({id: 'messages.learnMore'})}
                        </a>
                    )
                }}
            />
        </p>
    </li>
);

AdminMessage.propTypes = {
    datetimeCreated: PropTypes.string.isRequired,
    intl: intlShape,
    onDismiss: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
};

module.exports = injectIntl(AdminMessage);
