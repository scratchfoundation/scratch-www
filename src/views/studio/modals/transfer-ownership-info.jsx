import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import AlertComponent from '../../../components/alert/alert-component.jsx';
import errorIcon from '../../../components/alert/icon-alert-error.svg';

import './transfer-ownership-modal.scss';

const TransferOwnershipInfo = ({
    handleClose,
    handleNext
}) => 
<div className="content">
    <img
        src="/svgs/studio/transfer-ownership.svg"
        className="transfer-ownership-image"
    />
    <ModalInnerContent
            className="inner"
        >
            <h2>
                <FormattedMessage id="studio.transfer.youAreAboutTo" />
            </h2>
            <div className='transfer-ownership-alert-wrapper'>
                <AlertComponent 
                    className='alert-error transfer-ownership-alert'
                    icon={errorIcon}
                    id='studio.transfer.cannotUndo'
                />
            </div>
            <span
                className="list-header"
            >
                <FormattedMessage id="studio.transfer.thisMeans" />
            </span>
            <ul>
                <li><FormattedMessage id="studio.transfer.noLongerEdit" /></li>
                <li><FormattedMessage id="studio.transfer.noLongerDelete" /></li>
            </ul>
            <div
                className="transfer-ownership-button-row"
            >
                <button
                    className="button cancel-button"
                    onClick={handleClose}
                >
                    <FormattedMessage id="studio.cancel" />
                </button>
                <button
                    className="button next-button"
                    onClick={handleNext}
                >
                    <FormattedMessage id="studio.next" />
                </button>
            </div>
    </ModalInnerContent>
</div>

TransferOwnershipInfo.propTypes = {
    handleClose: PropTypes.func,
    handleNext: PropTypes.func
};

export default TransferOwnershipInfo;
