var React = require('react');
var Modal = require('../modal/modal.jsx');

require('./registration.scss');

Modal.setAppElement(document.getElementById('view'));

module.exports = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func
    },
    render: function () {
        return (
            <Modal
                    isOpen={this.props.isOpen}
                    onRequestClose={this.props.onRequestClose}
                    className="registration">
                <iframe src="/accounts/standalone-registration/" />
            </Modal>
        );
    }
});
