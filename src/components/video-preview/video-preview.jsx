const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const Video = require('../video/video.jsx');
const Spinner = require('../spinner/spinner.jsx');
const classNames = require('classnames');

require('./video-preview.scss');

class VideoPreview extends React.Component {
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
            <div className="video-preview">
                {this.state.videoOpen ?
                    (
                        <div className="spinner-video-container">
                            {this.state.spinnerVisible ? <Spinner className="loading-spinner" /> : null}
                            <Video
                                className="video"
                                height={this.props.videoHeight}
                                videoId={this.props.videoId}
                                width={this.props.videoWidth}
                                onLoad={this.handleVideoLoaded}
                            />
                        </div>
                    ) : (
                        <div
                            className="video-thumbnail"
                            onClick={this.handleShowVideo}
                        >
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
                            />
                            <a
                                onClick={this.handleShowVideo}
                            >
                                <div className="button">
                                    {this.props.buttonMessage}
                                </div>
                            </a>
                        </div>
                    )
                }
            </div>
        );
    }
}

VideoPreview.propTypes = {
    buttonMessage: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailHeight: PropTypes.string,
    thumbnailWidth: PropTypes.string,
    videoHeight: PropTypes.string,
    videoId: PropTypes.string.isRequired,
    videoWidth: PropTypes.string
};

module.exports = VideoPreview;
