const PropTypes = require('prop-types');
const React = require('react');
const classNames = require('classnames');

require('./video.scss');

const Video = props => (
    <div className={classNames('video-player', props.className)}>
        <iframe
            allowFullScreen
            // allowFullScreen is legacy, can we start using allow='fullscreen'?
            // allow="fullscreen"
            frameBorder="0" // deprecated attribute
            height={props.height}
            scrolling="no" // deprecated attribute
            src={`https://fast.wistia.net/embed/iframe/${props.videoId}?seo=false&videoFoam=true`}
            title={props.title}
            width={props.width}
        />
        <script
            async
            src="https://fast.wistia.net/assets/external/E-v1.js"
        />
    </div>
);
Video.defaultProps = {
    height: '225',
    title: '',
    width: '400'
};

Video.propTypes = {
    className: PropTypes.string,
    height: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoId: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired
};

module.exports = Video;
