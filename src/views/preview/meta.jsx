const React = require('react');
const Helmet = require('react-helmet').default;

const projectShape = require('./projectshape.jsx').projectShape;

const Meta = props => {
    const {id, title, instructions, author} = props.projectInfo;

    // Do not want to render any meta tags unless all the info is loaded
    // Check only author (object) because it is ok to have empty string instructions
    if (!author) return null;

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
                rel="canonical"
                href={`https://scratch.mit.edu/projects/${id}`}
            />
        </Helmet>
    );
};

Meta.propTypes = {
    projectInfo: projectShape
};

module.exports = Meta;
