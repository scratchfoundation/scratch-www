import React from 'react';
import {FormattedMessage} from 'react-intl';

import log from '../../lib/log.js';

import Form from '../forms/form.jsx';
import Input from '../forms/input.jsx';
import Button from '../forms/button.jsx';
import Spinner from '../spinner/spinner.jsx';

require('./login.scss');

var Login = React.createClass({
    type: 'Login',
    propTypes: {
        onLogIn: React.PropTypes.func,
        error: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            waiting: false
        };
    },
    handleSubmit: function (formData) {
        this.setState({waiting: true});
        this.props.onLogIn(formData, function (err) {
            if (err) log.error(err);
            this.setState({waiting: false});
        }.bind(this));
    },
    render: function () {
        var error;
        if (this.props.error) {
            error = <div className="error">{this.props.error}</div>;
        }
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit}>
                    <label htmlFor="username" key="usernameLabel">
                        <FormattedMessage id='general.username' />
                    </label>
                    <Input type="text" ref="username" name="username" maxLength="30" key="usernameInput" required />
                    <label htmlFor="password" key="passwordLabel">
                        <FormattedMessage id='general.password' />
                    </label>
                    <Input type="password" ref="password" name="password" key="passwordInput" required />
                    {this.state.waiting ? [
                        <Button className="submit-button white" type="submit" disabled="disabled" key="submitButton">
                            <Spinner />
                        </Button>
                    ] : [
                        <Button className="submit-button white" type="submit" key="submitButton">
                            <FormattedMessage id='general.signIn' />
                        </Button>
                    ]}
                    <a className="right" href="/accounts/password_reset/" key="passwordResetLink">
                        <FormattedMessage id='login.needHelp' />
                    </a>
                    {error}
                </Form>
            </div>
        );
    }
});

export default Login;
