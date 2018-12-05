const PropTypes = require('prop-types');
const React = require('react');

require('./extension-landing.scss');

const ExtensionVideo = props => (
    <div className="video-player">
        <iframe
            allowFullScreen
            allowTransparency="true"
            frameBorder="0"
            height="180"
            scrolling="no"
            src={`https://fast.wistia.net/embed/iframe/${props.videoId}?seo=false&videoFoam=true`}
            title="📹"
            width="320"
        />
        <script
            async
            src="https://fast.wistia.net/assets/external/E-v1.js"
        />
    </div>
);

ExtensionVideo.propTypes = {
    videoId: PropTypes.string
};

module.exports = ExtensionVideo;
