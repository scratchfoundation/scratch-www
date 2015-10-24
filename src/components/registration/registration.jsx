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
        if (e.data == 'registration-done') this.props.onRegistrationDone();
    },
    componentDidMount: function () {
        window.addEventListener('message', this.onMessage);
    },
    componentWillUnmount: function () {
        window.removeEventListener('message', this.onMessage);
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
                <iframe src="/accounts/standalone-registration/" {...frameProps} />
            </Modal>
        );
    }
});

module.exports = Registration;
