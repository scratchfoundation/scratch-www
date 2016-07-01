var classNames = require('classnames');
var Formsy = require('formsy-react');
var omit = require('lodash.omit');
var React = require('react');
var GeneralError = require('./general-error.jsx');
var validations = require('./validations.jsx').validations;

for (var validation in validations) {
    Formsy.addValidationRule(validation, validations[validation]);
}

var Form = React.createClass({
    getDefaultProps: function () {
        return {
            noValidate: true,
            onChange: function () {}
        };
    },
    getInitialState: function () {
        return {
            allValues: {}
        };
    },
    onChange: function (currentValues, isChanged) {
        this.setState({allValues: omit(currentValues, 'all')});
        this.props.onChange(currentValues, isChanged);
    },
    render: function () {
        var classes = classNames(
            'form',
            this.props.className
        );
        return (
            <Formsy.Form {... this.props} className={classes} ref="formsy" onChange={this.onChange}>
                <GeneralError name="all" value={this.state.allValues} />
                {this.props.children}
            </Formsy.Form>
        );
    }
});

module.exports = Form;
