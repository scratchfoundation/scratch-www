var React = require('react');
var ReactDOM = require('react-dom');
var FormattedMessage = require('react-intl').FormattedMessage;

var log = require('../../lib/log.js');

var Input = require('../forms/input.jsx');
var Button = require('../forms/button.jsx');
var Spinner = require('../spinner/spinner.jsx');

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
    handleSubmit: function (event) {
        event.preventDefault();
        this.setState({waiting: true});
        this.props.onLogIn({
            'username': ReactDOM.findDOMNode(this.refs.username).value,
            'password': ReactDOM.findDOMNode(this.refs.password).value
        }, function (err) {
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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username">
                        <FormattedMessage
                            id='general.username'
                            defaultMessage={'Username'} />
                    </label>
                    <Input type="text" ref="username" name="username" maxLength="30" />
                    <label htmlFor="password">
                        <FormattedMessage
                            id='general.password'
                            defaultMessage={'Password'} />
                    </label>
                    <Input type="password" ref="password" name="password" />
                    {this.state.waiting ? [
                        <Button className="submit-button white" type="submit" disabled="disabled">
                            <Spinner />
                        </Button>
                    ] : [
                        <Button className="submit-button white" type="submit">
                            <FormattedMessage
                                id='general.signIn'
                                defaultMessage={'Sign in'} />
                        </Button>
                    ]}
                    <a className="right" href="/accounts/password_reset/">
                        <FormattedMessage
                            id='login.forgotPassword'
                            defaultMessage={'Forgot Password?'} />
                    </a>
                    {error}
                </form>
            </div>
        );
    }
});

module.exports = Login;
