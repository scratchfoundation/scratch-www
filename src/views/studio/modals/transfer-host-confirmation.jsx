import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
const {injectIntl, intlShape} = require('react-intl');

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferHostTile from './transfer-host-tile.jsx';
import Form from '../../../components/forms/form.jsx';
import ValidationMessage from '../../../components/forms/validation-message.jsx';

import {managers} from '../lib/redux-modules';

import {useAlertContext} from '../../../components/alert/alert-context';
import {Errors, transferHost} from '../lib/studio-member-actions';

import './transfer-host-modal.scss';

const TransferHostConfirmation = ({
    handleBack,
    handleClose,
    handleTransferHost,
    intl,
    items,
    hostId,
    selectedId
}) => {
    const currentHostUsername = items.find(item => item.id === hostId).username;
    const currentHostImage = items.find(item => item.id === hostId).profile.images['90x90'];
    const newHostUsername = items.find(item => item.id === selectedId).username;
    const newHostImage = items.find(item => item.id === selectedId).profile.images['90x90'];
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [validationError, setValidationError] = useState(null);
    const {errorAlert, successAlert} = useAlertContext();

    const errorToMessageId = error => {
        switch (error) {
        case Errors.RATE_LIMIT: return 'studio.alertTransferRateLimit';
        case Errors.CONFLICT: return 'studio.transfer.alert.thisUserCannotBecomeHost';
        default: return 'studio.transfer.alert.somethingWentWrong';
        }
    };

    const handleSubmit = () => {
        handleTransferHost(passwordInputValue, newHostUsername, selectedId)
            .then(() => {
                handleClose();
                successAlert({
                    id: 'studio.alertTransfer',
                    values: {name: newHostUsername}
                });
            })
            .catch(e => {
                // For password errors, show validation alert without closing the modal
                if (e === Errors.PERMISSION) {
                    setValidationError(e);
                    return;
                }
                // For other errors, close the modal and show an alert
                handleClose();
                errorAlert({
                    id: errorToMessageId(e)
                });
            });
    };

    const handleChangePasswordInput = e => {
        setPasswordInputValue(e.target.value);
        setValidationError(null);
    };

    return (
        <ModalInnerContent>
            <div className="transfer-outcome">
                <div>
                    <div className="transfer-outcome-label">
                        <FormattedMessage id="studio.transfer.currentHost" />
                    </div>
                    <TransferHostTile
                        className="transfer-outcome-tile"
                        key={hostId}
                        id={hostId}
                        image={currentHostImage}
                        username={currentHostUsername}
                        isCreator={false}
                    />
                </div>
                <img
                    className="transfer-outcome-arrow"
                    src="/svgs/studio/r-arrow.svg"
                />
                <div>
                    <div className="transfer-outcome-label">
                        <FormattedMessage id="studio.transfer.newHost" />
                    </div>
                    <TransferHostTile
                        className="transfer-outcome-tile"
                        key={selectedId}
                        id={selectedId}
                        image={newHostImage}
                        username={newHostUsername}
                        isCreator={false}
                    />
                </div>
            </div>
            <div className="transfer-password-instruction">
                <h2>
                    <FormattedMessage id="studio.transfer.confirmWithPassword" />
                </h2>
            </div>
            <Form
                className="transfer-form"
                onSubmit={handleSubmit} // eslint-disable-line react/jsx-no-bind
            >
                <div className="transfer-password-row">
                    <input
                        className="transfer-password-input"
                        required
                        key="passwordInput"
                        name="password"
                        type="password"
                        value={passwordInputValue}
                        onChange={handleChangePasswordInput} // eslint-disable-line react/jsx-no-bind
                    />
                    {validationError && <ValidationMessage
                        className="transfer-password-validation"
                        message={intl.formatMessage({id: 'studio.transfer.alert.wasntTheRightPassword'})}
                        mode="error"
                    />}
                </div>
                <div className="transfer-forgot-link">
                    <a
                        href="/accounts/password_reset/"
                    >
                        <FormattedMessage id="studio.transfer.forgotPassword" />
                    </a>
                </div>
                <div
                    className="transfer-host-button-row transfer-host-button-row-split"
                >
                    <button
                        className="button"
                        type="button"
                        onClick={handleBack}
                    >
                        <FormattedMessage id="studio.back" />
                    </button>
                    <button
                        className="button"
                        type="submit"
                        disabled={passwordInputValue === ''}
                    >
                        <FormattedMessage id="studio.confirm" />
                    </button>
                </div>
            </Form>
        </ModalInnerContent>
    );
};

TransferHostConfirmation.propTypes = {
    handleBack: PropTypes.func,
    handleClose: PropTypes.func,
    intl: intlShape,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        username: PropTypes.string,
        profile: PropTypes.shape({
            images: PropTypes.shape({
                '90x90': PropTypes.string
            })
        })
    })),
    handleTransferHost: PropTypes.func,
    selectedId: PropTypes.number,
    hostId: PropTypes.number
};

const connectedConfirmationStep = connect(
    state => ({
        hostId: state.studio.owner,
        ...managers.selector(state)
    }), {
        handleTransferHost: transferHost
    }
)(TransferHostConfirmation);

export default injectIntl(connectedConfirmationStep);
