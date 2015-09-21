var React = require('react');
var Input = require('../forms/input.jsx');
var Button = require('../forms/button.jsx');

require('./login.scss');

module.exports = React.createClass({
    propTypes: {
        onLogIn: React.PropTypes.func
    },
    handleSubmit: function (event) {
        event.preventDefault();
        this.props.onLogIn();
    },
    render: function () {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <Input type="text" name="username" maxLength="30" />
                    <label htmlFor="password">Password</label>
                    <Input type="password" name="password" />
                    <Button className="submit-button white" type="submit">Sign in</Button>
                    <a className="right" href="/accounts/password_reset/">Forgot password?</a>
                </form>
            </div>
        );
    }
});
