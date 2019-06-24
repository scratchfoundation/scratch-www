const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../base/modal.jsx');
const JoinFlow = require('../../join-flow/join-flow.jsx');

require('./modal.scss');

const JoinModal = ({
    isOpen,
    onCompleteRegistration, // eslint-disable-line no-unused-vars
    onRequestClose,
    ...modalProps
}) => (
    <Modal
        useStandardSizes
        className="mod-join"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        {...modalProps}
    >
        <JoinFlow
            onCompleteRegistration={onCompleteRegistration}
        />
    </Modal>
);

JoinModal.propTypes = {
    isOpen: PropTypes.bool,
    onCompleteRegistration: PropTypes.func,
    onRequestClose: PropTypes.func
};

module.exports = JoinModal;
