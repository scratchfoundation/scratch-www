import React from 'react';
import Modal from '../../modal/base/modal.jsx';

const LastReminderUnder16 = () => {
    const isCloseVisible = false;
    return (
        <Modal
            overlayClassName="tos-modal-overlay"
            showCloseButton={isCloseVisible}
            isOpen
        >
            <div className="tos-modal-top" />
            LAST REMINDER Under 16
        </Modal>
    );
};

export default LastReminderUnder16;
