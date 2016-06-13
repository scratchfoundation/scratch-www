var classNames = require('classnames');
var FRCCheckbox = require('formsy-react-components').Checkbox;
var React = require('react');
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');

require('./row.scss');

var Checkbox = React.createClass({
    type: 'Checkbox',
    render: function () {
        var classes = classNames(
            'checkbox-row',
            this.props.className
        );
        return (
            <FRCCheckbox {... this.props} rowClassName={classes} />
        );
    }
});

module.exports = inputHOC(defaultValidationHOC(Checkbox));
