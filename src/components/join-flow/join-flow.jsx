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
const RegistrationError = require('./registration-error.jsx');

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep',
            'handleRegister'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0,
            waiting: false
        };
    }
    handleRegister (formData) {
        console.log('submitting registration in handleRegister:');
        this.setState({waiting: true}, () => {
            api({
                host: '',
                uri: '/accounts/register_new_user/',
                method: 'post',
                useCsrf: true,
                formData: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    birth_month: formData.birth_month,
                    birth_year: formData.birth_year,
                    gender: (
                        formData.gender === 'other' ?
                            formData.genderOther :
                            formData.gender
                    ),
                    country: formData.country,
                    subscribe: true,
                    is_robot: formData.yesno
                    // csrfmiddlewaretoken: 'abc'
                }
            }, (err, body, res) => {
                console.log('return value from /accounts/register_new_user/ :');
                console.log(body);
                this.setState({waiting: false}, () => {
                    if (err || res.statusCode === 500) {
                        this.setState({registrationError: err});
                    } else {
                        let errStr = '';
                        if (body && body[0]) {
                            if (body[0].success) {
                                console.log('SUCCESS! refreshing session:');
                                this.props.refreshSession();
                                console.log('advancing step');
                                this.setState({
                                    step: this.state.step + 1
                                });
                                return;
                            }
                            if (body[0].errors) {
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
                        this.setState({
                            registrationError: errStr ||
                                `${this.props.intl.formatMessage({
                                    id: 'registration.generalError'
                                })} (${res.statusCode})`
                        });
                    }
                });
            });
        });
    }
    handleAdvanceStep (newFormData) {
        newFormData = newFormData || {};
        const accumFormData = defaults({}, newFormData, this.state.formData);
        if (this.state.step < 4) { // through country step, just advance
            this.setState({
                step: this.state.step + 1,
                formData: accumFormData
            });
        } else if (this.state.step === 4) {
            this.handleRegister(accumFormData);
        }
    }
    render () {
        return (
            <React.Fragment>
                {this.state.registrationError ? (
                    <RegistrationError errorMsg={this.state.registrationError} />
                ) : (
                    <Progression step={this.state.step}>
                        <UsernameStep onNextStep={this.handleAdvanceStep} />
                        <BirthDateStep onNextStep={this.handleAdvanceStep} />
                        <GenderStep onNextStep={this.handleAdvanceStep} />
                        <CountryStep onNextStep={this.handleAdvanceStep} />
                        <EmailStep
                            waiting={this.state.waiting}
                            onNextStep={this.handleAdvanceStep}
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
    () => {},
    mapDispatchToProps
)(IntlJoinFlow);

module.exports = ConnectedJoinFlow;
/*
eslint-enable
*/
