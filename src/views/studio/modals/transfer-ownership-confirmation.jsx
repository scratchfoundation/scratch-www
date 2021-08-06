import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferOwnershipTile from './transfer-ownership-tile.jsx';
import Form from '../../../components/forms/form.jsx';

import {selectUserId} from '../../../redux/session';
import {managers} from '../lib/redux-modules';
import {loadManagers} from '../lib/studio-member-actions';

import './transfer-ownership-modal.scss';

const TransferOwnershipConfirmation = ({
    handleBack,
    handleTransfer,
    items,
    userId,
    selectedId
}) => {
    const currentOwnerUsername = items.find(item => item.id === userId).username;
    const currentOwnerImage = items.find(item => item.id === userId).profile.images['90x90'];
    const newOwnerUsername = items.find(item => item.id === selectedId).username;
    const newOwnerImage = items.find(item => item.id === selectedId).profile.images['90x90'];
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const handleSubmit = () => {
        handleTransfer(passwordInputValue, newOwnerUsername, selectedId);
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
                    <TransferOwnershipTile
                        className="transfer-outcome-tile"
                        key={userId}
                        id={userId}
                        image={currentOwnerImage}
                        username={currentOwnerUsername}
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
                    <TransferOwnershipTile
                        className="transfer-outcome-tile"
                        key={selectedId}
                        id={selectedId}
                        image={newOwnerImage}
                        username={newOwnerUsername}
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
                <input
                    className="transfer-password-input"
                    required
                    key="passwordInput"
                    name="password"
                    type="password"
                    value={passwordInputValue}
                    onChange={handleChangePasswordInput} // eslint-disable-line react/jsx-no-bind
                />
                <div className="transfer-forgot-link">
                    <a
                        href="/accounts/password_reset/"
                    >
                        <FormattedMessage id="studio.transfer.forgotPassword" />
                    </a>
                </div>
                <div
                    className="transfer-ownership-button-row transfer-ownership-button-row-split"
                >
                    <button
                        className="button"
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

TransferOwnershipConfirmation.propTypes = {
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
    userId: PropTypes.number
};

export default connect(
    state => ({
        userId: selectUserId(state),
        ...managers.selector(state)
    }),
    {
        onLoadMore: loadManagers
    }
)(TransferOwnershipConfirmation);
