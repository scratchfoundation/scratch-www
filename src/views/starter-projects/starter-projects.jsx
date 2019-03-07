const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const Carousel = require('../../components/carousel/carousel.jsx');
const Box = require('../../components/box/box.jsx');

const projects = require('./starter-projects.json');
require('./starter-projects.scss');

require('./starter-projects.scss');

const StarterProjects = props => (
    <div className="inner starter-projects">
        <h1><FormattedMessage id="starterProjects.starterProjects" /></h1>
        <p><FormattedMessage id="starterProjects.intro" /></p>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.animation'})}
        >
            <Carousel items={projects.animation} />
        </Box>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.games'})}
        >
            <Carousel items={projects.games} />
        </Box>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.interactiveArt'})}
        >
            <Carousel items={projects.interactiveArt} />
        </Box>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.musicDance'})}
        >
            <Carousel items={projects.musicDance} />
        </Box>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.stories'})}
        >
            <Carousel items={projects.stories} />
        </Box>
        <Box
            title={props.intl.formatMessage({id: 'starterProjects.video'})}
        >
            <Carousel items={projects.video} />
        </Box>
    </div>
);

StarterProjects.propTypes = {
    intl: intlShape
};

const WrappedStarterProjects = injectIntl(StarterProjects);
render(<Page><WrappedStarterProjects /></Page>, document.getElementById('app'));
