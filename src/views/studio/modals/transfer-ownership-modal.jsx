import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import keyMirror from 'keymirror';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';

import TransferOwnershipInfo from './transfer-ownership-info.jsx';
import TransferOwnershipSelection from './transfer-ownership-selection.jsx';
import TransferOwnershipConfirmation from './transfer-ownership-confirmation.jsx';

import './transfer-ownership-modal.scss';

const STEPS = keyMirror({
    info: null,
    selection: null,
    confirmation: null
});

const TransferOwnershipModal = ({
    handleClose,
    handleTransfer
}) => {
    const [step, setStep] = useState(STEPS.info);
    const [selectedId, setSelectedId] = useState(null);
    return (<Modal
        isOpen
        className="transfer-ownership-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="transfer-ownership-title"
            title={<FormattedMessage id="studio.transfer" />}
        />
        {step === STEPS.info && <TransferOwnershipInfo
            handleClose={handleClose}
            handleNext={() => setStep(STEPS.selection)} // eslint-disable-line react/jsx-no-bind
        />}
        {step === STEPS.selection && <TransferOwnershipSelection
            handleClose={handleClose}
            handleNext={() => setStep(STEPS.confirmation)} // eslint-disable-line react/jsx-no-bind
            handleBack={() => setStep(STEPS.info)} // eslint-disable-line react/jsx-no-bind
            handleSelected={setSelectedId}
            selectedId={selectedId}
        />}
        {step === STEPS.confirmation && <TransferOwnershipConfirmation
            handleClose={handleClose}
            handleBack={() => setStep(STEPS.selection)} // eslint-disable-line react/jsx-no-bind
            handleTransfer={handleTransfer}
            selectedId={selectedId}
        />}
    </Modal>);
};

TransferOwnershipModal.propTypes = {
    handleClose: PropTypes.func,
    handleTransfer: PropTypes.func
};

export default TransferOwnershipModal;
