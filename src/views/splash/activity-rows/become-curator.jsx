var classNames = require('classnames');
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');

var SocialMessage = require('../../../components/social-message/social-message.jsx');

var BecomeCuratorMessage = React.createClass({
    type: 'BecomeCuratorMessage',
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
            'mod-become-curator',
            this.props.className
        );
        return (
            <SocialMessage
                as="div"
                className={classes}
                datetime={this.props.datetimePromoted}
            >
                <FormattedMessage
                    id='messages.becomeCuratorText'
                    values={{
                        username: (
                            <a
                                href={actorUri}
                            >
                                {this.props.actorUsername}
                            </a>
                        ),
                        studio: (
                            <a href={studioUri}>{this.props.studioTitle}</a>
                        )
                    }}
                />
            </SocialMessage>
        );
    }
});

module.exports = BecomeCuratorMessage;
