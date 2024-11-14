const React = require('react');
const {driver} = require('driver.js');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {useIntl} = require('react-intl');
const {useState} = require('react');
const PropTypes = require('prop-types');
require('../common-journey.scss');

const ProjectJourney = ({setCanViewProjectJourney, setShouldStopProject}) => {
    const [driverObj] = useState(() => (
        driver()
    ));
    
    const intl = useIntl();

    const steps = [{
        element: 'div[class^="stage_green-flag-overlay-wrapper"] > div',
        popover: {
            callback: () => {
                const greenFlagButton = document.querySelector('div[class^="stage_green-flag-overlay-wrapper"] > div');
                greenFlagButton.addEventListener('click', () => {
                    setCanViewProjectJourney(false);
                    driverObj.destroy();
                    setTimeout(() => {
                        setShouldStopProject(true);
                        driverObj.drive(1);
                    }, 8000);
                });
            },
            description: intl.formatMessage({id: 'project.journey.play'})
        }
    },
    {
        element: '.remix-button',
        popover: {
            callback: () => {
                const remixButton = document.querySelector('.remix-button');
                remixButton.addEventListener('click', () => {
                    setCanViewProjectJourney(false);
                    driverObj.destroy();
                });
            },
            description: intl.formatMessage({id: 'project.journey.remix'})
        }
    }];

    return (
        <DriverJourney
            configProps={{
                popoverClass: 'project-journey',
                showButtons: [
                    'close'
                ],
                onDestroyed: () => {
                    setCanViewProjectJourney(false);
                },
                showProgress: false,
                steps: steps
            }}
            driverObj={driverObj}
        />
    );
};

ProjectJourney.propTypes = {
    setCanViewProjectJourney: PropTypes.func,
    setShouldStopProject: PropTypes.func
};

module.exports = ProjectJourney;
