var classNames = require('classnames');
var FRCCheckboxGroup = require('formsy-react-components').CheckboxGroup;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');

require('./row.scss');
require('./checkbox-group.scss');

var CheckboxGroup = React.createClass({
    type: 'CheckboxGroup',
    render: function () {
        var classes = classNames(
            'checkbox-group',
            this.props.className
        );
        return (
            <div className={classes}>
                <FRCCheckboxGroup {... this.props} className={classes} />
            </div>
        );
    }
});

module.exports = inputHOC(defaultValidationHOC(CheckboxGroup));
