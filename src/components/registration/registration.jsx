var React = require('react');
var Modal = require('../modal/modal.jsx');

require('./registration.scss');

Modal.setAppElement(document.getElementById('view'));

var Registration = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        onRegistrationDone: React.PropTypes.func,
        onRequestClose: React.PropTypes.func
    },
    onMessage: function (e) {
        if (e.origin != window.location.origin) return;
        if (e.source != this.refs.registrationIframe.contentWindow) return;
        if (e.data == 'registration-done') this.props.onRegistrationDone();
        if (e.data == 'registration-relaunch') {
            this.refs.registrationIframe.contentWindow.location.reload();
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
        var frameProps = {
            width: 610,
            height: 438
        };
        return (
            <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.props.onRequestClose}
                    className="registration"
                    style={{content:frameProps}}>
                <iframe ref="registrationIframe" src="/accounts/standalone-registration/" {...frameProps} />
            </Modal>
        );
    }
});

module.exports = Registration;
