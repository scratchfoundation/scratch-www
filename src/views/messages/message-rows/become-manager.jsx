var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var BecomeManagerMessage = React.createClass({
    type: 'BecomeManagerMessage',
    propTypes: {
        actorUsername: React.PropTypes.string.isRequired,
        studioId: React.PropTypes.number.isRequired,
        studioTitle: React.PropTypes.string.isRequired,
        datetimePromoted: React.PropTypes.string.isRequired
    },
    render: function () {
        var actorUri = '/users/' + this.props.actorUsername + '/';
        var studioUri = '/studios/' + this.props.studioId + '/';

        var classes = classNames(
            'mod-become-manager',
            this.props.className
        );
        return (
            <SocialMessage
                className={classes}
                datetime={this.props.datetimePromoted}
            >
                <FormattedMessage
                    id='messages.becomeManagerText'
                    values={{
                        username: <a
                            href={actorUri}
                            className="social-messages-profile-link"
                        >
                            {this.props.actorUsername}
                        </a>,
                        studio: <a href={studioUri}>{this.props.studioTitle}</a>
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = BecomeManagerMessage;
