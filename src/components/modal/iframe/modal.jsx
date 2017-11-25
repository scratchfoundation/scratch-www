import classNames from 'classnames';
import omit from 'lodash.omit';
import React from 'react';
import Modal from '../base/modal.jsx';

require('./modal.scss');

var IframeModal = React.createClass({
    propTypes: {
        isOpen: React.PropTypes.bool,
        onRequestClose: React.PropTypes.func,
        className: React.PropTypes.string,
        componentRef: React.PropTypes.func,
        src: React.PropTypes.string
    },
    render: function () {
        var iframeClasses = classNames(
            'modal-content-iframe',
            this.props.className
        );
        return (
            <Modal {...omit(this.props, ['src'])}>
                <iframe
                    ref={this.props.componentRef}
                    src={this.props.src}
                    className={iframeClasses}
                />
            </Modal>
        );
    }
});

export default IframeModal;
