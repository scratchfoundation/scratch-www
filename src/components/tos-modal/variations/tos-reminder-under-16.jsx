import React from 'react';
import Modal from '../../modal/base/modal.jsx';

const ReminderUnder16 = () => {
    const isCloseVisible = false;
    return (
        <Modal
            overlayClassName="tos-modal-overlay"
            showCloseButton={isCloseVisible}
            isOpen
        >
            <div className="tos-modal-top" />
            REMINDER Under 16
        </Modal>
    );
};

export default ReminderUnder16;
