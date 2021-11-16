import React, {useState} from 'react';
const connect = require('react-redux').connect;
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../base/modal.jsx';
require('./modal.scss');

const EmailConfirmationModal = ({
    email, onRequestClose, isOpen
}) => {
    const [showEmailTips, setShowEmailTips] = useState(false);

    return (
        <Modal
            isOpen={isOpen}
            showCloseButton
            useStandardSizes
            onRequestClose={onRequestClose}
        >
            <div className="top-close-bar" />
            <div className="modal-middle-content">
                <img
                    className="modal-image"
                    alt="email-confirmation-illustration"
                    src="/svgs/modal/confirm-email-illustration.svg"
                />

                <div className="modal-right-content">
                    {showEmailTips ?
                        (<React.Fragment>
                            <h1><FormattedMessage id="registration.emailConfirmationModalHeader2" /></h1>
                            <p><FormattedMessage id="registration.emailConfirmationModalTipWaitForTenMinutes" /></p>
                            <p><FormattedMessage id="registration.emailConfirmationModalTipCheckYourSpam" /></p>
                            <p><FormattedMessage
                                id="registration.emailConfirmationModalTipMakeSureYourEmail"
                                values={{AccountSettings: (<a href="/accounts/email_change/"><FormattedMessage id="registration.emailConfirmationModalAccountSettings" /></a>)}}
                            /></p>
                        </React.Fragment>) :
                        (<React.Fragment>
                            <h1><FormattedMessage id="registration.emailConfirmationModalHeader1" /></h1>
                            <p><FormattedMessage id="registration.emailConfirmationModalWantToShare" /></p>
                            <p><FormattedMessage id="registration.emailConfirmationModalClickEmailLink" /></p>
                            <p><b>{email}</b></p>
                            <a href="/accounts/email_change/"><FormattedMessage id="registration.emailConfirmationModalResendEmail" /></a>
                        </React.Fragment>)
                    }
                </div>
            </div>
            <div className="guide-footer">
                {showEmailTips ?
                    (<React.Fragment>
                        <FormattedMessage
                            id="registration.emailConfirmationModalWantMoreInfo"
                            values={{FAQLink: (<a href="/faq"><FormattedMessage id="registration.emailConfirmationModalCheckOutFAQ" /></a>)}}
                        />
                    </React.Fragment>) :
                    (<React.Fragment>
                        <FormattedMessage
                            id="registration.emailConfirmationModalHavingTrouble"
                            values={{TipsLink: (
                                <a
                                    onClick={e => { // eslint-disable-line react/jsx-no-bind
                                        e.preventDefault();
                                        setShowEmailTips(true);
                                    }}
                                >
                                    <FormattedMessage id="registration.emailConfirmationModalCheckOutTips" />
                                </a>)}}
                        />
                    </React.Fragment>)}
            </div>
        </Modal>);
};

EmailConfirmationModal.propTypes = {
    email: PropTypes.string,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
};
const mapStateToProps = state => ({
    email: state.session.session.user.email
});

module.exports = connect(mapStateToProps)(EmailConfirmationModal);
