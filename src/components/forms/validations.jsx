import defaults from 'lodash.defaultsdeep';
import intl from '../../lib/intl.jsx';
import libphonenumber from 'google-libphonenumber';
var phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
import React from 'react';

export var validations = {
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

validations.notEqualsUsername = validations.notEquals;

export function validationHOCFactory(defaultValidationErrors) {
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
}

export var defaultValidationHOC = validationHOCFactory({
    isDefaultRequiredValue: <intl.FormattedMessage id="form.validationRequired" />
});
