const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;
const sessionActions = require('../../redux/session.js');

const Progression = require('../progression/progression.jsx');
const UsernameStep = require('./username-step.jsx');
const BirthDateStep = require('./birthdate-step.jsx');
const GenderStep = require('./gender-step.jsx');
const CountryStep = require('./country-step.jsx');
const EmailStep = require('./email-step.jsx');
const WelcomeStep = require('./welcome-step.jsx');
const RegistrationErrorStep = require('./registration-error-step.jsx');

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep',
            'handlePrepareToRegister',
            'handleSubmitRegistration'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0,
            waiting: false
        };
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
    handleSubmitRegistration (formData) {
        this.setState({waiting: true}, () => {
            api({
                host: '',
                uri: '/accounts/register_new_user/',
                method: 'post',
                useCsrf: true,
                /* eslint-disable quote-props */
                formData: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    birth_month: formData.birth_month,
                    birth_year: formData.birth_year,
                    'g-recaptcha-response': null,
                    gender: (
                        formData.gender === 'other' ?
                            formData.genderOther :
                            formData.gender
                    ),
                    country: formData.country,
                    subscribe: true,
                    is_robot: formData.yesno
                    // no need to include csrfmiddlewaretoken; will be provided in
                    // X-CSRFToken header, which scratchr2 looks for in
                    // scratchr2/middleware/csrf.py line 237.
                }
                /* eslint-enable quote-props */
            }, (err, body, res) => {
                this.setState({waiting: false}, () => {
                    let errStr = '';
                    if (!err && res.statusCode === 200) {
                        if (body && body[0]) {
                            if (body[0].success) {
                                this.props.refreshSession();
                                this.setState({
                                    step: this.state.step + 1
                                });
                                return;
                            }
                            if (body[0].errors) {
                                // body can include zero or more error objects, each
                                // with its own key and description. Here we assemble
                                // all of them into a single string, errStr.
                                const errorKeys = Object.keys(body[0].errors);
                                errorKeys.forEach(key => {
                                    const val = body[0].errors[key];
                                    if (val && val[0]) {
                                        if (errStr.length) errStr += '; ';
                                        errStr += `${key}: ${val[0]}`;
                                    }
                                });
                            }
                            if (!errStr.length && body[0].msg) errStr = body[0].msg;
                        }
                    }
                    this.setState({
                        registrationError: errStr ||
                            `${this.props.intl.formatMessage({
                                id: 'registration.generalError'
                            })} (${res.statusCode})`
                    });
                });
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
    render () {
        return (
            <React.Fragment>
                {this.state.registrationError ? (
                    <RegistrationErrorStep
                        errorMsg={this.state.registrationError}
                        /* eslint-disable react/jsx-no-bind */
                        onTryAgain={() => this.handleSubmitRegistration(this.state.formData)}
                        /* eslint-enable react/jsx-no-bind */
                    />
                ) : (
                    <Progression step={this.state.step}>
                        <UsernameStep onNextStep={this.handleAdvanceStep} />
                        <BirthDateStep onNextStep={this.handleAdvanceStep} />
                        <GenderStep onNextStep={this.handleAdvanceStep} />
                        <CountryStep onNextStep={this.handleAdvanceStep} />
                        <EmailStep
                            waiting={this.state.waiting}
                            onNextStep={this.handlePrepareToRegister}
                        />
                        <WelcomeStep
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

const ConnectedJoinFlow = connect(
    () => ({}),
    mapDispatchToProps
)(IntlJoinFlow);

module.exports = ConnectedJoinFlow;
/*
eslint-enable
*/
