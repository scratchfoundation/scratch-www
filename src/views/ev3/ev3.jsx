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

require('./ev3.scss');

class EV3 extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);

        this.OS_ENUM = {
            WINDOWS: 'Windows',
            MACOS: 'macOS'
        };

        this.state = {
            OS: this.OS_ENUM.WINDOWS
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }

    render () {
        return (
            <div className="ev3">
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
                <div className="blue install-scratch-link">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="ev3.installScratchLink" /></h2>
                        <FlexRow className="steps">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            <FormattedMessage id="ev3.installScratchLinkStep" />
                                        </span>
                                        <a
                                            className="step-image badge"
                                            href={`https://downloads.scratch.mit.edu/link/${
                                                this.state.OS === this.OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                            }.zip`}
                                        >
                                            <button className="button download-button">
                                                {this.state.OS === this.OS_ENUM.WINDOWS ?
                                                    <FormattedMessage id="ev3.windowsDownload" /> :
                                                    <FormattedMessage id="ev3.macosDownload" />
                                                }
                                                <img src="/svgs/extensions/download-white.svg" />
                                            </button>
                                        </a>
                                    </FlexRow>
                                </FlexRow>

                            </div>
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">2</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            <FormattedMessage id="ev3.startScratchLink" />
                                        </span>
                                        <div className="step-image">
                                            <img
                                                className="screenshot"
                                                src={`/images/scratchlink/${
                                                    this.state.OS === this.OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                                }-toolbar.png`}
                                            />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="getting-started">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="ev3.gettingStarted" /></h2>
                        <FlexRow className="column connecting-ev3">
                            <h3><FormattedMessage id="ev3.connectingEV3" /></h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/ev3/ev3-connect-1.png" />
                                        </div>
                                        <p><FormattedMessage id="ev3.turnOnEV3" /></p>
                                    </div>
                                </div>
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">2</div>
                                    </FlexRow>
                                    <div className="step-content">
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
                                    </div>
                                </div>
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">3</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/ev3/ev3-connect-3.png" />
                                        </div>
                                        <p><FormattedMessage id="ev3.addExtension" /></p>
                                    </div>
                                </div>
                            </FlexRow>
                            <div className="tip-box">
                                <h4><FormattedMessage id="ev3.firstTimeConnecting" /></h4>
                                <FlexRow className="column tip-content">
                                    <p><FormattedMessage id="ev3.pairingDescription" /></p>
                                    <FlexRow className="steps">
                                        <div className="step">
                                            <div className="step-content">
                                                <div className="step-image">
                                                    <img src="/images/ev3/ev3-accept-connection.png" />
                                                </div>
                                                <p><FormattedMessage id="ev3.acceptConnection" /></p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-content">
                                                <div className="step-image">
                                                    <img src="/images/ev3/ev3-pin.png" />
                                                </div>
                                                <p><FormattedMessage id="ev3.acceptPasscode" /></p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-content">

                                                <div className="step-image">
                                                    <img
                                                        className="screenshot"
                                                        src={`/images/ev3/${
                                                            this.state.OS === this.OS_ENUM.WINDOWS ?
                                                                'win-device-ready.png' :
                                                                'mac-enter-passcode.png'
                                                        }`}
                                                    />
                                                </div>
                                                <p>
                                                    {this.state.OS === this.OS_ENUM.WINDOWS ?
                                                        <FormattedMessage id="ev3.windowsFinalizePairing" /> :
                                                        <FormattedMessage id="ev3.macosFinalizePairing" />
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="blue things-to-try">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="ev3.thingsToTry" /></h2>
                        <h3>Make a motor move</h3>
                        <FlexRow className="steps">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            Plug a motor into <strong>port A</strong> on the EV3 hub
                                        </span>
                                        <div className="step-image">
                                            <img src="/images/ev3/ev3-motor-port-a.png" />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">2</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            Find the <strong>&ldquo;motor A turn this way&rdquo;</strong> block
                                             and click on it.
                                        </span>
                                        <div className="step-image">
                                            <img src="/images/ev3/motor-turn-block.png" />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </FlexRow>
                        <div className="section-separator" />
                        <h3>Starter Projects</h3>
                        <FlexRow className="steps">
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/ev3/ev3-wave-hello.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/ev3/starter-wave-hello.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Wave Hello</h4>
                                    <p>
                                        Make a puppet robot and have a friendly chat.
                                    </p>
                                </div>
                            </a>
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/ev3/ev3-distance-instrument.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/ev3/starter-distance-instrument.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Distance Instrument</h4>
                                    <p>
                                        Move your body in front of the sensor to make music.
                                    </p>
                                </div>
                            </a>
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/ev3/ev3-space-tacos.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/ev3/starter-flying-game.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Space Tacos</h4>
                                    <p>
                                        Build your own controller to catch tacos in space.
                                    </p>
                                </div>
                            </a>
                        </FlexRow>
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
