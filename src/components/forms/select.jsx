var classNames = require('classnames');
var defaults = require('lodash.defaultsdeep');
var FRCSelect = require('formsy-react-components').Select;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');

require('./row.scss');
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
        var props = this.props;
        if (this.props.required && !this.props.value) {
            props = defaults({}, this.props, {value: this.props.options[0].value});
        }
        return (
            <FRCSelect {... props} className={classes} />
        );
    }
});

module.exports = inputHOC(defaultValidationHOC(Select));
