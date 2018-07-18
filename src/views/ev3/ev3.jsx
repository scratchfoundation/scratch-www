const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
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
                                <h2><img src="/images/ev3/ev3.svg" />LEGO Mindstorms EV3</h2>
                                <span>
                                The LEGO® Mindstorms EV3 is an invention kit with motors and sensors
                                you can use to build interactive robotic creations.
                                Connecting it to Scratch expands the possibilities:
                                build a robotic puppet and tell stories,
                                make your own musical instruments and game controllers,
                                or whatever else you can imagine.
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
                                        Bluetooth
                                    </span>
                                    <span>
                                        <img src="/svgs/extensions/scratch-link.svg" />
                                        ScratchLink
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
                                            <img src="/images/ev3/mac-toolbar.png" />
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
                        <FlexRow className="column connecting-ev3">
                            <h3>Connecting EV3 to Scratch</h3>
                            <FlexRow className="steps">
                                <div className="step">
                                    <FlexRow className="step-number-row">
                                        <div className="step-number">1</div>
                                    </FlexRow>
                                    <div className="step-content">
                                        <div className="step-image">
                                            <img src="/images/ev3/ev3-connect-1.png" />
                                        </div>
                                        <p>Turn on your EV3 by holding down the center button.</p>
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
                                        <p>Use the <a>Scratch 3.0</a> editor.</p>
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
                                        <p>Step 3 content here.</p>
                                    </div>
                                </div>
                            </FlexRow>
                            <div className="tip-box">
                                <h4>First time connecting your EV3?</h4>
                                <FlexRow className="column tip-content">
                                    <p>If you have not connected with your EV3 before, you should probably do that.</p>
                                    <FlexRow className="steps">
                                        <div className="step">
                                            <div className="step-content">
                                                <div className="step-image">
                                                    <img src="/images/ev3/ev3-accept-connection.png" />
                                                </div>
                                                <p>Press center to accept connection</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-content">
                                                <div className="step-image">
                                                    <img src="/images/ev3/ev3-pin.png" />
                                                </div>
                                                <p>Press center to accept passcode</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-content">
                                                <div className="step-image">
                                                    <img src="/images/ev3/ev3-enter-pin.png" />
                                                </div>
                                                <p>Enter pin on your computer.</p>
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
                        <h2>Things to Try</h2>
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
                                            Find the <strong>Motor A turn this way</strong> block and click on it.
                                        </span>
                                        <div className="step-image">
                                            <img src="/images/ev3/motor-blocks.png" />
                                        </div>
                                    </FlexRow>
                                </FlexRow>
                            </div>
                        </FlexRow>
                        <div className="section-separator" />
                        <h3>Sample Projects</h3>
                        <FlexRow className="steps">
                            <a className="project-card">
                                <div className="project-card-image">
                                    <img src="/images/ev3/wave-hello.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Wave Hello</h4>
                                    <p>
                                        Make a puppet robot and have a friendly chat.
                                    </p>
                                </div>
                            </a>
                            <a className="project-card">
                                <div className="project-card-image">
                                    <img src="/images/ev3/distance-instrument.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Distance Instrument</h4>
                                    <p>
                                        Move your body in front of the sensor to make music.
                                    </p>
                                </div>
                            </a>
                            <a className="project-card">
                                <div className="project-card-image">
                                    <img src="/images/ev3/flying-game.png" />
                                </div>
                                <div className="project-card-info">
                                    <h4>Space Tacos</h4>
                                    <p>
                                        Build your own controller to fly around in space.
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
                                <dd><FormattedHTMLMessage id="faq.aboutScratchBody" /></dd>

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
                            <li><a href="#scratch-link"><FormattedMessage id="ev3.scratchLinkFAQ" /></a></li>
                            <li><a href="#bluetooth"><FormattedMessage id="ev3.bluetoothFAQ" /></a></li>
                        </ol>
                    </nav>
                </div>
            </div>
        );
    }
}

const WrappedEV3 = injectIntl(EV3);

render(<Page><WrappedEV3 /></Page>, document.getElementById('app'));
