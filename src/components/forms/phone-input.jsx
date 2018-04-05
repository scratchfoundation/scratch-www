const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const formsyComponent = require('formsy-react-components/release/hoc/component').default;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const ReactPhoneInput = require('react-telephone-input/lib/withStyles').default;
const Row = require('formsy-react-components').Row;
const Help = require('formsy-react-components/release/components/help').default;
const ErrorMessages = require('formsy-react-components/release/components/error-messages').default;

const defaultValidationHOC = require('./validations.jsx').defaultValidationHOC;
const inputHOC = require('./input-hoc.jsx');
const intl = require('../../lib/intl.jsx');
const validationHOCFactory = require('./validations.jsx').validationHOCFactory;

require('./row.scss');
require('./phone-input.scss');

class PhoneInput extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleChange',
            'handleUpdate'
        ]);
    }
    handleUpdate (number, country) {
        const value = {
            national_number: number,
            country_code: country
        };
        this.props.onSetValue(value);
    }
    handleChange (number, country) {
        if (this.props.updateOnChange) {
            this.handleUpdate(number, country);
        }
    }
    handleBlur (number, country) {
        if (this.props.updateOnBlur) {
            this.handleUpdate(number, country);
        }
    }
    
    render () {
        return (
            <Row
                {...this.props}
                htmlFor={this.props.id}
                rowClassName={classNames('phone-input', this.props.className)}
            >
                <div className="input-group">
                    <ReactPhoneInput
                        className="form-control"
                        defaultCountry={this.props.defaultCountry}
                        flagsImagePath="/images/flags.png"
                        label={null}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        {...omit(this.props, ['className', 'isValid', 'onChange', 'onBlur', 'value'])}
                    />
                </div>
                {this.props.help ? <Help help={this.props.help} /> : null}
                {this.props.showErrors ? (
                    <ErrorMessages messages={this.props.errorMessages} />
                ) : null}
            </Row>
        );
    }
}

PhoneInput.defaultProps = {
    type: 'tel',
    updateOnChange: true
};

PhoneInput.propTypes = {
    className: PropTypes.string,
    defaultCountry: PropTypes.string,
    disabled: PropTypes.bool,
    errorMessages: PropTypes.arrayOf(PropTypes.node),
    help: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onSetValue: PropTypes.func,
    showErrors: PropTypes.bool,
    updateOnBlur: PropTypes.bool,
    updateOnChange: PropTypes.bool
};

const phoneValidationHOC = validationHOCFactory({
    isPhone: <intl.FormattedMessage id="teacherRegistration.validationPhoneNumber" />
});

const ValidatedPhoneInput = inputHOC(defaultValidationHOC(phoneValidationHOC(formsyComponent(PhoneInput))));

ValidatedPhoneInput.defaultProps = {
    validations: {
        isPhone: true
    }
};

ValidatedPhoneInput.propTypes = {
    validations: PropTypes.objectOf(PropTypes.bool)
};

module.exports = ValidatedPhoneInput;
