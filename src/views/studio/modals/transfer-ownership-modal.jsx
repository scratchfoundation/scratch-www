import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import keyMirror from 'keymirror';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';

import TransferOwnershipInfo from './transfer-ownership-info.jsx';
import TransferOwnershipSelection from './transfer-ownership-selection.jsx';

import './transfer-ownership-modal.scss';

const STEPS = keyMirror({
    info: null,
    selection: null,
    confirmation: null
});

const TransferOwnershipModal = ({
    handleClose,
    managers
}) => {
    const [step, setStep] = useState(STEPS.info);
    return <Modal
        isOpen
        className="transfer-ownership-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="transfer-ownership-title"
            title={<FormattedMessage id="studio.transferOwnership" />}
        />
        {step === STEPS.info && <TransferOwnershipInfo
            handleClose={handleClose}
            handleNext={() => setStep(STEPS.selection)}
        />}
        {step === STEPS.selection && <TransferOwnershipSelection
            handleClose={handleClose}
        />}
    </Modal>
};

TransferOwnershipModal.propTypes = {
    handleClose: PropTypes.func
};

export default TransferOwnershipModal;
