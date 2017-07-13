var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');

var Page = require('../../components/page/www/page.jsx');

require('./camp.scss');

var Camp = injectIntl(React.createClass({
    type: 'Camp',
    render: function () {
        return (
            <div>
                <TitleBanner className="masthead mod-blue-bg">
                    <img src="/images/camp/ocean-top.svg" alt="Top" className="topImg"/>
                    <div className="inner">
                        <div className="title-content">
                            <h1 className="title-banner-h1">
                                <FormattedMessage id='camp.title' />
                            </h1>
                            <h4 className="intro title-banner-p">
                                <FormattedMessage id='camp.dates' />
                            </h4>
                            <img src="/images/camp/bubbles.svg" alt="Bubbles" className="bubbles"/>
                        </div>
                    </div>
                </TitleBanner>
                <div className="gradient1">
                    <section id="particpate">
                        <div className="inner">
                            <center>
                                <h2><FormattedMessage id='camp.welcome' /></h2>
                                <p id="intro">
                                    <h2><FormattedMessage id='camp.welcomeIntro' /></h2>
                                </p>
                            </center>
                            <center>
                                <img src="/images/camp/fish-divider.svg" className="fishDivider" />
                            </center>
                            <h2>
                                <center><FormattedMessage id='camp.part1Dates' /></center>
                            </h2>
                            <center>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='camp.detailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part1Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='camp.particpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part1Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            <center>
                                <img src="/images/camp/fish-divider2.svg" className="fishDivider" />
                            </center>
                            <h2>
                                <center><FormattedMessage id='camp.part2Dates' /></center>
                            </h2>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='camp.detailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part2Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='camp.particpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part2Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            <center>
                                <img src="/images/camp/fish-divider.svg" className="fishDivider" />
                            </center>
                            <h2>
                                <center><FormattedMessage id='camp.part3Dates' /></center>
                            </h2>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='camp.detailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part3Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='camp.particpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='camp.part3Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            </center>
                        </div>
                    </section>
                    <img src="/images/camp/bubbles.svg" alt="Bubbles" className="bubbles"/>
                    <section id="info">
                        <div className="inner">
                        <center><h2><FormattedMessage id='camp.helpfulInfo' /></h2></center>
                            <FlexRow className="info-content">
                                <div>
                                    <img src="/images/camp/dolphin.svg" alt="Dolphin" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='camp.infoCounselors' />
                                    </p>
                                </div>
                                <div>
                                    <img src="/images/camp/treasure.svg" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='camp.infoPart3' />
                                    </p>
                                </div>
                                <div>
                                    <img src="/images/camp/map.svg" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='camp.infoTime' />
                                    </p>
                                </div>
                            </FlexRow>
                        </div>
                    </section>
                    <img src="/images/camp/ocean-bottom.svg" alt="Top" className="bottomImg"/>
                </div>
            </div>
        );
    }
}));

render(<Page><Camp /></Page>, document.getElementById('app'));
