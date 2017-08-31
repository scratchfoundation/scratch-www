var FormattedDate = require('react-intl').FormattedDate;
var React = require('react');

var Button = require('../../../components/forms/button.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');

var AdminMessage = React.createClass({
    type: 'AdminMessage',
    propTypes: {
        id: React.PropTypes.number.isRequired,
        message: React.PropTypes.string.isRequired,
        datetimeCreated: React.PropTypes.string.isRequired,
        onDismiss: React.PropTypes.func.isRequired
    },
    render: function () {
        return (
            <li className="admin-message">
                <FlexRow className="admin-message-header">
                    <span className="admin-message-date">
                        <FormattedDate value={new Date(this.props.datetimeCreated)} />
                    </span>
                    <Button
                        className="mod-admin-message-dismiss"
                        onClick={this.props.onDismiss.bind(this, 'notification', this.props.id)}
                    >
                        <img
                            className="mod-admin-message-icon"
                            src="/svgs/modal/close-x.svg"
                            alt="close-icon"
                        />
                    </Button>
                </FlexRow>
                <p
                    className="admin-message-content"
                    dangerouslySetInnerHTML={{__html: this.props.message}}
                />
            </li>
        );
    }
});

module.exports = AdminMessage;
