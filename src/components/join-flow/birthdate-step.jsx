const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
const {Formik} = require('formik');
const {injectIntl} = require('react-intl');
const FormattedMessage = require('react-intl').FormattedMessage;

const intlShape = require('../../lib/intl-shape');
const FormikSelect = require('../../components/formik-forms/formik-select.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');
const InfoButton = require('../info-button/info-button.jsx');
const {getBirthMonthOptions, getBirthYearOptions} = require('../../lib/calendar-data.js');

require('./join-flow-steps.scss');

class BirthDateStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleValidSubmit',
            'validateForm',
            'validateSelect'
        ]);
    }
    componentDidMount () {
        if (this.props.sendAnalytics) {
            this.props.sendAnalytics('join-birthdate');
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
        formikBag.setSubmitting(false);
        this.props.onNextStep(formData);
    }
    render () {
        const birthMonthOptions = getBirthMonthOptions(this.props.intl);
        const birthYearOptions = getBirthYearOptions(this.props.intl);
        return (
            <Formik
                initialValues={{
                    birth_month: 'null',
                    birth_year: 'null'
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
                            headerImgClass="birthdate-step-image"
                            headerImgSrc="/images/join-flow/birthdate-header.png"
                            innerClassName="join-flow-inner-birthdate-step"
                            title={this.props.intl.formatMessage({id: 'registration.birthDateStepTitle'})}
                            titleClassName="join-flow-birthdate-title"
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div
                                className={classNames(
                                    'col-sm-9',
                                    'row',
                                    'birthdate-select-row'
                                )}
                            >
                                <FormikSelect
                                    className={classNames(
                                        'join-flow-select',
                                        'join-flow-select-month',
                                        {fail: errors.birth_month}
                                    )}
                                    /* hide month (left side) error, if year (right side) error exists */
                                    error={errors.birth_year ? null : errors.birth_month}
                                    id="birth_month"
                                    name="birth_month"
                                    options={birthMonthOptions}
                                    validate={this.validateSelect}
                                    validationClassName={classNames(
                                        'validation-birthdate',
                                        'validation-birthdate-month',
                                        'validation-left'
                                    )}
                                    /* eslint-disable react/jsx-no-bind */
                                    onFocus={() => setFieldError('birth_month', null)}
                                    /* eslint-enable react/jsx-no-bind */
                                />
                                <FormikSelect
                                    className={classNames(
                                        'join-flow-select',
                                        'join-flow-select-year',
                                        {fail: errors.birth_year}
                                    )}
                                    error={errors.birth_year}
                                    id="birth_year"
                                    name="birth_year"
                                    options={birthYearOptions}
                                    validate={this.validateSelect}
                                    validationClassName={classNames(
                                        'validation-birthdate',
                                        'validation-birthdate-year'
                                    )}
                                    /* eslint-disable react/jsx-no-bind */
                                    onFocus={() => setFieldError('birth_year', null)}
                                    /* eslint-enable react/jsx-no-bind */
                                />
                            </div>
                            <div className="join-flow-privacy-message">
                                <FormattedMessage id="registration.private" />
                                <InfoButton
                                    message={this.props.intl.formatMessage({id: 'registration.birthDateStepInfo'})}
                                />
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

BirthDateStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func,
    sendAnalytics: PropTypes.func.isRequired
};

const IntlBirthDateStep = injectIntl(BirthDateStep);

module.exports = IntlBirthDateStep;
