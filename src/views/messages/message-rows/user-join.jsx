var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var UserJoinMessage = injectIntl(React.createClass({
    type: 'UserJoinMessage',
    propTypes: {
        datetimeJoined: React.PropTypes.string.isRequired
    },
    render: function () {
        var exploreText = this.props.intl.formatMessage({id: 'general.explore'});
        var projectText = this.props.intl.formatMessage({id: 'messages.userJoinMakeProject'});
        
        var classes = classNames(
            'mod-user-join',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimeJoined}
            >
                <FormattedMessage
                    id='messages.userJoinText'
                    values={{
                        exploreLink: <a href="/explore">{exploreText}</a>,
                        makeProjectLink: <a href="/projects/editor/?tip_bar=getStarted">{projectText}</a>
                    }}
                />
            </SocialMessage>
        );
    }
}));

module.exports = UserJoinMessage;
