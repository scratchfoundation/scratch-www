const React = require('react');
const {driver} = require('driver.js');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {defineMessages, useIntl} = require('react-intl');
const PropTypes = require('prop-types');
const {useState} = require('react');
require('./tutorials-highlight.scss');

const messages = defineMessages({
    tutorialsHighlight: {
        id: 'gui.highlight.tutorials',
        defaultMessage: 'Click here for tutorials',
        description: 'Tutorials highlight'
    }
});

const TutorialsHighlight = ({setCanViewTutorialsHighlight}) => {
    const [driverObj] = useState(() => (
        driver()
    ));
    
    const intl = useIntl();

    const steps = [{
        element: '.tutorials-button',
        popover: {
            showButtons: ['close'],
            callback: () => {
                const tutorialsButton = document.querySelector('.tutorials-button');
                tutorialsButton.addEventListener('click', () => {
                    setCanViewTutorialsHighlight(false);
                    driverObj.destroy();
                });
            },
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
                onDestroyed: () => {
                    setCanViewTutorialsHighlight(false);
                },
                steps: steps
            }}
            driverObj={driverObj}
        />
    );
};

TutorialsHighlight.propTypes = {
    setCanViewTutorialsHighlight: PropTypes.func
};

module.exports = TutorialsHighlight;
