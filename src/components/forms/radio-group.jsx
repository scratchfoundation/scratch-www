var classNames = require('classnames');
var FRCRadioGroup = require('formsy-react-components').RadioGroup;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;

var RadioGroup = React.createClass({
    type: 'RadioGroup',
    render: function () {
        var classes = classNames(
            'radio-group',
            this.props.className
        );
        return (
            <FRCRadioGroup {... this.props} className={classes} />
        );
    }
});

module.exports = defaultValidationHOC(RadioGroup);
