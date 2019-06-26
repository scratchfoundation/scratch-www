const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const navigationActions = require('../../redux/navigation.js');
const JoinModal = require('../modal/join/modal.jsx');

require('./registration.scss');

const Registration = ({
    handleCloseRegistration,
    handleCompleteRegistration,
    isOpen
}) => (
    <div>
        <JoinModal
            isOpen={isOpen}
            key="join-modal"
            onCompleteRegistration={handleCompleteRegistration}
            onRequestClose={handleCloseRegistration}
        />
    </div>
);

Registration.propTypes = {
    handleCloseRegistration: PropTypes.func,
    handleCompleteRegistration: PropTypes.func,
    isOpen: PropTypes.bool
};

const mapStateToProps = state => ({
    isOpen: state.navigation.registrationOpen
});

const mapDispatchToProps = dispatch => ({
    handleCloseRegistration: () => {
        dispatch(navigationActions.setRegistrationOpen(false));
    },
    handleCompleteRegistration: () => {
        dispatch(navigationActions.handleCompleteRegistration());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(Registration);
