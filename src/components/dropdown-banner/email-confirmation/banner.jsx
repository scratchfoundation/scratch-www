import React, {useState} from 'react';
import DropdownBanner from '../banner.jsx';


/* <IframeModal
                        
                        componentRef={iframe => { // eslint-disable-line react/jsx-no-bind
                            this.emailConfirmationiFrame = iframe;
                        }}
                        isOpen={this.props.emailConfirmationModalOpen}
                        key="iframe-modal"
                        src="/accounts/email_resend_standalone/"
                        onRequestClose={this.props.onHideEmailConfirmationModal}
                    /> */


const EmailConfirmationBanner = onRequestDismiss => {

    const [showEmailConfirmationModal, setShowEmailConfirmationModal] = useState(false);

    return (
        <React.Fragment>
            {(showEmailConfirmationModal && <h1>test</h1>)}
            <DropdownBanner
                className="warning"
                key="confirmedEmail"
                onRequestDismiss={onRequestDismiss}
            >
                <a
                    href="#"
                    onClick={setShowEmailConfirmationModal(true)}
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

};

module.exports = EmailConfirmationBanner;
