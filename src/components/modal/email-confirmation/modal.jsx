import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../base/modal.jsx';
import ModalTitle from '../base/modal-title.jsx';
// import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

// import './manager-limit-modal.scss';
// import {STUDIO_MANAGER_LIMIT} from '../../../redux/studio.js';

const EmailConfirmationModal = () => (
    <Modal
        isOpen
    >
        <ModalTitle />
        test 1234
    </Modal>
);

EmailConfirmationModal.propTypes = {
    handleClose: PropTypes.func
};

export default EmailConfirmationModal;
