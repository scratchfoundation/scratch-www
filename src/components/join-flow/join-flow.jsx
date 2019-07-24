const bindAll = require('lodash.bindall');
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

const api = require('../../lib/api');
const injectIntl = require('../../lib/intl.jsx').injectIntl;
const intlShape = require('../../lib/intl.jsx').intlShape;

const Progression = require('../progression/progression.jsx');
const UsernameStep = require('./username-step.jsx');
const BirthDateStep = require('./birthdate-step.jsx');
const GenderStep = require('./gender-step.jsx');
const CountryStep = require('./country-step.jsx');
const EmailStep = require('./email-step.jsx');
const WelcomeStep = require('./welcome-step.jsx');

/*
eslint-disable react/prefer-stateless-function, react/no-unused-prop-types, no-useless-constructor
*/
class JoinFlow extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAdvanceStep'
        ]);
        this.state = {
            formData: {},
            registrationError: null,
            step: 0
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
                    username: this.state.formData.username,
                    email: formData.email,
                    password: this.state.formData.password,
                    birth_month: this.state.formData.birth_month,
                    birth_year: this.state.formData.birth_year,
                    gender: (
                        this.state.formData.gender === 'other' ?
                            this.state.formData.genderOther :
                            this.state.formData.gender
                    ),
                    country: this.state.formData.country,
                    subscribe: true,
                    is_robot: false // NOTE: must actually set.
                    // use this.state.formData.isRobot
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
                                this.props.dispatch(sessionActions.refreshSession());
                                console.log('advancing step');
                                return this.handleAdvanceStep(formData);
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
    handleAdvanceStep (formData) {
        formData = formData || {};
        this.setState({
            step: this.state.step + 1,
            formData: defaults({}, formData, this.state.formData)
        });
    }
    render () {
        return (
            <React.Fragment>
                <Progression step={this.state.step}>
                    <UsernameStep onNextStep={this.handleAdvanceStep} />
                    <BirthDateStep onNextStep={this.handleAdvanceStep} />
                    <GenderStep onNextStep={this.handleAdvanceStep} />
                    <CountryStep onNextStep={this.handleAdvanceStep} />
                    <EmailStep onNextStep={this.handleAdvanceStep} />
                    <WelcomeStep
                        email={this.state.formData.email}
                        username={this.state.formData.username}
                        onNextStep={this.handleAdvanceStep}
                    />
                </Progression>
            </React.Fragment>
        );
    }
}

JoinFlow.propTypes = {
    intl: intlShape,
    onCompleteRegistration: PropTypes.func
};

module.exports = injectIntl(JoinFlow);

/*
eslint-enable
*/
