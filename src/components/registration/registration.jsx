const bindAll = require('lodash.bindall');
const classNames = require('classnames');
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
        this.state = {recaptchaOpen: false};
    }
    componentDidMount () {
        if (this.props.isOpen) this.toggleMessageListener(true);
    }
    componentDidUpdate (prevProps) {
        if (this.props.isOpen && !prevProps.isOpen) this.toggleMessageListener(true);
        if (!this.props.isOpen && prevProps.isOpen) this.toggleMessageListener(false);
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
        if (e.data === 'recaptcha-opened') this.setState({recaptchaOpen: true});
        if (e.data === 'recaptcha-closed') this.setState({recaptchaOpen: false});
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
                className={classNames('mod-registration', {'recaptcha-open': this.state.recaptchaOpen})}
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
