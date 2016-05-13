var classNames = require('classnames');
var FRCCheckboxGroup = require('formsy-react-components').CheckboxGroup;
var React = require('react');
var validateMixin = require('./validateMixin.jsx');

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

module.exports = validateMixin(CheckboxGroup);
