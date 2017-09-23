var classNames = require('classnames');
var React = require('react');

require('./emoji-text.scss');

var EmojiText = React.createClass({
    type: 'EmojiText',
    propTyes: {
        text: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            as: 'p'
        };
    },
    render: function () {
        var classes = classNames(
            'emoji-text',
            this.props.className
        );
        return (
            <this.props.as
                className={classes}
                dangerouslySetInnerHTML={{
                    __html: this.props.text
                }}
            />
        );
    }
});

module.exports = EmojiText;
