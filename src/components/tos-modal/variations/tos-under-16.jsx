/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import Modal from '../../modal/base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../tos-modal.jsx';
import PropTypes from 'prop-types';

// eslint-disable-next-line arrow-body-style
const TosModalUnder16 = ({email}) => {
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
                    <Step1
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

TosModalUnder16.propTypes = {
    email: PropTypes.string.isRequired
};

// eslint-disable-next-line arrow-body-style
const Step1 = ({onNextStep, email}) => {
    return (
        <>
            <h1 className="tos-modal-heading">
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
                className="tos-input"
                defaultValue={email}
            />
            <div className="tos-modal-button-container">
                <button
                    className="tos-modal-button filled"
                    onClick={onNextStep}
                >
                    <FormattedMessage id="tos.under16.sendEmail" />
                </button>
            </div>
        </>
    );
};

Step1.propTypes = {
    onNextStep: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
};

export const TosEmailSentStep = () => (
    <div className="tos-center-content">
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

        <h1 className="tos-modal-heading">
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

export default injectIntl(TosModalUnder16);
