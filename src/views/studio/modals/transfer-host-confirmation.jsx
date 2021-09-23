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
import {Errors, transferHost, loadManagers} from '../lib/studio-member-actions';

import './transfer-host-modal.scss';

const TransferHostConfirmation = ({
    handleBack,
    handleClose,
    handleTransferHost,
    handleLoadManagers,
    intl,
    items,
    hostId,
    selectedId
}) => {
    // Initialize host info so it does not get updated after we reload the manager list
    const [hostInfo] = useState(() => {
        const currentHostItem = items.find(item => item.id === hostId);
        const newHostItem = items.find(item => item.id === selectedId);
        return {
            currentHostUsername: currentHostItem.username,
            currentHostImage: currentHostItem.profile.images['90x90'],
            newHostUsername: newHostItem.username,
            newHostImage: newHostItem.profile.images['90x90']
        };
    });
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const {errorAlert, successAlert} = useAlertContext();

    const errorToMessageId = error => {
        switch (error) {
        case Errors.RATE_LIMIT: return 'studio.alertTransferRateLimit';
        case Errors.CANNOT_BE_HOST: return 'studio.transfer.alert.thisUserCannotBecomeHost';
        default: return 'studio.transfer.alert.somethingWentWrong';
        }
    };

    const validationErrorToMessageId = error => {
        switch (error) {
        case Errors.PASSWORD: return 'studio.transfer.alert.wasntTheRightPassword';
        case Errors.PASSWORD_ATTEMPT_LIMIT: return 'studio.transfer.alert.tooManyPasswordAttempts';
        default: return 'studio.transfer.alert.somethingWentWrong';
        }
    };

    const handleSubmit = () => {
        setSubmitting(true);
        handleTransferHost(passwordInputValue, hostInfo.newHostUsername, selectedId)
            .then(() => handleLoadManagers(true)) // reload the list of managers, to get them in the correct order
            .then(() => {
                handleClose();
                successAlert({
                    id: 'studio.alertTransfer',
                    values: {name: hostInfo.newHostUsername}
                });
            })
            .catch(e => {
                // For password errors, show validation alert without closing the modal
                if (e === Errors.PASSWORD || e === Errors.PASSWORD_ATTEMPT_LIMIT) {
                    setSubmitting(false);
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
                <div className="transfer-outcome-tile-container">
                    <div className="transfer-outcome-label">
                        <FormattedMessage id="studio.transfer.currentHost" />
                    </div>
                    <TransferHostTile
                        className="transfer-outcome-tile"
                        key={hostId}
                        id={hostId}
                        image={hostInfo.currentHostImage}
                        username={hostInfo.currentHostUsername}
                        isCreator={false}
                    />
                </div>
                <img
                    className="transfer-outcome-arrow"
                    src="/svgs/studio/r-arrow.svg"
                />
                <div className="transfer-outcome-tile-container">
                    <div className="transfer-outcome-label">
                        <FormattedMessage id="studio.transfer.newHost" />
                    </div>
                    <TransferHostTile
                        className="transfer-outcome-tile"
                        key={selectedId}
                        id={selectedId}
                        image={hostInfo.newHostImage}
                        username={hostInfo.newHostUsername}
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
                        message={intl.formatMessage({
                            id: validationErrorToMessageId(validationError)
                        })}
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
                        disabled={passwordInputValue === '' || submitting || validationError}
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
    handleLoadManagers: PropTypes.func,
    selectedId: PropTypes.number,
    hostId: PropTypes.number
};

const connectedConfirmationStep = connect(
    state => ({
        hostId: state.studio.host,
        ...managers.selector(state)
    }), {
        handleTransferHost: transferHost,
        handleLoadManagers: loadManagers
    }
)(TransferHostConfirmation);

export default injectIntl(connectedConfirmationStep);
