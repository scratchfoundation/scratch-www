import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import keyMirror from 'keymirror';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';

import TransferHostInfo from './transfer-host-info.jsx';
import TransferHostSelection from './transfer-host-selection.jsx';
import TransferHostConfirmation from './transfer-host-confirmation.jsx';

import './transfer-host-modal.scss';

const STEPS = keyMirror({
    info: null,
    selection: null,
    confirmation: null
});

const TransferHostModal = ({
    handleClose,
    handleTransfer
}) => {
    const [step, setStep] = useState(STEPS.info);
    const [selectedId, setSelectedId] = useState(null);
    return (<Modal
        isOpen
        className="transfer-host-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="transfer-host-title"
            title={<FormattedMessage id="studio.transfer" />}
        />
        {step === STEPS.info && <TransferHostInfo
            handleClose={handleClose}
            handleNext={() => setStep(STEPS.selection)} // eslint-disable-line react/jsx-no-bind
        />}
        {step === STEPS.selection && <TransferHostSelection
            handleClose={handleClose}
            handleNext={() => setStep(STEPS.confirmation)} // eslint-disable-line react/jsx-no-bind
            handleBack={() => setStep(STEPS.info)} // eslint-disable-line react/jsx-no-bind
            handleSelected={setSelectedId}
            selectedId={selectedId}
        />}
        {step === STEPS.confirmation && <TransferHostConfirmation
            handleClose={handleClose}
            handleBack={() => setStep(STEPS.selection)} // eslint-disable-line react/jsx-no-bind
            handleTransfer={handleTransfer}
            selectedId={selectedId}
        />}
    </Modal>);
};

TransferHostModal.propTypes = {
    handleClose: PropTypes.func,
    handleTransfer: PropTypes.func
};

export default TransferHostModal;
