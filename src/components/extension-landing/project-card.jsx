const PropTypes = require('prop-types');
const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;

const ProjectCard = props => (
    <div className="project-card">
        <a
            href={props.cardUrl}
            rel="noopener noreferrer"
            target="_blank"
        >
            <div className="project-card-image">
                <img
                    alt={props.imageAlt}
                    src={props.imageSrc}
                />
            </div>
            <div className="project-card-info">
                <h4>{props.title}</h4>
                <p>{props.description}</p>
            </div>
            {props.projectURL && (
                <div className="project-card-download-button">
                    <a href={props.projectURL}>
                        <FormattedMessage id="general.downloadButton" />
                    </a>
                </div>
            )}
        </a>
    </div>

);

ProjectCard.propTypes = {
    cardUrl: PropTypes.string,
    description: PropTypes.string,
    imageAlt: PropTypes.string,
    imageSrc: PropTypes.string,
    projectURL: PropTypes.string,
    title: PropTypes.string
};

module.exports = ProjectCard;
