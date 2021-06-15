import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';
import Alert from '../../../components/alert/alert.jsx';

import './promote-modal.scss';

const PromoteModal = ({
    handleClose,
    handlePromote,
    username
}) => (
    <Modal
        isOpen
        className="promote-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="promote-title"
        />
        <div
            className="promote-content"
        >
            <img
                src="/svgs/studio/promote-illustration.svg"
                className="promote-image"
            />
            <ModalInnerContent
                className="promote-inner"
            >
                <h2>
                    <FormattedMessage id="studio.curatorDoYouWantToPromote" />
                    <br />
                    {username}
                </h2>
                <span><FormattedMessage id="studio.curatorManagersCan" /></span>
                <ul>
                    <li><FormattedMessage id="studio.curatorAddAndDeleteCurators" /></li>
                    <li><FormattedMessage id="studio.curatorDeleteManagers" /></li>
                    <li><FormattedMessage id="studio.curatorAddAndDeleteProjects" /></li>
                </ul>
                <span><FormattedMessage id="studio.curatorIfYouTrust" /></span>
            </ModalInnerContent>
        </div>
        <div className="promote-alert-and-button-row">
            <Alert className="studio-alert promote-alert" />
            <div
                className="promote-button-row"
            >
                <button
                    className="button cancel-button"
                    onClick={handleClose}
                >
                    <FormattedMessage id="studio.cancel" />
                </button>
                <button
                    className="button"
                    onClick={handlePromote}
                >
                    <FormattedMessage id="studio.promote" />
                </button>
            </div>
        </div>
    </Modal>
);

PromoteModal.propTypes = {
    handleClose: PropTypes.func,
    handlePromote: PropTypes.func,
    username: PropTypes.string
};

export default PromoteModal;
