var classNames = require('classnames');
var React = require('react');

var Modal = require('../base/modal.jsx');

require('./modal.scss');

Modal.setAppElement(document.getElementById('view'));

var IframeModal = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        onRequestClose: React.PropTypes.func,
        className: React.PropTypes.string,
        componentRef: React.PropTypes.string,
        src: React.PropTypes.string
    },
    render: function () {
        var iframeClasses = classNames(
            'modal-content-iframe',
            this.props.className
        );
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                className={this.props.className}
            >
                <iframe
                    ref={this.props.componentRef}
                    src={this.props.src}
                    className={iframeClasses}
                />
            </Modal>
        );
    }
});

module.exports = IframeModal;
