const bindAll = require('lodash.bindall');
const PropTypes = require('prop-types');
const React = require('react');

const Video = require('../video/video.jsx');

require('./video-preview.scss');

class VideoPreview extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowVideo'
        ]);

        this.state = {
            videoOpen: false
        };
    }

    handleShowVideo () {
        this.setState({videoOpen: true});
    }

    render () {
        return (
            <div className="video-preview">
                {this.state.videoOpen ?
                    (
                        <Video
                            className="video"
                            height={this.props.videoHeight}
                            isYouTube={this.props.isYouTube}
                            videoId={this.props.videoId}
                            width={this.props.videoWidth}
                        />
                    ) : (
                        <div
                            className="video-thumbnail"
                            onClick={this.handleShowVideo}
                        >
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

VideoPreview.defaultProps = {
    isYouTube: false
};

VideoPreview.propTypes = {
    buttonMessage: PropTypes.string.isRequired,
    isYouTube: PropTypes.bool,
    thumbnail: PropTypes.string.isRequired,
    thumbnailHeight: PropTypes.string,
    thumbnailWidth: PropTypes.string,
    videoHeight: PropTypes.string,
    videoId: PropTypes.string.isRequired,
    videoWidth: PropTypes.string
};

module.exports = VideoPreview;
