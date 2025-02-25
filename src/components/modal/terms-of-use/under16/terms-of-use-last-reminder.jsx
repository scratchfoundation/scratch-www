import React, {useCallback, useState} from 'react';
import Modal from '../../modal/base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../terms-of-use-modal.jsx';
import PropTypes from 'prop-types';
import {TosEmailSentStep} from './modal.jsx';
import Button from '../../../forms/button.jsx';

const TermsOfUseLastReminderModal = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNextStep = useCallback(() => {
        setCurrentStep(prevStep => prevStep + 1);
    });

    return (
        <Modal
            overlayClassName="tou-modal-overlay"
            className="tou-modal"
            showCloseButton={currentStep === 2}
            isOpen
        >
            <div className="tou-modal-top" />
            <div className="tou-modal-content">
                {currentStep === 1 ? (
                    <ReminderStep onNextStep={handleNextStep} />
                ) : (
                    <TosEmailSentStep />
                )}
            </div>
        </Modal>
    );
};

const ReminderStep = ({onNextStep}) => (
    <>
        <h1 className="tou-modal-heading">
            <FormattedMessage id="termsOfUse.under16.accountLocked" />
        </h1>
        <p>
            <FormattedMessage
                id="termsOfUse.under16.parentHasNotAgreed"
                values={{
                    a: TermsOfUseLink
                }}
            />
        </p>
        <p>
            <FormattedMessage id="termsOfUse.under16.sendParentReminder" />
        </p>
        <input className="tou-input" />
        <div className="tou-modal-button-container">
            <Button
                className="tou-modal-button outlined"
                onClick={onNextStep}
            >
                <FormattedMessage id="general.close" />
            </Button>
            <Button
                className="tou-modal-button filled"
                onClick={onNextStep}
            >
                <FormattedMessage id="termsOfUse.under16.sendReminder" />
            </Button>
        </div>
    </>
);


ReminderStep.propTypes = {
    onNextStep: PropTypes.func.isRequired
};

export default injectIntl(TermsOfUseLastReminderModal);
