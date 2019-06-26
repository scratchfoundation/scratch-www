/* eslint-disable react/no-multi-comp */
const bindAll = require('lodash.bindall');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');

const api = require('../../lib/api');
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
            'validateUsernameLocally',
            'validateUsernameRemotely',
            'handleValidSubmit',
            'validatePassword',
            'validatePasswordConfirmLocally',
            'validateUsername',
            'validateForm'
        ]);
        this.state = {
            showPassword: false
        };
    }
    handleChangeShowPassword () {
        this.setState({showPassword: !this.state.showPassword});
    }
    validateUsernameLocally (username, require) {
        let error;
        if (username.length === 0 && !require) { // allow blank username if not submitting yet
            return null;
        }
        if (!username || username === '') {
            error = this.props.intl.formatMessage({id: 'form.validationRequiredNice'});
        } else if (username.length < 3) {
            error = this.props.intl.formatMessage({id: 'registration.validationUsernameMinLength'});
        } else if (username.length > 20) {
            error = this.props.intl.formatMessage({id: 'registration.validationUsernameMaxLength'});
        } else if (!/^[\w-]+$/i.test(username)) {
            error = this.props.intl.formatMessage({id: 'registration.validationUsernameRegexp'});
        }
        return error;
    }

    validateUsernameRemotely (username, require) {
        if (username.length === 0 && !require) { // allow blank username if not submitting yet
            return null;
        }
        return new Promise((resolve, reject) => {
            api({
                uri: `/accounts/checkusername/${username}/`
            }, (err, body, res) => {
                if (err || res.statusCode !== 200) {
                    reject('api error');
                }
                switch (body.msg) {
                case 'valid username':
                    resolve(null);
                    break;
                case 'username exists':
                    reject(this.props.intl.formatMessage({
                        id: 'registration.validationUsernameExists'
                    }));
                    break;
                case 'bad username':
                    reject(this.props.intl.formatMessage({
                        id: 'registration.validationUsernameVulgar'
                    }));
                    break;
                case 'invalid username':
                default:
                    reject(this.props.intl.formatMessage({
                        id: 'registration.validationUsernameInvalid'
                    }));
                }
            });
        });
    }
    validateUsername (username, require) {
        const localResult = this.validateUsernameLocally(username, require);
        // if error, return that
        if (localResult) {
            return new Promise((resolve, reject) => {
                reject(localResult);
            });
        }
        return this.validateUsernameRemotely(username, require);
    }
    validatePasswordLocally (password, require) {
        let error;
        if (password.length === 0) {
            if (require) {
                return this.props.intl.formatMessage({id: 'form.validationRequiredNice'});
            }
            // not submitting yet, so allow blank password, and don't throw error
            return null;
        }
        if (password.length < 6) {
            error = this.props.intl.formatMessage({id: 'registration.validationPasswordLength'});
        }
        if (password === 'password') {
            error = this.props.intl.formatMessage({id: 'registration.validationPasswordNotEquals'});
        }
        return error;
    }
    validatePassword (password, require) {
        return new Promise((resolve, reject) => {
            const localResult = this.validatePasswordLocally(password, require);
            if (localResult) {
                reject(localResult);
            } else {
                resolve(null);
            }
        });
    }
    validatePasswordConfirmLocally (password, passwordConfirm, require) {
        let error;
        if (passwordConfirm.length === 0 && !require) { // allow blank password if not submitting yet
            return null;
        }
        if (password !== passwordConfirm) {
            error = this.props.intl.formatMessage({id: 'general.error'});
        }
        return error;
    }
    validateForm (values) {
        return this.validateUsername(values.username, true).then(() => (
            this.validatePassword(values.password, true).then(() => {
                if (values.password === values.username) {
                    throw new Error({
                        password: this.props.intl.formatMessage({id: 'registration.validationPasswordNotUsername'})
                    });
                }
                const passwordConfirmFieldError =
                    this.validatePasswordConfirmLocally(values.password, values.passwordConfirm, true);
                if (passwordConfirmFieldError) {
                    throw new Error({
                        passwordConfirm: passwordConfirmFieldError
                    });
                }
                return null; // not necessary, but just to be clear
            }, passReject => {
                throw new Error({password: passReject});
            })
        ), error => { // username error
            throw new Error({username: error});
        });
    }
    handleValidSubmit (formData, formikBag) {
        formikBag.setSubmitting(false);
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
                                    validate={this.validateUsername}
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
                                    validate={this.validatePassword}
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
                                        this.validatePasswordConfirmLocally(values.password, values.passwordConfirm)
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
