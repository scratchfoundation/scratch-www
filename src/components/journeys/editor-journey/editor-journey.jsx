const React = require('react');
const {driver} = require('driver.js');
const FlexRow = require('../../flex-row/flex-row.jsx');
const Button = require('../../forms/button.jsx');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {useIntl} = require('react-intl');
const {useMemo, useState, useCallback} = require('react');
const PropTypes = require('prop-types');
const {triggerAnalyticsEvent} = require('../../../lib/onboarding.js');

require('./editor-journey.scss');

const STEP_NAMES = [
    'pick-genre-step',
    'game-step',
    'animation-step',
    'music-step',
    'clicker-game-step',
    'pong-game-step',
    'animate-character-step',
    'make-fly-animation-step',
    'record-sound-step',
    'make-music-step'
];

const projectIds = JSON.parse(process.env.ONBOARDING_TEST_PROJECT_IDS);

const tutorialIds = {
    clicker: 'Make-A-Game',
    pong: 'pong',
    animateCharacter: 'Animate-A-Character',
    makeItFly: 'make-it-fly',
    recordSound: 'record-a-sound',
    makeMusic: 'Make-Music'
};

const EditorJourneyDescription = ({title, descriptionData}) => (
    <>
        <div className="title">{title}</div>
        <FlexRow className="description-wrapper">
            {
                descriptionData.map((prop, index) => (
                    <FlexRow
                        key={index}
                        className="journey-option"
                    >
                        <img src={prop.imgSrc} />
                        <Button
                            className={'large'}
                            onClick={prop.handleOnClick}
                        >{prop.text}</Button>
                    </FlexRow>
                ))
            }
        </FlexRow>
    </>
);

const EditorJourney = ({onActivateDeck, setCanViewTutorialsHighlight, setShowJourney}) => {
    const [driverObj] = useState(() => (
        driver()
    ));
    const intl = useIntl();

    const pickStep = useCallback((stepNumber, editorJourneyStep) => {
        triggerAnalyticsEvent({
            event: 'editor-journey-step',
            editorJourneyStep: editorJourneyStep
        });
        driverObj.moveTo(stepNumber);
    }, [driverObj]);

    const createStep = useCallback((projectId, tutorialId) => ({
        title: intl.formatMessage({id: 'project.journey.controls.create'}),
        showButtons: ['close'],
        sectionComponents: {
            description: <EditorJourneyDescription
                title={intl.formatMessage({id: 'project.journey.controls.choose.start'})}
                descriptionData={[
                    {
                        imgSrc: '/images/onboarding-journeys/Tutorials-Icon.svg',
                        text: intl.formatMessage({id: 'project.journey.controls.tutorial'}),
                        handleOnClick: () => {
                            triggerAnalyticsEvent({
                                event: 'editor-journey-step',
                                editorJourneyStep: `${tutorialId}-Open-Tutorial`
                            });
                            onActivateDeck(tutorialId);
                            setShowJourney(false);
                            driverObj.destroy();
                        }
                    },
                    {
                        imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.svg',
                        text: intl.formatMessage({id: 'project.journey.controls.starterProject'}),
                        handleOnClick: () => {
                            location.href = `/projects/${projectId}?showJourney=true`;
                            setShowJourney(false);
                            driverObj.destroy();
                        }
                    },
                    {
                        imgSrc: '/images/onboarding-journeys/On-Own-Icon.svg',
                        text: intl.formatMessage({id: 'project.journey.controls.onMyOwn'}),
                        handleOnClick: () => {
                            triggerAnalyticsEvent({
                                event: 'editor-journey-step',
                                editorJourneyStep: `${tutorialId}-On-My-Own`
                            });
                            setCanViewTutorialsHighlight(true);
                            setShowJourney(false);
                            driverObj.destroy();
                        }
                    }
                ]}
            />
        }
    }), [onActivateDeck, setCanViewTutorialsHighlight, setShowJourney, driverObj, intl]);

    const configProps = useMemo(
        () => ({
            popoverClass: 'gui-journey',
            overlayOpacity: 0,
            onDestroyStarted: () => {
                const stepName = STEP_NAMES[driverObj.getActiveIndex()] || '';
                triggerAnalyticsEvent({
                    event: 'editor-journey-step',
                    editorJourneyStep: `${stepName}-closed`
                });
                driverObj.destroy();
            },
            onDestroyed: () => {
                setShowJourney(false);
            },
            steps: [{
                popover: {
                    title: intl.formatMessage({id: 'project.journey.controls.create'}),
                    showButtons: ['close'],
                    sectionComponents: {
                        description: <EditorJourneyDescription
                            title={intl.formatMessage({id: 'project.journey.controls.choose.projectGenre'})}
                            descriptionData={[
                                {
                                    imgSrc: '/images/onboarding-journeys/Games-Icon.svg',
                                    text: intl.formatMessage({id: 'project.journey.controls.game'}),
                                    handleOnClick: () => pickStep(1, 'Games')
                                },
                                {
                                    imgSrc: '/images/onboarding-journeys/Animation-Icon.svg',
                                    text: intl.formatMessage({id: 'project.journey.controls.animation'}),
                                    handleOnClick: () => pickStep(2, 'Animation')
                                },
                                {
                                    imgSrc: '/images/onboarding-journeys/Music-Icon.svg',
                                    text: intl.formatMessage({id: 'project.journey.controls.music'}),
                                    handleOnClick: () => pickStep(3, 'Music')
                                }
                            ]}
                        />
                    }
                }
            },
            {
                popover: {
                    title: intl.formatMessage({id: 'project.journey.controls.create'}),
                    showButtons: ['close'],
                    sectionComponents: {
                        description: <EditorJourneyDescription
                            title={intl.formatMessage({id: 'project.journey.controls.choose.type'})}
                            descriptionData={[
                                {
                                    imgSrc: '/images/onboarding-journeys/Clicker-Game.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.game.clicker'}),
                                    handleOnClick: () => pickStep(4, 'Clicker-Game')
                                },
                                {
                                    imgSrc: '/images/onboarding-journeys/Pong-Game.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.game.pong'}),
                                    handleOnClick: () => pickStep(5, 'Pong-Game')
                                }
                            ]}
                        />
                    }
                }
            },
            {
                popover: {
                    title: intl.formatMessage({id: 'project.journey.controls.create'}),
                    showButtons: ['close'],
                    sectionComponents: {
                        description: <EditorJourneyDescription
                            title={intl.formatMessage({id: 'project.journey.controls.choose.type'})}
                            descriptionData={[
                                {
                                    imgSrc: '/images/onboarding-journeys/Character-Animation.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.animation.character'}),
                                    handleOnClick: () => pickStep(6, 'Character-Animation')
                                },
                                {
                                    imgSrc: '/images/onboarding-journeys/Fly-Animation.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.animation.fly'}),
                                    handleOnClick: () => pickStep(7, 'Fly-Animation')
                                }
                            ]}
                        />
                    }
                }
            },
            {
                popover: {
                    title: intl.formatMessage({id: 'project.journey.controls.create'}),
                    showButtons: ['close'],
                    sectionComponents: {
                        description: <EditorJourneyDescription
                            title={intl.formatMessage({id: 'project.journey.controls.choose.type'})}
                            descriptionData={[
                                {
                                    imgSrc: '/images/onboarding-journeys/Record-Music.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.music.record'}),
                                    handleOnClick: () => pickStep(8, 'Record-Music')
                                },
                                {
                                    imgSrc: '/images/onboarding-journeys/Make-Music.jpg',
                                    text: intl.formatMessage({id: 'project.journey.controls.music.make'}),
                                    handleOnClick: () => pickStep(9, 'Make-Music')
                                }
                            ]}
                        />
                    }
                }
            },
            {
                popover: createStep(projectIds.clicker, tutorialIds.clicker)
            },
            {
                popover: createStep(projectIds.pong, tutorialIds.pong)
            },
            {
                popover: createStep(projectIds.animateCharacter, tutorialIds.animateCharacter)
            },
            {
                popover: createStep(projectIds.makeItFly, tutorialIds.makeItFly)
            },
            {
                popover: createStep(projectIds.recordSound, tutorialIds.recordSound)
            },
            {
                popover: createStep(projectIds.makeMusic, tutorialIds.makeMusic)
            }]}), [driverObj, intl, createStep, setShowJourney]
    );

    return (
        <DriverJourney
            configProps={configProps}
            driverObj={driverObj}
        />
    );
};

EditorJourneyDescription.propTypes = {
    title: PropTypes.string,
    descriptionData: PropTypes.arrayOf(PropTypes.shape({
        imgSrc: PropTypes.string,
        text: PropTypes.string,
        handleOnClick: PropTypes.func
    }))
};

EditorJourney.propTypes = {
    onActivateDeck: PropTypes.func,
    setCanViewTutorialsHighlight: PropTypes.func,
    setShowJourney: PropTypes.func
};

module.exports = EditorJourney;
