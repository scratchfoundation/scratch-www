var classNames = require('classnames');
var React = require('react');
var FormsyMixin = require('formsy-react').Mixin;
var ReactPhoneInput = require('react-telephone-input/lib/withStyles');
var allCountries = require('react-telephone-input/lib/country_data').allCountries;
var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var validationHOCFactory = require('./validations.jsx').validationHOCFactory;
var Row = require('formsy-react-components').Row;
var ComponentMixin = require('formsy-react-components').ComponentMixin;

var allIso2 = allCountries.map(function (country) {return country.iso2});

var PhoneInput = React.createClass({
    displayName: 'PhoneInput',
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
    onChangeInput: function (number, country) {
        var value = {national_number: number, country_code: country};
        this.setValue(value);
        this.props.onChange(this.props.name, value);
    },
    render: function () {
        var defaultCountry = PhoneInput.getDefaultProps().defaultCountry;
        if (allIso2.indexOf(this.props.defaultCountry.toLowerCase()) !== -1) {
            defaultCountry =  this.props.defaultCountry.toLowerCase();
        }
        return (
            <Row {... this.getRowProperties()}
                 htmlFor={this.getId()}
                 className={classNames('phone-input', this.props.className)}
            >
                <div className="input-group">
                    <ReactPhoneInput className="form-control"
                                     {... this.props}
                                     defaultCountry={defaultCountry}
                                     onChange={this.onChangeInput}
                                     id={this.getId()}
                                     label={null}
                                     disabled={this.isFormDisabled() || this.props.disabled}
                    />
                </div>
                {this.renderHelp()}
                {this.renderErrorMessage()}
            </Row>
        );
    }
});

var phoneValidationHOC = validationHOCFactory({
    isPhone: 'Please enter a valid phone number'
});

module.exports = defaultValidationHOC(phoneValidationHOC(PhoneInput));
