import React from 'react';
import Modal from '../../modal/base/modal.jsx';


const Over16 = () => {
    const isCloseVisible = false;
    return (
        <Modal
            overlayClassName="tos-modal-overlay"
            className="tos-modal"
            showCloseButton={isCloseVisible}
            isOpen
        >
            <div className="tos-modal-top" />
            <div className="tos-modal-content">
                OVER 16
            </div>
        </Modal>
    );
};

export default Over16;
