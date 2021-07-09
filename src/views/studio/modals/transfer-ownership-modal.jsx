import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import AlertComponent from '../../../components/alert/alert-component.jsx';
import errorIcon from '../../../components/alert/icon-alert-error.svg';

import './transfer-ownership-modal.scss';

const TransferOwnershipModal = ({
    handleClose
}) => {
    return <Modal
        isOpen
        className="transfer-ownership-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="transfer-ownership-title"
            title={<FormattedMessage id="studio.transferOwnership" />}
        />
        <div className="content">
            <img
                src="/svgs/studio/transfer-ownership.svg"
                className="transfer-ownership-image"
            />
            <ModalInnerContent
                    className="inner"
                >
                    <h2>
                        <FormattedMessage id="studio.transferOwnership.youAreAboutToGive" />
                    </h2>
                    <div className='transfer-ownership-alert-wrapper'>
                        <AlertComponent 
                            className='alert-error transfer-ownership-alert'
                            icon={errorIcon}
                            id='studio.transferOwnership.cannotUndo'
                        />
                    </div>
                    <span
                        className="list-header"
                    >
                        <FormattedMessage id="studio.transferOwnership.thisMeans" />
                    </span>
                    <ul>
                        <li><FormattedMessage id="studio.transferOwnership.noLongerEdit" /></li>
                        <li><FormattedMessage id="studio.transferOwnership.noLongerDelete" /></li>
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
                            // onClick={}
                        >
                            <FormattedMessage id="studio.next" />
                        </button>
                    </div>
            </ModalInnerContent>
        </div>
    </Modal>
};

TransferOwnershipModal.propTypes = {
    handleClose: PropTypes.func,
    handlePromote: PropTypes.func,
    username: PropTypes.string
};

export default TransferOwnershipModal;
