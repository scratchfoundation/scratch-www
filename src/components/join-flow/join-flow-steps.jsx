/* eslint-disable react/no-multi-comp */
const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const validate = require('../../lib/validate');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
const FormikSelect = require('../../components/formik-forms/formik-select.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');

require('./join-flow-steps.scss');

/*
 * Username step
 */
/* eslint-disable react/prefer-stateless-function, no-useless-constructor */
class UsernameStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleChangeShowPassword',
            'handleValidSubmit',
            'validatePasswordIfPresent',
            'validatePasswordConfirmIfPresent',
            'validateUsernameIfPresent',
            'validateForm'
        ]);
        this.state = {
            showPassword: false
        };
    }
    handleChangeShowPassword () {
        this.setState({showPassword: !this.state.showPassword});
    }
    // we allow username to be empty on blur, since you might not have typed anything yet
    validateUsernameIfPresent (username) {
        if (!username) return null; // skip validation if username is blank; null indicates valid
        const localResult = validate.validateUsernameLocally(username);
        if (localResult.valid) {
            return validate.validateUsernameRemotely(username).then(
                remoteResult => {
                    if (remoteResult.valid) return null;
                    return this.props.intl.formatMessage({id: remoteResult.errMsgId});
                }
            );
        }
        return this.props.intl.formatMessage({id: localResult.errMsgId});
    }
    validatePasswordIfPresent (password) {
        if (!password) return null; // skip validation if password is blank; null indicates valid
        const localResult = validate.validatePassword(password);
        if (localResult.valid) return null;
        return this.props.intl.formatMessage({id: localResult.errMsgId});
    }
    validatePasswordConfirmIfPresent (password, passwordConfirm) {
        if (!passwordConfirm) return null; // allow blank password if not submitting yet
        const localResult = validate.validatePasswordConfirm(password, passwordConfirm);
        if (localResult.valid) return null;
        return this.props.intl.formatMessage({id: localResult.errMsgId});
    }
    // called asynchonously when form submit is initially requested,
    // along with all of the individual field validation functions
    validateForm (values) {
        // in addition to field-level username/password validations, we need to additionally
        // check that these values aren't blank.
        const errors = {};
        const usernameResult = validate.validateUsernameLocally(values.username);
        if (!usernameResult.valid) {
            errors.username = this.props.intl.formatMessage({id: usernameResult.errMsgId});
        }
        const passwordResult = validate.validatePassword(values.password);
        if (!passwordResult.valid) {
            errors.password = this.props.intl.formatMessage({id: passwordResult.errMsgId});
        }
        if (values.password === values.username) {
            errors.password = this.props.intl.formatMessage({id: 'registration.validationPasswordNotUsername'});
        }
        const passwordConfirmResult = validate.validatePasswordConfirm(values.password, values.passwordConfirm);
        if (!passwordConfirmResult.valid) {
            errors.passwordConfirm = this.props.intl.formatMessage({id: passwordConfirmResult.errMsgId});
        }
        return errors;
    }
    // called after all validations pass with no errors
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false); // formik makes us do this ourselves
        this.props.onNextStep(formData);
    }
    render () {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordConfirm: ''
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
                        validateField,
                        values
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.usernameStepDescription'})}
                            title={this.props.intl.formatMessage({id: 'general.joinScratch'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <div className="join-flow-input-title">
                                    {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                </div>
                                <FormikInput
                                    className={classNames(
                                        'join-flow-input',
                                        {fail: errors.username}
                                    )}
                                    error={errors.username}
                                    id="username"
                                    name="username"
                                    validate={this.validateUsernameIfPresent}
                                    validationClassName="validation-full-width-input"
                                    onBlur={() => validateField('username')} // eslint-disable-line react/jsx-no-bind
                                />
                                <div className="join-flow-password-section">
                                    <div className="join-flow-input-title">
                                        {this.props.intl.formatMessage({id: 'general.password'})}
                                    </div>
                                    <FormikInput
                                        className={classNames(
                                            'join-flow-input',
                                            {fail: errors.password}
                                        )}
                                        error={errors.password}
                                        id="password"
                                        name="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        validate={this.validatePasswordIfPresent}
                                        validationClassName="validation-full-width-input"
                                        /* eslint-disable react/jsx-no-bind */
                                        onBlur={() => validateField('password')}
                                        /* eslint-enable react/jsx-no-bind */
                                    />
                                    <FormikInput
                                        className={classNames(
                                            'join-flow-input',
                                            {fail: errors.passwordConfirm}
                                        )}
                                        error={errors.passwordConfirm}
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        /* eslint-disable react/jsx-no-bind */
                                        validate={() =>
                                            this.validatePasswordConfirmIfPresent(values.password,
                                                values.passwordConfirm)
                                        }
                                        validationClassName="validation-full-width-input"
                                        onBlur={() =>
                                            validateField('passwordConfirm')
                                        }
                                        /* eslint-enable react/jsx-no-bind */
                                    />
                                    <div className="join-flow-input-title">
                                        <div
                                            onClick={this.handleChangeShowPassword}
                                        >
                                            {/* TODO: should localize 'Hide password' if we use that */}
                                            {this.state.showPassword ? 'Hide password' : (
                                                this.props.intl.formatMessage({id: 'registration.showPassword'})
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

UsernameStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func
};

const IntlUsernameStep = injectIntl(UsernameStep);

module.exports.UsernameStep = IntlUsernameStep;

/*
 * BirthDateStep
 */

const birthMonthIds = [
    {value: 'null', id: 'general.month'},
    {value: '1', id: 'general.monthJanuary'},
    {value: '2', id: 'general.monthFebruary'},
    {value: '3', id: 'general.monthMarch'},
    {value: '4', id: 'general.monthApril'},
    {value: '5', id: 'general.monthMay'},
    {value: '6', id: 'general.monthJune'},
    {value: '7', id: 'general.monthJuly'},
    {value: '8', id: 'general.monthAugust'},
    {value: '9', id: 'general.monthSeptember'},
    {value: '10', id: 'general.monthOctober'},
    {value: '11', id: 'general.monthNovember'},
    {value: '12', id: 'general.monthDecember'}
];
const curYearRaw = (new Date()).getYear();
const curYear = curYearRaw + 1900;
const birthYearOptions = Array(curYearRaw + 2).fill()
    .map((_, i) => (
        {value: String(curYear - i), label: String(curYear - i)}
    ));

class BirthDateStep extends React.Component {
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
        const birthMonthOptions = birthMonthIds.map(item => (
            {value: item.value, label: this.props.intl.formatMessage({id: item.id})}
        ));
        birthYearOptions[0] = {
            value: 'null',
            label: this.props.intl.formatMessage({id: 'general.year'})
        };
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
                        isSubmitting
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({id: 'registration.birthDateStepDescription'})}
                            headerImgSrc="/images/hoc/getting-started.jpg"
                            title={this.props.intl.formatMessage({id: 'general.joinScratch'})}
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
                                    error={errors.birth_month}
                                    id="birth_month"
                                    name="birth_month"
                                    options={birthMonthOptions}
                                    validate={this.validateSelect}
                                    validationClassName="validation-full-width-input"
                                />
                                <FormikSelect
                                    className={classNames(
                                        'join-flow-select',
                                        {fail: errors.birth_year}
                                    )}
                                    error={errors.birth_year}
                                    id="birth_year"
                                    name="birth_year"
                                    options={birthYearOptions}
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

BirthDateStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func
};

const IntlBirthDateStep = injectIntl(BirthDateStep);

module.exports.BirthDateStep = IntlBirthDateStep;

/* eslint-enable */
