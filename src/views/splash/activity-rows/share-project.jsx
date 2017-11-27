var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var ShareProjectMessage = React.createClass({
    type: 'ShareProjectMessage',
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
                as="div"
                className={classes}
                datetime={this.props.loveDateTime}
            >
                <FormattedMessage
                    id='messages.shareText'
                    values={{
                        profileLink: (
                            <a
                                href={profileLink}
                            >
                                {this.props.actorUsername}
                            </a>
                        ),
                        projectLink: (
                            <a href={projectLink}>{this.props.projectTitle}</a>
                        )
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = ShareProjectMessage;
