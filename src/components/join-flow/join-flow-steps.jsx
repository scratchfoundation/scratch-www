/* eslint-disable react/no-multi-comp */
const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const validate = require('../../lib/validate');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
const JoinFlowStep = require('./join-flow-step.jsx');

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
                                <div className="username-label">
                                    <b>
                                        {this.props.intl.formatMessage({id: 'registration.createUsername'})}
                                    </b>
                                </div>
                                <FormikInput
                                    className={errors.username ? 'fail' : ''}
                                    error={errors.username}
                                    id="username"
                                    name="username"
                                    validate={this.validateUsernameIfPresent}
                                    onBlur={() => validateField('username')} // eslint-disable-line react/jsx-no-bind
                                />
                                <b>
                                    {this.props.intl.formatMessage({id: 'general.password'})}
                                </b>
                                <div
                                    onClick={this.handleChangeShowPassword}
                                >
                                    {this.state.showPassword ? 'Hide password' : (
                                        this.props.intl.formatMessage({id: 'registration.showPassword'})
                                    )}
                                </div>
                                <FormikInput
                                    className={errors.password ? 'fail' : ''}
                                    error={errors.password}
                                    id="password"
                                    name="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    validate={this.validatePasswordIfPresent}
                                    onBlur={() => validateField('password')} // eslint-disable-line react/jsx-no-bind
                                />
                                <b>
                                    {this.props.intl.formatMessage({id: 'general.error'})}
                                </b>
                                <FormikInput
                                    className={errors.passwordConfirm ? 'fail' : ''}
                                    error={errors.passwordConfirm}
                                    id="passwordConfirm"
                                    name="passwordConfirm"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    /* eslint-disable react/jsx-no-bind */
                                    validate={() =>
                                        this.validatePasswordConfirmIfPresent(values.password, values.passwordConfirm)
                                    }
                                    onBlur={() =>
                                        validateField('passwordConfirm')
                                    }
                                    /* eslint-enable react/jsx-no-bind */
                                />
                            </div>
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}
/* eslint-enable */

UsernameStep.propTypes = {
    intl: intlShape,
    onNextStep: PropTypes.func
};

const IntlUsernameStep = injectIntl(UsernameStep);

module.exports.UsernameStep = IntlUsernameStep;
