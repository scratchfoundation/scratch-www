const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const OS_ENUM = require('../../lib/os-enum.js');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('./extension-landing.scss');

// Assumes this will only be called with an OS that needs Scratch Link
const InstallScratchLink = ({
    currentOS,
    hideScratchLink
}) => (
    <div className="blue install-scratch-link">
        <FlexRow className="inner column">
            <h2><FormattedMessage id="installScratchLink.installHeaderTitle" /></h2>
            <Steps>
                <Step
                    compact
                    number={1}
                >
                    <span className="step-description">
                        <FormattedMessage id="installScratchLink.downloadAndInstall" />
                    </span>
                    <div className="downloads-container">
                        <a
                            href={
                                currentOS === OS_ENUM.WINDOWS ?
                                    'https://www.microsoft.com/store/productId/9N48XLLCZH0X' :
                                    'https://itunes.apple.com/us/app/scratch-link/id1408863490'
                            }
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <img
                                alt=""
                                className="store-badge"
                                src={`/images/badges/${
                                    currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                }-store-badge.svg`}
                            />
                        </a>
                        <span className="horizontal-divider">
                            <FormattedMessage id="installScratch.or" />
                        </span>
                        <a
                            href={`https://downloads.scratch.mit.edu/link/${
                                currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                            }.zip`}
                        >
                            <FormattedMessage id="installScratch.directDownload" />
                        </a>
                    </div>
                </Step>
                <Step
                    compact
                    number={2}
                >
                    <span className="step-description">
                        <FormattedMessage
                            id={`installScratchLink.startScratchLink.${
                                currentOS === OS_ENUM.WINDOWS ? 'Windows' : 'macOS'
                            }`}
                        />
                    </span>
                    <span className="step-image">
                        <img
                            alt=""
                            className="screenshot"
                            src={`/images/scratchlink/${
                                currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                            }-toolbar.png`}
                        />
                    </span>
                </Step>
                <Step
                    compact
                    number={3}
                >
                    {!hideScratchLink && <span className="step-description">
                        <FormattedMessage
                            id="installScratchLink.learnMore.bodyText"
                            values={{
                                linkText: (
                                    <a
                                        href="/download/scratch-link"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="installScratchLink.learnMore.linkText" />
                                    </a>
                                )
                            }}
                        />
                    </span>}
                    <span className="step-description">
                        <FormattedMessage
                            id="installScratchLink.ifYouHaveTrouble.bodyText"
                            values={{
                                linkText: (
                                    <a
                                        href="#troubleshooting"
                                    ><FormattedMessage id="installScratchLink.ifYouHaveTrouble.linkText" /></a>
                                )
                            }}
                        />
                    </span>
                </Step>
            </Steps>
        </FlexRow>
    </div>
);

InstallScratchLink.propTypes = {
    currentOS: PropTypes.string.isRequired,
    hideScratchLink: PropTypes.bool
};

module.exports = InstallScratchLink;
