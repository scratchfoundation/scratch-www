import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {FormattedMessage} from 'react-intl';
import api from '../../lib/api';
import {YoutubeVideoButton} from '../youtube-video-button/youtube-video-button.jsx';
import Spinner from '../spinner/spinner.jsx';

import './youtube-playlist-item.scss';

export const YoutubePlaylistItem = ({playlistRequestUri, playlistTitleId, onSelectedVideo}) => {
    const [loading, setLoading] = useState(true);
    const [playlistVideos, setPlaylistVideos] = useState([]);

    useEffect(() => {
        api({
            host: process.env.ROOT_URL,
            method: 'GET',
            uri: playlistRequestUri,
            headers: {
                'Content-Type': 'application/json'
            }
        }, (_err, body, res) => {
            setLoading(false);
            if (res.statusCode === 200) {
                setPlaylistVideos(body);
            }
        });
    }, []);

    return (
        <div className="playlist">
            <div className="playlist-title">
                <FormattedMessage id={playlistTitleId} />
            </div>
            {loading ? (
                <Spinner
                    className="spinner"
                    color="transparent-gray"
                />
            ) : (
                <section className="playlist-videos">
                    {playlistVideos
                        .map(video => (
                            <YoutubeVideoButton
                                key={video.videoId}
                                onSelectedVideo={onSelectedVideo}
                                {...video}
                            />
                        ))}
                </section>
            )}
        </div>
    );
};

YoutubePlaylistItem.propTypes = {
    playlistRequestUri: PropTypes.string,
    playlistTitleId: PropTypes.string,
    onSelectedVideo: PropTypes.func
};
