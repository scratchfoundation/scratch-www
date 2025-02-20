/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import Modal from '../../modal/base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../tos-modal.jsx';
import PropTypes from 'prop-types';
import {TosEmailSentStep} from './tos-under-16.jsx';

// eslint-disable-next-line arrow-body-style
const TosModalLastReminderUnder16 = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    return (
        <Modal
            overlayClassName="tos-modal-overlay"
            className="tos-modal"
            showCloseButton={currentStep === 2}
            isOpen
        >
            <div className="tos-modal-top" />
            <div className="tos-modal-content">
                {currentStep === 1 ? (
                    <Step1 onNextStep={handleNextStep} />
                ) : (
                    <TosEmailSentStep />
                )}
            </div>
        </Modal>
    );
};

// eslint-disable-next-line arrow-body-style
const Step1 = ({onNextStep}) => {
    return (
        <>
            <h1 className="tos-modal-heading">
                <FormattedMessage id="tos.under16.accountLocked" />
            </h1>
            <p>
                <FormattedMessage
                    id="tos.under16.parentHasNotAgreed"
                    values={{
                        a: TermsOfUseLink
                    }}
                />
            </p>
            <p>
                <FormattedMessage id="tos.under16.sendParentReminder" />
            </p>
            <input className="tos-input" />
            <div className="tos-modal-button-container">
                <button
                    className="tos-modal-button outlined"
                    onClick={onNextStep}
                >
                    <FormattedMessage id="general.close" />
                </button>
                <button
                    className="tos-modal-button filled"
                    onClick={onNextStep}
                >
                    <FormattedMessage id="tos.under16.sendReminder" />
                </button>
            </div>
        </>
    );
};

Step1.propTypes = {
    onNextStep: PropTypes.func.isRequired
};

export default injectIntl(TosModalLastReminderUnder16);
