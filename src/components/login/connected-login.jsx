const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const Login = require('./login.jsx');

require('./login-dropdown.scss');

const ConnectedLogin = ({
    error,
    onLogIn
}) => (
    <Login
        error={error}
        key="login-dropdown-presentation"
        onLogIn={onLogIn}
    />
);

ConnectedLogin.propTypes = {
    error: PropTypes.string,
    onLogIn: PropTypes.func
};

const mapStateToProps = state => ({
    error: state.navigation && state.navigation.loginError
});

const mapDispatchToProps = () => ({});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedLogin);
