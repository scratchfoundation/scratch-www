import React from 'react';
import {connect} from 'react-redux';
import Over16 from './variations/tos-over-16.jsx';
import Under16 from './variations/tos-under-16.jsx';
import ReminderUnder16 from './variations/tos-reminder-under-16.jsx';
import LastReminderUnder16 from './variations/tos-last-reminder-under-16.jsx';
import PropTypes from 'prop-types';

require('./tos-modal.scss');

const TermsOfServiceModal = ({
    hasAgreedToTermsOfService, showTermsOfServiceReminder, showTermsOfServiceLastReminder, under16
}) => {

    if (hasAgreedToTermsOfService ?? true) {
        return null;
    }

    if (under16) {
        if (showTermsOfServiceLastReminder) {
            return <LastReminderUnder16 />;
        } else if (showTermsOfServiceReminder) {
            return <ReminderUnder16 />;
        }
        return <Under16 />;
    }
    return <Over16 />;

};

TermsOfServiceModal.propTypes = {
    hasAgreedToTermsOfService: PropTypes.bool.isRequired,
    showTermsOfServiceReminder: PropTypes.bool.isRequired,
    showTermsOfServiceLastReminder: PropTypes.bool.isRequired,
    under16: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    console.log('Redux State:', state);
    return {
        hasAgreedToTermsOfService: state.session.session.flags?.hasAgreedToTermsOfService,
        showTermsOfServiceReminder: state.session.session.flags?.showTermsOfServiceReminder,
        showTermsOfServiceLastReminder: state.session.session.flags?.showTermsOfServiceLastReminder,
        under16: state.session.session.flags?.under16

    };
};

export default connect(mapStateToProps)(TermsOfServiceModal);
