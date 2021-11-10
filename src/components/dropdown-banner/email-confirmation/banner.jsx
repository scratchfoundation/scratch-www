/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import DropdownBanner from '../banner.jsx';
import EmailConfirmationModal from '../../../components/modal/email-confirmation/modal.jsx';

require('./banner.scss');

const EmailConfirmationBanner = ({onRequestDismiss}) => {

    const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
    return (
        <React.Fragment>
            {(showEmailConfirmationModal && <EmailConfirmationModal />)}
            <DropdownBanner
                className="warning"
                key="confirmedEmail"
                onRequestDismiss={onRequestDismiss}
            >
                <a
                    className="showEmailConfirmationModalLink"
                    href="#"
                    onClick={() => {
                        setShowEmailConfirmationModal(true);
                    }}
                >
                            Confirm your email
                </a>{' '}to enable sharing.{' '}
                <a href="/faq/#accounts">
                            Having trouble?
                </a>
            </DropdownBanner>
        </React.Fragment>);
};

EmailConfirmationBanner.propTypes = {
    onRequestDismiss: PropTypes.func
};

module.exports = EmailConfirmationBanner;
