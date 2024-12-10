import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Button from '../forms/button.jsx';
const classNames = require('classnames');

import './youtube-video-modal.scss';

export const YoutubeVideoModal = ({videoId, onClose = () => {}, className}) => {
    if (!videoId) return null;
    return (
        <ReactModal
            isOpen={!!videoId}
            onRequestClose={onClose}
            className="youtube-video-modal-container"
            overlayClassName="youtube-video-modal-overlay"
        >
            <div
                className={classNames('cards-modal-header', className)}
            >
                <Button
                    className="close-button"
                    isCloseType
                    onClick={onClose}
                />
            </div>
            <iframe
                className="youtube-player"
                type="text/html"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&cc_load_policy=1&autoplay=1`}
                allow="autoplay"
                allowFullScreen
            />
        </ReactModal>
    );
};

YoutubeVideoModal.defaultProps = {
    className: 'mint-green'
};

YoutubeVideoModal.propTypes = {
    videoId: PropTypes.string,
    onClose: PropTypes.func,
    className: PropTypes.string
};
