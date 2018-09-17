const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const IframeModal = require('../modal/iframe/modal.jsx');
const navigationActions = require('../../redux/navigation.js');

require('./registration.scss');

class Registration extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMessage',
            'toggleMessageListener'
        ]);
    }
    componentDidMount () {
        if (this.props.isOpen) this.toggleMessageListener(true);
    }
    componentDidUpdate (prevProps) {
        this.toggleMessageListener(this.props.isOpen && !prevProps.isOpen);
    }
    componentWillUnmount () {
        this.toggleMessageListener(false);
    }
    handleMessage (e) {
        if (e.origin !== window.location.origin) return;
        if (e.source !== this.registrationIframe.contentWindow) return;
        if (e.data === 'registration-done') this.props.handleCompleteRegistration();
        if (e.data === 'registration-relaunch') {
            this.registrationIframe.contentWindow.location.reload();
        }
    }
    toggleMessageListener (present) {
        if (present) {
            window.addEventListener('message', this.handleMessage);
        } else {
            window.removeEventListener('message', this.handleMessage);
        }
    }
    render () {
        return (
            <IframeModal
                className="mod-registration"
                componentRef={iframe => { // eslint-disable-line react/jsx-no-bind
                    this.registrationIframe = iframe;
                }}
                isOpen={this.props.isOpen}
                src="/accounts/standalone-registration/"
                onRequestClose={this.props.handleCloseRegistration}
            />
        );
    }
}

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
