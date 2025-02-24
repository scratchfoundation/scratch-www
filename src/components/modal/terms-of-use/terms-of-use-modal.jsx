import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TermsOfUseModalOver16 from './over16/modal.jsx';
import TermsOfUseModalUnder16 from './under16/modal.jsx';

require('./terms-of-use-modal.scss');

export const noShowTermsOfUseModalPages = ['terms_of_use', 'privacy_policy', 'dmca', 'cookies'];


export const TermsOfUseLink = chunks => (
    <a
        className="tou-modal-link"
        target="_blank"
        href="terms_of_use"
    >
        {chunks}
    </a>
);

const TermsOfUseModal = ({
    hasAgreedToLatestTermsOfService,
    isInTermsOfUseGracePeriod,
    isAfterTermsOfUseGracePeriod,
    usesParentEmail,
    email
}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const handleClose = useCallback(() => {
        setIsModalVisible(false);
    });

    if (hasAgreedToLatestTermsOfService ?? true) {
        return null;
    }

    if (usesParentEmail) {
        if (!isInTermsOfUseGracePeriod && !isAfterTermsOfUseGracePeriod) {
            return (<TermsOfUseModalUnder16
                email={email}
                isOpen={isModalVisible}
                onClose={handleClose}
            />);
        }
        if (isAfterTermsOfUseGracePeriod){
            return null; // TODO
        }
        return null;
    }
    
    return <TermsOfUseModalOver16 />;
};

TermsOfUseModal.propTypes = {
    hasAgreedToLatestTermsOfService: PropTypes.bool,
    isInTermsOfUseGracePeriod: PropTypes.bool,
    isAfterTermsOfUseGracePeriod: PropTypes.bool,
    usesParentEmail: PropTypes.bool,
    email: PropTypes.string
};

const mapStateToProps = state => ({
    hasAgreedToLatestTermsOfService: state.session.session.flags?.has_accepted_terms_of_use,
    isInTermsOfUseGracePeriod: state.session.session.flags?.is_in_terms_of_use_grace_period,
    isAfterTermsOfUseGracePeriod: state.session.session.flags?.is_after_terms_of_use_grace_period,
    usesParentEmail: state.session.session.flags?.with_parent_email,
    email: state.session.session.user?.email
});

export default connect(mapStateToProps)(TermsOfUseModal);
