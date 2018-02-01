const React = require('react');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const render = require('../../lib/render.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');

const Page = require('../../components/page/www/page.jsx');

require('./camp.scss');

const Camp = injectIntl(() => (
    <div>
        <TitleBanner className="masthead mod-blue-bg">
            <img
                alt="Top"
                className="topImg"
                src="/images/camp/ocean-top.svg"
            />
            <div className="inner">
                <div className="title-content">
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="camp.title" />
                    </h1>
                    <h4 className="intro title-banner-p">
                        <FormattedMessage id="camp.dates" />
                    </h4>
                    <img
                        alt="Bubbles"
                        className="bubbles"
                        src="/images/camp/bubbles.svg"
                    />
                </div>
            </div>
        </TitleBanner>
        <div className="gradient1">
            <section id="particpate">
                <div className="inner">
                    <center>
                        <h2><FormattedMessage id="camp.welcome" /></h2>
                        <p id="intro">
                            <FormattedHTMLMessage id="camp.welcomeIntro" />
                        </p>
                    </center>
                    <center>
                        <img
                            className="fishDivider"
                            src="/images/camp/fish-divider.svg"
                        />
                    </center>
                    <h2>
                        <center><FormattedMessage id="camp.part1Dates" /></center>
                    </h2>
                    <center>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id="camp.detailsTitle" /></h3>
                                <p>
                                    <FormattedMessage id="camp.part1Details" />
                                </p>
                            </div>
                            <div className="sidebar column">
                                <h3><FormattedMessage id="camp.particpateTitle" /></h3>
                                <p>
                                    <FormattedHTMLMessage id="camp.part1Particpate" />
                                </p>
                            </div>
                        </FlexRow>
                        <center>
                            <img
                                className="fishDivider"
                                src="/images/camp/fish-divider2.svg"
                            />
                        </center>
                        <h2>
                            <center><FormattedMessage id="camp.part2Dates" /></center>
                        </h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id="camp.detailsTitle" /></h3>
                                <p>
                                    <FormattedMessage id="camp.part2Details" />
                                </p>
                            </div>
                            <div className="sidebar column">
                                <h3><FormattedMessage id="camp.particpateTitle" /></h3>
                                <p>
                                    <FormattedHTMLMessage id="camp.part2Particpate" />
                                </p>
                            </div>
                        </FlexRow>
                        <center>
                            <img
                                className="fishDivider"
                                src="/images/camp/fish-divider.svg"
                            />
                        </center>
                        <h2>
                            <center><FormattedMessage id="camp.part3Dates" /></center>
                        </h2>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id="camp.detailsTitle" /></h3>
                                <p>
                                    <FormattedMessage id="camp.part3Details" />
                                </p>
                            </div>
                            <div className="sidebar column">
                                <h3><FormattedMessage id="camp.particpateTitle" /></h3>
                                <p>
                                    <FormattedHTMLMessage id="camp.part3Particpate" />
                                </p>
                            </div>
                        </FlexRow>
                    </center>
                </div>
            </section>
            <img
                alt="Bubbles"
                className="bubbles"
                src="/images/camp/bubbles.svg"
            />
            <section id="info">
                <div className="inner">
                    <center><h2><FormattedMessage id="camp.helpfulInfo" /></h2></center>
                    <FlexRow className="info-content">
                        <div>
                            <img
                                alt="Dolphin"
                                className="infoImg"
                                src="/images/camp/dolphin.svg"
                            />
                            <p>
                                <FormattedHTMLMessage id="camp.infoCounselors" />
                            </p>
                        </div>
                        <div>
                            <img
                                className="infoImg"
                                src="/images/camp/treasure.svg"
                            />
                            <p>
                                <FormattedMessage id="camp.infoPart3" />
                            </p>
                        </div>
                        <div>
                            <img
                                className="infoImg"
                                src="/images/camp/map.svg"
                            />
                            <p>
                                <FormattedMessage id="camp.infoTime" />
                            </p>
                        </div>
                    </FlexRow>
                </div>
            </section>
            <img
                alt="Top"
                className="bottomImg"
                src="/images/camp/ocean-bottom.svg"
            />
        </div>
    </div>
));

render(<Page><Camp /></Page>, document.getElementById('app'));
