/*
 * TODO: Refactor this file and views/ev3/ev3.jsx
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

require('./microbit.scss');

class MicroBit extends React.Component {
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
            <div className="microbit">
                <div className="extension-header">
                    <FlexRow className="inner">
                        <FlexRow className="column extension-info">
                            <FlexRow className="column extension-copy">
                                <h2><img src="/images/microbit/microbit.svg" />micro:bit</h2>
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
                            <FlexRow className="column extension-requirements-container">
                                <span className="requirements-header">
                                    <FormattedMessage id="microbit.requirements" />
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
                                        Bluetooth 4.0
                                    </span>
                                    <span>
                                        <img src="/svgs/extensions/scratch-link.svg" />
                                        Scratch Link
                                    </span>
                                </FlexRow>
                            </FlexRow>
                        </FlexRow>
                        <div className="extension-image">
                            <img src="/images/microbit/microbit-heart.png" />
                        </div>
                    </FlexRow>
                </div>
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <div className="blue install-scratch-link">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="microbit.installScratchLink" /></h2>
                        <FlexRow className="steps">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            <FormattedMessage id="microbit.installScratchLinkStep" />
                                        </span>
                                        <a
                                            className="step-image badge"
                                            href={`https://downloads.scratch.mit.edu/link/${
                                                this.state.OS === this.OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                            }.zip`}
                                        >
                                            <button className="button download-button">
                                                {this.state.OS === this.OS_ENUM.WINDOWS ?
                                                    <FormattedMessage id="microbit.windowsDownload" /> :
                                                    <FormattedMessage id="microbit.macosDownload" />
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
                                            <FormattedMessage id="microbit.startScratchLink" />
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
                        <h2><FormattedMessage id="microbit.gettingStarted" /></h2>
                        <FlexRow className="column install-hex">
                            <h3><FormattedMessage id="microbit.installMicrobitHex" /></h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-usb.png" />
                                        </div>
                                        <p>
                                            <FormattedMessage id="microbit.connectUSB" />
                                        </p>
                                    </div>
                                </div>
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">2</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-hex-download.png" />
                                        </div>
                                        <a
                                            download
                                            className="download"
                                            href="https://downloads.scratch.mit.edu/microbit/scratch-microbit-1.0.hex.zip"
                                        >
                                            <FormattedMessage id="microbit.downloadHex" />
                                        </a>
                                    </div>
                                </div>
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">3</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img
                                                src={`/images/microbit/${
                                                    this.state.OS === this.OS_ENUM.WINDOWS ? 'win' : 'mac'
                                                }-copy-hex.png`}
                                            />
                                        </div>
                                        <p>
                                            <FormattedMessage id="microbit.dragDropHex" />
                                        </p>
                                    </div>
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <div className="section-separator" />
                        <FlexRow className="column connecting">
                            <h3><FormattedMessage id="microbit.connectingMicrobit" /></h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-connect-1.png" />
                                        </div>
                                        <p><FormattedMessage id="microbit.powerMicrobit" /></p>
                                    </div>
                                </div>
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">2</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-connect-2.png" />
                                        </div>
                                        <p>
                                            <FormattedMessage
                                                id="microbit.useScratch3"
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
                                            <img src="/images/microbit/mbit-connect-3.png" />
                                        </div>
                                        <p><FormattedMessage id="microbit.addExtension" /></p>
                                    </div>
                                </div>
                            </FlexRow>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="blue things-to-try">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="microbit.thingsToTry" /></h2>
                        <h3><FormattedMessage id="microbit.displayHelloTitle" /></h3>
                        <FlexRow className="steps display-hello">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
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
                                            <img src="/images/microbit/display-hello-block.png" />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">2</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            <FormattedMessage
                                                id="microbit.helloScroll"
                                                values={{
                                                    helloText: (
                                                        <strong><FormattedMessage id="microbit.helloText" /></strong>
                                                    )
                                                }}
                                            />                                        </span>
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-display-h.png" />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </FlexRow>
                        <div className="section-separator" />
                        <h3><FormattedMessage id="microbit.starterProjects" /></h3>
                        <FlexRow className="steps">
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/microbit/microbit-heartbeat.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/microbit/starter-heart.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4><FormattedMessage id="microbit.heartBeat" /></h4>
                                    <p>
                                        <FormattedMessage id="microbit.heartBeatDescription" />
                                    </p>
                                </div>
                            </a>
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/microbit/microbit-guitar.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/microbit/starter-guitar.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4><FormattedMessage id="microbit.tiltGuitar" /></h4>
                                    <p>
                                        <FormattedMessage id="microbit.tiltGuitarDescription" />
                                    </p>
                                </div>
                            </a>
                            <a
                                download
                                className="project-card"
                                href="https://downloads.scratch.mit.edu/microbit/microbit-fish.sb3"
                            >

                                <div className="project-card-image">
                                    <img src="/images/microbit/starter-fish.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4><FormattedMessage id="microbit.oceanAdventure" /></h4>
                                    <p>
                                        <FormattedMessage id="microbit.oceanAdventureDescription" />
                                    </p>
                                </div>
                            </a>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="faq inner">
                    <h2><FormattedMessage id="microbit.troubleshootingTitle" /></h2>
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
                </div>
            </div>
        );
    }
}

const WrappedMicroBit = injectIntl(MicroBit);

render(<Page><WrappedMicroBit /></Page>, document.getElementById('app'));
