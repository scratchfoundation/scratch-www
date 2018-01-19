const FormattedDate = require('react-intl').FormattedDate;
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
                className="mod-admin-message-dismiss"
                onClick={props.onDismiss}
            >
                <img
                    alt="close-icon"
                    className="admin-message-icon"
                    src="/svgs/modal/close-x.svg"
                />
            </Button>
        </FlexRow>
        <p
            className="admin-message-content"
            dangerouslySetInnerHTML={{__html: props.message}} // eslint-disable-line react/no-danger
        />
    </li>
);

AdminMessage.propTypes = {
    datetimeCreated: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onDismiss: PropTypes.func.isRequired
};

module.exports = AdminMessage;
