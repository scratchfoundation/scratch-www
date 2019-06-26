const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const bindAll = require('lodash.bindall');
const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const OS_ENUM = require('../../components/extension-landing/os-enum.js');
const OSChooser = require('../../components/os-chooser/os-chooser.jsx');

require('./download.scss');
require('../../components/forms/button.scss');

class Download extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'onSetOS'
        ]);
        let detectedOS = OS_ENUM.WINDOWS;
        if (window.navigator && window.navigator.platform) {
            if (window.navigator.platform === 'MacIntel') {
                detectedOS = OS_ENUM.MACOS;
            }
        }

        this.state = {
            OS: detectedOS
        };
    }

    onSetOS (os) {
        this.setState({
            OS: os
        });
    }

    render () {
        return (
            <div className="download">
                <div className="download-header">
                    <FlexRow className="inner">
                        <FlexRow className="column download-info">
                            <FlexRow className="column download-copy">
                                <h1 className="download-title">
                                    <img
                                        alt={this.props.intl.formatMessage({id: 'download.iconAltText'})}
                                        className="icon"
                                        height="40"
                                        src="/images/download/icon.png"
                                        width="40"
                                    />
                                    <FormattedMessage id="download.title" />
                                </h1>
                                <span className="download-description">
                                    <FormattedMessage id="download.intro" />
                                </span>
                            </FlexRow>
                            <FlexRow className="column download-requirements-container">
                                <span className="requirements-header">
                                    <FormattedMessage id="download.requirements" />
                                </span>
                                <FlexRow className="download-requirements">
                                    <span>
                                        <img
                                            alt=""
                                            src="/svgs/extensions/windows.svg"
                                        />
                                                Windows 10+
                                    </span>
                                    <span>
                                        <img
                                            alt=""
                                            src="svgs/extensions/mac.svg"
                                        />
                                                macOS 10.13+
                                    </span>
                                </FlexRow>
                            </FlexRow>
                        </FlexRow>
                        <div className="download-image">
                            <img
                                alt={this.props.intl.formatMessage({id: 'download.imgAltDownloadIllustration'})}
                                src="/images/download/download.png"
                            />
                        </div>
                    </FlexRow>
                </div>
                <OSChooser
                    currentOS={this.state.OS}
                    handleSetOS={this.onSetOS}
                />
                <div className="blue install-scratch">
                    <FlexRow className="inner column">
                        <h2 className="title">
                            <FormattedMessage id="download.installHeaderTitle" />
                        </h2>
                        <Steps>
                            <div className="step">
                                <Step
                                    compact
                                    number={1}
                                >
                                    <span className="step-description">
                                        <FormattedMessage id="download.downloadScratchDesktop" />
                                    </span>
                                    <div className="downloads-container">
                                        <a
                                            className="download-button"
                                            href={
                                                this.state.OS === OS_ENUM.WINDOWS ?
                                                    'https://downloads.scratch.mit.edu/desktop/Scratch%20Desktop%20Setup%203.4.0.exe' :
                                                    'https://downloads.scratch.mit.edu/desktop/Scratch%20Desktop-3.4.0.dmg'
                                            }
                                        >
                                            <FormattedMessage id="download.downloadButton" />
                                        </a>
                                    </div>
                                </Step>

                            </div>
                            <Step
                                compact
                                number={2}
                            >
                                <span className="step-description">
                                    {this.state.OS === OS_ENUM.WINDOWS ?
                                        <FormattedMessage id="download.winMoveToApplications" /> :
                                        <FormattedMessage id="download.macMoveToApplications" />
                                    }
                                </span>

                                <div className="step-image">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        src={`/images/download/${
                                            this.state.OS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                        }-install.png`}
                                    />
                                </div>
                            </Step>
                        </Steps>
                    </FlexRow>
                </div>
                <div className="download-section faq">
                    <FlexRow className="inner column">
                        <h2 className="title">
                            <FormattedMessage id="download.troubleshootingTitle" />
                        </h2>

                        <h3 className="faq-question">
                            <FormattedMessage id="download.canIUseScratchLink" />
                        </h3>
                        <p>
                            <FormattedMessage id="download.canIUseScratchLinkAnswer" />
                        </p>
                        <h3 className="faq-question">
                            <FormattedMessage id="download.desktopAndBrowser" />
                        </h3>
                        <p>
                            <FormattedMessage id="download.yesAnswer" />
                        </p>
                        <h3 className="faq-question">
                            <FormattedMessage id="download.canIShare" />
                        </h3>
                        <p>
                            <FormattedMessage id="download.canIShareAnswer" />
                        </p>
                        <h3 className="faq-question">
                            <FormattedMessage id="download.supportChromeOS" />
                        </h3>
                        <p>
                            <FormattedMessage id="download.supportChromeOSAnswer" />
                        </p>
                        <h3 className="faq-question">
                            <FormattedMessage id="download.whenSupportLinux" />
                        </h3>
                        <p>
                            <FormattedMessage id="download.supportLinuxAnswer" />
                        </p>
                    </FlexRow>
                </div>
                <div className="download-section blue">
                    <FlexRow className="inner column">
                        <h2 className="title">
                            <FormattedMessage id="download.olderVersionsTitle" />
                        </h2>
                        <p>
                            <FormattedMessage id="download.olderVersions" />
                        </p>
                        <FlexRow>
                            <div className="older-version">
                                <a href="/download/scratch2">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        height="106"
                                        src="/images/download/scratch2.png"
                                        width="150"
                                    />
                                </a>
                                <p>
                                    <a
                                        className="legacy-link"
                                        href="/download/scratch2"
                                    >
                                        <FormattedMessage id="download.scratch2Desktop" />
                                        <img
                                            className="little-arrow"
                                            src="/svgs/download/r-arrow.svg"
                                        />
                                    </a>
                                </p>
                            </div>
                            <div className="older-version">
                                <a href="/scratch_1.4">
                                    <img
                                        alt=""
                                        className="screenshot"
                                        height="106"
                                        src="/images/download/scratch1-4.png"
                                        width="150"
                                    />
                                </a>
                                <p>
                                    <a
                                        className="legacy-link"
                                        href="/scratch_1.4"
                                    >
                                        <FormattedMessage id="download.scratch1-4Desktop" />
                                        <img
                                            className="little-arrow"
                                            src="/svgs/download/r-arrow.svg"
                                        />
                                    </a>
                                </p>
                            </div>
                        </FlexRow>
                    </FlexRow>
                </div>
            </div>
        );

    }
}
Download.propTypes = {
    intl: intlShape

};

const WrappedDownload = injectIntl(Download);

render(<Page><WrappedDownload /></Page>, document.getElementById('app'));
