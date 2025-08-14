import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Modal from '../base/modal.jsx';
import ModalTitle from '../base/modal-title.jsx';
import ModalInnerContent from '../base/modal-inner-content.jsx';
import {SimpleCheckbox} from '../../checkbox/simple-checkbox.jsx';
import {FormattedMessage, useIntl} from 'react-intl';
import {setLocalStorageValue} from '../../../lib/local-storage.js';
import './modal.scss';

const updateLocalStorage = (username = 'guest', dontShowAgain) => {
    if (dontShowAgain === false) {
        return;
    }

    // `dontShowAgain` is true => we need to update the preference to false
    setLocalStorageValue('shareModalPreference', username, false);
};

// This modal uses texts from preview/l10n.json
// Parametrise texts if needed to be used outside of the preview context.
const ShareModal = ({
    isOpen,
    onClose,
    onChangeThumbnail,
    onShare,
    projectThumbnailUrl,
    thumbnailRefreshKey = '',
    username
}) => {
    const intl = useIntl();
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleCheckboxChange = useCallback(e => {
        setDontShowAgain(e.target.checked);
    }, []);

    const handleChangeThumbnail = useCallback(() => {
        updateLocalStorage(username, dontShowAgain);
        onChangeThumbnail();
    }, [username, dontShowAgain, onChangeThumbnail]);

    const handleShare = useCallback(() => {
        updateLocalStorage(username, dontShowAgain);
        onShare();
    }, [username, dontShowAgain, onShare]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="share-modal"
            overlayClassName="share-modal-overlay"
        >
            <ModalTitle
                className="title"
                title={<FormattedMessage id="project.shareModal.title" />}
            />
            <ModalInnerContent className="share-modal-inner">
                <div>
                    <FormattedMessage id="project.shareModal.description1" />
                </div>
                <div className="thumbnail-container">
                    <img
                        src={`${projectThumbnailUrl}?refresh=${thumbnailRefreshKey}`}
                        alt="Project thumbnail"
                        className="thumbnail-img"
                    />
                </div>
                <div>
                    <FormattedMessage id="project.shareModal.description2" />
                </div>
                <div>
                    <FormattedMessage id="project.shareModal.description3" />
                </div>
                <div className="footer">
                    <div className="divider" />
                    <div className="button-row">
                        <div className="checkbox-container">
                            <SimpleCheckbox
                                id="dont-show-again"
                                checked={dontShowAgain}
                                onChange={handleCheckboxChange}
                                label={
                                    intl.formatMessage({
                                        id: 'project.shareModal.dontShowAgain',
                                        defaultMessage: "Don't show this message again"
                                    })
                                }
                            />
                        </div>
                        <div className="actions">
                            <button
                                className="change-thumbnail-button"
                                onClick={handleChangeThumbnail}
                            >
                                <FormattedMessage id="project.shareModal.changeThumbnail" />
                            </button>
                            <button
                                className="ok-button"
                                onClick={handleShare}
                            >
                                <FormattedMessage id="project.shareModal.okay" />
                            </button>
                        </div>
                    </div>
                </div>
            </ModalInnerContent>
        </Modal>
    );
};

ShareModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onChangeThumbnail: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    projectThumbnailUrl: PropTypes.string,
    thumbnailRefreshKey: PropTypes.string,
    username: PropTypes.string
};

export {ShareModal};
