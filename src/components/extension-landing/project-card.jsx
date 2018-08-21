const PropTypes = require('prop-types');
const React = require('react');

const ProjectCard = props => (
    <a
        className="project-card"
        href={props.cardUrl}
        target="_blank"
    >
        <div className="project-card-image">
            <img src={props.imageSrc} />
        </div>
        <div className="project-card-info">
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    </a>
);

ProjectCard.propTypes = {
    cardUrl: PropTypes.string,
    description: PropTypes.string,
    imageSrc: PropTypes.string,
    title: PropTypes.string
};

module.exports = ProjectCard;
