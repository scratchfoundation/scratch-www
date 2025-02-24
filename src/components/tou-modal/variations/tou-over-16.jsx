import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import Modal from '../../modal/base/modal.jsx';
import {TermsOfUseLink} from '../tou-modal.jsx';

// eslint-disable-next-line arrow-body-style
const TosModalOver16 = () => {
    return (
        <Modal
            overlayClassName="tou-modal-overlay"
            className="tou-modal"
            showCloseButton={false}
            isOpen
        >
            <div className="tou-modal-top" />
            <div className="tou-modal-content">
                <h1 className="tou-modal-heading">
                    <FormattedMessage id="tos.updatedTerms" />
                </h1>
                <p>
                    <FormattedMessage
                        id="tos.over16.updatedTermsNotice"
                        values={{
                            a: TermsOfUseLink
                        }}

                    />
                </p>
                <p>
                    <FormattedMessage id="tos.over16.acceptConfirmation" />
                </p>
                <div className="tou-modal-button-container">
                    <button className="tou-modal-button filled">
                        <FormattedMessage id="tos.over16.acceptContinue" />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default injectIntl(TosModalOver16);
