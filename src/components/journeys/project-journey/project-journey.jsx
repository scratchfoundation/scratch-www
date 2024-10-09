const React = require('react');
const {driver} = require('driver.js');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {defineMessages, useIntl} = require('react-intl');
require('./project-journey.scss');

const messages = defineMessages({
    playProject: {
        id: 'project.journey.play',
        defaultMessage: 'Click green flag to play',
        description: 'Play project'
    },
    remixProject: {
        id: 'project.journey.remix',
        defaultMessage: 'Make your own version!',
        description: 'Remix project'
    }
});

const ProjectJourney = () => {
    const [driverObj] = React.useState(() => (
        driver()
    ));
    
    const intl = useIntl();

    const steps = [{
        element: 'div[class^="stage_green-flag-overlay-wrapper"] > div',
        popover: {
            description: intl.formatMessage(messages.playProject)
        }
    },
    {
        element: '.remix-button',
        popover: {
            description: intl.formatMessage(messages.remixProject)
        }
    }];

    return (
        <DriverJourney
            configProps={{
                popoverClass: 'project-journey',
                showButtons: [
                    'next',
                    'previous'
                ],
                nextBtnText: 'Next',
                prevBtnText: 'Previous',
                showProgress: false,
                steps: steps
            }}
            driverObj={driverObj}
        />
    );
};

module.exports = ProjectJourney;
