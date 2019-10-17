const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const countryData = require('../../lib/country-data');
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
    }
    componentDidMount () {
        this.setCountryOptions();
    }
    setCountryOptions () {
        if (this.countryOptions.length === 0) {
            this.countryOptions = [...countryData.registrationCountryOptions];
            this.countryOptions.unshift({ // add placeholder as first option
                disabled: true,
                label: this.props.intl.formatMessage({id: 'registration.selectCountry'}),
                value: 'null'
            });
        }
        // NOTE: this should not be merged to the develop or master branches!
        const customSentryTestErr = new Error('Test of Sentry catching from join flow country step');
        customSentryTestErr.code = 'JOIN_FLOW_CUSTOM_ERROR_CODE';
        throw customSentryTestErr;
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
        formikBag.setSubmitting(false);
        this.props.onNextStep(formData);
    }
    render () {
        this.setCountryOptions();
        return (
            <Formik
                initialValues={{
                    country: 'null'
                }}
                validate={this.validateForm}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={this.handleValidSubmit}
            >
                {props => {
                    const {
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
                                    /* eslint-disable react/jsx-no-bind */
                                    onFocus={() => setFieldError('country', null)}
                                    /* eslint-enable react/jsx-no-bind */
                                />
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
    onNextStep: PropTypes.func
};

const IntlCountryStep = injectIntl(CountryStep);

module.exports = IntlCountryStep;
