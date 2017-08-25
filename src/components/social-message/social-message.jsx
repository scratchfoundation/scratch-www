var classNames = require('classnames');
var FormattedRelative = require('react-intl').FormattedRelative;
var React = require('react');

var FlexRow = require('../flex-row/flex-row.jsx');

require('./social-message.scss');

var SocialMessage = React.createClass({
    type: 'SocialMessage',
    propTypes: {
        as: React.PropTypes.string,
        datetime: React.PropTypes.string.isRequired
    },
    getDefaultProps: function () {
        return {
            as: 'li'
        };
    },
    render: function () {
        var classes = classNames(
            'social-message',
            this.props.className
        );
        return (
            <this.props.as className={classes}>
                <FlexRow className="mod-social-message">
                    <div className="social-message-content">
                        {this.props.children}
                    </div>
                    <span className="social-message-date">
                        <FormattedRelative value={new Date(this.props.datetime)} />
                    </span>
                </FlexRow>
            </this.props.as>
        );
    }
});

module.exports = SocialMessage;
