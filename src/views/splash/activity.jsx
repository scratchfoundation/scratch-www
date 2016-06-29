var React = require('react'); //eslint-disable-line
var ReactIntl = require('react-intl');
var defineMessages = ReactIntl.defineMessages;
var FormattedMessage = ReactIntl.FormattedMessage;

var Box = require('../../components/box/box.jsx');

require('./splash.scss');

var ActivityRow = require('../../components/activityrow/activityrow.jsx');

var defaultMessages = defineMessages({
    whatsHappening: {
        id: 'general.whatsHappening',
        defaultMessage: 'What\'s Happening?'
    }
});

var Activity = function (props) {
    var formatMessage = props.intl.formatMessage;
    var formatRelative = props.intl.formatRelative;
    return (
        <Box
            className="activity"
            title={formatMessage(defaultMessages.whatsHappening)}>
            {props.items && props.items.length > 0 ? [
                <ul key="activity-ul">
                    {props.items.map(function (item) {
                        if (item.message.replace(/\s/g, '')) {
                            var actorProfileUrl = '/users/' + item.actor.username + '/';
                            var actionDate = new Date(item.datetime_created + 'Z');
                            var activityMessageHTML = (
                                '<a href=' + actorProfileUrl + '>' + item.actor.username + '</a>' +
                                item.message
                            );
                            return (
                                <ActivityRow item={item}
                                    html={activityMessageHTML}
                                    date={formatRelative(actionDate)}
                                    intl={props.intl}/>
                            );
                        }
                    })}
                </ul>
            ] : [
                <div className="empty" key="activity-empty">
                    <h4>
                        <FormattedMessage
                            id="activity.seeUpdates"
                            defaultMessage="This is where you will see updates from Scratchers you follow" />
                    </h4>
                    <a href="/studios/146521/">
                        <FormattedMessage
                            id="activity.checkOutScratchers"
                            defaultMessage="Check out some Scratchers you might like to follow" />
                    </a>
                </div>
            ]}
        </Box>
    );
};

module.exports = Activity;
