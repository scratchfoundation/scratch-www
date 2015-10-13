var React = require('react');
var Input = require('../forms/input.jsx');
var Button = require('../forms/button.jsx');

require('./login.scss');

var Login = React.createClass({
    type: 'Login',
    propTypes: {
        onLogIn: React.PropTypes.func,
        error: React.PropTypes.string
    },
    handleSubmit: function (event) {
        event.preventDefault();
        this.props.onLogIn({
            'username': this.refs.username.getDOMNode().value,
            'password': this.refs.password.getDOMNode().value
        });
    },
    render: function () {
        var error;
        if (this.props.error) {
            error = <div className="error">{this.props.error}</div>;
        }
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <Input type="text" ref="username" name="username" maxLength="30" />
                    <label htmlFor="password">Password</label>
                    <Input type="password" ref="password" name="password" />
                    <Button className="submit-button white" type="submit">Sign in</Button>
                    <a className="right" href="/accounts/password_reset/">Forgot password?</a>
                    {error}
                </form>
            </div>
        );
    }
});

module.exports = Login;
