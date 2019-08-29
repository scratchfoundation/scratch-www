const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../components/os-chooser/os-chooser.jsx');

const ExtensionLanding = require('../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../components/extension-landing/extension-header.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');
const Button = require('../../components/forms/button.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const OS_ENUM = require('../../components/extension-landing/os-enum.js');

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
                        <ExtensionRequirements>
                            <span>
                                <img
                                    alt=""
                                    src="/svgs/extensions/windows.svg"
                                />
                                            Windows 10 version 1709+
                            </span>
                            <span>
                                <img
                                    alt=""
                                    src="/svgs/extensions/mac.svg"
                                />
                                            macOS 10.13+
                            </span>
                            <span>
                                <img
                                    alt=""
                                    src="/svgs/extensions/bluetooth.svg"
                                />
                                            Bluetooth 4.0
                            </span>
                            <span>
                                <img
                                    alt=""
                                    src="/svgs/extensions/scratch-link.svg"
                                />
                                            Scratch Link
                            </span>
                        </ExtensionRequirements>
                    }
                />
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <InstallScratchLink
                    currentOS={this.state.OS}
                />
                <ExtensionSection className="getting-started">
                    <h2><FormattedMessage id="microbit.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="microbit.installMicrobitHex" /></h3>
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
                                    href="https://downloads.scratch.mit.edu/microbit/scratch-microbit-1.1.0.hex.zip"
                                >
                                    <FormattedMessage id="microbit.downloadHex" />
                                </a>
                            </Step>
                            <Step number={3}>
                                <div className="step-image">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'microbit.imgAltDragDropHex'})}
                                        src={`/images/microbit/${
                                            this.state.OS === OS_ENUM.WINDOWS ? 'win' : 'mac'
                                        }-copy-hex.png`}
                                    />
                                </div>
                                <p>
                                    <FormattedMessage id="microbit.dragDropHex" />
                                </p>
                            </Step>
                        </Steps>
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
