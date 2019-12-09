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
const ExtensionVideo = require('../../components/extension-landing/extension-video.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const InstallScratch = require('../../components/install-scratch/install-scratch.jsx');
const TipBox = require('../../components/extension-landing/tip-box.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const OS_ENUM = require('../../lib/os-enum.js');
const {isDownloaded, isFromGooglePlay} = require('../../components/install-scratch/install-util.js');

require('../../components/extension-landing/extension-landing.scss');
require('./ev3.scss');

class EV3 extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing ev3">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="column extension-copy">
                            <h1><img
                                alt=""
                                src="/images/ev3/ev3.svg"
                            />LEGO MINDSTORMS EV3</h1>
                            <FormattedMessage
                                id="ev3.headerText"
                                values={{
                                    ev3Link: (
                                        <a
                                            href="https://education.lego.com/en-us/middle-school/intro/mindstorms-ev3"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                                    LEGO MINDSTORMS Education EV3
                                        </a>
                                    )
                                }}
                            />
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
                <ExtensionSection className="getting-started">
                    <h2><FormattedMessage id="ev3.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="ev3.connectingEV3" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        src="/images/ev3/ev3-connect-1.png"
                                    />
                                </div>
                                <p><FormattedMessage id="ev3.turnOnEV3" /></p>
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
                                            id="ev3.useScratch3"
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
                                <p><FormattedMessage id="ev3.addExtension" /></p>
                            </Step>
                        </Steps>
                        <TipBox title={this.props.intl.formatMessage({id: 'ev3.firstTimeConnecting'})}>
                            <p><FormattedMessage id="ev3.pairingDescription" /></p>
                            <Steps>
                                <Step>
                                    <div className="step-image">
                                        <img
                                            alt={this.props.intl.formatMessage({id: 'ev3.imgAltAcceptConnection'})}
                                            src="/images/ev3/ev3-accept-connection.png"
                                        />
                                    </div>
                                    <p><FormattedMessage id="ev3.acceptConnection" /></p>
                                </Step>
                                <Step>
                                    <div className="step-image">
                                        <img
                                            alt={this.props.intl.formatMessage({id: 'ev3.imgAltAcceptPasscode'})}
                                            src="/images/ev3/ev3-pin.png"
                                        />
                                    </div>
                                    <p><FormattedMessage id="ev3.acceptPasscode" /></p>
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
                                                <FormattedMessage id="ev3.windowsFinalizePairing" />
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
                                                <FormattedMessage id="ev3.macosFinalizePairing" />
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
                                                <FormattedMessage id="ev3.chromeosFinalizePairing" />
                                            </p>
                                        </React.Fragment>
                                    )}
                                </Step>
                            </Steps>
                        </TipBox>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="ev3.thingsToTry" /></h2>
                    <h3><FormattedMessage id="ev3.makeMotorMove" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="ev3.plugMotorIn"
                                    values={{
                                        portA: (
                                            <strong><FormattedMessage id="ev3.portA" /></strong>
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
                                    id="ev3.clickMotorBlock"
                                    values={{
                                        motorBlockText: (
                                            <strong><FormattedMessage id="ev3.motorBlockText" /></strong>
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
                    <h3><FormattedMessage id="ev3.starterProjects" /></h3>
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
                </ExtensionSection>
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="ev3.troubleshootingTitle" /></h2>
                    {isDownloaded(this.state.OS) && (
                        <React.Fragment>
                            <h3 className="faq-title"><FormattedMessage id="ev3.checkOSVersionTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="ev3.checkOSVersionText"
                                    values={{
                                        winOSVersionLink: (
                                            <a
                                                href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="ev3.winOSVersionLinkText" />
                                            </a>
                                        ),
                                        macOSVersionLink: (
                                            <a
                                                href="https://support.apple.com/en-us/HT201260"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="ev3.macOSVersionLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </React.Fragment>
                    )}
                    <h3 className="faq-title"><FormattedMessage id="ev3.makeSurePairedTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="ev3.makeSurePairedText"
                            values={{
                                pairingInstructionLink: (
                                    <a
                                        href="https://www.lego.com/en-us/service/help/products/themes-sets/mindstorms/connecting-your-lego-mindstorms-ev3-to-bluetooth-408100000007886"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="ev3.pairingInstructionText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="ev3.reconnectTitle" /></h3>
                    <p>
                        <FormattedMessage id="ev3.reconnectText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="ev3.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="ev3.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="ev3.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="ev3.otherComputerConnectedText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="ev3.updateFirmwareTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="ev3.updateFirmwareText"
                            values={{
                                firmwareUpdateLink: (
                                    <a
                                        href="https://education.lego.com/en-us/support/mindstorms-ev3/firmware-update"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="ev3.firmwareUpdateText" />
                                    </a>
                                )
                            }}
                        />
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

EV3.propTypes = {
    intl: intlShape.isRequired
};

const WrappedEV3 = injectIntl(EV3);

render(<Page><WrappedEV3 /></Page>, document.getElementById('app'));
