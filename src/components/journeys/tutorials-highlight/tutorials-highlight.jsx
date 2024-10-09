const React = require('react');
const {driver} = require('driver.js');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {defineMessages, useIntl} = require('react-intl');
require('./tutorials-highlight.scss');

const messages = defineMessages({
    tutorialsHighlight: {
        id: 'gui.highlight.tutorials',
        defaultMessage: 'Click here for tutorials',
        description: 'Tutorials highlight'
    }
});

const TutorialsHighlight = () => {
    const [driverObj] = React.useState(() => (
        driver()
    ));
    
    const intl = useIntl();

    const steps = [{
        element: '.tutorials-button',
        popover: {
            showButtons: ['close'],
            side: 'bottom',
            description: intl.formatMessage(messages.tutorialsHighlight)
        }
    }];

    return (
        <DriverJourney
            configProps={{
                popoverClass: 'tutorials-highlight',
                showProgress: false,
                overlayOpacity: 0,
                steps: steps
            }}
            driverObj={driverObj}
        />
    );
};

module.exports = TutorialsHighlight;
