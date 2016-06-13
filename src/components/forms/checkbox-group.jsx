var classNames = require('classnames');
var FRCCheckboxGroup = require('formsy-react-components').CheckboxGroup;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');

require('./row.scss');

var CheckboxGroup = React.createClass({
    type: 'CheckboxGroup',
    render: function () {
        var classes = classNames(
            'checkbox-group',
            this.props.className
        );
        return (
            <FRCCheckboxGroup {... this.props} className={classes} />
        );
    }
});

module.exports = inputHOC(defaultValidationHOC(CheckboxGroup));
