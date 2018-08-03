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
                        <a
                            className="step-image badge"
                            href={`https://downloads.scratch.mit.edu/link/${
                                currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                            }.zip`}
                        >
                            <button className="button download-button">
                                {currentOS === OS_ENUM.WINDOWS ?
                                    <FormattedMessage id="installScratchLink.windowsDownload" /> :
                                    <FormattedMessage id="installScratchLink.macosDownload" />
                                }
                                <img src="/svgs/extensions/download-white.svg" />
                            </button>
                        </a>
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
