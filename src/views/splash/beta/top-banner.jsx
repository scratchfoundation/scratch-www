const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./top-banner.scss');

const TopBanner = () => (
    <TitleBanner className="beta-top-banner">
        <FlexRow className="beta-top-container column">
            <h1 className="beta-header">
                <FormattedMessage id="betabanner.title" />
            </h1>
            <h3 className="beta-copy">
                <FormattedMessage id="betabanner.subtitle" />
            </h3>
            <a
                className="beta-try-it button"
                href="https://beta.scratch.mit.edu/"
            >
                <FormattedMessage id="betabanner.callToAction" />
            </a>
        </FlexRow>
        <div className="beta-banner-images">
            <div className="beta-banner-image left">
                <img src="/images/beta/left-illustration.png" />
            </div>
            <div className="beta-banner-image right">
                <img src="/images/beta/right-illustration.png" />
            </div>
        </div>
    </TitleBanner>
);

module.exports = injectIntl(TopBanner);
