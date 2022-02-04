const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');
const MediaQuery = require('react-responsive').default;
const frameless = require('../../lib/frameless');

require('./text-and-media-snippet.scss');

// For left and right mode:
// Regular means text is on the left and media is on the right; reverse means these are swapped.

// For top and bottom mode:
// Regular means text is on top and media is on the bottom; and reverse means these are swapped.

const TextAndMediaSnippet = props => (
    <div className={classNames('text-and-media-snippet', props.className)}>
        <div className="half">
            <h4>{props.title}</h4>
            <p>
                {props.children}
            </p>
        </div>

        <div className="half">
            {props.type === 'video' &&
                <div>
                    <MediaQuery
                        minWidth={frameless.desktop}
                    >
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.largeImage}
                            thumbnailWidth="420"
                            videoHeight={420 * .568}
                            videoId={props.videoId}
                            videoWidth="420"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                    <MediaQuery
                        minWidth={frameless.tabletPortrait}
                        maxWidth={frameless.desktop - 1}
                    >
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.largeImage}
                            thumbnailWidth="620"
                            videoHeight={620 * .568}
                            videoId={props.videoId}
                            videoWidth="620"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                    <MediaQuery
                        minWidth={frameless.mobile}
                        maxWidth={frameless.tabletPortrait - 1}
                    >
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.largeImage}
                            thumbnailWidth="460"
                            videoHeight={460 * .568}
                            videoId={props.videoId}
                            videoWidth="460"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                    <MediaQuery maxWidth={frameless.mobile - 1}>
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.largeImage}
                            thumbnailWidth="300"
                            videoHeight={300 * .568}
                            videoId={props.videoId}
                            videoWidth="300"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                </div>
            }
            {props.type !== 'video' &&
                <img
                    className="large"
                    src={props.largeImage}
                    alt={props.alt}
                />
            }
        </div>
    </div>
);

TextAndMediaSnippet.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    largeImage: PropTypes.string,
    className: PropTypes.string,
    videoId: PropTypes.string,
    type: PropTypes.string,
    alt: PropTypes.string,
    spinnerColor: PropTypes.string
};

module.exports = TextAndMediaSnippet;
