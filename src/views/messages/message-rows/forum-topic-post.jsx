import classNames from 'classnames';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import SocialMessage from '../../../components/social-message/social-message.jsx';

var ForumPostMessage = React.createClass({
    type: 'ForumPostMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        topicId: React.PropTypes.number.isRequired,
        topicTitle: React.PropTypes.string.isRequired,
        datetimeCreated: React.PropTypes.string.isRequired
    },
    render: function () {
        var topicLink = '/discuss/topic/' + this.props.topicId + '/unread/';

        var classes = classNames(
            'mod-forum-activity',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimeCreated}
                iconSrc="/svgs/messages/forum-activity.svg"
                iconAlt="forum activity notification image"
            >
                <FormattedMessage
                    id='messages.forumPostText'
                    values={{
                        topicLink: <a href={topicLink}>{this.props.topicTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

export default ForumPostMessage;
