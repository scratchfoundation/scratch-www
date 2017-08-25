var classNames = require('classnames');
var React = require('react');

require('./emoji-text.scss');

var EmojiText = React.createClass({
    type: 'EmojiText',
    propTyes: {
        text: React.PropTypes.string.isRequired,
        imgClass: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            as: 'p',
            imgClass: 'emoji'
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
