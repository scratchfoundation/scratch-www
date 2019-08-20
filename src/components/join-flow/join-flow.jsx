const bindAll = require('lodash.bindall');
const defaults = require('lodash.defaultsdeep');
const PropTypes = require('prop-types');
const React = require('react');

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

    componentDidMount () {
        // Load Google Captcha script so that it is ready to go when we get to
        // the last step.
        const script = document.createElement('script');
        script.src = `https://www.recaptcha.net/recaptcha/api.js?render=explicit&hl=${window._locale}`;
        script.async = true;
        document.body.appendChild(script);
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
