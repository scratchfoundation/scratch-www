const React = require('react');
const {useState, useEffect, isValidElement} = require('react');
const {createPortal} = require('react-dom');
const PropTypes = require('prop-types');
require('driver.js/dist/driver.css');

const DriverJourney = ({configProps, driverObj}) => {
    const [renderState, setRenderState] = useState();

    useEffect(() => {
        const {steps, ...restConfig} = configProps;
        const driverSteps = steps.map((step, index) => {
            const {sectionComponents = {}, callback, ...popoverProps} = step.popover;
            return {
                ...step,
                popover: {
                    ...popoverProps,
                    onPopoverRender: popover => {
                        if (callback) {
                            callback();
                        }
                        const portalData = [];

                        const closeButton = document.getElementsByClassName('driver-popover-close-btn')[0];
                        if (closeButton) {
                            closeButton.textContent = '';

                            const closeButtonImage = document.createElement('img');
                            closeButtonImage.src = '/svgs/modal/close-x.svg';
                            closeButtonImage.className = 'close-btn-img';

                            closeButton.appendChild(closeButtonImage);
                            closeButton.addEventListener('click', () => driverObj.destroy());
                        }
                        
                        for (const [section, component] of Object.entries(
                            sectionComponents
                        )) {
                            if (isValidElement(component)) {
                                popover[section].style.display = 'block';
                                popover[section].innerHTML = '';
                                portalData.push({
                                    parentElement: popover[section],
                                    childElement: component
                                });
                            }
                        }

                        setRenderState({components: portalData, stepIndex: index});
                    }
                }
            };
        });

        driverObj.setConfig({...restConfig, steps: driverSteps});

        driverObj.drive();
    }, [driverObj, configProps]);

    if (!renderState) return null;
    if (!configProps.steps[renderState.stepIndex]) return null;

    return (
        <>
            {renderState.components.map(obj =>
                createPortal(obj.childElement, obj.parentElement)
            )}
        </>
    );
};

DriverJourney.propTypes = {
    configProps: PropTypes.shape({
        steps: PropTypes.arrayOf(PropTypes.object)
    }),
    driverObj: PropTypes.shape({
        setConfig: PropTypes.func,
        drive: PropTypes.func,
        destroy: PropTypes.func
    })
};

module.exports = DriverJourney;
