const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const OS_ENUM = require('../../components/extension-landing/os-enum.js');
const {INSTALL_ENUM, installType} = require('./install-util.js');

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
                {installType(currentOS) === INSTALL_ENUM.DOWNLOAD && (
                    <FormattedMessage id="installScratch.desktopHeaderTitle" />
                )}
                {installType(currentOS) === INSTALL_ENUM.GOOGLEPLAY && (
                    <FormattedMessage
                        id="installScratch.appHeaderTitle"
                        values={{operatingsystem: currentOS}}
                    />
                )}
            </h2>
            <Steps>
                <div className="step">
                    <Step
                        compact
                        number={1}
                    >
                        <span className="step-description">
                            {installType(currentOS) === INSTALL_ENUM.DOWNLOAD && (
                                <FormattedMessage id="installScratch.downloadScratchDesktop" />
                            )}
                            {installType(currentOS) === INSTALL_ENUM.GOOGLEPLAY && (
                                <FormattedMessage id="installScratch.getScratchAppPlay" />
                            )}
                        </span>
                        <div className="downloads-container">
                            {currentOS === OS_ENUM.WINDOWS && (
                                <a
                                    className="ms-badge"
                                    href="https://www.microsoft.com/store/apps/9pfgj25jl6x3?cid=storebadge&ocid=badge"
                                >
                                    <img
                                        src="images/badges/windows-store-badge.svg"
                                    />
                                </a>
                            )}
                            {currentOS === OS_ENUM.MACOS && (
                                <a
                                    className="macos-badge"
                                    href="https://apps.apple.com/us/app/scratch-desktop/id1446785996?mt=12"
                                >
                                    <img
                                        src="images/badges/mac-store-badge.svg"
                                    />
                                </a>
                            )}
                            {installType(currentOS) === INSTALL_ENUM.GOOGLEPLAY && (
                                <a
                                    className="play-badge"
                                    href="https://play.google.com/store/apps/details?id=org.scratch"
                                >
                                    <img
                                        src="images/badges/google-play-badge.png"
                                    />
                                </a>

                            )}
                            {installType(currentOS) === INSTALL_ENUM.DOWNLOAD && (
                                <React.Fragment>
                                    <span className="horizontal-divider">
                                        <FormattedMessage id="installScratch.or" />
                                    </span>
                                    <a
                                        href={
                                            currentOS === OS_ENUM.WINDOWS ?
                                                'https://downloads.scratch.mit.edu/desktop/Scratch%20Desktop%20Setup%203.5.0.exe' :
                                                'https://downloads.scratch.mit.edu/desktop/Scratch%20Desktop-3.5.0.dmg'
                                        }

                                    >
                                        <FormattedMessage id="installScratch.directDownload" />
                                    </a>
                                </React.Fragment>
                            )}
                        </div>
                    </Step>

                </div>
                {installType(currentOS) === INSTALL_ENUM.DOWNLOAD && (
                    <Step
                        compact
                        number={2}
                    >
                        <span className="step-description">
                            {currentOS === OS_ENUM.WINDOWS ?
                                <FormattedMessage id="download.winMoveToApplications" /> :
                                <FormattedMessage id="download.macMoveToApplications" />
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
