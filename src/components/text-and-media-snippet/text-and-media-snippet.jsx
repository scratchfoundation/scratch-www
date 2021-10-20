const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');

require('./text-and-media-snippet.scss');

const TextAndMediaSnippet = props => (
    <div className={classNames('annual-report-example', props.className)}>
        {props.className === 'regular' &&
            <div className="half">
                {props.type === 'video' &&
                    <VideoPreview
                        buttonMessage=""
                        thumbnail={props.large_image}
                        thumbnailWidth="300"
                        videoHeight="216"
                        videoId={props.video_id}
                        videoWidth="380"
                        alt={props.alt}
                    />
                }
                {props.type !== 'video' &&
                    <img
                        className="large"
                        src={props.large_image}
                        alt={props.alt}
                    />
                }
            </div>
        }
        <div className="half">
            <h5>{props.title}</h5>
            <p>{props.paragraph}</p>
        </div>
        {props.className === 'reverse' &&
            <div className="half">
                <img
                    className="large"
                    src={props.large_image}
                    alt={props.alt}
                />
            </div>
        }
        {props.className === 'full-width' &&
            <div className="half">
                <img
                    className="large"
                    src={props.large_image}
                    alt={props.alt}
                />
            </div>
        }
    </div>
);

TextAndMediaSnippet.propTypes = {
    title: PropTypes.string,
    paragraph: PropTypes.string,
    large_image: PropTypes.string,
    className: PropTypes.string,
    video_id: PropTypes.string,
    type: PropTypes.string,
    alt: PropTypes.string
};

module.exports = TextAndMediaSnippet;
