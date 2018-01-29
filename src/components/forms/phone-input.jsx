const allCountries = require('react-telephone-input/lib/country_data').allCountries;
const classNames = require('classnames');
const ComponentMixin = require('formsy-react-components').ComponentMixin;
const createReactClass = require('create-react-class');
const FormsyMixin = require('formsy-react').Mixin;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const ReactPhoneInput = require('react-telephone-input/lib/withStyles').default;
const Row = require('formsy-react-components').Row;

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');
const intl = require('../../lib/intl.jsx');
const validationHOCFactory = require('./validations.jsx').validationHOCFactory;

const allIso2 = allCountries.map(country => (country.iso2));

require('./row.scss');
require('./phone-input.scss');

const PhoneInput = createReactClass({ // eslint-disable-line react/prefer-es6-class
    displayName: 'PhoneInput',
    propTypes: {
        className: PropTypes.string,
        defaultCountry: PropTypes.string,
        disabled: PropTypes.bool,
        name: PropTypes.string,
        onChange: PropTypes.func
    },
    mixins: [
        FormsyMixin,
        ComponentMixin
    ],
    getDefaultProps: function () {
        return {
            validations: {
                isPhone: true
            },
            flagsImagePath: '/images/flags.png',
            defaultCountry: 'us'
        };
    },
    handleChangeInput: function (number, country) {
        const value = {
            national_number: number,
            country_code: country
        };
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },
    render: function () {
        let defaultCountry = PhoneInput.getDefaultProps().defaultCountry;
        if (allIso2.indexOf(this.props.defaultCountry.toLowerCase()) !== -1) {
            defaultCountry = this.props.defaultCountry.toLowerCase();
        }
        return (
            <Row
                htmlFor={this.getId()}
                rowClassName={classNames('phone-input', this.props.className)}
                {...this.getRowProperties()}
            >
                <div className="input-group">
                    <ReactPhoneInput
                        className="form-control"
                        defaultCountry={defaultCountry}
                        disabled={this.isFormDisabled() || this.props.disabled}
                        id={this.getId()}
                        label={null}
                        onChange={this.handleChangeInput}
                        {...omit(this.props, ['className', 'disabled', 'onChange'])}
                    />
                    {this.renderHelp()}
                    {this.renderErrorMessage()}
                </div>
            </Row>
        );
    }
});

const phoneValidationHOC = validationHOCFactory({
    isPhone: <intl.FormattedMessage id="teacherRegistration.validationPhoneNumber" />
});

module.exports = inputHOC(defaultValidationHOC(phoneValidationHOC(PhoneInput)));
