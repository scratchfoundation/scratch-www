import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import Modal from '../../modal/base/modal.jsx';
import {TermsOfUseLink} from '../tos-modal.jsx';

// eslint-disable-next-line arrow-body-style
const TosModalOver16 = () => {
    return (
        <Modal
            overlayClassName="tos-modal-overlay"
            className="tos-modal"
            showCloseButton={false}
            isOpen
        >
            <div className="tos-modal-top" />
            <div className="tos-modal-content">
                <h1 className="tos-modal-heading">
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
                <div className="tos-modal-button-container">
                    <button className="tos-modal-button filled">
                        <FormattedMessage id="tos.over16.acceptContinue" />
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default injectIntl(TosModalOver16);
