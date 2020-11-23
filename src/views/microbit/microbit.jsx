const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../components/os-chooser/os-chooser.jsx');
const {isDownloaded, isFromGooglePlay} = require('../../components/install-scratch/install-util.js');

const ExtensionLanding = require('../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../components/extension-landing/extension-header.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const InstallScratch = require('../../components/install-scratch/install-scratch.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');
const Button = require('../../components/forms/button.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const OS_ENUM = require('../../lib/os-enum.js');

require('../../components/extension-landing/extension-landing.scss');
require('./microbit.scss');

class MicroBit extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing microbit">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="extension-copy">
                            <h1><img
                                alt=""
                                src="/images/microbit/microbit.svg"
                            />micro:bit</h1>
                            <FormattedMessage
                                id="microbit.headerText"
                                values={{
                                    microbitLink: (
                                        <a
                                            href="http://microbit.org/"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            micro:bit
                                        </a>
                                    )
                                }}
                            />
                        </FlexRow>
                    }
                    renderImage={<img
                        alt={this.props.intl.formatMessage({id: 'microbit.imgAltMicrobitIllustration'})}
                        src="/images/microbit/microbit-heart.png"
                    />}
                    renderRequirements={
                        <ExtensionRequirements bluetoothStandard />
                    }
                />
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                {(isDownloaded(this.state.OS)) && (
                    <InstallScratchLink
                        currentOS={this.state.OS}
                    />
                )}
                {(isFromGooglePlay(this.state.OS)) && (
                    <InstallScratch
                        currentOS={this.state.OS}
                    />
                )}
                <ExtensionSection className="getting-started">
                    <h2><FormattedMessage id="microbit.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="microbit.installMicrobitHex" /></h3>
                        {this.state.OS !== OS_ENUM.ANDROID && (
                            <Steps>
                                <Step number={1}>
                                    <div className="step-image">
                                        <img
                                            alt=""
                                            src="/images/microbit/mbit-usb.png"
                                        />
                                    </div>
                                    <p>
                                        <FormattedMessage id="microbit.connectUSB" />
                                    </p>
                                </Step>
                                <Step number={2}>
                                    <div className="step-image">
                                        <img
                                            alt=""
                                            src="/images/microbit/mbit-hex-download.png"
                                        />
                                    </div>
                                    <a
                                        download
                                        className="download"
                                        href="https://downloads.scratch.mit.edu/microbit/scratch-microbit.hex.zip"
                                    >
                                        <FormattedMessage id="microbit.downloadHex" />
                                    </a>
                                </Step>
                                <Step number={3}>
                                    {this.state.OS === OS_ENUM.WINDOWS && (
                                        <div className="step-image">
                                            <img
                                                alt={this.props.intl.formatMessage({id: 'microbit.imgAltDragDropHex'})}
                                                src="/images/microbit/win-copy-hex.png"
                                            />
                                        </div>
                                    )}
                                    {this.state.OS === OS_ENUM.MACOS && (
                                        <div className="step-image">
                                            <img
                                                alt={this.props.intl.formatMessage({id: 'microbit.imgAltDragDropHex'})}
                                                src="/images/microbit/mac-copy-hex.png"
                                            />
                                        </div>
                                    )}
                                    {this.state.OS === OS_ENUM.CHROMEOS && (
                                        <div className="step-image">
                                            <img
                                                alt={this.props.intl.formatMessage({id: 'microbit.imgAltDragDropHex'})}
                                                src="/images/microbit/chromeos-copy-hex.png"
                                            />
                                        </div>
                                    )}
                                    <p>
                                        <FormattedMessage id="microbit.dragDropHex" />
                                    </p>
                                </Step>
                            </Steps>
                        )}
                        {this.state.OS === OS_ENUM.ANDROID && (
                            <Steps>
                                <Step>
                                    <p>
                                        <FormattedMessage id="microbit.installHexAndroid" />
                                    </p>
                                </Step>
                            </Steps>
                        )}

                    </FlexRow>
                    <hr />
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="microbit.connectingMicrobit" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        src="/images/microbit/mbit-connect-1.png"
                                    />
                                </div>
                                <p><FormattedMessage id="microbit.powerMicrobit" /></p>
                            </Step>
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src="/images/microbit/mbit-connect-2.png"
                                    />
                                </div>
                                <p>
                                    {isDownloaded(this.state.OS) && (
                                        <FormattedMessage
                                            id="microbit.useScratch3"
                                            values={{
                                                scratch3Link: (
                                                    <a
                                                        href="/projects/editor/"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        Scratch
                                                    </a>
                                                )
                                            }}
                                        />
                                    )}
                                    {isFromGooglePlay(this.state.OS) && (
                                        <FormattedMessage id="installScratch.useScratchApp" />
                                    )}
                                </p>
                            </Step>
                            <Step number={3}>
                                <div className="step-image">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'extensionInstallation.addExtension'})}
                                        className="screenshot"
                                        src="/images/microbit/mbit-connect-3.png"
                                    />
                                </div>
                                <p><FormattedMessage id="microbit.addExtension" /></p>
                            </Step>
                        </Steps>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="microbit.thingsToTry" /></h2>
                    <h3><FormattedMessage id="microbit.displayHelloTitle" /></h3>
                    <Steps className="display-hello">
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="microbit.displayHelloBlock"
                                    values={{
                                        displayHelloText: (
                                            <strong>
                                                <FormattedMessage id="microbit.displayHelloText" />
                                            </strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/microbit/display-hello-block.png"
                                />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="microbit.helloScroll"
                                    values={{
                                        helloText: (
                                            <strong><FormattedMessage id="microbit.helloText" /></strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'microbit.imgAltDisplayH'})}
                                    src="/images/microbit/mbit-display-h.png"
                                />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="microbit.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="/projects/239075756/editor"
                            description={this.props.intl.formatMessage({id: 'microbit.heartBeatDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'microbit.imgAltHeartBeat'})}
                            imageSrc="/images/microbit/starter-heart.png"
                            title={this.props.intl.formatMessage({id: 'microbit.heartBeat'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/239075950/editor"
                            description={this.props.intl.formatMessage({id: 'microbit.tiltGuitarDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'microbit.imgAltTiltGuitar'})}
                            imageSrc="/images/microbit/starter-guitar.png"
                            title={this.props.intl.formatMessage({id: 'microbit.tiltGuitar'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/239075973/editor"
                            description={this.props.intl.formatMessage({id: 'microbit.oceanAdventureDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'microbit.imgAltOceanAdventure'})}
                            imageSrc="/images/microbit/starter-fish.png"
                            title={this.props.intl.formatMessage({id: 'microbit.oceanAdventure'})}
                        />
                    </Steps>
                </ExtensionSection>
                <ExtensionSection className="cards">
                    <FlexRow
                        as="section"
                        className="cards-row"
                    >
                        <div className="cards-image-column">
                            <img
                                className="cards-image"
                                src="/images/microbit/microbit-with-scratch.png"
                            />
                        </div>
                        <div className="cards-description-column">
                            <h2>
                                <FormattedMessage id="microbit.downloadCardsTitle" />
                            </h2>
                            <p>
                                <FormattedMessage id="microbit.cardsDescription" />
                            </p>
                            <p>
                                <a
                                    href={this.props.intl.formatMessage({
                                        id: 'cards.microbit-cardsLink'
                                    })}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Button className="download-cards-button large">
                                        <FormattedMessage id="general.downloadPDF" />
                                    </Button>
                                </a>
                            </p>
                        </div>
                    </FlexRow>
                    <hr />
                </ExtensionSection>
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="microbit.troubleshootingTitle" /></h2>
                    {isDownloaded(this.state.OS) && (
                        <React.Fragment>
                            <h3 className="faq-title"><FormattedMessage id="microbit.checkOSVersionTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="microbit.checkOSVersionText"
                                    values={{
                                        winOSVersionLink: (
                                            <a
                                                href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="microbit.winOSVersionLinkText" />
                                            </a>
                                        ),
                                        macOSVersionLink: (
                                            <a
                                                href="https://support.apple.com/en-us/HT201260"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="microbit.macOSVersionLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </React.Fragment>
                    )}
                    <h3 className="faq-title"><FormattedMessage id="microbit.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="microbit.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="microbit.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="microbit.otherComputerConnectedText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="microbit.resetButtonTitle" /></h3>
                    <p>
                        <FormattedMessage id="microbit.resetButtonText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="bluetooth.enableLocationServicesTitle" /></h3>
                    <p>
                        <FormattedMessage id="bluetooth.enableLocationServicesText" />
                    </p>
                </ExtensionSection>
            </div>
        );
    }
}

MicroBit.propTypes = {
    intl: intlShape.isRequired
};

const WrappedMicroBit = injectIntl(MicroBit);

render(<Page><WrappedMicroBit /></Page>, document.getElementById('app'));
