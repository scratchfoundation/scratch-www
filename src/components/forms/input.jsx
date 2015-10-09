var React = require('react');
var classNames = require('classnames');

require('./input.scss');

var Input = React.createClass({
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

module.exports = Input;
