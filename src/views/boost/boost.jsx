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

const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('../../components/extension-landing/extension-landing.scss');
require('./boost.scss');

class Boost extends ExtensionLanding {
    render () {
        return (
            <div className="extension-landing boost">
                <ExtensionHeader
                    renderCopy={
                        <FlexRow className="extension-copy">
                            <h1><img
                                alt=""
                                className="headline-icon"
                                src="/images/boost/boost.svg"
                            />LEGO BOOST</h1>
                            <FormattedMessage
                                id="boost.headerText"
                                values={{
                                    boostLink: (
                                        <a
                                            href="https://www.lego.com/en-us/themes/boost"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            LEGO BOOST
                                        </a>
                                    )
                                }}
                            />
                        </FlexRow>
                    }
                    renderImage={<img
                        alt={this.props.intl.formatMessage({id: 'boost.imgAltBoostIllustration'})}
                        src="/images/boost/boost-header.svg"
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
                    <h2><FormattedMessage id="boost.gettingStarted" /></h2>
                    <FlexRow className="column getting-started-section">
                        <h3><FormattedMessage id="boost.connectingBoost" /></h3>
                        <Steps>
                            <Step number={1}>
                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src="/images/boost/boost-connect-1.png"
                                    />
                                </div>
                                <p>
                                    <FormattedMessage
                                        id="boost.useScratch3"
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
                            <Step number={2}>
                                <div className="step-image">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'extensionInstallation.addExtension'})}
                                        className="screenshot"
                                        src="/images/boost/boost-connect-2.png"
                                    />
                                </div>
                                <p><FormattedMessage id="boost.addExtension" /></p>
                            </Step>
                        </Steps>
                    </FlexRow>
                </ExtensionSection>
                <ExtensionSection className="blue things-to-try">
                    <h2><FormattedMessage id="boost.thingsToTry" /></h2>
                    <h3><FormattedMessage id="boost.makeAMotorMove" /></h3>
                    <Steps>
                        <Step
                            compact
                            number={1}
                        >
                            <span className="step-description">
                                <FormattedMessage
                                    id="boost.findTurnMotorOnForSeconds"
                                    values={{
                                        turnMotorOnForSeconds: (
                                            <strong>
                                                <FormattedMessage id="boost.turnMotorOnForSeconds" />
                                            </strong>
                                        )
                                    }}
                                />
                            </span>
                            <div className="step-image">
                                <img
                                    alt=""
                                    src="/images/boost/boost-turn-motor-on-block.png"
                                />
                            </div>
                        </Step>
                        <Step
                            compact
                            number={2}
                        >
                            <span className="step-description">
                                <FormattedMessage id="boost.connectALegoBeam" />
                            </span>
                            <div className="step-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'boost.imgAltConnectALegoBeam'})}
                                    src="/images/boost/boost-connect-lego-beam.svg"
                                />
                            </div>
                        </Step>
                    </Steps>
                    <hr />
                    <h3><FormattedMessage id="boost.starterProjects" /></h3>
                    <Steps>
                        <ProjectCard
                            cardUrl="/projects/305503180/editor"
                            description={this.props.intl.formatMessage({id: 'boost.feedTheCatDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'boost.imgAltFeedTheCat'})}
                            imageSrc="/images/boost/boost-starter1.png"
                            title={this.props.intl.formatMessage({id: 'boost.feedTheCat'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/305501694/editor"
                            description={this.props.intl.formatMessage({id: 'boost.drivingDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'boost.imgAltDriving'})}
                            imageSrc="/images/boost/boost-starter2.png"
                            title={this.props.intl.formatMessage({id: 'boost.driving'})}
                        />
                        <ProjectCard
                            cardUrl="/projects/305503649/editor"
                            description={this.props.intl.formatMessage({id: 'boost.walkAroundDescription'})}
                            imageAlt={this.props.intl.formatMessage({id: 'boost.imgAltwalkAround'})}
                            imageSrc="/images/boost/boost-starter3.png"
                            title={this.props.intl.formatMessage({id: 'boost.walkAround'})}
                        />
                    </Steps>
                </ExtensionSection>
                <ExtensionSection className="faq">
                    <h2><FormattedMessage id="boost.troubleshootingTitle" /></h2>
                    <h3 className="faq-title"><FormattedMessage id="boost.updateScratchLinkTitle" /></h3>
                    <p>
                        <FormattedMessage id="boost.updateScratchLinkText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="boost.checkOSVersionTitle" /></h3>
                    <p>
                        <FormattedMessage
                            id="boost.checkOSVersionText"
                            values={{
                                winOSVersionLink: (
                                    <a
                                        href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="boost.winOSVersionLinkText" />
                                    </a>
                                ),
                                macOSVersionLink: (
                                    <a
                                        href="https://support.apple.com/en-us/HT201260"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="boost.macOSVersionLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="boost.closeScratchCopiesTitle" /></h3>
                    <p>
                        <FormattedMessage id="boost.closeScratchCopiesText" />
                    </p>
                    <h3 className="faq-title"><FormattedMessage id="boost.otherComputerConnectedTitle" /></h3>
                    <p>
                        <FormattedMessage id="boost.otherComputerConnectedText" />
                    </p>
                </ExtensionSection>
            </div>
        );
    }
}

Boost.propTypes = {
    intl: intlShape.isRequired
};

const WrappedBoost = injectIntl(Boost);

render(<Page><WrappedBoost /></Page>, document.getElementById('app'));
