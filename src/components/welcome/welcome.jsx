const PropTypes = require('prop-types');
const React = require('react');
const {shouldDisplayOnboarding} = require('../../lib/onboarding.js');

const Box = require('../box/box.jsx');

require('./welcome.scss');

const Welcome = ({
    messages = {
        'welcome.welcomeToScratch': 'Welcome to Scratch!',
        'welcome.explore': 'Explore Starter Projects',
        'welcome.exploreAlt': 'Starter Projects',
        'welcome.community': 'Learn about the community',
        'welcome.communityAlt': 'Community Guidelines',
        'welcome.create': 'Create a Project',
        'welcome.createAlt': 'Get Started'
    },
    onDismiss,
    permissions,
    user
}) => (
    <Box
        className="welcome"
        moreHref="#"
        moreProps={{
            className: 'close',
            title: 'Dismiss',
            onClick: onDismiss
        }}
        moreTitle="x"
        title={messages['welcome.welcomeToScratch']}
    >
        <div className="welcome-options">
            <a
                id="welcome.explore"
                className="welcome-option-button"
                href="/starter-projects"
            >
                {messages['welcome.explore']}
                <img
                    alt={messages['welcome.exploreAlt']}
                    src="/images/explore_starter_projects.svg"
                />
            </a>
            <a
                id="welcome.community"
                className="welcome-option-button"
                href="/community_guidelines"
            >
                {messages['welcome.community']}
                <img
                    alt={messages['welcome.communityAlt']}
                    src="/images/learn_about_the_community.svg"
                />
            </a>
            <a
                id="welcome.create"
                className="welcome-option-button"
                href={
                    shouldDisplayOnboarding(user, permissions) ?
                        '/projects/editor/' :
                        '/projects/editor/?tutorial=getStarted'
                }
            >
                {messages['welcome.create']}
                <img
                    alt={messages['welcome.createAlt']}
                    src="/images/create_a_project.svg"
                />
            </a>
        </div>
    </Box>
);

Welcome.propTypes = {
    messages: PropTypes.shape({
        'welcome.welcomeToScratch': PropTypes.string,
        'welcome.explore': PropTypes.string,
        'welcome.exploreAlt': PropTypes.string,
        'welcome.community': PropTypes.string,
        'welcome.communityAlt': PropTypes.string,
        'welcome.create': PropTypes.string,
        'welcome.createAlt': PropTypes.string
    }),
    onDismiss: PropTypes.func,
    permissions: PropTypes.object,
    user: PropTypes.object
};

module.exports = Welcome;
