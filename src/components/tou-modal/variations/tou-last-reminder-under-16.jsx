/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import Modal from '../../modal/base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../tou-modal.jsx';
import PropTypes from 'prop-types';
import {TosEmailSentStep} from './tou-under-16.jsx';

// eslint-disable-next-line arrow-body-style
const TosModalLastReminderUnder16 = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

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
            <h1 className="tou-modal-heading">
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
            <input className="tou-input" />
            <div className="tou-modal-button-container">
                <button
                    className="tou-modal-button outlined"
                    onClick={onNextStep}
                >
                    <FormattedMessage id="general.close" />
                </button>
                <button
                    className="tou-modal-button filled"
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
