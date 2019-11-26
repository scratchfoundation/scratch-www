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
                    href="https://beta.scratch.mit.edu/?tutorial=all"
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
                    <a href="https://beta.scratch.mit.edu/?tutorial=getStarted">
                        <FlexRow className="hoc-banner-image column">
                            <img src="/images/hoc/getting-started.jpg" />
                            <div className="hoc-image-text">
                                <FormattedMessage id="hocbanner.gettingStarted" />
                            </div>
                        </FlexRow>
                    </a>
                </MediaQuery>
                <a href="https://beta.scratch.mit.edu/?tutorial=animations-that-talk">
                    <FlexRow className="hoc-banner-image column">
                        <img src="/images/hoc/create-animations-that-talk.png" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.animationTalk" />
                        </div>
                    </FlexRow>
                </a>
                <a href="https://beta.scratch.mit.edu/?tutorial=animate-an-adventure-game">
                    <FlexRow className="hoc-banner-image column">
                        <img src="/images/hoc/create-an-adventure-game.jpg" />
                        <div className="hoc-image-text">
                            <FormattedMessage id="hocbanner.adventureGame" />
                        </div>
                    </FlexRow>
                </a>
            </FlexRow>
        </FlexRow>
    </TitleBanner>
);

module.exports = injectIntl(TopBanner);
