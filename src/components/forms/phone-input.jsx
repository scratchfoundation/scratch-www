const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const formsyComponent = require('formsy-react-components/release/hoc/component').default;
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');
const ReactPhoneInput = require('react-telephone-input/lib/withStyles').default;
const Row = require('formsy-react-components').Row;

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
            'handleChange'
        ]);
        this.state = {value: props.value};
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
            this.props.onSetValue(nextProps.value);
        }
    }
    handleChange (telNumber) {
        if (this.updateOnChange) {
            this.onSetValue(telNumber);
        }
    }
    handleBlur (telNumber) {
        if (this.updateOnBlur) {
            this.onSetValue(telNumber);
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
                        id={this.props.id}
                        label={null}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        {...omit(this.props, ['className', 'onChange', 'onBlur'])}
                    />
                </div>
            </Row>
        );
    }
}

PhoneInput.defaultProps = {
    type: 'tel',
    value: '',
    updateOnChange: true
};

PhoneInput.propTypes = {
    className: PropTypes.string,
    defaultCountry: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onSetValue: PropTypes.func,
    value: PropTypes.string
};

const phoneValidationHOC = validationHOCFactory({
    isPhone: <intl.FormattedMessage id="teacherRegistration.validationPhoneNumber" />
});

module.exports = inputHOC(phoneValidationHOC(defaultValidationHOC(formsyComponent(PhoneInput))));
