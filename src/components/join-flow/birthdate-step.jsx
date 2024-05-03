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

require('./join-flow-steps.scss');

const getBirthMonthOptions = intl => ([
    {value: 'null', label: intl.formatMessage({id: 'general.month'}), disabled: true},
    {value: '1', label: intl.formatMessage({id: 'general.monthJanuary'})},
    {value: '2', label: intl.formatMessage({id: 'general.monthFebruary'})},
    {value: '3', label: intl.formatMessage({id: 'general.monthMarch'})},
    {value: '4', label: intl.formatMessage({id: 'general.monthApril'})},
    {value: '5', label: intl.formatMessage({id: 'general.monthMay'})},
    {value: '6', label: intl.formatMessage({id: 'general.monthJune'})},
    {value: '7', label: intl.formatMessage({id: 'general.monthJuly'})},
    {value: '8', label: intl.formatMessage({id: 'general.monthAugust'})},
    {value: '9', label: intl.formatMessage({id: 'general.monthSeptember'})},
    {value: '10', label: intl.formatMessage({id: 'general.monthOctober'})},
    {value: '11', label: intl.formatMessage({id: 'general.monthNovember'})},
    {value: '12', label: intl.formatMessage({id: 'general.monthDecember'})}
]);

const getBirthYearOptions = intl => {
    const curYearRaw = (new Date()).getYear();
    const curYear = curYearRaw + 1900;
    // including both 1900 and current year, there are (curYearRaw + 1) options.
    const numYearOptions = curYearRaw + 1;
    const birthYearOptions = Array(numYearOptions).fill()
        .map((defaultVal, i) => (
            {value: String(curYear - i), label: String(curYear - i)}
        ));
    birthYearOptions.unshift({ // set placeholder as first option
        disabled: true,
        value: 'null',
        label: intl.formatMessage({id: 'general.year'})
    });
    return birthYearOptions;
};

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
