const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');
const injectIntl = require('react-intl').injectIntl;

const api = require('../../lib/api');
const intlShape = require('../../lib/intl-shape');
const sessionActions = require('../../redux/session.js');
const validate = require('../../lib/validate');

const Progression = require('../progression/progression.jsx');
const UsernameStep = require('./username-step.jsx');
const BirthDateStep = require('./birthdate-step.jsx');
const GenderStep = require('./gender-step.jsx');
const CountryStep = require('./country-step.jsx');
const EmailStep = require('./email-step.jsx');
const WelcomeStep = require('./welcome-step.jsx');
const RegistrationErrorStep = require('./registration-error-step.jsx');

class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep',
            'handleCaptchaError',
            'handleErrorNext',
            'handlePrepareToRegister',
            'handleRegistrationResponse',
            'handleSubmitRegistration'
        ]);
        this.initialState = {
            numAttempts: 0,
            formData: {},
            registrationError: null,
            step: 0,
            waiting: false
        };
        // it's ok to set state by reference, because state is treated as immutable,
        // so any changes to its fields will result in a new state which does not
        // reference its past fields
        this.state = this.initialState;
    }
    canTryAgain () {
        return (this.state.registrationError.errorAllowsTryAgain && this.state.numAttempts <= 1);
    }
    handleCaptchaError () {
        this.setState({
            registrationError: {
                errorAllowsTryAgain: false,
                errorMsg: this.props.intl.formatMessage({
                    id: 'registration.errorCaptcha'
                })
            }
        });
    }
    handlePrepareToRegister (newFormData) {
        newFormData = newFormData || {};
        const newState = {
            formData: defaults({}, newFormData, this.state.formData)
        };
        this.setState(newState, () => {
            this.handleSubmitRegistration(this.state.formData, this.isUnder16());
        });
    }
    getErrorsFromResponse (err, body, res) {
        const errorsFromResponse = [];
        if (!err && res.statusCode === 200 && body && body[0]) {
            const responseBodyErrors = body[0].errors;
            if (responseBodyErrors) {
                Object.keys(responseBodyErrors).forEach(fieldName => {
                    const errorStrs = responseBodyErrors[fieldName];
                    errorStrs.forEach(errorStr => {
                        errorsFromResponse.push({fieldName: fieldName, errorStr: errorStr});
                    });
                });
            }
        }
        return errorsFromResponse;
    }
    getCustomErrMsg (errorsFromResponse) {
        if (!errorsFromResponse || errorsFromResponse.length === 0) return null;
        let customErrMsg = '';
        // body can include zero or more error objects. Here we assemble
        // all of them into a single string, customErrMsg.
        errorsFromResponse.forEach(errorFromResponse => {
            if (customErrMsg.length) customErrMsg += '; ';
            customErrMsg += `${errorFromResponse.fieldName}: ${errorFromResponse.errorStr}`;
        });
        const problemsStr = this.props.intl.formatMessage({id: 'registration.problemsAre'});
        return `${problemsStr}: "${customErrMsg}"`;
    }
    registrationIsSuccessful (err, body, res) {
        return !!(!err && res.statusCode === 200 && body && body[0] && body[0].success);
    }
    // example of failing response:
    // [
    //   {
    //     "msg": "This field is required.",
    //     "errors": {
    //       "username": ["This field is required."],
    //       "recaptcha": ["Incorrect, please try again."]
    //     },
    //     "success": false
    //   }
    // ]
    //
    // username messages:
    //   * "username": ["username exists"]
    //   * "username": ["invalid username"] (length, charset)
    //   * "username": ["bad username"] (cleanspeak)
    // password messages:
    //   * "password": ["Ensure this value has at least 6 characters (it has LENGTH_NUM_HERE)."]
    // recaptcha messages:
    //   * "recaptcha": ["This field is required."]
    //   * "recaptcha": ["Incorrect, please try again."]
    //   * "recaptcha": [some timeout message?]
    // other messages:
    //   * "birth_month": ["Ensure this value is less than or equal to 12."]
    //   * "birth_month": ["Ensure this value is greater than or equal to 1."]
    handleRegistrationResponse (err, body, res) {
        this.setState({
            numAttempts: this.state.numAttempts + 1
        }, () => {
            const success = this.registrationIsSuccessful(err, body, res);
            if (success) {
                this.props.refreshSessionWithRetry().then(() => {
                    this.setState({
                        step: this.state.step + 1,
                        waiting: false
                    });
                });
                return;
            }
            // now we know something went wrong -- either an actual error (client-side
            // or server-side), or just a problem with the registration content.

            // if an actual error, prompt user to try again.
            if (err || res.statusCode !== 200) {
                this.setState({
                    registrationError: {errorAllowsTryAgain: true},
                    waiting: false
                });
                return;
            }

            // now we know there was a problem with the registration content.
            // If the server provided us info on why registration failed,
            // build a summary explanation string
            let errorMsg = null;
            const errorsFromResponse = this.getErrorsFromResponse(err, body, res);
            // if there was exactly one error, check if we have a pre-written message
            // about that precise error
            if (errorsFromResponse.length === 1) {
                const singleErrMsgId = validate.responseErrorMsg(
                    errorsFromResponse[0].fieldName,
                    errorsFromResponse[0].errorStr
                );
                if (singleErrMsgId) { // one error that we have a predefined explanation string for
                    errorMsg = this.props.intl.formatMessage({id: singleErrMsgId});
                }
            }
            // if we have more than one error, build a custom message with all of the
            // server-provided error messages
            if (!errorMsg && errorsFromResponse.length > 0) {
                errorMsg = this.getCustomErrMsg(errorsFromResponse);
            }
            this.setState({
                registrationError: {
                    errorAllowsTryAgain: false,
                    errorMsg: errorMsg
                },
                waiting: false
            });
        });
    }
    handleSubmitRegistration (formData, isUnder16) {
        this.setState({
            registrationError: null, // clear any existing error
            waiting: true
        }, () => {
            api({
                host: '',
                uri: '/accounts/register_new_user/',
                method: 'post',
                useCsrf: true,
                formData: {
                    'username': formData.username,
                    'email': formData.email,
                    'password': formData.password,
                    'birth_month': formData.birth_month,
                    'birth_year': formData.birth_year,
                    'under_16': isUnder16,
                    'g-recaptcha-response': formData['g-recaptcha-response'],
                    'gender': formData.gender,
                    'country': formData.country,
                    'is_robot': formData.yesno
                    // no need to include csrfmiddlewaretoken; will be provided in
                    // X-CSRFToken header, which scratchr2 looks for in
                    // scratchr2/middleware/csrf.py line 237.
                }
            }, (err, body, res) => {
                this.handleRegistrationResponse(err, body, res);
            });
        });
    }
    handleAdvanceStep (newFormData) {
        newFormData = newFormData || {};
        this.setState({
            formData: defaults({}, newFormData, this.state.formData),
            step: this.state.step + 1
        });
    }
    handleErrorNext () {
        if (this.canTryAgain()) {
            this.handleSubmitRegistration(this.state.formData, this.isUnder16());
        } else {
            this.resetState();
        }
    }
    resetState () {
        this.setState(this.initialState);
    }
    sendAnalytics (joinFlowStep) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'join_flow',
            joinFlowStep
        });
    }

    parseDateComponent (fieldValue) {
        // The dates are set to either `'null'` (before the BirthDateStep) or a string representation of a number.
        if (fieldValue && fieldValue !== 'null') {
            return Number(fieldValue);
        }
    }

    isUnder16 () {
        const birthYear = this.parseDateComponent(this.state.formData.birth_year);
        const birthMonth = this.parseDateComponent(this.state.formData.birth_month);

        if (!birthYear || !birthMonth) {
            // We're not yet at the point where the user has specified their birth date
            return false;
        }

        const now = new Date();
        const yearDiff = now.getFullYear() - birthYear;

        if (yearDiff > 16) {
            return false;
        }

        if (yearDiff < 16) {
            return true;
        }

        const currentMonth1Based = now.getMonth() + 1;
        const monthsLeftToBirthday = birthMonth - currentMonth1Based;

        return monthsLeftToBirthday >= 0;
    }

    render () {
        return (
            <main>
                {this.state.registrationError ? (
                    <RegistrationErrorStep
                        canTryAgain={this.canTryAgain()}
                        errorMsg={this.state.registrationError.errorMsg}
                        sendAnalytics={this.sendAnalytics}
                        /* eslint-disable react/jsx-no-bind */
                        onSubmit={this.handleErrorNext}
                        /* eslint-enable react/jsx-no-bind */
                    />
                ) : (
                    <Progression step={this.state.step}>
                        <UsernameStep
                            sendAnalytics={this.sendAnalytics}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <CountryStep
                            sendAnalytics={this.sendAnalytics}
                            onNextStep={this.handleAdvanceStep}
                        />
                        <BirthDateStep
                            sendAnalytics={this.sendAnalytics}
                            onNextStep={this.handleAdvanceStep}
                        />

                        <GenderStep
                            sendAnalytics={this.sendAnalytics}
                            onNextStep={this.handleAdvanceStep}
                        />

                        <EmailStep
                            sendAnalytics={this.sendAnalytics}
                            waiting={this.state.waiting}
                            under16={this.isUnder16()}
                            onCaptchaError={this.handleCaptchaError}
                            onNextStep={this.handlePrepareToRegister}
                        />
                        <WelcomeStep
                            createProjectOnComplete={this.props.createProjectOnComplete}
                            email={this.state.formData.email}
                            sendAnalytics={this.sendAnalytics}
                            username={this.state.formData.username}
                            under16={this.isUnder16()}
                            onNextStep={this.props.onCompleteRegistration}
                        />
                    </Progression>
                )}
            </main>
        );
    }
}

JoinFlow.propTypes = {
    createProjectOnComplete: PropTypes.bool,
    intl: intlShape,
    onCompleteRegistration: PropTypes.func,
    refreshSessionWithRetry: PropTypes.func
};

const IntlJoinFlow = injectIntl(JoinFlow);

const mapDispatchToProps = dispatch => ({
    refreshSessionWithRetry: () => (
        dispatch(sessionActions.refreshSessionWithRetry())
    )
});

// Allow incoming props to override redux-provided props. Used to mock in tests.
const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(
    {}, stateProps, dispatchProps, ownProps
);

const ConnectedJoinFlow = connect(
    () => ({}),
    mapDispatchToProps,
    mergeProps
)(IntlJoinFlow);

module.exports = ConnectedJoinFlow;
