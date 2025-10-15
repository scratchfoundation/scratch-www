const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const OS_ENUM = require('../../lib/os-enum.js');

const {isDownloaded, isFromGooglePlay} = require('./install-util.js');

const externalLinks = require('../../lib/external-links.js');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('./install-scratch.scss');

const InstallScratch = ({
    currentOS
}) => (
    <div className="blue install-scratch">
        <FlexRow className="inner column">
            <h2 className="title">
                <FormattedMessage
                    id="installScratch.appHeaderTitle"
                    values={{operatingsystem: currentOS}}
                />
            </h2>
            <Steps>
                <div className="step">
                    <Step
                        compact
                        number={1}
                    >
                        <span className="step-description">
                            <React.Fragment>
                                {currentOS === OS_ENUM.WINDOWS && (
                                    <FormattedMessage
                                        id="installScratch.getScratchAppWindows"
                                    />
                                )}
                                {currentOS === OS_ENUM.MACOS && (
                                    <FormattedMessage
                                        id="installScratch.getScratchAppMacOs"
                                    />
                                )}
                                {isFromGooglePlay(currentOS) && (
                                    <FormattedMessage id="installScratch.getScratchAppPlay" />
                                )}
                            </React.Fragment>
                        </span>
                        <div className="downloads-container">
                            {currentOS === OS_ENUM.WINDOWS && (
                                <a
                                    className="ms-badge"
                                    href={externalLinks.scratchApp.downloadWindowsStore}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <img
                                        src="/images/badges/windows-store-badge.svg"
                                    />
                                </a>
                            )}
                            {currentOS === OS_ENUM.MACOS && (
                                <a
                                    className="macos-badge"
                                    href={externalLinks.scratchApp.downloadMacStore}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <img
                                        src="/images/badges/mac-store-badge.svg"
                                    />
                                </a>
                            )}
                            {isFromGooglePlay(currentOS) && (
                                <a
                                    className="play-badge"
                                    href={externalLinks.scratch.googlePlay}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <img
                                        src="/images/badges/google-play-badge.png"
                                    />
                                </a>

                            )}
                            {isDownloaded(currentOS) && (
                                <React.Fragment>
                                    <span className="horizontal-divider">
                                        <FormattedMessage id="installScratch.or" />
                                    </span>
                                    <a
                                        href={currentOS === OS_ENUM.WINDOWS ?
                                            externalLinks.scratchApp.downloadWindowsDirect :
                                            externalLinks.scratchApp.downloadMacDirect
                                        }
                                    >
                                        <FormattedMessage id="installScratch.directDownload" />
                                    </a>
                                </React.Fragment>
                            )}
                        </div>
                    </Step>

                </div>
                {isDownloaded(currentOS) && (
                    <Step
                        compact
                        number={2}
                    >
                        <span className="step-description">
                            {currentOS === OS_ENUM.WINDOWS ?
                                <FormattedMessage id="download.winMoveToApplications" /> :
                                <FormattedMessage id="download.macMoveAppToApplications" />
                            }
                        </span>

                        <div className="step-image">
                            <img
                                alt=""
                                className="screenshot"
                                src={`/images/download/${
                                    currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                }-install.png`}
                            />
                        </div>
                    </Step>
                )}
            </Steps>
        </FlexRow>
    </div>
);

InstallScratch.propTypes = {
    currentOS: PropTypes.string
};

module.exports = InstallScratch;
