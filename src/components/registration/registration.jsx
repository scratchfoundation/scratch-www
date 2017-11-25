import React from 'react';
import IframeModal from '../modal/iframe/modal.jsx';

require('./registration.scss');

var Registration = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        onRegistrationDone: React.PropTypes.func,
        onRequestClose: React.PropTypes.func
    },
    onMessage: function (e) {
        if (e.origin != window.location.origin) return;
        if (e.source != this.registrationIframe.contentWindow) return;
        if (e.data == 'registration-done') this.props.onRegistrationDone();
        if (e.data == 'registration-relaunch') {
            this.registrationIframe.contentWindow.location.reload();
        }
    },
    toggleMessageListener: function (present) {
        if (present) {
            window.addEventListener('message', this.onMessage);
        } else {
            window.removeEventListener('message', this.onMessage);
        }
    },
    componentDidMount: function () {
        if (this.props.isOpen) this.toggleMessageListener(true);
    },
    componentDidUpdate: function (prevProps) {
        this.toggleMessageListener(this.props.isOpen && !prevProps.isOpen);
    },
    componentWillUnmount: function () {
        this.toggleMessageListener(false);
    },
    render: function () {
        return (
            <IframeModal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                className="mod-registration"
                componentRef={
                    function (iframe) {
                        this.registrationIframe = iframe;
                    }.bind(this)
                }
                src="/accounts/standalone-registration/"
            />
        );
    }
});

export default Registration;
