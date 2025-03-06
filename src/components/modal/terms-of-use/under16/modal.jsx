import React from 'react';
import Modal from '../../base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';
import {TermsOfUseLink} from '../modal.jsx';
import PropTypes from 'prop-types';
import Button from '../../../forms/button.jsx';

const TermsOfUseModalUnder16 = ({isOpen, onClose}) => (
    <Modal
        overlayClassName="tou-modal-overlay"
        className="tou-modal"
        showCloseButton={false}
        isOpen={isOpen}
        onRequestClose={onClose}
    >
        <div className="tou-modal-top" />
        <div className="tou-modal-content  tou-center-content">
            <h1 className="tou-modal-heading">
                <FormattedMessage id="termsOfUse.updatedTerms" />
            </h1>
            <p>
                <FormattedMessage
                    id="termsOfUse.under16.updatedTerms"
                    values={{
                        a: TermsOfUseLink
                    }}
                />
            </p>
            <p>
                <FormattedMessage id="termsOfUse.under16.parentalConsentNotice" />
            </p>
            <div className="tou-modal-button-container">
                <Button
                    className="tou-modal-button filled"
                    onClick={onClose}
                >
                    <FormattedMessage id="termsOfUse.under16.gotIt" />
                </Button>
            </div>
        </div>
    </Modal>
);

TermsOfUseModalUnder16.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default injectIntl(TermsOfUseModalUnder16);
