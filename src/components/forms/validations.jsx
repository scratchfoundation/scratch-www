const defaults = require('lodash.defaultsdeep');
const intl = require('../../lib/intl.jsx');
const libphonenumber = require('google-libphonenumber');
const omit = require('lodash.omit');
const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PropTypes = require('prop-types');
const React = require('react');

module.exports.validations = {
    notEquals: (values, value, neq) => (value !== neq),
    notEqualsField: (values, value, field) => (value !== values[field]),
    isPhone: (values, value) => {
        if (typeof value === 'undefined') return true;
        if (value && value.national_number === '+') return true;
        try {
            const parsed = phoneNumberUtil.parse(value.national_number, value.country_code.iso2);
            return phoneNumberUtil.isValidNumber(parsed);
        } catch (err) {
            return false;
        }
    }
};

module.exports.validations.notEqualsUsername = module.exports.validations.notEquals;

module.exports.validationHOCFactory = defaultValidationErrors => (Component => {
    const ValidatedComponent = props => (
        <Component
            validationErrors={defaults(
                {},
                props.validationErrors,
                defaultValidationErrors
            )}
            {...omit(props, ['validationErrors'])}
        />
    );

    ValidatedComponent.propTypes = {
        validationErrors: PropTypes.object // eslint-disable-line react/forbid-prop-types
    };

    return ValidatedComponent;
});

module.exports.defaultValidationHOC = module.exports.validationHOCFactory({
    isDefaultRequiredValue: <intl.FormattedMessage id="form.validationRequired" />
});
