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
const ExtensionVideo = require('../../components/extension-landing/extension-video.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const InstallScratch = require('../../components/install-scratch/install-scratch.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('../../components/extension-landing/extension-landing.scss');
require('./wedo2.scss');

class Wedo2 extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing wedo2">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="extension-copy">
                            <h1><img
                                alt=""
                                src="/images/wedo2/wedo2.svg"
                            />LEGO Education WeDo 2.0</h1>
                            <FormattedMessage
                                id="wedo2.headerText"
                                values={{
                                    wedo2Link: (
                                        <a
                                            href="https://education.lego.com/en-us/elementary/intro/wedo2"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            LEGO Education WeDo 2.0
                                        </a>
                                    )
                                }}
                            />
                        </FlexRow>
                    }
                    renderImage={
                        <ExtensionVideo
                            videoId="4im7iizv47"
                        />
                    }
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
                    <h2><FormattedMessage id="wedo2.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="wedo2.connectingWedo2" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src="/images/wedo2/wedo2-connect-1.png"
                                    />
                                </div>
                                <p>
                                    {isDownloaded(this.state.OS) && (
                                        <FormattedMessage
                                            id="wedo2.useScratch3"
                                            values={{
                                                scratch3Link: (
                                                    <a
                                                        href="/projects/editor/?tutorial=wedo"
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
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'extensionInstallation.addExtension'})}
                                        className="screenshot"
                                        src="/images/wedo2/wedo2-connect-2.png"
                                    />
                                </div>
                                <p><FormattedMessage id="wedo2.addExtension" /></p>
                            </Step>
                        </Steps>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="wedo2.thingsToTry" /></h2>
                    <h3><FormattedMessage id="wedo2.makeMotorMove" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage id="wedo2.plugMotorIn" />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/wedo2/wedo2-motor.png"
                                />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="wedo2.clickMotorBlock"
                                    values={{
                                        motorBlockText: (
                                            <strong><FormattedMessage id="wedo2.motorBlockText" /></strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/wedo2/wedo2-motor-turn-block.png"
                                />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="wedo2.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="/projects/269442111/editor?tutorial=wedo"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter1PetDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'wedo2.imgAltStarter1Pet'})}
                            imageSrc="/images/wedo2/wedo2-starter1.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter1PetTitle'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/269442224/editor?tutorial=wedo"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter2FoxDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'wedo2.imgAltStarter2Fox'})}
                            imageSrc="/images/wedo2/wedo2-starter2.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter2FoxTitle'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/269442247/editor?tutorial=wedo"
                            description={this.props.intl.formatMessage({id: 'wedo2.starter3PufferfishDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'wedo2.imgAltStarter3Pufferfish'})}
                            imageSrc="/images/wedo2/wedo2-starter3.png"
                            title={this.props.intl.formatMessage({id: 'wedo2.starter3PufferfishTitle'})}
                        />
                    </Steps>
                </ExtensionSection>
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="wedo2.troubleshootingTitle" /></h2>
                    {isDownloaded(this.state.OS) && (
                        <React.Fragment>
                            <h3 className="faq-title"><FormattedMessage id="wedo2.checkOSVersionTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="wedo2.checkOSVersionText"
                                    values={{
                                        winOSVersionLink: (
                                            <a
                                                href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="wedo2.winOSVersionLinkText" />
                                            </a>
                                        ),
                                        macOSVersionLink: (
                                            <a
                                                href="https://support.apple.com/en-us/HT201260"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="wedo2.macOSVersionLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </React.Fragment>
                    )}
                    <h3 className="faq-title"><FormattedMessage id="wedo2.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="wedo2.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="wedo2.otherComputerConnectedText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.updateLinkTitle" /></h3>
                    <p>
                        <FormattedMessage id="wedo2.updateLinkText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="wedo2.legacyInfoTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="wedo2.legacyInfoText"
                            values={{
                                wedoLegacyLink: (
                                    <a
                                        href="/wedo-legacy"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="wedo2.legacyLinkText" />
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

Wedo2.propTypes = {
    intl: intlShape.isRequired
};

const WrappedWedo2 = injectIntl(Wedo2);

render(<Page><WrappedWedo2 /></Page>, document.getElementById('app'));
