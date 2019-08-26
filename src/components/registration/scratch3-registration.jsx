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
    // used in mapDispatchToProps; eslint doesn't understand that this prop is used
    createProjectOnComplete: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
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
