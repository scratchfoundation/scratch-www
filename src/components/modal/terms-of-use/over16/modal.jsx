import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import Modal from '../../base/modal.jsx';
import {TermsOfUseLink} from '../modal.jsx';
import Button from '../../../forms/button.jsx';
import PropTypes from 'prop-types';

const TermsOfUseModalOver16 = ({isOpen, onAccept}) => (
    <Modal
        overlayClassName="tou-modal-overlay"
        className="tou-modal"
        showCloseButton={false}
        isOpen={isOpen}
    >
        <div className="tou-modal-top" />
        <div className="tou-modal-content tou-center-content">
            <h1 className="tou-modal-heading">
                <FormattedMessage id="termsOfUse.updatedTerms" />
            </h1>
            <p>
                <FormattedMessage
                    id="termsOfUse.over16.updatedTermsNotice"
                    values={{
                        a: TermsOfUseLink
                    }}
                />
            </p>
            <p>
                <FormattedMessage id="termsOfUse.over16.acceptConfirmation" />
            </p>
            <div className="tou-modal-button-container">
                <Button
                    className="tou-modal-button filled"
                    onClick={onAccept}
                >
                    <FormattedMessage id="termsOfUse.over16.continue" />
                </Button>
            </div>
        </div>
    </Modal>
);

TermsOfUseModalOver16.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired
};

export default injectIntl(TermsOfUseModalOver16);
