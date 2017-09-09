var FormattedDate = require('react-intl').FormattedDate;
var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var Button = require('../../../components/forms/button.jsx');
var FlexRow = require('../../../components/flex-row/flex-row.jsx');

var AdminMessage = injectIntl(React.createClass({
    type: 'AdminMessage',
    propTypes: {
        id: React.PropTypes.number.isRequired,
        username: React.PropTypes.string.isRequired,
        datetimeCreated: React.PropTypes.string.isRequired,
        onDismiss: React.PropTypes.func.isRequired
    },
    render: function () {
        var learnMoreLink = '/users/' + this.props.username + '#promote';
        var learnMoreMessage = this.props.intl.formatMessage({id: 'messages.learnMore'});
        return (
            <li className="admin-message">
                <FlexRow className="admin-message-header">
                    <span className="admin-message-date">
                        <FormattedDate value={new Date(this.props.datetimeCreated)} />
                    </span>
                    <Button
                        className="mod-scratcher-invite-dismiss"
                        onClick={this.props.onDismiss}
                    >
                        <img
                            className="mod-scratcher-invite-icon"
                            src="/svgs/modal/close-x.svg"
                            alt="close-icon"
                        />
                    </Button>
                </FlexRow>
                <p className="admin-message-content">
                    <FormattedMessage
                        id='messages.scratcherInvite'
                        values={{
                            learnMore: <a href={learnMoreLink}>{learnMoreMessage}</a>
                        }}
                    />
                </p>
            </li>
        );
    }
}));

module.exports = AdminMessage;
