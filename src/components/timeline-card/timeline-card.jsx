const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const VideoPreview = require('../video-preview/video-preview.jsx');


require('./timeline-card.scss');

const TimelineCard = props => (
    <div className={classNames('timeline-card', props.className)}>
        <a
            href={props.link}
            rel="noreferrer noopener"
            target="_blank"
        >
            <img src="../../images/annual-report/2020/Symbols-UI/Open Link.svg" />
        </a>
        <h5>{props.date}</h5>
        <h4>{props.title}</h4>
        <p>{props.text}</p>
        {props.videoId &&
            <VideoPreview
                buttonMessage=""
                thumbnail={props.image}
                thumbnailWidth="100%"
                videoHeight="216"
                videoId={props.videoId}
                videoWidth="380"
            />
        }
        {!props.videoId &&
            <img
                className="large"
                src={props.image}
            />
        }
        {props.attribution &&
            <p>{props.attribution}</p>
        }
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
    className: PropTypes.string
};

module.exports = TimelineCard;
