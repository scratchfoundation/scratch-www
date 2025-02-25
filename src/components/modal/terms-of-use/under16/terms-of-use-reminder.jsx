import React, {useCallback, useState} from 'react';
import Modal from '../../base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../terms-of-use-modal.jsx';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {TosEmailSentStep} from './modal.jsx';
import Button from '../../../forms/button.jsx';


const TermsOfUseReminderModal = ({onClose, isOpen, email}) => {
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

TermsOfUseReminderModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    email: PropTypes.string
};

const mapStateToProps = state => ({
    email: state.session.session.user?.email
});

const ReminderStep = ({onNextStep, onClose, email}) => (
    <>
        <h1 className="tou-modal-heading">
            <FormattedMessage id="termsOfUse.under16.accountWillLock" />
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
        <input
            className="tou-input"
            defaultValue={email}
        />
        <div className="tou-modal-button-container">
            <Button
                className="tou-modal-button outlined"
                onClick={onClose}
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
    onNextStep: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    email: PropTypes.string
};

export default connect(mapStateToProps)(injectIntl(TermsOfUseReminderModal));
