var classNames = require('classnames');
var React = require('react');

require('./flex-row.scss');

var FlexRow = React.createClass({
    type: 'FlexRow',
    getDefaultProps: function () {
        return {
            as: 'div'
        };
    },
    render: function () {
        var classes = classNames(
            'flex-row',
            this.props.className
        );
        return (
            <this.props.as className={classes}>
                {this.props.children}
            </this.props.as>
        );
    }
});

module.exports = FlexRow;
