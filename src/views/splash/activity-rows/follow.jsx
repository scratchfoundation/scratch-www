var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var FollowMessage = React.createClass({
    type: 'FollowMessage',
    propTypes: {
        followerUsername: React.PropTypes.string.isRequired,
        followeeId: React.PropTypes.string.isRequired,
        followeeTitle: React.PropTypes.string,
        followDateTime: React.PropTypes.string.isRequired
    },
    render: function () {
        var profileLink = '/users/' + this.props.followerUsername; + '/';
        
        var followeeLink = '';
        var followeeTitle = '';
        if (typeof this.props.followeeTitle !== 'undefined') {
            followeeLink = '/studios/' + this.props.followeeId;
            followeeTitle = this.props.followeeTitle;
        } else {
            followeeLink = '/users/' + this.props.followeeId;
            followeeTitle = this.props.followeeId;
        }
        
        var classes = classNames(
            'mod-follow-user',
            this.props.className
        );
        return (
            <SocialMessage
                as="div"
                className={classes}
                datetime={this.props.followDateTime}
            >
                <FormattedMessage
                    id='messages.followText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                        >
                            {this.props.followerUsername}
                        </a>,
                        followeeLink: <a
                            href={followeeLink}
                        >
                            {followeeTitle}
                        </a>
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = FollowMessage;
