const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const navigationActions = require('../../redux/navigation.js');
const Dropdown = require('../dropdown/dropdown.jsx');
const ConnectedLogin = require('./connected-login.jsx');

require('./login-dropdown.scss');

const LoginDropdown = ({
    isOpen,
    onClose,
    onLogIn
}) => (
    <Dropdown
        className={'with-arrow'}
        isOpen={isOpen}
        key="login-dropdown"
        onRequestClose={onClose}
    >
        <ConnectedLogin
            onLogIn={onLogIn}
        />
    </Dropdown>
);

LoginDropdown.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onLogIn: PropTypes.func
};

const mapStateToProps = state => ({
    isOpen: state.navigation && state.navigation.loginOpen
});

const mapDispatchToProps = dispatch => ({
    onClose: () => {
        dispatch(navigationActions.setLoginOpen(false));
    },
    onLogIn: (formData, callback) => {
        dispatch(navigationActions.handleLogIn(formData, callback));
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDropdown);
