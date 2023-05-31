const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

const thumbnail = require('./high-contrast-thumbnail.png');

require('./features-banner.scss');

const FORUM_URL = 'https://scratch.mit.edu/discuss/topic/683877/';

const FeaturesBanner = () => (
    <TitleBanner className="feature-banner">
        <FlexRow className="feature-container column">
            <FlexRow className="feature-title-container">
                <h1 className="feature-header">
                    <FormattedMessage id="featurebanner.highContrast.comingSoon" />
                </h1>
                <a
                    className="feature-learn-more feature-hideable button"
                    href={FORUM_URL}
                >
                    <FormattedMessage id="featurebanner.highContrast.learnMore" />
                </a>
            </FlexRow>
            <FlexRow className="feature-banner-images">
                <a href={FORUM_URL}>
                    <FlexRow className="feature-banner-image column">
                        <img src={thumbnail} />
                        <div className="feature-image-text">
                            <FormattedMessage id="featurebanner.highContrast.forumTitle" />
                        </div>
                    </FlexRow>
                </a>
            </FlexRow>
        </FlexRow>
    </TitleBanner>
);

module.exports = FeaturesBanner;
