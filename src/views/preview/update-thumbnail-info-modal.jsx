import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/modal/base/modal.jsx';
import ModalTitle from '../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../components/modal/base/modal-inner-content.jsx';
import {FormattedMessage} from 'react-intl';
import './update-thumbnail-info-modal.scss';

const UpdateThumbnailInfoModal = ({isOpen, hideModal}) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={hideModal}
        className="update-thumbnail-info-modal"
        overlayClassName="update-thumbnail-info-modal-overlay"
    >
        <ModalTitle
            className="update-thumbnail-info-modal-title"
            title={<FormattedMessage id="project.updateThumbnailInfoModal.title" />}
        />
        <ModalInnerContent className="update-thumbnail-info-modal-inner">
            <div>
                <FormattedMessage id="project.updateThumbnailInfoModal.description" />
            </div>
            <div className="update-thumbnail-info-modal-button-row">
                <button
                    className="update-thumbnail-info-modal-ok-button"
                    onClick={hideModal}
                >
                    <FormattedMessage id="project.updateThumbnailInfoModal.button" />
                </button>
            </div>
        </ModalInnerContent>
    </Modal>
);

UpdateThumbnailInfoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    hideModal: PropTypes.func.isRequired
};

export {UpdateThumbnailInfoModal};
