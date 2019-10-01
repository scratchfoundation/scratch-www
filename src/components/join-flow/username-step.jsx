const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const validate = require('../../lib/validate');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
const FormikCheckbox = require('../../components/formik-forms/formik-checkbox.jsx');
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
            'handleFocused',
            'handleSetUsernameRef',
            'handleValidSubmit',
            'validatePasswordIfPresent',
            'validatePasswordConfirmIfPresent',
            'validateUsernameIfPresent',
            'validateForm'
        ]);
        this.state = {
            focused: null
        };
    }
    componentDidMount () {
        // automatically start with focus on username field
        if (this.usernameInput) this.usernameInput.focus();
    }
    // track the currently focused input field, to determine whether each field should
    // display a tooltip. (We only display it if a field is focused and has never been touched.)
    handleFocused (fieldName) {
        this.setState({focused: fieldName});
    }
    handleSetUsernameRef (usernameInputRef) {
        this.usernameInput = usernameInputRef;
    }
    // we allow username to be empty on blur, since you might not have typed anything yet
    validateUsernameIfPresent (username) {
        if (!username) return null; // skip validation if username is blank; null indicates valid
        // if username is not blank, run both local and remote validations
        const localResult = validate.validateUsernameLocally(username);
        return validate.validateUsernameRemotely(username).then(
            remoteResult => {
                // there may be multiple validation errors. Prioritize vulgarity, then
                // length, then having invalid chars, then all other remote reports
                if (remoteResult.valid === false && remoteResult.errMsgId === 'registration.validationUsernameVulgar') {
                    return this.props.intl.formatMessage({id: remoteResult.errMsgId});
                } else if (localResult.valid === false) {
                    return this.props.intl.formatMessage({id: localResult.errMsgId});
                } else if (remoteResult.valid === false) {
                    return this.props.intl.formatMessage({id: remoteResult.errMsgId});
                }
                return null;
            }
        );
    }
    validatePasswordIfPresent (password, username) {
        if (!password) return null; // skip validation if password is blank; null indicates valid
        const localResult = validate.validatePassword(password, username);
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
        const passwordResult = validate.validatePassword(values.password, values.username);
        if (!passwordResult.valid) {
            errors.password = this.props.intl.formatMessage({id: passwordResult.errMsgId});
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
        delete formData.showPassword;
        this.props.onNextStep(formData);
    }
    render () {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordConfirm: '',
                    showPassword: true
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
                        setFieldError,
                        setFieldTouched,
                        setFieldValue,
                        touched,
                        validateField,
                        values
                    } = props;
                    return (
                        <JoinFlowStep
                            description={this.props.intl.formatMessage({
                                id: 'registration.usernameStepDescriptionNonEducator'
                            })}
                            innerClassName="join-flow-inner-username-step"
                            title={this.props.intl.formatMessage({id: 'general.joinScratch'})}
                            waiting={isSubmitting}
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <div className="join-flow-input-title">
                                    {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                </div>
                                <FormikInput
                                    autoCapitalize="off"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    className={classNames(
                                        'join-flow-input'
                                    )}
                                    error={errors.username}
                                    id="username"
                                    name="username"
                                    placeholder={this.props.intl.formatMessage({id: 'general.username'})}
                                    spellCheck={false}
                                    toolTip={this.state.focused === 'username' && !touched.username &&
                                        this.props.intl.formatMessage({id: 'registration.usernameAdviceShort'})}
                                    validate={this.validateUsernameIfPresent}
                                    validationClassName="validation-full-width-input"
                                    /* eslint-disable react/jsx-no-bind */
                                    onBlur={() => validateField('username')}
                                    onChange={e => {
                                        setFieldValue('username', e.target.value);
                                        setFieldTouched('username');
                                        setFieldError('username', null);
                                    }}
                                    onFocus={() => this.handleFocused('username')}
                                    /* eslint-enable react/jsx-no-bind */
                                    onSetRef={this.handleSetUsernameRef}
                                />
                                <div className="join-flow-password-section">
                                    <div className="join-flow-input-title">
                                        {this.props.intl.formatMessage({id: 'registration.choosePasswordStepTitle'})}
                                    </div>
                                    <FormikInput
                                        autoCapitalize="off"
                                        autoComplete={values.showPassword ? 'off' : 'new-password'}
                                        autoCorrect="off"
                                        className={classNames(
                                            'join-flow-input',
                                            {'join-flow-input-password':
                                                !values.showPassword && values.password.length > 0}
                                        )}
                                        error={errors.password}
                                        id="password"
                                        name="password"
                                        placeholder={this.props.intl.formatMessage({id: 'general.password'})}
                                        spellCheck={false}
                                        toolTip={this.state.focused === 'password' && !touched.password &&
                                            this.props.intl.formatMessage({id: 'registration.passwordAdviceShort'})}
                                        type={values.showPassword ? 'text' : 'password'}
                                        /* eslint-disable react/jsx-no-bind */
                                        validate={password => this.validatePasswordIfPresent(password, values.username)}
                                        validationClassName="validation-full-width-input"
                                        onBlur={() => validateField('password')}
                                        onChange={e => {
                                            setFieldValue('password', e.target.value);
                                            setFieldTouched('password');
                                            setFieldError('password', null);
                                        }}
                                        onFocus={() => this.handleFocused('password')}
                                        /* eslint-enable react/jsx-no-bind */
                                    />
                                    <FormikInput
                                        autoCapitalize="off"
                                        autoComplete={values.showPassword ? 'off' : 'new-password'}
                                        autoCorrect="off"
                                        className={classNames(
                                            'join-flow-input',
                                            'join-flow-password-confirm',
                                            {
                                                'join-flow-input-password':
                                                    !values.showPassword && values.passwordConfirm.length > 0,
                                                'fail': errors.passwordConfirm
                                            }
                                        )}
                                        error={errors.passwordConfirm}
                                        id="passwordConfirm"
                                        name="passwordConfirm"
                                        placeholder={this.props.intl.formatMessage({
                                            id: 'registration.confirmPasswordInstruction'
                                        })}
                                        spellCheck={false}
                                        toolTip={
                                            this.state.focused === 'passwordConfirm' && !touched.passwordConfirm &&
                                                this.props.intl.formatMessage({
                                                    id: 'registration.confirmPasswordInstruction'
                                                })
                                        }
                                        type={values.showPassword ? 'text' : 'password'}
                                        /* eslint-disable react/jsx-no-bind */
                                        validate={() =>
                                            this.validatePasswordConfirmIfPresent(values.password,
                                                values.passwordConfirm)
                                        }
                                        validationClassName="validation-full-width-input"
                                        onBlur={() => validateField('passwordConfirm')}
                                        onChange={e => {
                                            setFieldValue('passwordConfirm', e.target.value);
                                            setFieldTouched('passwordConfirm');
                                            setFieldError('passwordConfirm', null);
                                        }}
                                        onFocus={() => this.handleFocused('passwordConfirm')}
                                        /* eslint-enable react/jsx-no-bind */
                                    />
                                    <FormikCheckbox
                                        id="showPassword"
                                        label={this.props.intl.formatMessage({id: 'registration.showPassword'})}
                                        labelClassName="join-flow-input-title"
                                        name="showPassword"
                                    />
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

module.exports = IntlUsernameStep;
