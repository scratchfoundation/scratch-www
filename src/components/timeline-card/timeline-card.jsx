const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');
const frameless = require('../../lib/frameless.js');
const MediaQuery = require('react-responsive').default;


require('./timeline-card.scss');

const TimelineCard = props => (
    <div className={classNames('timeline-card', props.className)}>
        <div className="timeline-content">
            <a
                href={props.link}
                rel="noreferrer noopener"
                target="_blank"
            >
                <img
                    src="../../images/annual-report/2020/Symbols-UI/Open Link.svg"
                    alt="open link"
                />
            </a>
            <h5>{props.date}</h5>
            <h4>{props.title}</h4>
            <p>{props.text}</p>
            {props.videoId &&
                <div>
                    <MediaQuery minWidth={frameless.mobile}>
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.image}
                            thumbnailWidth="100%"
                            videoHeight={430 * .565}
                            videoId={props.videoId}
                            videoWidth="430"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                    <MediaQuery maxWidth={frameless.mobile - 1}>
                        <VideoPreview
                            buttonMessage=""
                            thumbnail={props.image}
                            thumbnailWidth="100%"
                            videoHeight={270 * .565}
                            videoId={props.videoId}
                            videoWidth="270"
                            alt={props.alt}
                            spinnerColor={props.spinnerColor}
                        />
                    </MediaQuery>
                </div>
            }
            {!props.videoId && props.image &&
                <img
                    className="large"
                    src={props.image}
                    alt={props.alt}
                />
            }
            {props.attribution &&
                <p>{props.projectBy} {props.attribution}</p>
            }
        </div>
    </div>
);

TimelineCard.propTypes = {
    link: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    image: PropTypes.string,
    videoId: PropTypes.string,
    attribution: PropTypes.string,
    className: PropTypes.string,
    alt: PropTypes.string,
    projectBy: PropTypes.string,
    spinnerColor: PropTypes.string
};

module.exports = TimelineCard;
