import {allCountries} from 'react-telephone-input/lib/country_data';
import classNames from 'classnames';
import {ComponentMixin} from 'formsy-react-components';
import {Mixin as FormsyMixin} from 'formsy-react';
import React from 'react';
import ReactPhoneInput from 'react-telephone-input/lib/withStyles';
import {Row} from 'formsy-react-components';

import {defaultValidationHOC} from './validations.jsx';
import inputHOC from './input-hoc.jsx';
import intl from '../../lib/intl.jsx';
import {validationHOCFactory} from './validations.jsx';

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

export default inputHOC(defaultValidationHOC(phoneValidationHOC(PhoneInput)));
