var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var FavoriteProjectMessage = React.createClass({
    type: 'FavoriteProjectMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        projectId: React.PropTypes.number.isRequired,
        projectTitle: React.PropTypes.string.isRequired,
        favoriteDateTime: React.PropTypes.string.isRequired
    },
    render: function () {
        var projectLink = '/projects/' + this.props.projectId;
        var profileLink = '/users/' + this.props.actorUsername;

        var classes = classNames(
            'mod-love-favorite',
            this.props.className
        );
        return (
            <SocialMessage
                as="div"
                className={classes}
                datetime={this.props.favoriteDateTime}
            >
                <FormattedMessage
                    id='messages.favoriteText'
                    values={{
                        profileLink: <a
                            href={profileLink}
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

module.exports = FavoriteProjectMessage;
