const PropTypes = require('prop-types');
const React = require('react');

const HardwareCard = props => (
    <a
        className="hardware-card short"
        href={props.cardUrl}
        rel="noopener noreferrer"
        target="_blank"
    >
        <div className="hardware-card-image">
            <img
                alt={props.imageAlt}
                src={props.imageSrc}
            />
        </div>
        <div className="hardware-card-info">
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    </a>
);

HardwareCard.propTypes = {
    cardUrl: PropTypes.string,
    description: PropTypes.string,
    imageAlt: PropTypes.string,
    imageSrc: PropTypes.string,
    title: PropTypes.string
};

module.exports = HardwareCard;
