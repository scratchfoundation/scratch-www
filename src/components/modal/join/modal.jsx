const PropTypes = require('prop-types');
const React = require('react');
const Modal = require('../base/modal.jsx');
const JoinFlow = require('../../join-flow/join-flow.jsx');

require('./modal.scss');

const JoinModal = ({
    createProjectOnComplete,
    onCompleteRegistration,
    onRequestClose,
    ...modalProps
}) => (
    <Modal
        isOpen
        showCloseButton
        useStandardSizes
        className="mod-join"
        shouldCloseOnOverlayClick={false}
        onRequestClose={onRequestClose}
        {...modalProps}
    >
        <JoinFlow
            createProjectOnComplete={createProjectOnComplete}
            onCompleteRegistration={onCompleteRegistration}
        />
    </Modal>
);

JoinModal.propTypes = {
    createProjectOnComplete: PropTypes.bool,
    onCompleteRegistration: PropTypes.func,
    onRequestClose: PropTypes.func,
    showCloseButton: PropTypes.bool
};

module.exports = JoinModal;
