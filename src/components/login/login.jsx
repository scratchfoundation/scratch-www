const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const log = require('../../lib/log.js');

const Form = require('../forms/form.jsx');
const Input = require('../forms/input.jsx');
const Button = require('../forms/button.jsx');
const Spinner = require('../spinner/spinner.jsx');

require('./login.scss');

class Login extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);
        this.state = {
            waiting: false
        };
    }
    handleSubmit (formData) {
        this.setState({waiting: true});
        this.props.onLogIn(formData, err => {
            if (err) log.error(err);
            this.setState({waiting: false});
        });
    }
    render () {
        let error;
        if (this.props.error) {
            error = <div className="error">{this.props.error}</div>;
        }
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit}>
                    <label
                        htmlFor="username"
                        key="usernameLabel"
                    >
                        <FormattedMessage id="general.username" />
                    </label>
                    <Input
                        required
                        key="usernameInput"
                        maxLength="30"
                        name="username"
                        ref={input => {
                            this.username = input;
                        }}
                        type="text"
                    />
                    <label
                        htmlFor="password"
                        key="passwordLabel"
                    >
                        <FormattedMessage id="general.password" />
                    </label>
                    <Input
                        required
                        key="passwordInput"
                        name="password"
                        ref={input => {
                            this.password = input;
                        }}
                        type="password"
                    />
                    {this.state.waiting ? [
                        <Button
                            className="submit-button white"
                            disabled="disabled"
                            key="submitButton"
                            type="submit"
                        >
                            <Spinner />
                        </Button>
                    ] : [
                        <Button
                            className="submit-button white"
                            key="submitButton"
                            type="submit"
                        >
                            <FormattedMessage id="general.signIn" />
                        </Button>
                    ]}
                    <a
                        className="right"
                        href="/accounts/password_reset/"
                        key="passwordResetLink"
                    >
                        <FormattedMessage id="login.needHelp" />
                    </a>
                    {error}
                </Form>
            </div>
        );
    }
}

Login.propTypes = {
    error: PropTypes.string,
    onLogIn: PropTypes.func
};

module.exports = Login;
