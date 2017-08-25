var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var LoveProjectMessage = React.createClass({
    type: 'LoveProjectMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        projectId: React.PropTypes.number.isRequired,
        projectTitle: React.PropTypes.string.isRequired,
        loveDateTime: React.PropTypes.string.isRequired
    },
    render: function () {
        var projectLink = '/projects/' + this.props.projectId;
        var profileLink = '/users/' + this.props.actorUsername;

        var classes = classNames(
            'mod-love-project',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.loveDateTime}
            >
                <FormattedMessage
                    id='messages.loveText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        projectLink: <a href={projectLink}>{this.props.projectTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = LoveProjectMessage;
