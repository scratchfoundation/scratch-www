import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

require('./tos-modal.scss');

const TermsOfUseLink = chunks => (
    <a
        className="tou-banner-link"
        href="terms_of_use"
    >
        {chunks}
    </a>
);

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
