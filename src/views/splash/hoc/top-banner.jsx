const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const MediaQuery = require('react-responsive').default;
const frameless = require('../../../lib/frameless');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

require('./hoc-banner.scss');

const TopBanner = () => (
    <TitleBanner className="hoc-banner">
        <FlexRow className="hoc-container column">
            <FlexRow className="hoc-title-container">
                <h1 className="hoc-header">
                    <FormattedMessage id="hocbanner.title" />
                </h1>
                <a
                    className="hoc-more-activities button"
                    href="/projects/editor?tutorial=all"
                >
                    <img src="/svgs/tutorials.svg" />
                    <FormattedMessage id="hocbanner.moreActivities" />
                </a>
            </FlexRow>
            <FlexRow className="hoc-banner-images">
                <MediaQuery
                    key="frameless-desktop"
                    minWidth={frameless.desktop}
                >
                    <a href="/projects/editor?tutorial=imagine">
                        <FlexRow className="hoc-banner-image column">
                            <img src="/images/hoc/imagine.jpg" />
                            <div className="hoc-image-text">
                                <FormattedMessage id="hocbanner.imagine" />
                            </div>
                        </FlexRow>
                    </a>
                </MediaQuery>
                <a href="/projects/editor?tutorial=music">
                    <FlexRow className="hoc-banner-image column">
                        <img src="/images/hoc/make-music.jpg" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.makeMusic" />
                        </div>
                    </FlexRow>
                </a>
                <a href="/projects/editor?tutorial=chase-game">
                    <FlexRow className="hoc-banner-image column">
                        <img src="/images/hoc/chase-game.jpg" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.chaseGame" />
                        </div>
                    </FlexRow>
                </a>
            </FlexRow>
        </FlexRow>
    </TitleBanner>
);

module.exports = injectIntl(TopBanner);
