var React = require('react');

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
                    <input type="text" name="username" maxLength="30" />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                    <button className="submit-button" type="submit">Sign in</button>
                    <a href="/accounts/password_reset/">Forgot password?</a>
                </form>
            </div>
        );
    }
});
