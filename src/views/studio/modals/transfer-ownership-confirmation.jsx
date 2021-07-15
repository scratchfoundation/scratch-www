import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import {Formik} from 'formik';
import FormikInput from '../../../components/formik-forms/formik-input.jsx';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferOwnershipTile from './transfer-ownership-tile.jsx';

import {selectUserId} from '../../../redux/session';
import {managers} from '../lib/redux-modules';
import {loadManagers, transferOwnership} from '../lib/studio-member-actions';

import './transfer-ownership-modal.scss';

const TransferOwnershipConfirmation = ({
    handleBack,
    items,
    onTransferOwnership,
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
                <Formik
                    initialValues={{
                        password: ''
                    }}
                >
                    <FormikInput
                        autoCapitalize="off"
                        autoComplete="off"
                        autoCorrect="off"
                        className='join-flow-input'
                        id="password"
                        name="password"
                        placeholder=""
                        spellCheck={false}
                        type="password"
                    />
                </Formik>
                <div
                    className="transfer-ownership-button-row"
                >
                    <button
                        className="button"
                        onClick={handleBack}
                    >
                        <FormattedMessage id="studio.back" />
                    </button>
                    <button
                        className="button"
                        onClick={() => onTransferOwnership(newOwnerUsername, selectedId)}
                    >
                        <FormattedMessage id="studio.confirm" />
                    </button>
                </div>
        </ModalInnerContent>
    </div>
}

TransferOwnershipConfirmation.propTypes = {
    handleBack: PropTypes.func,
    handleClose: PropTypes.func,
    handleNext: PropTypes.func,
    handleSelected: PropTypes.func,
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
    onTransferOwnership: PropTypes.func,
    selectedId: PropTypes.number,
    userId: PropTypes.number
};

export default connect(
    state => ({        
        userId: selectUserId(state),
        ...managers.selector(state)
    }),
    {
        onLoadMore: loadManagers,
        onTransferOwnership: transferOwnership
    }
)(TransferOwnershipConfirmation);