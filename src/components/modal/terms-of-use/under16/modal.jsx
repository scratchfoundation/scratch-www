import React, {useCallback, useState} from 'react';
import Modal from '../../base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../terms-of-use-modal.jsx';
import PropTypes from 'prop-types';

const TermsOfUseModalUnder16 = ({email, isOpen, onClose}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNextStep = useCallback(() => {
        setCurrentStep(prevStep => prevStep + 1);
    });
    const handleClose = useCallback(() => {
        if (currentStep === 2) {
            onClose();
        }
    });

    return (
        <Modal
            overlayClassName="tou-modal-overlay"
            className="tou-modal"
            showCloseButton={currentStep === 2}
            isOpen={isOpen}
            onRequestClose={handleClose}
        >
            <div className="tou-modal-top" />
            <div className="tou-modal-content">
                {currentStep === 1 ? (
                    <ReminderStep
                        onNextStep={handleNextStep}
                        email={email}
                    />
                ) : (
                    <TosEmailSentStep />
                )}
            </div>
        </Modal>
    );
};

TermsOfUseModalUnder16.propTypes = {
    email: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

const ReminderStep = ({onNextStep, email}) => (
    <>
        <h1 className="tou-modal-heading">
            <FormattedMessage id="tos.updatedTerms" />
        </h1>
        <p>
            <FormattedMessage
                id="tos.under16.updatedTerms"
                values={{
                    a: TermsOfUseLink
                }}
            />
        </p>
        <p>
            <FormattedMessage id="tos.under16.parentalConsentNotice" />
        </p>
        <p>
            <FormattedMessage id="tos.under16.ensureEmail" />
        </p>
        <input
            className="tou-input"
            defaultValue={email}
        />
        <div className="tou-modal-button-container">
            <button
                className="tou-modal-button filled"
                onClick={onNextStep}
            >
                <FormattedMessage id="tos.under16.sendEmail" />
            </button>
        </div>
    </>
);


ReminderStep.propTypes = {
    onNextStep: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
};

export const TosEmailSentStep = () => (
    <div className="tou-center-content">
        <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="28"
                cy="28"
                r="24.5"
                fill="#0FBD8C"
            />
            <path
                // eslint-disable-next-line max-len
                d="M24.2209 40.2125C23.3249 40.2125 22.4289 39.8695 21.7464 39.187L15.0264 32.467C13.6579 31.0985 13.6579 28.8865 15.0264 27.518C16.3949 26.1495 18.6069 26.1495 19.9754 27.518L24.2209 31.7635L37.4614 18.5265C38.8264 17.158 41.0419 17.158 42.4104 18.5265C43.7754 19.8915 43.7754 22.107 42.4104 23.4755L26.6954 39.187C26.0129 39.8695 25.1169 40.2125 24.2209 40.2125Z"
                fill="white"
            />
        </svg>

        <br />

        <h1 className="tou-modal-heading">
            <FormattedMessage id="tos.under16.hooray" />
        </h1>
        <p>
            <FormattedMessage id="tos.under16.emailSent" />
        </p>
        <p>
            <FormattedMessage id="tos.under16.daysToAgree" />
        </p>
        <p style={{margin: 0}}>
            <FormattedMessage id="tos.under16.lostAccessIfNotAgree" />
        </p>
    </div>
);

export default injectIntl(TermsOfUseModalUnder16);
