var allCountries = require('react-telephone-input/lib/country_data').allCountries;
var classNames = require('classnames');
var ComponentMixin = require('formsy-react-components').ComponentMixin;
var FormsyMixin = require('formsy-react').Mixin;
var React = require('react');
var ReactPhoneInput = require('react-telephone-input/lib/withStyles');
var Row = require('formsy-react-components').Row;

var defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
var inputHOC = require('./input-hoc.jsx');
var intl = require('../../lib/intl.jsx');
var validationHOCFactory = require('./validations.jsx').validationHOCFactory;

var allIso2 = allCountries.map(function (country) {return country.iso2;});

require('./row.scss');
require('./phone-input.scss');

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
                 rowClassName={classNames('phone-input', this.props.className)}
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
                    {this.renderHelp()}
                    {this.renderErrorMessage()}
                </div>
            </Row>
        );
    }
});

var phoneValidationHOC = validationHOCFactory({
    isPhone: <intl.FormattedMessage id="teacherRegistration.validationPhoneNumber" />
});

module.exports = inputHOC(defaultValidationHOC(phoneValidationHOC(PhoneInput)));
