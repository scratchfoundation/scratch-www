var React = require('react');
var classNames = require('classnames');

require('./button.scss');

module.exports = React.createClass({
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'button',
            this.props.className
        );
        return (
            <button {... this.props} className={classes} >{this.props.children}</button>
        );
    }
});
