var defaults = require('lodash.defaultsdeep');
var intl = require('../../lib/intl.jsx');
var libphonenumber = require('google-libphonenumber');
var phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
var React = require('react');

module.exports = {};

module.exports.validations = {
    notEquals: function (values, value, neq) {
        return value !== neq;
    },
    notEqualsField: function (values, value, field) {
        return value !== values[field];
    },
    isPhone: function (values, value) {
        if (typeof value === 'undefined') return true;
        if (value && value.national_number === '+') return true;
        try {
            var parsed = phoneNumberUtil.parse(value.national_number, value.country_code.iso2);
        } catch (err) {
            return false;
        }
        return phoneNumberUtil.isValidNumber(parsed);
    }
};
module.exports.validations.notEqualsUsername = module.exports.validations.notEquals;

module.exports.validationHOCFactory = function (defaultValidationErrors) {
    return function (Component) {
        var ValidatedComponent = React.createClass({
            render: function () {
                var validationErrors = defaults(
                    {},
                    defaultValidationErrors,
                    this.props.validationErrors
                );
                return (
                    <Component {...this.props} validationErrors={validationErrors} />
                );
            }
        });
        return ValidatedComponent;
    };
};

module.exports.defaultValidationHOC = module.exports.validationHOCFactory({
    isDefaultRequiredValue: <intl.FormattedMessage id="form.validationRequired" />
});
