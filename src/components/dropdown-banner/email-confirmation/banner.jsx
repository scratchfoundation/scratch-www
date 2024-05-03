/* eslint-disable react/jsx-no-bind */
const React = require('react');
const {useState} = React;
const PropTypes = require('prop-types');
const DropdownBanner = require('../banner.jsx');
const FormattedMessage = require('react-intl').FormattedMessage;

const EmailConfirmationModal = require('../../../components/modal/email-confirmation/modal.jsx');

const EmailConfirmationBanner = ({onRequestDismiss}) => {

    const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);
    return (
        <React.Fragment>
            {(showEmailConfirmationModal && <EmailConfirmationModal
                isOpen
                onRequestClose={() => {
                    setShowEmailConfirmationModal(false);
                }}
            />)}
            <DropdownBanner
                className="warning"
                key="confirmedEmail"
                onRequestDismiss={onRequestDismiss}
            >
                <FormattedMessage
                    id="emailConfirmationBanner.confirm"
                    values={{
                        confirmLink: (
                            <a
                                className="showEmailConfirmationModalLink"
                                href="#"
                                onClick={() => {
                                    setShowEmailConfirmationModal(true);
                                }}
                            >
                                <FormattedMessage id="emailConfirmationBanner.confirmLinkText" />
                            </a>
                        ),
                        faqLink: (
                            <a href="/faq/#accounts">
                                <FormattedMessage id="emailConfirmationBanner.faqLinkText" />
                            </a>
                        )
                    }}
                />
            </DropdownBanner>
        </React.Fragment>);
};

EmailConfirmationBanner.propTypes = {
    onRequestDismiss: PropTypes.func
};

module.exports = EmailConfirmationBanner;
