import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Modal from '../../../components/modal/base/modal.jsx';
import ModalTitle from '../../../components/modal/base/modal-title.jsx';
import ModalInnerContent from '../../../components/modal/base/modal-inner-content.jsx';

import './manager-limit-modal.scss';
import {STUDIO_MANAGER_LIMIT} from '../../../redux/studio.js';


const ManagerLimitModal = ({
    handleClose
}) => (
    <Modal
        isOpen
        className="manager-limit-modal"
        onRequestClose={handleClose}
    >
        <ModalTitle
            className="manager-limit-title"
        />
        <div
            className="manager-limit-content"
        >
            <img
                src="/svgs/studio/manager-limit-illustration.svg"
                className="manager-limit-image"
            />
            <ModalInnerContent
                className="manager-limit-inner"
            >
                <h2>
                    <FormattedMessage
                        id="studio.managerLimitReachedHeader"
                        values={{
                            managerLimit: STUDIO_MANAGER_LIMIT
                        }}
                    />
                </h2>
                <p><FormattedMessage id="studio.managerLimitMessageCollaborative" /></p>
                <p><FormattedMessage id="studio.managerLimitMessageRemoveManagers" /></p>
                <div
                    className="manager-limit-button-row"
                >
                    <button
                        className="button"
                        onClick={handleClose}
                    >
                        <FormattedMessage id="studio.okay" />
                    </button>
                </div>
            </ModalInnerContent>
        </div>
    </Modal>
);

ManagerLimitModal.propTypes = {
    handleClose: PropTypes.func
};

export default ManagerLimitModal;
