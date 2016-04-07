var React = require('react');
var classNames = require('classnames');

require('./label.scss');

var Label = React.createClass({
    type: 'Label',
    render: function () {
        var classes = classNames(
            'label',
            this.props.className
        );
        return (
            <label {... this.props} className={classes}>
                {this.props.children}
            </label>
        );
    }
});

module.exports = Label;
