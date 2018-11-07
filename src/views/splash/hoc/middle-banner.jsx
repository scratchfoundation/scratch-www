const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');
const MediaQuery = require('react-responsive').default;
const frameless = require('../../../lib/frameless');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./hoc-banner.scss');

const MiddleBanner = () => (
    <TitleBanner className="hoc-banner mod-middle-banner">
        <FlexRow className="hoc-container column">
            <FlexRow className="hoc-title-container">
                <h1 className="hoc-header">
                    <FormattedMessage id="hocbanner.title" />
                </h1>
                <a
                    className="hoc-more-activities button"
                    href="/tips"
                >
                    <img src="/svgs/tutorials.svg" />
                    <FormattedMessage id="hocbanner.moreActivities" />
                </a>
            </FlexRow>
            <FlexRow className="hoc-banner-images">
                <a href="http://localhost:8333/projects/editor/?tip_bar=name">
                    <FlexRow className="hoc-banner-image mod-middle-image column">
                        <img src="/images/ttt/animate-your-name.jpg" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.name" />
                        </div>
                    </FlexRow>
                </a>
                <a href="http://localhost:8333/projects/editor/?tip_bar=fly">
                    <FlexRow className="hoc-banner-image mod-middle-image column">
                        <img src="/images/ttt/make-it-fly.jpg" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.fly" />
                        </div>
                    </FlexRow>
                </a>
                <MediaQuery
                    key="frameless-desktop"
                    minWidth={frameless.desktop}
                >
                    <a href="http://localhost:8333/projects/editor/?tip_bar=pong">
                        <FlexRow className="hoc-banner-image mod-middle-image column">
                            <img src="/images/ttt/pong-game.jpg" />
                            <div className="hoc-image-text">
                                <FormattedMessage id="hocbanner.pong" />
                            </div>
                        </FlexRow>
                    </a>
                </MediaQuery>
                
            </FlexRow>
        </FlexRow>
    </TitleBanner>
);

module.exports = injectIntl(MiddleBanner);
