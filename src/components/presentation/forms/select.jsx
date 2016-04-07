var React = require('react');
var classNames = require('classnames');

require('./select.scss');

var Select = React.createClass({
    type: 'Select',
    propTypes: {
        
    },
    render: function () {
        var classes = classNames(
            'select',
            this.props.className
        );
        return (
            <select {... this.props} className={classes}>
                {this.props.children}
            </select>
        );
    }
});

module.exports = Select;
