const React = require('react');
const {useState} = React;
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const {FormattedMessage} = require('react-intl');

const Modal = require('../base/modal.jsx');
require('./modal.scss');

const EmailConfirmationModal = ({
    email, onRequestClose, isOpen
}) => {
    const [showEmailTips, setShowEmailTips] = useState(false);

    return (
        <Modal
            className="email-confirmation-modal"
            isOpen={isOpen}
            showCloseButton
            useStandardSizes
            onRequestClose={onRequestClose}
        >
            <div className="top-close-bar" />
            <div className="modal-main-content">
                <img
                    className="modal-image"
                    alt="email-confirmation-illustration"
                    src="/svgs/modal/confirm-email-illustration.svg"
                />

                <div className="modal-text-content">
                    {showEmailTips ?
                        (<React.Fragment>
                            <h1><FormattedMessage id="emailConfirmationModal.confirmingTips" /></h1>
                            <ul>
                                <li><FormattedMessage id="emailConfirmationModal.tipWaitTenMinutes" /></li>
                                <li><FormattedMessage id="emailConfirmationModal.tipCheckSpam" /></li>
                                <li><FormattedMessage
                                    id="emailConfirmationModal.correctEmail"
                                    values={
                                        {accountSettings:
                                            (<a href="/accounts/email_change/">
                                                <FormattedMessage id="emailConfirmationModal.accountSettings" />
                                            </a>)
                                        }
                                    }
                                /></li>
                            </ul>
                        </React.Fragment>) :
                        (<React.Fragment>
                            <h1><FormattedMessage id="emailConfirmationModal.confirm" /></h1>
                            <p><FormattedMessage id="emailConfirmationModal.wantToShare" /></p>
                            <p><FormattedMessage id="emailConfirmationModal.clickEmailLink" /></p>
                            <p><b>{email}</b></p>
                            <a href="/accounts/email_change/">
                                <FormattedMessage id="emailConfirmationModal.resendEmail" />
                            </a>
                        </React.Fragment>)
                    }
                </div>
            </div>
            <div className="guide-footer">
                {showEmailTips ?
                    (<React.Fragment>
                        <FormattedMessage
                            id="emailConfirmationModal.wantMoreInfo"
                            values={
                                {FAQLink:
                                    (<a href="/faq#accounts">
                                        <FormattedMessage id="emailConfirmationModal.checkOutFAQ" />
                                    </a>)
                                }
                            }
                        />
                    </React.Fragment>) :
                    (<React.Fragment>
                        <FormattedMessage
                            id="emailConfirmationModal.havingTrouble"
                            values={{tipsLink: (
                                <a
                                    onClick={e => { // eslint-disable-line react/jsx-no-bind
                                        e.preventDefault();
                                        setShowEmailTips(true);
                                    }}
                                >
                                    <FormattedMessage id="emailConfirmationModal.checkOutTips" />
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
