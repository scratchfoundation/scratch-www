const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const intlShape = require('../../lib/intl-shape');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');

const OSChooser = require('../../components/os-chooser/os-chooser.jsx');
const {isDownloaded, isFromGooglePlay} = require('../../components/install-scratch/install-util.js');

const ExtensionLanding = require('../../components/extension-landing/extension-landing.jsx');
const ExtensionHeader = require('../../components/extension-landing/extension-header.jsx');
const ExtensionRequirements = require('../../components/extension-landing/extension-requirements.jsx');
const ExtensionSection = require('../../components/extension-landing/extension-section.jsx');
const ExtensionTroubleshooting = require('../../components/extension-landing/extension-troubleshooting.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const InstallScratch = require('../../components/install-scratch/install-scratch.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('../../components/extension-landing/extension-landing.scss');
require('./gdxfor.scss');

class GdxFor extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing gdxfor">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="extension-copy">
                            <h1><img
                                alt="Vernier Force & Acceleration"
                                className="headline-icon"
                                src="/images/gdxfor/gdxfor.svg"
                            />Vernier Force & Acceleration</h1>
                            <FormattedMessage
                                id="gdxfor.headerText"
                                values={{
                                    gdxforLink: (
                                        <a
                                            href="https://www.vernier.com/products/sensors/force-sensors/gdx-for/"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            Vernier Go Direct Force & Acceleration
                                        </a>
                                    )
                                }}
                            />
                        </FlexRow>
                    }
                    renderImage={<img
                        alt={this.props.intl.formatMessage({id: 'gdxfor.imgAltGdxforIllustration'})}
                        src="/images/gdxfor/gdxfor-header.svg"
                    />}
                    renderRequirements={
                        <ExtensionRequirements />
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
                    <h2><FormattedMessage id="gdxfor.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="gdxfor.connectingGdxfor" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        src="/images/gdxfor/gdxfor-connect-1.svg"
                                    />
                                </div>
                                <p><FormattedMessage id="gdxfor.powerGdxfor" /></p>
                            </Step>
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src="/images/gdxfor/gdxfor-connect-2.png"
                                    />
                                </div>
                                <p>
                                    {isDownloaded(this.state.OS) && (
                                        <FormattedMessage
                                            id="gdxfor.useScratch3"
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
                                        src="/images/gdxfor/gdxfor-connect-3.png"
                                    />
                                </div>
                                <p><FormattedMessage id="gdxfor.addExtension" /></p>
                            </Step>
                        </Steps>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="gdxfor.thingsToTry" /></h2>
                    <h3><FormattedMessage id="gdxfor.pushToMakeASound" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="gdxfor.connectForcePushedToPlaySound"
                                    values={{
                                        whenForceSensorPushed: (
                                            <strong>
                                                <FormattedMessage id="gdxfor.whenForceSensorPushed" />
                                            </strong>
                                        ),
                                        startSound: (
                                            <strong>
                                                <FormattedMessage id="gdxfor.startSound" />
                                            </strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/gdxfor/gdxfor-force-pushed-stack.png"
                                />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage id="gdxfor.pushOnForceSensor" />
                            </span>
                            <div className="step-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'gdxfor.imgAltPushForce'})}
                                    src="/images/gdxfor/gdxfor-push-force.svg"
                                />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="gdxfor.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="/projects/301384031/editor"
                            description={this.props.intl.formatMessage({id: 'gdxfor.frogBandDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'gdxfor.imgAltFrogBand'})}
                            imageSrc="/images/gdxfor/gdxfor-starter1.png"
                            title={this.props.intl.formatMessage({id: 'gdxfor.frogBand'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/301385019/editor"
                            description={this.props.intl.formatMessage({id: 'gdxfor.dayAndNightDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'gdxfor.imgAltDayAndNight'})}
                            imageSrc="/images/gdxfor/gdxfor-starter2.png"
                            title={this.props.intl.formatMessage({id: 'gdxfor.dayAndNight'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/301385331/editor"
                            description={this.props.intl.formatMessage({id: 'gdxfor.underwaterRocketDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'gdxfor.imgAltUnderwaterRocket'})}
                            imageSrc="/images/gdxfor/gdxfor-starter3.png"
                            title={this.props.intl.formatMessage({id: 'gdxfor.underwaterRocket'})}
                        />
                    </Steps>
                </ExtensionSection>
                <ExtensionTroubleshooting
                    currentOS={this.state.OS}
                    deviceName={this.props.intl.formatMessage({id: 'gdxfor.deviceName'})}
                    deviceNameShort={this.props.intl.formatMessage({id: 'gdxfor.deviceNameShort'})}
                >
                    {isDownloaded(this.state.OS) && (
                        <React.Fragment>
                            <h3 className="faq-title"><FormattedMessage id="gdxfor.checkOSVersionTitle" /></h3>
                            <p>
                                <FormattedMessage
                                    id="gdxfor.checkOSVersionText"
                                    values={{
                                        winOSVersionLink: (
                                            <a
                                                href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="gdxfor.winOSVersionLinkText" />
                                            </a>
                                        ),
                                        macOSVersionLink: (
                                            <a
                                                href="https://support.apple.com/en-us/HT201260"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <FormattedMessage id="gdxfor.macOSVersionLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                            <p><FormattedMessage id="extensions.checkOsVersionText2" /></p>
                        </React.Fragment>
                    )}
                    <h3 className="faq-title"><FormattedMessage id="gdxfor.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="gdxfor.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="gdxfor.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="gdxfor.otherComputerConnectedText" />
                    </p>
                </ExtensionTroubleshooting>
            </div>
        );
    }
}

GdxFor.propTypes = {
    intl: intlShape.isRequired
};

const WrappedGdxFor = injectIntl(GdxFor);

render(<Page><WrappedGdxFor /></Page>, document.getElementById('app'));
