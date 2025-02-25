import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import Modal from '../../base/modal.jsx';
import {TermsOfUseLink} from '../terms-of-use-modal.jsx';
import Button from '../../../forms/button.jsx';

const TermsOfUseModalOver16 = () => (
    <Modal
        overlayClassName="tou-modal-overlay"
        className="tou-modal"
        showCloseButton={false}
        isOpen
    >
        <div className="tou-modal-top" />
        <div className="tou-modal-content">
            <h1 className="tou-modal-heading">
                <FormattedMessage id="termsOfUse.updatedTerms" />
            </h1>
            <p>
                <FormattedMessage
                    id="termsOfUse.over16.updatedTermsNotice"
                    values={{
                        a: TermsOfUseLink
                    }}
                />
            </p>
            <p>
                <FormattedMessage id="termsOfUse.over16.acceptConfirmation" />
            </p>
            <div className="tou-modal-button-container">
                <Button className="tou-modal-button filled">
                    <FormattedMessage id="termsOfUse.over16.acceptContinue" />
                </Button>
            </div>
        </div>
    </Modal>
);

export default injectIntl(TermsOfUseModalOver16);
