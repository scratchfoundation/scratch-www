var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var RemixProjectMessage = React.createClass({
    type: 'RemixProjectMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        projectId: React.PropTypes.number.isRequired,
        projectTitle: React.PropTypes.string.isRequired,
        parentId: React.PropTypes.number.isRequired,
        parentTitle: React.PropTypes.string.isRequired,
        remixDate: React.PropTypes.string.isRequired
    },
    render: function () {
        var projectLink = '/projects/' + this.props.projectId;
        var profileLink = '/users/' + this.props.actorUsername;
        var remixedProjectLink = '/projects/' + this.props.parentId;
        
        var classes = classNames(
            'mod-remix-project',
            this.props.className
        );
        return (
            <SocialMessage
                as="div"
                className={classes}
                datetime={this.props.remixDate}
            >
                <FormattedMessage
                    id='messages.remixText'
                    values={{
                        profileLink: <a
                            href={profileLink}
                        >
                            {this.props.actorUsername}
                        </a>,
                        projectLink: <a href={projectLink}>{this.props.projectTitle}</a>,
                        remixedProjectLink: <a href={remixedProjectLink}>{this.props.parentTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = RemixProjectMessage;
