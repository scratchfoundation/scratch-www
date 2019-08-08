const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const countryData = require('../../lib/country-data');
const FormikSelect = require('../../components/formik-forms/formik-select.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

/**
 * Return a list of options to give to select
 * @param  {object} reactIntl      react-intl, used to localize strings
 * @param  {string} defaultCountry optional string of default country to put at top of list
 * @return {object}                ordered set of county options formatted for frc select
 */
const getCountryOptions = reactIntl => {
    const processedCountryData = countryData.registrationCountryOptions;
    processedCountryData.unshift({
        label: reactIntl.formatMessage({id: 'registration.selectCountry'}),
        disabled: true,
        value: 'null'
    });
    return processedCountryData;
};

class CountryStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateForm',
            'validateSelect'
        ]);
    }
    validateSelect (selection) {
        if (selection === 'null') {
            return this.props.intl.formatMessage({id: 'form.validationRequired'});
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
        const countryOptions = getCountryOptions(this.props.intl);
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
                        isSubmitting
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.countryStepDescription'})}
                            headerImgSrc="/images/hoc/getting-started.jpg"
                            title={this.props.intl.formatMessage({id: 'general.joinScratch'})}
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
                                    options={countryOptions}
                                    validate={this.validateSelect}
                                    validationClassName="validation-full-width-input"
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
