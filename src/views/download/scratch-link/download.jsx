const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../../components/os-chooser/os-chooser.jsx');

const ExtensionLanding = require('../../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../../components/extension-landing/extension-header.jsx');
const ExtensionVideo = require('../../../components/extension-landing/extension-video.jsx');
const ExtensionRequirements = require('../../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../../components/extension-landing/install-scratch-link.jsx');
const InstallScratch = require('../../../components/install-scratch/install-scratch.jsx');
// TODO: We can remove this if we remove the ev3 related section below
// const TipBox = require('../../../components/extension-landing/tip-box.jsx');
// const ProjectCard = require('../../../components/extension-landing/project-card.jsx');

// const Steps = require('../../../components/steps/steps.jsx');
// const Step = require('../../../components/steps/step.jsx');

// const OS_ENUM = require('../../../lib/os-enum.js');
const {isDownloaded, isFromGooglePlay} = require('../../../components/install-scratch/install-util.js');

require('../../../components/extension-landing/extension-landing.scss');
require('./download.scss');

class ScratchLink extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing ev3">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="column extension-copy">
                            <h1><img
                                alt=""
                                width="40px"
                                src="/images/scratchlink/scratch-link-logo.svg"
                            />Scratch Link</h1>
                            <FormattedMessage id="scratchLink.headerText" />
                        </FlexRow>
                    }
                    renderImage={
                        <ExtensionVideo
                            videoId="0huu6wfiki"
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
                {/* TODO We can remove the commented out section below if we don't need
                    additional step-by-step instructions */}
                {/* <ExtensionSection className="getting-started">
                    <h2><FormattedMessage id="scratchLink.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="scratchLink.connectingEV3" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        src="/images/ev3/ev3-connect-1.png"
                                    />
                                </div>
                                <p><FormattedMessage id="scratchLink.turnOnEV3" /></p>
                            </Step>
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src="/images/ev3/ev3-connect-2.png"
                                    />
                                </div>
                                <p>
                                    {(isDownloaded(this.state.OS)) && (
                                        <FormattedMessage
                                            id="scratchLink.useScratch3"
                                            values={{
                                                scratch3Link: (
                                                    <a
                                                        href="/projects/editor/?tutorial=ev3"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                                Scratch
                                                    </a>
                                                )
                                            }}
                                        />
                                    )}
                                    {(isFromGooglePlay(this.state.OS)) && (
                                        <FormattedMessage id="installScratch.useScratchApp" />
                                    )}
                                </p>
                            </Step>
                            <Step number={3}>
                                <div className="step-image">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'extensionInstallation.addExtension'})}
                                        className="screenshot"
                                        src="/images/ev3/ev3-connect-3.png"
                                    />
                                </div>
                                <p><FormattedMessage id="scratchLink.addExtension" /></p>
                            </Step>
                        </Steps>
                        <TipBox title={this.props.intl.formatMessage({id: 'ev3.firstTimeConnecting'})}>
                            <p><FormattedMessage id="scratchLink.pairingDescription" /></p>
                            <Steps>
                                <Step>
                                    <div className="step-image">
                                        <img
                                            alt={this.props.intl.formatMessage({id: 'ev3.imgAltAcceptConnection'})}
                                            src="/images/ev3/ev3-accept-connection.png"
                                        />
                                    </div>
                                    <p><FormattedMessage id="scratchLink.acceptConnection" /></p>
                                </Step>
                                <Step>
                                    <div className="step-image">
                                        <img
                                            alt={this.props.intl.formatMessage({id: 'ev3.imgAltAcceptPasscode'})}
                                            src="/images/ev3/ev3-pin.png"
                                        />
                                    </div>
                                    <p><FormattedMessage id="scratchLink.acceptPasscode" /></p>
                                </Step>
                                <Step>
                                    {this.state.OS === OS_ENUM.WINDOWS && (
                                        <React.Fragment>
                                            <div className="step-image">
                                                <img
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'ev3.imgAltWaitForWindows'})}
                                                    className="screenshot"
                                                    src="/images/ev3/win-device-ready.png"
                                                />
                                            </div>
                                            <p>
                                                <FormattedMessage id="scratchLink.windowsFinalizePairing" />
                                            </p>
                                        </React.Fragment>
                                    )}
                                    {this.state.OS === OS_ENUM.MACOS && (
                                        <React.Fragment>
                                            <div className="step-image">
                                                <img
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'ev3.imgAltEnterPasscodeMac'})}
                                                    className="screenshot"
                                                    src="/images/ev3/mac-enter-passcode.png"
                                                />
                                            </div>
                                            <p>
                                                <FormattedMessage id="scratchLink.macosFinalizePairing" />
                                            </p>
                                        </React.Fragment>
                                    )}
                                    {this.state.OS === OS_ENUM.CHROMEOS && (
                                        <React.Fragment>
                                            <div className="step-image tall">
                                                <img
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'ev3.imgAltEnterPasscodeChrome'})}
                                                    className="screenshot"
                                                    src="/images/ev3/chromeos-enter-passcode.png"
                                                />
                                            </div>
                                            <p>
                                                <FormattedMessage id="scratchLink.chromeosFinalizePairing" />
                                            </p>
                                        </React.Fragment>
                                    )}
                                </Step>
                            </Steps>
                        </TipBox>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="scratchLink.thingsToTry" /></h2>
                    <h3><FormattedMessage id="scratchLink.makeMotorMove" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="scratchLink.plugMotorIn"
                                    values={{
                                        portA: (
                                            <strong><FormattedMessage id="scratchLink.portA" /></strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'ev3.imgAltPlugInMotor'})}
                                    src="/images/ev3/ev3-motor-port-a.png"
                                />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="scratchLink.clickMotorBlock"
                                    values={{
                                        motorBlockText: (
                                            <strong><FormattedMessage id="scratchLink.motorBlockText" /></strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/ev3/motor-turn-block.png"
                                />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="scratchLink.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="/projects/269442346/editor?tutorial=ev3"
                            description={this.props.intl.formatMessage({id: 'ev3.starter1BasketballDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'ev3.imgAltStarter1Basketball'})}
                            imageSrc="/images/ev3/ev3-starter1.png"
                            title={this.props.intl.formatMessage({id: 'ev3.starter1BasketballTitle'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/269442350/editor?tutorial=ev3"
                            description={this.props.intl.formatMessage({id: 'ev3.starter2MusicDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'ev3.imgAltStarter2Music'})}
                            imageSrc="/images/ev3/ev3-starter2.png"
                            title={this.props.intl.formatMessage({id: 'ev3.starter2MusicTitle'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/269442354/editor?tutorial=ev3"
                            description={this.props.intl.formatMessage({id: 'ev3.starter3SpaceDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'ev3.imgAltStarter3Space'})}
                            imageSrc="/images/ev3/ev3-starter3.png"
                            title={this.props.intl.formatMessage({id: 'ev3.starter3SpaceTitle'})}
                        />
                    </Steps>
                </ExtensionSection> */}
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="scratchLink.troubleshootingTitle" /></h2>
                    {isDownloaded(this.state.OS) && (
                        <React.Fragment>
                            <h3 className="faq-title"><FormattedMessage id="scratchLink.checkOSVersionTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="scratchLink.checkOSVersionText"
                                    values={{
                                        winOSVersionLink: (
                                            <a
                                                href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="scratchLink.winOSVersionLinkText" />
                                            </a>
                                        ),
                                        macOSVersionLink: (
                                            <a
                                                href="https://support.apple.com/en-us/HT201260"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="scratchLink.macOSVersionLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </React.Fragment>
                    )}
                    {/* <h3 className="faq-title"><FormattedMessage id="scratchLink.makeSurePairedTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="scratchLink.makeSurePairedText"
                            values={{
                                pairingInstructionLink: (
                                    <a
                                        href="https://www.lego.com/en-us/service/help/products/themes-sets/mindstorms/connecting-your-lego-mindstorms-ev3-to-bluetooth-408100000007886"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="scratchLink.pairingInstructionText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="scratchLink.reconnectTitle" /></h3>
                    <p>
                        <FormattedMessage id="scratchLink.reconnectText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="scratchLink.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="scratchLink.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="scratchLink.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="scratchLink.otherComputerConnectedText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="scratchLink.updateFirmwareTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="scratchLink.updateFirmwareText"
                            values={{
                                firmwareUpdateLink: (
                                    <a
                                        href="https://education.lego.com/en-us/support/mindstorms-ev3/firmware-update"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="scratchLink.firmwareUpdateText" />
                                    </a>
                                )
                            }}
                        />
                    </p> */}
                    <h3 className="faq-title"><FormattedMessage id="bluetooth.enableLocationServicesTitle" /></h3>
                    <p>
                        <FormattedMessage id="bluetooth.enableLocationServicesText" />
                    </p>
                </ExtensionSection>
            </div>
        );
    }
}

ScratchLink.propTypes = {
    intl: intlShape.isRequired
};

const WrappedScratchLink = injectIntl(ScratchLink);

render(<Page><WrappedScratchLink /></Page>, document.getElementById('app'));
