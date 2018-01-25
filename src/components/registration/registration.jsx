const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const IframeModal = require('../modal/iframe/modal.jsx');

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
        if (e.data === 'registration-done') this.props.onRegistrationDone();
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
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

Registration.propTypes = {
    isOpen: PropTypes.bool,
    onRegistrationDone: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = Registration;
