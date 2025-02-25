import React, {useCallback, useState} from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import TermsOfUseReminderModal from './under16/terms-of-use-reminder.jsx';

require('./terms-of-use-modal.scss');

const TermsOfUseLink = chunks => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOpenModal = useCallback(() => {
        setIsModalVisible(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalVisible(false);
    }, []);

    return (
        <>
            <a
                className="tou-banner-link"
                onClick={handleOpenModal}
            >
                {chunks}
            </a>
            <TermsOfUseReminderModal
                onClose={handleCloseModal}
                isOpen={isModalVisible}
            />
        </>
    );

};

const TermsOfUseBanner = () => (
    <div className="tou-banner">
        <FormattedMessage
            id="termsOfUse.banner.parentAgreement"
            values={{
                a: TermsOfUseLink
            }}
        />
    </div>
);


export default injectIntl(TermsOfUseBanner);
