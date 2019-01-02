const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const MediaQuery = require('react-responsive').default;

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

const frameless = require('../../../lib/frameless');

require('./middle-banner.scss');

const MiddleBanner = () => (
    <TitleBanner className="feature-middle-banner">
        <FlexRow className="feature-middle-container column">
            <h2 className="feature-header">
                <FormattedMessage id="featureBanner.title" />
            </h2>
            <h3 className="feature-copy">
                <FormattedMessage id="featureBanner.subtitle" />
            </h3>
            <a
                className="feature-call-to-action button"
                href="https://scratch.mit.edu/"
            >
                <FormattedMessage id="featureBanner.callToAction" />
            </a>
        </FlexRow>
        <div className="feature-banner-images">
            <MediaQuery maxWidth={frameless.desktop - 1}>
                <div className="feature-banner-image left">
                    <img src="/images/feature/left-illustration.png" />
                </div>
            </MediaQuery>
            <div className="feature-banner-image right">
                <img src="/images/feature/right-illustration.png" />
            </div>
        </div>
    </TitleBanner>
);

module.exports = injectIntl(MiddleBanner);
