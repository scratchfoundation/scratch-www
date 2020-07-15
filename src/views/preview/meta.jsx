const React = require('react');
const Helmet = require('react-helmet').default;
const PropTypes = require('prop-types');

const projectShape = require('./projectshape.jsx').projectShape;

const Meta = props => {
    const {id, title, instructions, author} = props.projectInfo;

    if (!author) {
        // Project info is not ready. It's either fetching state, or logged-out users creating project.
        if (!props.userPresent) {
            return (
                <Helmet>
                    <title>Scratch - Imagine, Program, Share</title>
                </Helmet>
            );
        }
        return null;
    }

    const truncatedInstructions = instructions.split(' ')
        .slice(0, 50)
        .join(' ');

    return (
        <Helmet>
            <title>{`${title} on Scratch`}</title>
            <meta
                content={`${title} on Scratch by ${author.username}`}
                name="description"
            />
            <meta
                content={`Scratch - ${title}`}
                property="og:title"
            />
            <meta
                content={truncatedInstructions}
                property="og:description"
            />
            <link
                href={`https://scratch.mit.edu/projects/${id}`}
                rel="canonical"
            />
        </Helmet>
    );
};

Meta.propTypes = {
    projectInfo: projectShape,
    userPresent: PropTypes.bool
};

module.exports = Meta;
