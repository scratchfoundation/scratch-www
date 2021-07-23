import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferOwnershipTile from './transfer-ownership-tile.jsx';
import Form from '../../../components/forms/form.jsx';
import Input from '../../../components/forms/input.jsx';

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
    const currentOwnerUsername = items.find(item => item.id===userId).username;
    const newOwnerUsername = items.find(item => item.id===selectedId).username;
    return <div className="content">
        <ModalInnerContent
                className="inner"
            >
                <div>
                    <TransferOwnershipTile
                        key={userId}
                        id={userId}
                        username={currentOwnerUsername}
                        isCreator={false}
                    />
                    <span>➡️</span>
                    <TransferOwnershipTile
                        key={selectedId}
                        id={selectedId}
                        username={newOwnerUsername}
                        isCreator={true}
                    />
                </div>
                <h3>
                    <FormattedMessage id="studio.transfer.confirmWithPassword" />
                </h3>
                <Form
                    onSubmit={formData => {
                        handleTransfer(formData.password, newOwnerUsername, selectedId)
                    }}
                >
                    <Input
                        required
                        key="passwordInput"
                        name="password"
                        type="password"
                    />
                    <a href="/accounts/password_reset/">
                        <FormattedMessage id="studio.transfer.forgotPassword" />
                    </a>
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
                        >
                            <FormattedMessage id="studio.confirm" />
                        </button>
                    </div>
                </Form>
        </ModalInnerContent>
    </div>
}

TransferOwnershipConfirmation.propTypes = {
    handleBack: PropTypes.func,
    handleClose: PropTypes.func,
    handleNext: PropTypes.func,
    handleSelected: PropTypes.func,
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
    moreToLoad: PropTypes.bool,
    onLoadMore: PropTypes.func,
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