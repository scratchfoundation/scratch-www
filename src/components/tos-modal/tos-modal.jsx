import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TosModalOver16 from './variations/tos-over-16.jsx';
import TosModalUnder16 from './variations/tos-under-16.jsx';
import TosModalLastReminderUnder16 from './variations/tos-last-reminder-under-16.jsx';
import TosModalReminderUnder16 from './variations/tos-reminder-under-16.jsx';

require('./tos-modal.scss');

export const TermsOfUseLink = chunks => (
    <a
        className="tos-modal-link"
        href="test.com"
    >
        {chunks}
    </a>
);

const TermsOfServiceModal = ({
    hasAgreedToLatestTermsOfService,
    termsOfServiceLastReminderSentDate,
    termsOfServiceGracePeriodEndDate,
    under16
}) => {
    const now = new Date();

    // const minReminderInterval = 1000 * 60 * 60 * 24 * 7; // 1 week?
    const minReminderInterval = 1;


    if (hasAgreedToLatestTermsOfService ?? true) {
        return null;
    }

    if (under16) {
        if (!termsOfServiceLastReminderSentDate) {
            return <TosModalUnder16 />;
        }
    
        const lastReminderDate = new Date(termsOfServiceLastReminderSentDate);
        const gracePeriodEndDate = new Date(termsOfServiceGracePeriodEndDate);
    
        if (gracePeriodEndDate.getTime() < now.getTime()) {
            return <TosModalLastReminderUnder16 />;
        }
    
        if (
            lastReminderDate.getTime() < now.getTime() - minReminderInterval &&
            gracePeriodEndDate.getTime() > now.getTime()
        ) {
            return <TosModalReminderUnder16 />;
        }
    }

    return <TosModalOver16 />;
};

TermsOfServiceModal.propTypes = {
    hasAgreedToLatestTermsOfService: PropTypes.bool.isRequired,
    termsOfServiceLastReminderSentDate: PropTypes.instanceOf(Date),
    termsOfServiceGracePeriodEndDate: PropTypes.instanceOf(Date).isRequired,
    under16: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    hasAgreedToLatestTermsOfService: state.session.session.flags?.hasAgreedToLatestTermsOfService,
    termsOfServiceLastReminderSentDate: state.session.session.flags?.termsOfServiceLastReminderSentDate,
    termsOfServiceGracePeriodEndDate: state.session.session.flags?.termsOfServiceGracePeriodEndDate,
    under16: state.session.session.flags?.under16
});

export default connect(mapStateToProps)(TermsOfServiceModal);
