/*
 * TODO: Refactor this file and views/ev3/ev3.jsx
 * into something that can be used in both places (scratch-www#1982)
 */

const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
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
require('./microbit.scss');

class MicroBit extends React.Component {
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
            <div className="extension-landing microbit">
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
                <InstallScratchLink
                    currentOS={this.state.OS}
                />
                <div className="getting-started">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="microbit.gettingStarted" /></h2>
                        <FlexRow className="column getting-started-section">
                            <h3><FormattedMessage id="microbit.installMicrobitHex" /></h3>
                            <Steps>
                                <Step number={1}>
                                    <div className="step-image">
                                        <img src="/images/microbit/mbit-usb.png" />
                                    </div>
                                    <p>
                                        <FormattedMessage id="microbit.connectUSB" />
                                    </p>
                                </Step>
                                <Step number={2}>
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
                                </Step>
                                <Step number={3}>
                                    <div className="step-image">
                                        <img
                                            src={`/images/microbit/${
                                                this.state.OS === OS_ENUM.WINDOWS ? 'win' : 'mac'
                                            }-copy-hex.png`}
                                        />
                                    </div>
                                    <p>
                                        <FormattedMessage id="microbit.dragDropHex" />
                                    </p>
                                </Step>
                            </Steps>
                        </FlexRow>
                        <div className="section-separator" />
                        <FlexRow className="column getting-started-section">
                            <h3><FormattedMessage id="microbit.connectingMicrobit" /></h3>
                            <Steps>
                                <Step number={1}>
                                    <div className="step-image">
                                        <img src="/images/microbit/mbit-connect-1.png" />
                                    </div>
                                    <p><FormattedMessage id="microbit.powerMicrobit" /></p>
                                </Step>
                                <Step number={2}>
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
                                </Step>
                                <Step number={3}>
                                    <div className="step-image">
                                        <img src="/images/microbit/mbit-connect-3.png" />
                                    </div>
                                    <p><FormattedMessage id="microbit.addExtension" /></p>
                                </Step>
                            </Steps>
                        </FlexRow>
                    </FlexRow>
                </div>
                <div className="blue things-to-try">
                    <FlexRow className="inner column">
                        <h2><FormattedMessage id="microbit.thingsToTry" /></h2>
                        <h3><FormattedMessage id="microbit.displayHelloTitle" /></h3>
                        <Steps className="display-hello">
                            <Step
                                compact
                                number={1}
                            >
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
                            </Step>
                            <Step
                                compact
                                number={2}
                            >
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
                            </Step>
                        </Steps>
                        <div className="section-separator" />
                        <h3><FormattedMessage id="microbit.starterProjects" /></h3>
                        <Steps>
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/microbit/microbit-heartbeat.sb3"
                                description={this.props.intl.formatMessage({id: 'microbit.heartBeatDescription'})}
                                imageUrl="/images/microbit/starter-heart.png"
                                title={this.props.intl.formatMessage({id: 'microbit.heartBeat'})}
                            />
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/microbit/microbit-guitar.sb3"
                                description={this.props.intl.formatMessage({id: 'microbit.tiltGuitarDescription'})}
                                imageUrl="/images/microbit/starter-guitar.png"
                                title={this.props.intl.formatMessage({id: 'microbit.tiltGuitar'})}
                            />
                            <ProjectCard
                                cardUrl="https://downloads.scratch.mit.edu/microbit/microbit-fish.sb3"
                                description={this.props.intl.formatMessage({id: 'microbit.oceanAdventureDescription'})}
                                imageUrl="/images/microbit/starter-fish.png"
                                title={this.props.intl.formatMessage({id: 'microbit.oceanAdventure'})}
                            />
                        </Steps>
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

MicroBit.propTypes = {
    intl: intlShape.isRequired
};

const WrappedMicroBit = injectIntl(MicroBit);

render(<Page><WrappedMicroBit /></Page>, document.getElementById('app'));
