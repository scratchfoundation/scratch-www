const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const MediaQuery = require('react-responsive').default;

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

const frameless = require('../../../lib/frameless');

require('./middle-banner.scss');

const MiddleBanner = () => (
    <TitleBanner className="beta-middle-banner">
        <FlexRow className="beta-middle-container column">
            <h2 className="beta-header">
                <FormattedMessage id="betabanner.title" />
            </h2>
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
            <MediaQuery maxWidth={frameless.desktop - 1}>
                <div className="beta-banner-image left">
                    <img src="/images/beta/left-illustration.png" />
                </div>
            </MediaQuery>
            <div className="beta-banner-image right">
                <img src="/images/beta/right-illustration.png" />
            </div>
        </div>
    </TitleBanner>
);

module.exports = injectIntl(MiddleBanner);
