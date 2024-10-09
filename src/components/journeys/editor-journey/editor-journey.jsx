const React = require('react');
const {driver} = require('driver.js');
const FlexRow = require('../../flex-row/flex-row.jsx');
const Button = require('../../forms/button.jsx');
const DriverJourney = require('../driver-journey/driver-journey.jsx');
const {defineMessages, useIntl} = require('react-intl');
const {useMemo, useState} = require('react');
const PropTypes = require('prop-types');

require('./editor-journey.scss');

const messages = defineMessages({
    createTitle: {
        id: 'gui.journey.controls.create',
        defaultMessage: 'Create',
        description: 'Create modal title'
    },
    projectGenreTitle: {
        id: 'gui.journey.controls.choose.projectGenre',
        defaultMessage: 'What do you whant to create?',
        description: 'Choose project genre modal title'
    },
    typeTitle: {
        id: 'gui.journey.controls.choose.type',
        defaultMessage: 'Which type?',
        description: 'Choose project type modal title'
    },
    startTitle: {
        id: 'gui.journey.controls.choose.start',
        defaultMessage: 'How do you want to start?',
        description: 'Choose way to start modal title'
    },
    gameTitle: {
        id: 'gui.journey.controls.game',
        defaultMessage: 'Game',
        description: 'Game button title'
    },
    animiationTitle: {
        id: 'gui.journey.controls.animation',
        defaultMessage: 'Animation',
        description: 'Animation button title'
    },
    musicTitle: {
        id: 'gui.journey.controls.music',
        defaultMessage: 'Music',
        description: 'Music button title'
    },
    clickerGameTitle: {
        id: 'gui.journey.controls.game.clicker',
        defaultMessage: 'Clicker Game',
        description: 'Clicker game button title'
    },
    pongGameTitle: {
        id: 'gui.journey.controls.game.pong',
        defaultMessage: 'Pong Game',
        description: 'Pong game button title'
    },
    characterAnimationTitle: {
        id: 'gui.journey.controls.animation.character',
        defaultMessage: 'Animate a character',
        description: 'Animate a character button title'
    },
    flyAnimationTitle: {
        id: 'gui.journey.controls.animation.fly',
        defaultMessage: 'Make it fly',
        description: 'Make it fly animation button title'
    },
    recordSoundTitle: {
        id: 'gui.journey.controls.music.record',
        defaultMessage: 'Record a sound',
        description: 'Record a sound button title'
    },
    makeMusicTitle: {
        id: 'gui.journey.controls.music.make',
        defaultMessage: 'Make music',
        description: 'Make music button title'
    },
    tutorialTitle: {
        id: 'gui.journey.controls.tutorial',
        defaultMessage: 'Tutorial',
        description: 'Tutorial button title'
    },
    starterProjectTitle: {
        id: 'gui.journey.controls.starterProject',
        defaultMessage: 'Starter project',
        description: 'Starter project button title'
    },
    onMyOwnTitle: {
        id: 'gui.journey.controls.onMyOwn',
        defaultMessage: 'On my own',
        description: 'On my own button title'
    }
});

const projects = {
    clicker: '10128368',
    pong: '10128515',
    animateCharacter: '10128067',
    makeItFly: '114019829',
    recordSound: '1031325137',
    makeMusic: '10012676'
};

const tutorialIds = {
    clicker: {
        id: 'Make-A-Game',
        urlId: 'clicker-game'
    },
    pong: {
        id: 'pong',
        urlId: 'pong'
    },
    animateCharacter: {
        id: 'Animate-A-Character',
        urlId: 'animate-a-character'
    },
    makeItFly: {
        id: 'make-it-fly',
        urlId: 'make-it-fly'
    },
    recordSound: {
        id: 'record-a-sound',
        urlId: 'record-a-sound'
    },
    makeMusic: {
        id: 'Make-Music',
        urlId: 'music'
    }
};

const redirectToProject = projectId => {
    location.href = `/projects/${projectId}?showJourney=true`;
};

const openTutorial = (onActivateDeck, tutorial, driverObj) => {
    history.pushState({}, {}, `?tutorial=${tutorial.urlId}`);
    onActivateDeck(tutorial.id);
    driverObj.destroy();
};

const ownOptingPicked = (setIsOnOwnOptionPicked, driverObg) => {
    setIsOnOwnOptionPicked(true);
    driverObg.destroy();
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

const EditorJourney = ({onActivateDeck, setIsOnOwnOptionPicked}) => {
    const [driverObj] = useState(() => (
        driver()
    ));
    const intl = useIntl();

    const steps = useMemo(
        () => [{
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.projectGenreTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Games-Icon.png',
                                text: intl.formatMessage(messages.gameTitle),
                                handleOnClick: () => driverObj.moveTo(1)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Animation-Icon.png',
                                text: intl.formatMessage(messages.animiationTitle),
                                handleOnClick: () => driverObj.moveTo(2)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Music-Icon.png',
                                text: intl.formatMessage(messages.musicTitle),
                                handleOnClick: () => driverObj.moveTo(3)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.typeTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Clicker-Game.jpg',
                                text: intl.formatMessage(messages.clickerGameTitle),
                                handleOnClick: () => driverObj.moveTo(4)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Pong-Game.jpg',
                                text: intl.formatMessage(messages.pongGameTitle),
                                handleOnClick: () => driverObj.moveTo(5)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.typeTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Character-Animation.jpg',
                                text: intl.formatMessage(messages.characterAnimationTitle),
                                handleOnClick: () => driverObj.moveTo(6)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Fly-Animation.jpg',
                                text: intl.formatMessage(messages.flyAnimationTitle),
                                handleOnClick: () => driverObj.moveTo(7)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.typeTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Record-Music.jpg',
                                text: intl.formatMessage(messages.recordSoundTitle),
                                handleOnClick: () => driverObj.moveTo(8)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Make-Music.jpg',
                                text: intl.formatMessage(messages.makeMusicTitle),
                                handleOnClick: () => driverObj.moveTo(9)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () => openTutorial(onActivateDeck, tutorialIds.clicker, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.clicker)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () => openTutorial(onActivateDeck, tutorialIds.pong, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.pong)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () =>
                                    openTutorial(onActivateDeck, tutorialIds.animateCharacter, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.animateCharacter)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () => openTutorial(onActivateDeck, tutorialIds.makeItFly, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.makeItFly)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () => openTutorial(onActivateDeck, tutorialIds.recordSound, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.recordSound)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        },
        {
            popover: {
                title: intl.formatMessage(messages.createTitle),
                showButtons: ['close'],
                sectionComponents: {
                    description: <EditorJourneyDescription
                        title={intl.formatMessage(messages.startTitle)}
                        descriptionData={[
                            {
                                imgSrc: '/images/onboarding-journeys/Tutorials-Icon.png',
                                text: intl.formatMessage(messages.tutorialTitle),
                                handleOnClick: () => openTutorial(onActivateDeck, tutorialIds.makeMusic, driverObj)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/Starter-Projects-Icon.png',
                                text: intl.formatMessage(messages.starterProjectTitle),
                                handleOnClick: () => redirectToProject(projects.makeMusic)
                            },
                            {
                                imgSrc: '/images/onboarding-journeys/On-Own-Icon.png',
                                text: intl.formatMessage(messages.onMyOwnTitle),
                                handleOnClick: () => ownOptingPicked(setIsOnOwnOptionPicked, driverObj)
                            }
                        ]}
                    />
                }
            }
        }], [onActivateDeck, setIsOnOwnOptionPicked]
    );

    return (
        <DriverJourney
            configProps={{
                popoverClass: 'gui-journey',
                overlayOpacity: 0,
                steps: steps
            }}
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
    setIsOnOwnOptionPicked: PropTypes.func
};

module.exports = EditorJourney;
