const PropTypes = require('prop-types');
const React = require('react');

const ProjectCard = props => (
    <a
        download
        className="project-card"
        href={props.cardUrl}
    >
        <div className="project-card-image">
            <img src={props.imageUrl} />
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
    imageUrl: PropTypes.string,
    title: PropTypes.string
};

module.exports = ProjectCard;
