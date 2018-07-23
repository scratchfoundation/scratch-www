// const injectIntl = require('react-intl').injectIntl;
const PropTypes = require('prop-types');
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const OS_ENUM = require('./os-enum.js');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

require('./extension-landing.scss');

const InstallScratchLink = ({
    currentOS
}) => (
    <div className="blue install-scratch-link">
        <FlexRow className="inner column">
            <h2><FormattedMessage id="ev3.installScratchLink" /></h2>
            <FlexRow className="steps">
                <div className="step">
                    <FlexRow className="step-number-row">
                        <div className="step-number">1</div>
                        <FlexRow className="step-content">
                            <span className="step-description">
                                <FormattedMessage id="ev3.installScratchLinkStep" />
                            </span>
                            <a
                                className="step-image badge"
                                href={`https://downloads.scratch.mit.edu/link/${
                                    currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                }.zip`}
                            >
                                <button className="button download-button">
                                    {currentOS === OS_ENUM.WINDOWS ?
                                        <FormattedMessage id="ev3.windowsDownload" /> :
                                        <FormattedMessage id="ev3.macosDownload" />
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
                                <FormattedMessage id="ev3.startScratchLink" />
                            </span>
                            <div className="step-image">
                                <img
                                    className="screenshot"
                                    src={`/images/scratchlink/${
                                        currentOS === OS_ENUM.WINDOWS ? 'windows' : 'mac'
                                    }-toolbar.png`}
                                />
                            </div>
                        </FlexRow>
                    </FlexRow>
                </div>
            </FlexRow>
        </FlexRow>
    </div>
);

InstallScratchLink.propTypes = {
    currentOS: PropTypes.string
};

module.exports = InstallScratchLink;
