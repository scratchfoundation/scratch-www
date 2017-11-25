import React from 'react';
import ReactIntl from 'react-intl';
var defineMessages = ReactIntl.defineMessages;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedRelative = ReactIntl.FormattedRelative;
var injectIntl = ReactIntl.injectIntl;

import Box from '../box/box.jsx';

require('./activity.scss');

var defaultMessages = defineMessages({
    whatsHappening: {
        id: 'general.whatsHappening'
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

                {this.props.items && this.props.items.length > 0 ? [
                    <ul key="activity-ul">
                        {this.props.items.map(function (item) {
                            if (item.message.replace(/\s/g, '')) {
                                var username = item.actor.username;
                                var thumbnailUrl = item.actor.thumbnail_url;
                                if (item.type === 22) {
                                    username = item.recipient_username;
                                    thumbnailUrl = item.recipient.thumbnail_url;
                                }
                                var actorProfileUrl = '/users/' + username + '/';
                                var activityMessageHTML = (
                                    '<a href=' + actorProfileUrl + '>' + username + '</a>' +
                                    item.message
                                );
                                var actionDate = new Date(item.datetime_created + 'Z');
                                return (
                                    <li key={item.pk}>
                                        <a href={actorProfileUrl}>
                                            <img src={thumbnailUrl} width="34" height="34" alt="" />
                                            <p dangerouslySetInnerHTML={{__html: activityMessageHTML}}></p>
                                            <p>
                                                <span className="stamp">
                                                    <FormattedRelative value={actionDate} />
                                                </span>
                                            </p>
                                        </a>
                                    </li>
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
    }
});

export default injectIntl(Activity);
