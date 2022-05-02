const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

require('./video-youtube.scss');

// eslint-disable-next-line react/prefer-stateless-function
class VideoYoutube extends React.Component {

    render () {
        return (
            <div className={classNames('video-player', this.props.className)}>
                <iframe
                    allowFullScreen
                    className="wistia_embed"
                    frameBorder="0" // deprecated attribute
                    height={this.props.height}
                    scrolling="no" // deprecated attribute
                    src={`https://www.youtube.com/embed/${this.props.videoId}?autoplay=1`}
                    title={this.props.title}
                    width={this.props.width}
                />
            </div>
        );
    }
}

VideoYoutube.defaultProps = {
    height: '225',
    title: '',
    width: '400'
};

VideoYoutube.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

module.exports = VideoYoutube;
