var defaults = require('lodash.defaultsdeep');
var React = require('react');

var validateMixin = function (Component) {
    var ValidatedComponent = React.createClass({
        getDefaultValidationErrors: function () {
            return {
                isDefaultRequiredValue: 'This field is required'
            };
        },
        render: function () {
            var validationErrors = defaults(
                this.getDefaultValidationErrors(),
                this.props.validationErrors
            );
            return (
                <Component {...this.props} validationErrors={validationErrors} />
            );
        }
    });
    return ValidatedComponent;
};

module.exports = validateMixin;
