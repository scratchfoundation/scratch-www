var classNames = require('classnames');
var Formsy = require('formsy-react');
var React = require('react');
var validations = require('./validations.jsx').validations;

for (var validation in validations) {
    Formsy.addValidationRule(validation, validations[validation]);
}

var Form = React.createClass({
    getDefaultProps: function () {
        return {
            noValidate: true
        };
    },
    render: function () {
        var classes = classNames(
            'form',
            this.props.className
        );
        return (
          <Formsy.Form {... this.props} className={classes}>
            {this.props.children}
          </Formsy.Form>
        );
    }
});

module.exports = Form;
