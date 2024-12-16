import React from 'react';
import PropTypes from 'prop-types';

import './youtube-video-button.scss';

const parseViewCount = viewCount =>
    parseInt(viewCount, 10).toLocaleString('en-US', {
        notation: 'compact',
        compactDisplay: 'short'
    });

export const YoutubeVideoButton = ({onSelectedVideo, ...videoData}) => (
    <div
        className="youtbe-video-button"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onSelectedVideo(videoData.videoId)}
    >
        <div className="thumbnail">
            <img src={videoData.thumbnail} />
            <div className="duration">{videoData.length}</div>
        </div>
        <div className="video-info">
            <div className="video-title">{videoData.title}</div>
            <div className="video-metadata">
                <div className="channel-name">{videoData.channel}</div>
                <div className="video-statistics">
                    {`${parseViewCount(videoData.views)} views · ${videoData.uploadTime}`}
                </div>
            </div>
            {videoData.hasCC && <img src="/images/ideas/video-cc-label.svg" />}
        </div>
    </div>
);

YoutubeVideoButton.propTypes = {
    videoId: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    channel: PropTypes.string,
    uploadTime: PropTypes.string,
    length: PropTypes.string,
    views: PropTypes.string,
    hasCC: PropTypes.bool,
    onSelectedVideo: PropTypes.func
};
