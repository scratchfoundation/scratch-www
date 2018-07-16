const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./small-top-banner.scss');

const SmallTopBanner = () => (
    <TitleBanner className="beta-small-top-banner">
        <FlexRow className="beta-small-top-container">
            <h2 className="beta-copy">
                <FormattedMessage id="betabanner.subtitle" />
            </h2>
            <a
                className="beta-try-it button"
                href="https://beta.scratch.mit.edu/"
            >
                <FormattedMessage id="betabanner.callToAction" />
            </a>
        </FlexRow>
    </TitleBanner>
);

module.exports = injectIntl(SmallTopBanner);
