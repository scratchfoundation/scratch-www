const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');

const projects = require('./starter-projects.json');
const {ProjectsCarousel} = require('../../components/projects-carousel/projects-carousel.jsx');
const {useIntl} = require('react-intl');
const Button = require('../../components/forms/button.jsx');
const Video = require('../../components/video/video.jsx');
require('./starter-projects.scss');

const pickProject = () => {
    const projectTypeIndex = Math.floor(Math.random() * projects.length);
    const projectIndex = Math.floor(Math.random() * projects[projectTypeIndex].projects.length);
    const projectId = projects[projectTypeIndex].projects[projectIndex].id;

    location.href = `/projects/${projectId}`;
};

const StarterProjects = () => {
    const intl = useIntl();

    return (
        <div className="starter-projects-page">
            <h2 className="page-header">
                <FormattedMessage id="starterProjects.starterProjects" />
            </h2>
            <section className="think-big">
                <Video
                    autoplay={false}
                    className="whats-scratch-videos"
                    height={null}
                    videoId="16lnn3yfir"
                    width={null}
                />
                <section className="paragraph">
                    <h3><FormattedMessage id="starterProjects.thinkBigStartSmallTitle" /></h3>
                    <p><FormattedMessage id="starterProjects.thinkBigStartSmallBody" /></p>
                </section>
            </section>
            <section className="how-to paragraph">
                <h3><FormattedMessage id="starterProjects.howToUseScratchTitle" /></h3>
                <p><FormattedMessage id="starterProjects.howToUseScratchBody" /></p>
            </section>
            <section className="project-sections">
                {projects.map(projectsSection => (
                    <ProjectsCarousel
                        key={projectsSection.category}
                        className="project-section"
                        title={intl.formatMessage({id: projectsSection.title})}
                        items={projectsSection.projects}
                    />
                ))}
            </section>
            <section className="surprise">
                <Button
                    className="surprise-button"
                    onClick={pickProject}
                >
                    <img src="/images/ideas/try-it-icon.svg" />
                    <FormattedMessage id="starterProjects.surpriseMe" />
                </Button>
            </section>
            <section className="getting-started">
                <img
                    alt={intl.formatMessage({
                        id: 'starterProjects.gettingStartedImageDescription'
                    })}
                    src="/images/ideas/getting-started-illustration.svg"
                />
                <div className="info">
                    <h2>
                        <FormattedMessage id="starterProjects.gettingStarted" />
                    </h2>
                    <p>
                        <FormattedMessage id="starterProjects.newToScratch" />
                    </p>
                    <a href="/projects/editor/?tutorial=getStarted">
                        <Button className="tips-button">
                            <FormattedMessage id="starterProjects.tryIt" />
                        </Button>
                    </a>
                </div>
            </section>
        </div>
    );
};
render(
    <Page showDonorRecognition>
        <StarterProjects />
    </Page>,
    document.getElementById('app')
);
