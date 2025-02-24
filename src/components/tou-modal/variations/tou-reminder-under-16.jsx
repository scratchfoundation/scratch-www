/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import Modal from '../../modal/base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../tou-modal.jsx';
import PropTypes from 'prop-types';
import {TosEmailSentStep} from './tou-under-16.jsx';
import {connect} from 'react-redux';


// eslint-disable-next-line arrow-body-style
const TosModalReminderUnder16 = ({onClose, isOpen, email}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const handleNextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };

    return (
        <Modal
            overlayClassName="tou-modal-overlay"
            className="tou-modal"
            showCloseButton={currentStep === 2}
            isOpen={isOpen}
            onRequestClose={() => {
                if (currentStep === 2) {
                    onClose();
                }
            }}
        >
            <div className="tou-modal-top" />
            <div className="tou-modal-content">
                {currentStep === 1 ? (
                    <Step1
                        onNextStep={handleNextStep}
                        onClose={onClose}
                        email={email}
                    />
                ) : (
                    <TosEmailSentStep />
                )}
            </div>
        </Modal>
    );
};

TosModalReminderUnder16.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    email: PropTypes.string
};

const mapStateToProps = state => ({
    email: state.session.session.user?.email
});

// eslint-disable-next-line arrow-body-style
const Step1 = ({onNextStep, onClose, email}) => {
    return (
        <>
            <h1 className="tou-modal-heading">
                <FormattedMessage id="tos.under16.accountWillLock" />
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
            <input
                className="tou-input"
                defaultValue={email}
            />
            <div className="tou-modal-button-container">
                <button
                    className="tou-modal-button outlined"
                    onClick={onClose} // Close the modal
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
    onNextStep: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string
};

export default connect(mapStateToProps)(injectIntl(TosModalReminderUnder16));
