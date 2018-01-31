const classNames = require('classnames');
const omit = require('lodash.omit');
const PropTypes = require('prop-types');
const React = require('react');

const Modal = require('../base/modal.jsx');

require('./modal.scss');

const IframeModal = props => (
    <Modal {...omit(props, ['src'])}>
        <iframe
            className={classNames('modal-content-iframe', props.className)}
            ref={props.componentRef}
            src={props.src}
        />
    </Modal>
);

IframeModal.propTypes = {
    className: PropTypes.string,
    componentRef: PropTypes.func,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
    src: PropTypes.string
};

module.exports = IframeModal;
