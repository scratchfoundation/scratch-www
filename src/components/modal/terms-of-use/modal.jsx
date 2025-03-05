import React, {useCallback, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TermsOfUseModalOver16 from './over16/modal.jsx';
import TermsOfUseModalUnder16 from './under16/modal.jsx';
import api from '../../../lib/api.js';

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
    usesParentEmail,
    birthMonth,
    birthYear,
    username
}) => {
    const [isModalVisible, setIsModalVisible] = useState(true);


    const handleAccept = useCallback(() => {
        setIsModalVisible(false);
        api({
            host: '',
            uri: `/users/${username}/terms_of_use/`,
            method: 'post',
            useCsrf: true
        }, (err, body, res) => {
            console.log(err, body, res);
        });
    }, [username]);

    if (hasAgreedToLatestTermsOfService ?? true) {
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
            onAccept={handleAccept}
        />);
    }
  
    return (<TermsOfUseModalUnder16
        isOpen={isModalVisible}
        onAccept={handleAccept}
    />);

};

TermsOfUseModal.propTypes = {
    hasAgreedToLatestTermsOfService: PropTypes.bool,
    usesParentEmail: PropTypes.bool,
    birthMonth: PropTypes.number,
    birthYear: PropTypes.number,
    username: PropTypes.string
};

const mapStateToProps = state => ({
    hasAgreedToLatestTermsOfService: state.session.session.flags?.accepted_terms_of_use,
    usesParentEmail: state.session.session.flags?.with_parent_email,
    birthMonth: state.session.session.user?.birthMonth,
    birthYear: state.session.session.user?.birthYear,
    username: state.session.session.user?.username
});

export default connect(mapStateToProps)(TermsOfUseModal);
