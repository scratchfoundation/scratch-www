var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

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
            'mod-studio-activity',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimeCreated}
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

module.exports = ForumPostMessage;
