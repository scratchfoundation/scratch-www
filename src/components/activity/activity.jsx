var React = require('react');
var ReactIntl = require('react-intl');
var defineMessages = ReactIntl.defineMessages;
var FormattedRelative = ReactIntl.FormattedRelative;
var injectIntl = ReactIntl.injectIntl;

var Box = require('../box/box.jsx');

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
                        var actorProfileUrl = '/users/' + item.actor.username + '/';
                        var actionDate = new Date(item.datetime_created + 'Z');
                        var activityMessageHTML = '<a href=' + actorProfileUrl + '>' +
                            item.actor.username + '</a>' + item.message;
                            
                        return (
                            <li key={item.pk}>
                                <a href={actorProfileUrl}>
                                    <img src={item.actor.thumbnail_url} width="34" height="34" />
                                    <p dangerouslySetInnerHTML={{__html: activityMessageHTML}}></p>
                                    <p>
                                        <span className="stamp">
                                            <FormattedRelative value={actionDate} />
                                        </span>
                                    </p>
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
