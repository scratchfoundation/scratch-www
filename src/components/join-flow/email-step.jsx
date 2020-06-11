const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');
import {Formik} from 'formik';
const {injectIntl, intlShape} = require('react-intl');
const FormattedMessage = require('react-intl').FormattedMessage;

const validate = require('../../lib/validate');
const JoinFlowStep = require('./join-flow-step.jsx');
const FormikInput = require('../../components/formik-forms/formik-input.jsx');
const InfoButton = require('../info-button/info-button.jsx');
const Captcha = require('../../components/captcha/captcha.jsx');
require('./join-flow-steps.scss');

class EmailStep extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSetEmailRef',
            'handleValidSubmit',
            'validateEmail',
            'validateEmailRemotelyWithCache',
            'validateForm',
            'setCaptchaRef',
            'handleCaptchaSolved',
            'handleCaptchaLoad'
        ]);
        this.state = {
            captchaIsLoading: true
        };
        // simple object to memoize remote requests for email addresses.
        // keeps us from submitting multiple requests for same data.
        this.emailRemoteCache = {};
    }
    componentDidMount () {
        if (this.props.sendAnalytics) {
            this.props.sendAnalytics('join-email');
        }
        // automatically start with focus on username field
        if (this.emailInput) this.emailInput.focus();
    }
    handleSetEmailRef (emailInputRef) {
        this.emailInput = emailInputRef;
    }
    handleCaptchaLoad () {
        this.setState({captchaIsLoading: false});
    }
    // simple function to memoize remote requests for usernames
    validateEmailRemotelyWithCache (email) {
        if (this.emailRemoteCache.hasOwnProperty(email)) {
            return Promise.resolve(this.emailRemoteCache[email]);
        }
        // email is not in our cache
        return validate.validateEmailRemotely(email).then(
            remoteResult => {
                // cache result, if it successfully heard back from server
                if (remoteResult.requestSucceeded) {
                    this.emailRemoteCache[email] = remoteResult;
                }
                return remoteResult;
            }
        );
    }
    validateEmail (email) {
        if (!email) return this.props.intl.formatMessage({id: 'general.required'});
        const localResult = validate.validateEmailLocally(email);
        if (!localResult.valid) return this.props.intl.formatMessage({id: localResult.errMsgId});
        return this.validateEmailRemotelyWithCache(email).then(
            remoteResult => {
                if (remoteResult.valid === true) {
                    return null;
                }
                return this.props.intl.formatMessage({id: remoteResult.errMsgId});
            }
        );
    }
    validateForm () {
        return {};
    }
    handleValidSubmit (formData, formikBag) {
        this.formData = formData;
        this.formikBag = formikBag;
        // Change set submitting to false so that if the user clicks out of
        // the captcha, the button is clickable again (instead of a disabled button with a spinner).
        this.formikBag.setSubmitting(false);
        this.captchaRef.executeCaptcha();
    }
    handleCaptchaSolved (token) {
        // Now thatcaptcha is done, we can tell Formik we're submitting.
        this.formikBag.setSubmitting(true);
        this.formData['g-recaptcha-response'] = token;
        this.props.onNextStep(this.formData);
    }
    setCaptchaRef (ref) {
        this.captchaRef = ref;
    }
    render () {
        return (
            <Formik
                initialValues={{
                    email: ''
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
                        validateField
                    } = props;
                    return (
                        <JoinFlowStep
                            footerContent={(
                                <FormattedMessage
                                    id="registration.acceptTermsOfUse"
                                    values={{
                                        privacyPolicyLink: (
                                            <a
                                                className="join-flow-link"
                                                href="/privacy_policy"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="general.privacyPolicy" />
                                            </a>
                                        ),
                                        touLink: (
                                            <a
                                                className="join-flow-link"
                                                href="/terms_of_use"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="general.termsOfUse" />
                                            </a>
                                        )
                                    }}
                                />
                            )}
                            headerImgClass="email-step-image"
                            headerImgSrc="/images/join-flow/email-header.png"
                            innerClassName="join-flow-inner-email-step"
                            nextButton={this.props.intl.formatMessage({id: 'registration.createAccount'})}
                            title={this.props.intl.formatMessage({id: 'registration.emailStepTitle'})}
                            titleClassName="join-flow-email-title"
                            waiting={this.props.waiting || isSubmitting || this.state.captchaIsLoading}
                            onSubmit={handleSubmit}
                        >
                            <FormikInput
                                autoCapitalize="off"
                                autoComplete="off"
                                autoCorrect="off"
                                className={classNames(
                                    'join-flow-input',
                                    'join-flow-input-tall',
                                    {fail: errors.email}
                                )}
                                error={errors.email}
                                id="email"
                                name="email"
                                placeholder={this.props.intl.formatMessage({id: 'general.emailAddress'})}
                                type="email"
                                validate={this.validateEmail}
                                validationClassName="validation-full-width-input"
                                /* eslint-disable react/jsx-no-bind */
                                onBlur={() => validateField('email')}
                                onChange={e => {
                                    setFieldValue('email', e.target.value.substring(0, 254));
                                    setFieldTouched('email');
                                    setFieldError('email', null);
                                }}
                                /* eslint-enable react/jsx-no-bind */
                                onSetRef={this.handleSetEmailRef}
                            />
                            <div className="join-flow-privacy-message join-flow-email-privacy">
                                <FormattedMessage id="registration.private" />
                                <InfoButton
                                    message={this.props.intl.formatMessage({id: 'registration.emailStepInfo'})}
                                />
                            </div>
                            <Captcha
                                ref={this.setCaptchaRef}
                                onCaptchaError={this.props.onCaptchaError}
                                onCaptchaLoad={this.handleCaptchaLoad}
                                onCaptchaSolved={this.handleCaptchaSolved}
                            />
                        </JoinFlowStep>
                    );
                }}
            </Formik>
        );
    }
}

EmailStep.propTypes = {
    intl: intlShape,
    onCaptchaError: PropTypes.func,
    onNextStep: PropTypes.func,
    sendAnalytics: PropTypes.func.isRequired,
    waiting: PropTypes.bool
};


module.exports = injectIntl(EmailStep);
