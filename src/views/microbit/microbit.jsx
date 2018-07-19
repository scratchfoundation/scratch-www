const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
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
                                <span>
                                    <a
                                        href="http://microbit.org/"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                      micro:bit
                                    </a> is a tiny circuit board designed to help kids
                                    learn to code and create with technology. It has many features
                                    including an LED display, buttons, and a motion sensor.
                                    You can connect it to Scratch and build creative projects
                                    that combine the magic of the digital and physical worlds.
                                </span>
                            </FlexRow>
                            <FlexRow className="column extension-requirements-container">
                                <span className="requirements-header">Requirements</span>
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
                                        ScratchLink
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
                        <h2>Install Scratch Link</h2>
                        <FlexRow className="steps">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            Download and install ScratchLink.
                                        </span>
                                        <a className="step-image badge">
                                            <img
                                                // eslint-disable-next-line max-len
                                                src={`/svgs/app-store-badges/${this.state.OS === this.OS_ENUM.WINDOWS ? 'microsoft' : 'apple'}-app-store-badge.svg`}
                                            />
                                        </a>
                                    </FlexRow>
                                </FlexRow>

                            </div>
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">2</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            Start ScratchLink and make sure it is running.
                                            It should appear in your toolbar.
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
                        <h2>Getting Started</h2>
                        <FlexRow className="column install-hex">
                            <h3>Install Scratch micro:bit HEX</h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-usb.png" />
                                        </div>
                                        <p>Connect a micro:bit to your computer with a USB cable</p>
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
                                            href="https://downloads.scratch.mit.edu/microbit/scratch-microbit-1.0.hex"
                                        >
                                          Download the Scratch micro:bit hex file
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
                                        <p>Drag and drop the hex file onto your micro:bit</p>
                                    </div>
                                </div>
                            </FlexRow>
                        </FlexRow>
                        <div className="section-separator" />
                        <FlexRow className="column connecting">
                            <h3>Connecting micro:bit to Scratch</h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-connect-1.png" />
                                        </div>
                                        <p>Power your micro:bit with USB or a battery pack.</p>
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
                                        <p>Use the <a>Scratch 3.0</a> editor.</p>
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
                                        <p>Step 3 content here.</p>
                                    </div>
                                </div>
                            </FlexRow>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="blue things-to-try">
                    <FlexRow className="inner column">
                        <h2>Things to Try</h2>
                        <h3>Display &ldquo;Hello!&rdquo;</h3>
                        <FlexRow className="steps display-hello">
                            <div className="step">
                                <FlexRow className="step-number-row">
                                    <div className="step-number">1</div>
                                    <FlexRow className="step-content">
                                        <span className="step-description">
                                            Find the <strong>&ldquo;display hello&rdquo;</strong> block and click on it.
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
                                            You should see <strong>hello</strong> scroll across the micro:bit display
                                        </span>
                                        <div className="step-image">
                                            <img src="/images/microbit/mbit-display-h.png" />
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
                                href="https://downloads.scratch.mit.edu/microbit/microbit-heartbeat.sb3"
                            >
                                <div className="project-card-image">
                                    <img src="/images/microbit/starter-heart.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Heart Beat</h4>
                                    <p>
                                        Press the buttons to animate the heart.
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
                                    <h4>Tilt guitar</h4>
                                    <p>
                                        Make music by tilting your micro:bit.
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
                                    <h4>Ocean Adventure</h4>
                                    <p>
                                        Build your own controller and swim toward the saxophones.
                                    </p>
                                </div>
                            </a>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="faq inner">
                    <div className="faq-content">
                        <h2>FAQ / Troubleshooting</h2>
                        <section id="scratch-link">
                            <dl>
                                <dt><FormattedMessage id="faq.aboutScratchTitle" /></dt>
                                <dd>
                                    <p>To open ScratchLink:</p>
                                    <ol className="indented">
                                        <li>Go to your <strong>Applications</strong> folder</li>
                                        <li>Find and open <strong>Scratch Link</strong></li>
                                    </ol>
                                </dd>

                                <dt><FormattedMessage id="faq.makeGameTitle" /></dt>
                                <dd><FormattedHTMLMessage id="faq.makeGameBody" /></dd>
                            </dl>
                        </section>
                        <section id="bluetooth">
                            <dl>
                                <dt><FormattedMessage id="faq.aboutScratchTitle" /></dt>
                                <dd><FormattedHTMLMessage id="faq.aboutScratchBody" /></dd>

                                <dt><FormattedMessage id="faq.makeGameTitle" /></dt>
                                <dd><FormattedHTMLMessage id="faq.makeGameBody" /></dd>
                            </dl>
                        </section>
                    </div>
                    <nav className="faq-links">
                        <ol>
                            <li><a href="#scratch-link"><FormattedMessage id="microbit.scratchLinkFAQ" /></a></li>
                            <li><a href="#bluetooth"><FormattedMessage id="microbit.bluetoothFAQ" /></a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        );
    }
}

const WrappedMicroBit = injectIntl(MicroBit);

render(<Page><WrappedMicroBit /></Page>, document.getElementById('app'));
