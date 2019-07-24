const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const OS_ENUM = require('./os-enum.js');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Steps = require('../../components/steps/steps.jsx');
const Step = require('../../components/steps/step.jsx');

require('./extension-landing.scss');

const InstallScratchLink = ({
    currentOS
}) => (
    <div className="blue install-scratch-link">
        <FlexRow className="inner column">
            <h2><FormattedMessage id="installScratchLink.installHeaderTitle" /></h2>
            <Steps>
                <div className="step">
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
                                    src={`/images/scratchlink/${
                                        currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                    }-store-badge.svg`}
                                />
                            </a>
                            <span className="horizontal-divider">
                                <FormattedMessage id="installScratchLink.or" />
                            </span>
                            <a
                                href={`https://downloads.scratch.mit.edu/link/${
                                    currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                }.zip`}
                            >
                                <FormattedMessage id="installScratchLink.directDownload" />
                            </a>
                        </div>
                    </Step>

                </div>
                <Step
                    compact
                    number={2}
                >
                    <span className="step-description">
                        <FormattedMessage id="installScratchLink.startScratchLink" />
                    </span>
                    <div className="step-image">
                        <img
                            alt=""
                            className="screenshot"
                            src={`/images/scratchlink/${
                                currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                            }-toolbar.png`}
                        />
                    </div>
                </Step>
            </Steps>
        </FlexRow>
    </div>
);

InstallScratchLink.propTypes = {
    currentOS: PropTypes.string
};

module.exports = InstallScratchLink;
