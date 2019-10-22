const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;
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
            'handleErrorNext',
            'handleRegistrationError',
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
    canTryAgain (errorTypeAllowsTryAgain) {
        return (errorTypeAllowsTryAgain && this.state.numAttempts <= 1);
    }
    handleRegistrationError (message) {
        if (!message) {
            message = this.props.intl.formatMessage({
                id: 'registration.generalError'
            });
        }
        this.setState({registrationError: message});
    }
    handlePrepareToRegister (newFormData) {
        newFormData = newFormData || {};
        const newState = {
            formData: defaults({}, newFormData, this.state.formData)
        };
        this.setState(newState, () => {
            this.handleSubmitRegistration(this.state.formData);
        });
    }
    getBodyErrors (err, body, res) {
        return (!err && res.statusCode === 200 && body && body[0] && body[0].errors);
    }
    getSingleError (bodyErrors) {
        if (Object.keys(bodyErrors).length === 1) {
            const fieldName = Object.keys(bodyErrors)[0];
            if (bodyErrors[fieldName].length === 1) {
                return {fieldName: fieldName, errorStr: bodyErrors[fieldName][0]};
            }
        }
        return null;
    }
    getCustomErrMsg (bodyErrors) {
        let customErrMsg = '';
        // body can include zero or more error objects, each
        // with its own key and description. Here we assemble
        // all of them into a single string, customErrMsg.
        const errorKeys = Object.keys(bodyErrors);
        errorKeys.forEach(key => {
            const vals = bodyErrors[key];
            vals.forEach(val => {
                if (customErrMsg.length) customErrMsg += '; ';
                customErrMsg += `${key}: ${val}`;
            });
        });
        if (!customErrMsg) return null; // if no key-val pairs
        const problemsStr = this.props.intl.formatMessage({id: 'registration.problemsAre'});
        return `${problemsStr} "${customErrMsg}"`;
    }
    getRegistrationSuccess (err, body, res) {
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
            numAttempts: this.state.numAttempts + 1,
            waiting: false
        }, () => {
            const success = this.getRegistrationSuccess(err, body, res);
            if (success) {
                this.props.refreshSession();
                this.setState({step: this.state.step + 1});
                return;
            }
            // now we know there was some error.
            // if the error was client-side, prompt user to try again
            if (err || (res.statusCode >= 400 && res.statusCode < 500)) {
                this.setState({registrationError: {canTryAgain: true}});
                return;
            }
            // now we know error was server-side.
            // if server provided us info on why registration failed,
            // build a summary explanation string
            let errorMsg = null;
            const bodyErrors = this.getBodyErrors(err, body, res);
            if (bodyErrors) {
                const singleError = this.getSingleError(bodyErrors);
                let singleErrMsgId = null;
                if (singleError) {
                    singleErrMsgId = validate.responseErrorMsg(
                        singleError.fieldName,
                        singleError.errorStr
                    );
                }
                if (singleErrMsgId) { // one error that we have a predefined explanation string for
                    errorMsg = this.props.intl.formatMessage({id: singleErrMsgId});
                } else { // multiple errors, or unusual error; need custom message
                    errorMsg = this.getCustomErrMsg(bodyErrors);
                }
            }
            this.setState({
                registrationError: {
                    canTryAgain: false,
                    errorMsg: errorMsg
                }
            });
        });
    }
    handleSubmitRegistration (formData) {
        this.setState({
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
                    'g-recaptcha-response': formData['g-recaptcha-response'],
                    'gender': formData.gender,
                    'country': formData.country,
                    'subscribe': true,
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
            this.handleSubmitRegistration(this.state.formData);
        } else {
            this.resetState();
        }
    }
    resetState () {
        this.setState(this.initialState);
    }
    render () {
        return (
            <React.Fragment>
                {this.state.registrationError ? (
                    <RegistrationErrorStep
                        canTryAgain={this.canTryAgain(this.state.registrationError.canTryAgain)}
                        errorMsg={this.state.registrationError.errorMsg}
                        /* eslint-disable react/jsx-no-bind */
                        onSubmit={this.handleErrorNext}
                        /* eslint-enable react/jsx-no-bind */
                    />
                ) : (
                    <Progression step={this.state.step}>
                        <UsernameStep onNextStep={this.handleAdvanceStep} />
                        <CountryStep onNextStep={this.handleAdvanceStep} />
                        <BirthDateStep onNextStep={this.handleAdvanceStep} />
                        <GenderStep onNextStep={this.handleAdvanceStep} />
                        <EmailStep
                            waiting={this.state.waiting}
                            onNextStep={this.handlePrepareToRegister}
                            onRegistrationError={this.handleRegistrationError}
                        />
                        <WelcomeStep
                            createProjectOnComplete={this.props.createProjectOnComplete}
                            email={this.state.formData.email}
                            username={this.state.formData.username}
                            onNextStep={this.props.onCompleteRegistration}
                        />
                    </Progression>
                )}
            </React.Fragment>
        );
    }
}

JoinFlow.propTypes = {
    createProjectOnComplete: PropTypes.bool,
    intl: intlShape,
    onCompleteRegistration: PropTypes.func,
    refreshSession: PropTypes.func
};

const IntlJoinFlow = injectIntl(JoinFlow);

const mapDispatchToProps = dispatch => ({
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
    }
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
