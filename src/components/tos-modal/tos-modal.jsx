import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TosModalOver16 from './variations/tos-over-16.jsx';
import TosModalUnder16 from './variations/tos-under-16.jsx';

require('./tos-modal.scss');

const noShowModalPages = ['terms_of_use', 'privacy_policy', 'dmca', 'cookies'];

export const TermsOfUseLink = chunks => (
    <a
        className="tos-modal-link"
        target="_blank"
        href="terms_of_use"
    >
        {chunks}
    </a>
);

const TermsOfServiceModal = ({
    hasAgreedToLatestTermsOfService,
    termsOfServiceLastReminderSentDate,
    usesParentEmail,
    email
}) => {

    const page = window.location.pathname.split('/')[1];
    if (noShowModalPages.includes(page)) {
        return null;
    }

    if (hasAgreedToLatestTermsOfService ?? true) {
        return null;
    }

    if (usesParentEmail) {
        if (!termsOfServiceLastReminderSentDate) {
            return (<TosModalUnder16
                email={email}
            />);
        }
        return null;
    }
    
    return <TosModalOver16 />;
};

TermsOfServiceModal.propTypes = {
    hasAgreedToLatestTermsOfService: PropTypes.bool.isRequired,
    termsOfServiceLastReminderSentDate: PropTypes.instanceOf(Date),
    usesParentEmail: PropTypes.bool.isRequired,
    email: PropTypes.string
};

const mapStateToProps = state => ({
    hasAgreedToLatestTermsOfService: state.session.session.flags?.hasAgreedToLatestTermsOfService,
    termsOfServiceLastReminderSentDate: state.session.session.flags?.termsOfServiceLastReminderSentDate,
    usesParentEmail: state.session.session.flags?.with_parent_email,
    email: state.session.session.user?.email
});

export default connect(mapStateToProps)(TermsOfServiceModal);
