import React from 'react';
import Modal from '../../base/modal.jsx';
import {FormattedMessage, injectIntl} from 'react-intl';

const AccountSettingsLink = chunks => (
    <a
        className="tou-modal-link-blue"
        target="_blank"
        href="accounts/email_change/"
    >
        {chunks}
    </a>
);

const TermsOfUseAccountLockedModal = () => (
    <Modal
        overlayClassName="tou-modal-overlay"
        className="tou-modal"
        showCloseButton={false}
        isOpen
    >
        <div className="tou-modal-top red" />
        <div className=" tou-modal-content tou-center-content">
            <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    // eslint-disable-next-line max-len
                    d="M1.01474 42.033C0.233694 42.8141 0.233695 44.0804 1.01474 44.8614L9.14805 52.9947C9.9291 53.7758 11.1954 53.7758 11.9765 52.9947L27.0049 37.9664L42.0333 52.9948C42.8143 53.7758 44.0806 53.7758 44.8617 52.9948L52.995 44.8614C53.776 44.0804 53.776 42.8141 52.995 42.033L37.9666 27.0046L52.995 11.9762C53.776 11.1952 53.776 9.92885 52.995 9.1478L44.8617 1.0145C44.0806 0.233448 42.8143 0.233449 42.0333 1.0145L27.0049 16.0429L11.9765 1.01451C11.1954 0.233459 9.9291 0.23346 9.14805 1.01451L1.01474 9.14781C0.233692 9.92886 0.233694 11.1952 1.01474 11.9762L16.0431 27.0046L1.01474 42.033Z"
                    fill="#ED5F5F"
                />
            </svg>
            <br />
            <h1 className="tou-modal-heading">
                <FormattedMessage id="termsOfUse.under16.ohno" />
            </h1>
            <p>
                <FormattedMessage id="termsOfUse.under16.gracePeriodOver" />
            </p>
            <p>
                <FormattedMessage
                    id="termsOfUse.under16.confirmInSettings"
                    values={{
                        a: AccountSettingsLink
                    }}
                />
            </p>
            
        </div>
    </Modal>
);

export default injectIntl(TermsOfUseAccountLockedModal);
