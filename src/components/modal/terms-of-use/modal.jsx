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
    hasAgreedToLatestTermsOfUse,
    usesParentEmail,
    birthMonth,
    birthYear
}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const handleClose = useCallback(() => {
        setIsModalVisible(false);
    });

    if (hasAgreedToLatestTermsOfUse ?? true) {
        return null;
    }

    const currentDate = new Date();
    const isOver16 = birthYear &&
        (
            birthYear < currentDate.getFullYear() - 16 ||
            (
                birthYear === currentDate.getFullYear() - 16 &&
                birthMonth <= currentDate.getMonth() + 1
            )
        );

    if (!usesParentEmail || isOver16){
        return (<TermsOfUseModalOver16
            isOpen={isModalVisible}
            onClose={handleClose}
        />);
    }
  
    return (<TermsOfUseModalUnder16
        isOpen={isModalVisible}
        onClose={handleClose}
    />);

};

TermsOfUseModal.propTypes = {
    hasAgreedToLatestTermsOfUse: PropTypes.bool,
    usesParentEmail: PropTypes.bool,
    birthMonth: PropTypes.number,
    birthYear: PropTypes.number
};

const mapStateToProps = state => ({
    hasAgreedToLatestTermsOfUse: state.session.session.flags?.has_accepted_terms_of_use,
    usesParentEmail: state.session.session.flags?.with_parent_email,
    birthMonth: state.session.session.user?.birthMonth,
    birthYear: state.session.session.user?.birthYear
});

export default connect(mapStateToProps)(TermsOfUseModal);
