const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

const Dropdown = require('../dropdown/dropdown.jsx');
const Login = require('./login.jsx');

require('./logindropdown.scss');

const LoginDropdown = ({
    error,
    isOpen,
    mode,
    onClose,
    onLogIn
}) => (
    <Dropdown
        className={classNames(
            'login-dropdown',
            'with-arrow',
            // if used in gui, the menu must be positioned differently -- especially
            // with respect to the z-index.
            {'login-dropdown-gui': mode === 'gui'}
        )}
        isOpen={isOpen}
        key="login-dropdown"
        onRequestClose={onClose}
    >
        <Login
            error={error}
            onLogIn={onLogIn}
        />
    </Dropdown>
);

LoginDropdown.propTypes = {
    error: PropTypes.string,
    isOpen: PropTypes.bool,
    mode: PropTypes.string,
    onClose: PropTypes.func,
    onLogIn: PropTypes.func
};

module.exports = LoginDropdown;
