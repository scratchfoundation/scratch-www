var React = require('react');
var classNames = require('classnames');

require('./input.scss');

module.exports = React.createClass({
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'input',
            this.props.className
        );
        return (
            <input {... this.props} className={classes} />
        );
    }
});
