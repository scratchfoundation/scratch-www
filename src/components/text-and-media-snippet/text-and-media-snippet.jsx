const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');
const MediaQuery = require('react-responsive').default;
const frameless = require('../../lib/frameless');

require('./text-and-media-snippet.scss');

const TextAndMediaSnippet = props => (
    <div className={classNames('text-and-media-snippet', props.className)}>
        {props.className === 'regular' &&
            <div className="half">
                {props.type === 'video' &&
                    <div>
                        <MediaQuery
                            minWidth={frameless.mobile}
                        >
                            <VideoPreview
                                buttonMessage=""
                                thumbnail={props.largeImage}
                                thumbnailWidth="430"
                                videoHeight={430 * .568}
                                videoId={props.videoId}
                                videoWidth="430"
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
        }
        <div className="half">
            <h5>{props.title}</h5>
            <p>
                {props.children}
            </p>
        </div>
        {props.className === 'reverse' &&
            <div className="half">
                <img
                    className="large"
                    src={props.largeImage}
                    alt={props.alt}
                />
            </div>
        }
        {props.className === 'full-width' &&
            <div className="half">
                <img
                    className="large"
                    src={props.largeImage}
                    alt={props.alt}
                />
            </div>
        }
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
