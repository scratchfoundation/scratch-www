/*
 * TODO: Refactor this file and views/microbit/microbit.jsx
 * into something that can be used in both places (scratch-www#1982)
 */

const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');


const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const OSChooser = require('../../components/os-chooser/os-chooser.jsx');
const InstallScratchLink = require('../../components/extension-landing/install-scratch-link.jsx');
const ProjectCard = require('../../components/extension-landing/project-card.jsx');
const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const OS_ENUM = require('../../components/extension-landing/os-enum.js');

require('../../components/extension-landing/extension-landing.scss');
require('./ev3.scss');

class EV3 extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);

        this.state = {
            OS: OS_ENUM.WINDOWS
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }

    render () {
        return (
            <div className="extension-landing ev3">
                <div className="extension-header">
                    <FlexRow className="inner">
                        <FlexRow className="column extension-info">
                            <FlexRow className="column extension-copy">
                                <h2><img src="/images/ev3/ev3.svg" />LEGO MINDSTORMS EV3</h2>
                                <FormattedMessage
                                    id="ev3.headerText"
                                    values={{
                                        ev3Link: (
                                            <a
                                                href="https://shop.lego.com/en-US/LEGO-MINDSTORMS-EV3-31313"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                LEGO MINDSTORMS EV3
                                            </a>
                                        )
                                    }}
                                />
                                <span />
                            </FlexRow>
                            <FlexRow className="column extension-requirements-container">
                                <span className="requirements-header">
                                    <FormattedMessage id="ev3.requirements" />
                                </span>
                                <FlexRow className="extension-requirements">
                                    <span>
                                        <img src="/svgs/extensions/windows.svg" />
                                        Windows 10+
                                    </span>
                                    <span>
                                        <img src="/svgs/extensions/mac.svg" />
                                        macOS 10.13+
                                    </span>
                                    <span>
                                        <img src="/svgs/extensions/bluetooth.svg" />
                                        Bluetooth
                                    </span>
                                    <span>
                                        <img src="/svgs/extensions/scratch-link.svg" />
                                        Scratch Link
                                    </span>
                                </FlexRow>
                            </FlexRow>
                        </FlexRow>
                        <div className="extension-image">
                            <img src="/images/ev3/ev3-illustration.png" />
                        </div>
                    </FlexRow>
                </div>
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <InstallScratchLink
                    currentOS={this.state.OS}
                />
                <div className="getting-started">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="ev3.gettingStarted" /></h2>
                        <FlexRow className="column getting-started-section">
                            <h3><FormattedMessage id="ev3.connectingEV3" /></h3>
                            <Steps>
                                <Step number={1}>
                                    <div className="step-image">
                                        <img src="/images/ev3/ev3-connect-1.png" />
                                    </div>
                                    <p><FormattedMessage id="ev3.turnOnEV3" /></p>
                                </Step>
                                <Step number={2}>
                                    <div className="step-image">
                                        <img src="/images/ev3/ev3-connect-2.png" />
                                    </div>
                                    <p>
                                        <FormattedMessage
                                            id="ev3.useScratch3"
                                            values={{
                                                scratch3Link: (
                                                    <a
                                                        href="https://beta.scratch.mit.edu/"
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                            Scratch 3.0
                                                    </a>
                                                )
                                            }}
                                        />
                                    </p>
                                </Step>
                                <Step number={3}>
                                    <div className="step-image">
                                        <img src="/images/ev3/ev3-connect-3.png" />
                                    </div>
                                    <p><FormattedMessage id="ev3.addExtension" /></p>
                                </Step>
                            </Steps>
                            <div className="tip-box">
                                <h4><FormattedMessage id="ev3.firstTimeConnecting" /></h4>
                                <FlexRow className="column tip-content">
                                    <p><FormattedMessage id="ev3.pairingDescription" /></p>
                                    <Steps>
                                        <Step>
                                            <div className="step-image">
                                                <img src="/images/ev3/ev3-accept-connection.png" />
                                            </div>
                                            <p><FormattedMessage id="ev3.acceptConnection" /></p>
                                        </Step>
                                        <Step>
                                            <div className="step-image">
                                                <img src="/images/ev3/ev3-pin.png" />
                                            </div>
                                            <p><FormattedMessage id="ev3.acceptPasscode" /></p>
                                        </Step>
                                        <Step>
                                            <div className="step-image">
                                                <img
                                                    className="screenshot"
                                                    src={`/images/ev3/${
                                                        this.state.OS === OS_ENUM.WINDOWS ?
                                                            'win-device-ready.png' :
                                                            'mac-enter-passcode.png'
                                                    }`}
                                                />
                                            </div>
                                            <p>
                                                {this.state.OS === OS_ENUM.WINDOWS ?
                                                    <FormattedMessage id="ev3.windowsFinalizePairing" /> :
                                                    <FormattedMessage id="ev3.macosFinalizePairing" />
                                                }
                                            </p>
                                        </Step>
                                    </Steps>
                                </FlexRow>
                            </div>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="blue things-to-try">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="ev3.thingsToTry" /></h2>
                        <h3>Make a motor move</h3>
                        <Steps>
                            <Step
                                compact
                                number={1}
                            >
                                <span className="step-description">
                                    Plug a motor into <strong>port A</strong> on the EV3 hub
                                </span>
                                <div className="step-image">
                                    <img src="/images/ev3/ev3-motor-port-a.png" />
                                </div>
                            </Step>
                            <Step
                                compact
                                number={2}
                            >
                                <span className="step-description">
                                            Find the <strong>&ldquo;motor A turn this way&rdquo;</strong> block
                                             and click on it.
                                </span>
                                <div className="step-image">
                                    <img src="/images/ev3/motor-turn-block.png" />
                                </div>
                            </Step>
                        </Steps>
                        <div className="section-separator" />
                        <h3>Starter Projects</h3>
                        <Steps>
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/ev3/ev3-wave-hello.sb3"
                                description="Make a puppet robot and have a friendly chat."
                                imageUrl="/images/ev3/starter-wave-hello.png"
                                title="Wave Hello"
                            />
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/ev3/ev3-distance-instrument.sb3"
                                description="Move your body in front of the sensor to make music."
                                imageUrl="/images/ev3/starter-distance-instrument.png"
                                title="Distance Instrument"
                            />
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/ev3/ev3-space-tacos.sb3"
                                description="Build your own controller to catch tacos in space."
                                imageUrl="/images/ev3/starter-flying-game.png"
                                title="Space Tacos"
                            />
                        </Steps>
                    </FlexRow>
                </div>
                <div className="faq inner">
                    <h2><FormattedMessage id="ev3.troubleshootingTitle" /></h2>
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
                </div>
            </div>
        );
    }
}

const WrappedEV3 = injectIntl(EV3);

render(<Page><WrappedEV3 /></Page>, document.getElementById('app'));
