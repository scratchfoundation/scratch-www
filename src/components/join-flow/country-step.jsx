const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const {Formik} = require('formik');
const {injectIntl} = require('react-intl');

const countryData = require('../../lib/country-data');
const intlShape = require('../../lib/intl-shape');
const FormikSelect = require('../../components/formik-forms/formik-select.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');
const FormikCheckbox = require('../../components/formik-forms/formik-checkbox.jsx');

require('./join-flow-steps.scss');

class CountryStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateForm',
            'validateSelect'
        ]);
        this.countryOptions = [];
        this.stateOptions = [];
    }
    componentDidMount () {
        if (this.props.sendAnalytics) {
            this.props.sendAnalytics('join-country');
        }
    }
    setCountryOptions () {
        if (this.countryOptions.length === 0) {
            this.countryOptions = [...countryData.registrationCountryNameOptions];
            this.countryOptions.unshift({ // add placeholder as first option
                disabled: true,
                label: this.props.intl.formatMessage({id: 'registration.selectCountry'}),
                value: 'null'
            });
        }
    }
    setStateOptions () {
        if (this.stateOptions.length === 0) {
            const allSubdivisions = countryData.subdivisionOptions.us ?? [];
            
            this.stateOptions = allSubdivisions.filter(subdivision => subdivision.type === 'State');
            
            this.stateOptions.unshift({
                disabled: true,
                label: this.props.intl.formatMessage({id: 'registration.selectState'}),
                value: 'null'
            });
        }
    }
    validateSelect (selection) {
        if (selection === 'null') {
            return this.props.intl.formatMessage({id: 'general.required'});
        }
        return null;
    }
    validateForm () {
        return {};
    }
    handleValidSubmit (formData, formikBag) {
        const state = this.stateOptions
            .filter(option => option.value !== 'null')
            .find(option => option.value === formData.state)?.label;

        formikBag.setSubmitting(false);
        this.props.onNextStep({...formData, state});
    }
    render () {
        this.setCountryOptions();
        this.setStateOptions();

        return (
            <Formik
                initialValues={{
                    country: 'null',
                    state: 'null'
                }}
                validate={this.validateForm}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
                        values,
                        errors,
                        handleSubmit,
                        isSubmitting,
                        setFieldError
                    } = props;
                    return (
                        <JoinFlowStep
                            headerImgClass="country-step-image"
                            headerImgSrc="/images/join-flow/country-header.png"
                            innerClassName="join-flow-inner-country-step"
                            title={this.props.intl.formatMessage({id: 'registration.countryStepTitle'})}
                            titleClassName="join-flow-country-title"
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div
                                className={classNames(
                                    'col-sm-9',
                                    'row'
                                )}
                            >
                                <FormikSelect
                                    className={classNames(
                                        'join-flow-select',
                                        'join-flow-select-country',
                                        {fail: errors.country}
                                    )}
                                    error={errors.country}
                                    id="country"
                                    name="country"
                                    options={this.countryOptions}
                                    validate={this.validateSelect}
                                    validationClassName={classNames(
                                        'validation-full-width-input',
                                        'validation-country'
                                    )}
                                    /* eslint-disable-next-line react/jsx-no-bind */
                                    onFocus={() => setFieldError('country', null)}
                                />
                                {/* We currently collect state only for US residents */}
                                {values.country === 'United States' && <FormikSelect
                                    className={classNames(
                                        'join-flow-select',
                                        'join-flow-select-state',
                                        {fail: errors.state}
                                    )}
                                    error={errors.state}
                                    id="state"
                                    name="state"
                                    options={this.stateOptions}
                                    validate={this.validateSelect}
                                    validationClassName={classNames(
                                        'validation-full-width-input',
                                        'validation-state'
                                    )}
                                    /* eslint-disable-next-line react/jsx-no-bind */
                                    onFocus={() => setFieldError('state', null)}
                                />}
                                {/* note that this is a hidden checkbox the user will never see */}
                                <FormikCheckbox
                                    id="yesno"
                                    label={this.props.intl.formatMessage({id: 'registration.receiveEmails'})}
                                    name="yesno"
                                    outerClassName="yesNoCheckbox"
                                />
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

CountryStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func,
    sendAnalytics: PropTypes.func.isRequired
};

const IntlCountryStep = injectIntl(CountryStep);

module.exports = IntlCountryStep;
