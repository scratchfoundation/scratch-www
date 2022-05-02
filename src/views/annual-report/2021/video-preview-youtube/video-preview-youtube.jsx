const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const VideoYoutube = require('../video-youtube/video-youtube.jsx');
// const Spinner = require('../../../../components/spinner/spinner.jsx');
const classNames = require('classnames');

require('./video-preview-youtube.scss');

class VideoPreviewYouTube extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowVideo',
            'handleVideoLoaded'
        ]);

        this.state = {
            videoOpen: false,
            spinnerVisible: false
        };
    }

    handleShowVideo () {
        this.setState({
            videoOpen: true,
            spinnerVisible: true
        });
    }

    handleVideoLoaded () {
        this.setState({spinnerVisible: false});
    }

    render () {
        return (
            // Adding a width to this div allows the videoFoam property on the embedded video
            // to fill the size of the div once fullscreen has been entered and exited
            <div
                className="video-preview"
                style={{width: `${this.props.videoWidth}px`}}
            >
                {this.state.videoOpen ?
                    (
                        <div className="spinner-video-container">
                            <VideoYoutube
                                className="video"
                                height={this.props.videoHeight}
                                videoId={this.props.videoId}
                                width={this.props.videoWidth}
                                onVideoStart={this.handleVideoLoaded}
                            />
                        </div>
                    ) : (
                        <div
                            className="video-thumbnail"
                            onClick={this.handleShowVideo}
                        >
                            {/* Load an invisible spinner so that the image has a chance to load before it's needed */}
                            <img
                                className={classNames('loading-spinner', 'hidden-spinner')}
                                src="/svgs/modal/spinner-white.svg"
                            />
                            <img
                                src={this.props.thumbnail}
                                style={{
                                    width: `${this.props.thumbnailWidth}px` || 'auto',
                                    height: `${this.props.thumbnailHeight}px` || 'auto'
                                }}
                                alt={this.props.alt}
                            />
                            {this.props.buttonMessage.length > 0 &&
                                <a
                                    onClick={this.handleShowVideo}
                                >
                                    <div className="button">
                                        {this.props.buttonMessage}
                                    </div>
                                </a>
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

VideoPreviewYouTube.propTypes = {
    buttonMessage: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailHeight: PropTypes.string,
    thumbnailWidth: PropTypes.string,
    videoHeight: PropTypes.string,
    videoId: PropTypes.string.isRequired,
    videoWidth: PropTypes.string,
    alt: PropTypes.string,
    spinnerColor: PropTypes.string
};

module.exports = VideoPreviewYouTube;
