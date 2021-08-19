import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferHostTile from './transfer-host-tile.jsx';
import Form from '../../../components/forms/form.jsx';
import ValidationMessage from '../../../components/forms/validation-message.jsx';

import {managers} from '../lib/redux-modules';

import './transfer-host-modal.scss';

const TransferHostConfirmation = ({
    handleBack,
    handleTransfer,
    items,
    hostId,
    selectedId
}) => {
    const currentHostUsername = items.find(item => item.id === hostId).username;
    const currentHostImage = items.find(item => item.id === hostId).profile.images['90x90'];
    const newHostUsername = items.find(item => item.id === selectedId).username;
    const newHostImage = items.find(item => item.id === selectedId).profile.images['90x90'];
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const handleSubmit = () => {
        handleTransfer(passwordInputValue, newHostUsername, selectedId);
    };
    const handleChangePasswordInput = e => {
        setPasswordInputValue(e.target.value);
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
                    <ValidationMessage
                        className="transfer-password-validation"
                        message={<FormattedMessage id="studio.transfer.alert.wasntTheRightPassword" />}
                        mode="error"
                    />
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
    handleTransfer: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.id,
        username: PropTypes.string,
        profile: PropTypes.shape({
            images: PropTypes.shape({
                '90x90': PropTypes.string
            })
        })
    })),
    selectedId: PropTypes.number,
    hostId: PropTypes.number
};

export default connect(
    state => ({
        hostId: state.studio.owner,
        ...managers.selector(state)
    })
)(TransferHostConfirmation);
