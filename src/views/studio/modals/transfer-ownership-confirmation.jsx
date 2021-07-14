import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import TransferOwnershipTile from './transfer-ownership-tile.jsx';

import {selectUserId} from '../../../redux/session';
import {managers} from '../lib/redux-modules';
import {loadManagers} from '../lib/studio-member-actions';

import './transfer-ownership-modal.scss';

const TransferOwnershipConfirmation = ({
    handleBack,
    handleConfirm,
    items,
    userId,
    selectedId
}) => {
    return <div className="content">
        <ModalInnerContent
                className="inner"
            >
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
                        onClick={handleConfirm}
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