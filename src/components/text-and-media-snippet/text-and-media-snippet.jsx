const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');

require('./text-and-media-snippet.scss');

const TextAndMediaSnippet = props => (
    <div className={classNames('text-and-media-snippet', props.className)}>
        {props.className === 'regular' &&
            <div className="half">
                {props.type === 'video' &&
                    <VideoPreview
                        buttonMessage=""
                        thumbnail={props.largeImage}
                        thumbnailWidth="300"
                        videoHeight="216"
                        videoId={props.videoId}
                        videoWidth="380"
                        alt={props.alt}
                        spinnerColor={props.spinnerColor}
                    />
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
            {props.children &&
                <p>
                    {props.children}
                </p>
            }
            {props.paragraph &&
                <p>
                    {props.paragraph}
                </p>
            }
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
    paragraph: PropTypes.string,
    largeImage: PropTypes.string,
    className: PropTypes.string,
    videoId: PropTypes.string,
    type: PropTypes.string,
    alt: PropTypes.string,
    spinnerColor: PropTypes.string
};

module.exports = TextAndMediaSnippet;
