const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./small-top-banner.scss');

const SmallTopBanner = () => (
    <TitleBanner className="small-top-banner">
        <FlexRow className="small-top-container">
            <h2 className="copy">
                <FormattedMessage id="topBanner.subtitle" />
            </h2>
            <a
                className="call-to-action button"
                href="https://scratch.mit.edu/"
            >
                <FormattedMessage id="topBanner.callToAction" />
            </a>
        </FlexRow>
    </TitleBanner>
);

module.exports = injectIntl(SmallTopBanner);
