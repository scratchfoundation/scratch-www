const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const navigationActions = require('../../redux/navigation.js');
const JoinModal = require('../modal/join/modal.jsx');

require('./registration.scss');

const Registration = ({
    createProjectOnComplete,
    handleCloseRegistration,
    handleCompleteRegistration,
    isOpen
}) => (
    <div>
        <JoinModal
            createProjectOnComplete={createProjectOnComplete}
            isOpen={isOpen}
            key="join-modal"
            onCompleteRegistration={handleCompleteRegistration}
            onRequestClose={handleCloseRegistration}
        />
    </div>
);

Registration.propTypes = {
    createProjectOnComplete: PropTypes.bool,
    handleCloseRegistration: PropTypes.func,
    handleCompleteRegistration: PropTypes.func,
    isOpen: PropTypes.bool
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCloseRegistration: () => {
        dispatch(navigationActions.setRegistrationOpen(false));
    },
    handleCompleteRegistration: () => {
        dispatch(navigationActions.handleCompleteRegistration(ownProps.createProjectOnComplete));
    }
});

module.exports = connect(
    () => ({}),
    mapDispatchToProps
)(Registration);
