var classNames = require('classnames');
var React = require('react');

require('./charcount.scss');

var CharCount = React.createClass({
    type: 'CharCount',
    getDefaultProps: function () {
        return {
            maxCharacters: 0,
            currentCharacters: 0
        };
    },
    render: function () {
        var classes = classNames(
            'char-count',
            this.props.className,
            {overmax: (this.props.currentCharacters > this.props.maxCharacters)}
        );
        return (
            <p className={classes}>
                ({this.props.currentCharacters}/{this.props.maxCharacters})
            </p>
        );
    }
});

module.exports = CharCount;
