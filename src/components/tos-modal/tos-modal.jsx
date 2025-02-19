import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Over16 from './variations/tos-over-16.jsx';
import Under16 from './variations/tos-under-16.jsx';
import LastReminderUnder16 from './variations/tos-last-reminder-under-16.jsx';
import ReminderUnder16 from './variations/tos-reminder-under-16.jsx';

require('./tos-modal.scss');

const TermsOfServiceModal = ({
    hasAgreedToLatestTermsOfService,
    termsOfServiceLastReminderSentDate,
    termsOfServiceGracePeriodEndDate,
    under16
}) => {
    const now = new Date();

    // const minReminderInterval = 1000 * 60 * 60 * 24 * 7; // 1 week?
    const minReminderInterval = 1;


    if (hasAgreedToLatestTermsOfService) {
        return null;
    }

    if (under16) {
        if (!termsOfServiceLastReminderSentDate) {
            return <Under16 />;
        }
        
        const lastReminderDate = new Date(termsOfServiceLastReminderSentDate);
        const gracePeriodEndDate = new Date(termsOfServiceGracePeriodEndDate);
        
        if (gracePeriodEndDate < now) {
            return <LastReminderUnder16 />;
        }
        
        if (lastReminderDate < now - minReminderInterval && gracePeriodEndDate > now) {
            return <ReminderUnder16 />;
        }
    }

    return <Over16 />;
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
