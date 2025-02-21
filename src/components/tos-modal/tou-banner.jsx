import React, {useState} from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import TosModalReminderUnder16 from './variations/tos-reminder-under-16.jsx';

require('./tos-modal.scss');

const TermsOfUseLink = chunks => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (<>
        <a
            className="tou-banner-link"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => {
                setIsModalVisible(true);
            }}
        >
            {chunks}
        </a>
        {isModalVisible && <TosModalReminderUnder16
            // eslint-disable-next-line react/jsx-no-bind
            onClose={() => {
                setIsModalVisible(false);
            }}
            isOpen={isModalVisible}
        /> }
    </>);

};

// eslint-disable-next-line arrow-body-style
const TermsOfUseBanner = () => {
    return (
        <div className="tou-banner">
            <FormattedMessage
                id="tos.banner.parentAgreement"
                values={{
                    a: TermsOfUseLink
                }}
            />
        </div>
    );
};

export default injectIntl(TermsOfUseBanner);
