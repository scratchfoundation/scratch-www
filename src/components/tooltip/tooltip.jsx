var classNames = require('classnames');
var React = require('react');

require('./tooltip.scss');

var Tooltip = React.createClass({
    type: 'Tooltip',
    getDefaultProps: function () {
        return {
            title: '',
            tipContent: ''
        };
    },
    render: function () {
        var classes = classNames(
            'tooltip',
            this.props.className,
            {overmax: (this.props.currentCharacters > this.props.maxCharacters)}
        );
        return (
            <span className={classes}>
                <span className="tip">
                    {this.props.title}
                </span>
                <span className="expand">
                    {this.props.tipContent}
                </span>
            </span>
        );
    }
});

module.exports = Tooltip;
