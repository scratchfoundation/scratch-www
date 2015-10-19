var React = require('react');
var ReactIntl = require('react-intl');
var defineMessages = ReactIntl.defineMessages;
var injectIntl = ReactIntl.injectIntl;

var Box = require('../box/box.jsx');
var Format = require('../../lib/format.js');

require('./activity.scss');

var defaultMessages = defineMessages({
    whatsHappening: {
        id: 'general.whatsHappening',
        defaultMessage: 'What\'s Happening?'
    }
});

var Activity = React.createClass({
    type: 'Activity',
    propTypes: {
        items: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            items: require('./activity.json')
        };
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <Box
                className="activity"
                title={formatMessage(defaultMessages.whatsHappening)}>

                <ul>
                    {this.props.items.map(function (item) {
                        return (
                            <li key={item.id}>
                                <a href={item.url}>
                                    <img src={item.author.avatar} width="34" height="34" />
                                    <p>{item.author.username} {item.message}</p>
                                    <p><span className="stamp">{Format.date(item.stamp)}</span></p>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </Box>
        );
    }
});

module.exports = injectIntl(Activity);
