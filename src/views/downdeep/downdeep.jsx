var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');

var Page = require('../../components/page/www/page.jsx');

require('./downdeep.scss');

var Downdeep = injectIntl(React.createClass({
    type: 'Downdeep',
    render: function () {
        return (
            <div>
                <TitleBanner className="masthead mod-blue-bg">
                    <img src="/images/downdeep/ocean-top.svg" alt="Top" className="topImg"/>
                    <div className="inner">
                        <div className="title-content">
                            <h1 className="title-banner-h1">
                                <FormattedMessage id='downdeep.title' />
                            </h1>
                            <p className="intro title-banner-p">
                                <FormattedMessage id='downdeep.dates' />
                            </p>
                            <img src="/images/downdeep/bubbles.svg" alt="Bubbles" className="bubbles"/>
                        </div>
                    </div>
                </TitleBanner>
                <div className="gradient1">
                    <section id="particpate">
                        <div className="inner">
                            <center>
                                <h2><FormattedMessage id='downdeep.welcome' /></h2>
                                <p className="intro">
                                    <h2><FormattedMessage id='downdeep.welcomeIntro' /></h2>
                                </p>
                            </center>
                            <center><img src="/images/downdeep/fish-divider.svg" alt="FishDivider" className="fishDivider"/></center>
                            <h2>
                                <center><FormattedMessage id='downdeep.part1Dates' /></center>
                            </h2>
                            <center>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='downdeep.part1DetailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part1Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='downdeep.part1ParticpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part1Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            <center>
                                <img src="/images/downdeep/fish-divider2.svg" alt="FishDivider2" className="fishDivider"/>
                            </center>
                            <h2>
                                <center><FormattedMessage id='downdeep.part2Dates' /></center>
                            </h2>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='downdeep.part2DetailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part2Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='downdeep.part2ParticpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part2Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            <center><img src="/images/downdeep/fish-divider.svg" alt="FishDivider" className="fishDivider"/></center>
                            <h2><center><FormattedMessage id='downdeep.part3Dates' /></center></h2>
                            <FlexRow className="sidebar-row">
                                <div className="body-copy column">
                                    <h3><FormattedMessage id='downdeep.part3DetailsTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part3Details' />
                                    </p>
                                </div>
                                <div className="sidebar column">
                                    <h3><FormattedMessage id='downdeep.part3ParticpateTitle' /></h3>
                                    <p>
                                        <FormattedMessage id='downdeep.part3Particpate' />
                                    </p>
                                </div>
                            </FlexRow>
                            </center>
                        </div>
                    </section>
                    <img src="/images/downdeep/bubbles.svg" alt="Bubbles" className="bubbles"/>
                    <section id="info">
                        <div className="inner">
                        <center><h2><FormattedMessage id='downdeep.helpfulInfo' /></h2></center>
                            <FlexRow className="info-content">
                                <div>
                                    <img src="/images/downdeep/dolphin.svg" alt="Dolphin" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='downdeep.infoCounselors' />
                                    </p>
                                </div>
                                <div>
                                    <img src="/images/downdeep/treasure.svg" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='downdeep.infoPart3' />
                                    </p>
                                </div>
                                <div>
                                    <img src="/images/downdeep/map.svg" className="infoImg" />
                                    <p>
                                        <FormattedMessage id='downdeep.infoTime' />
                                    </p>
                                </div>
                            </FlexRow>
                        </div>
                    </section>
                    <img src="/images/downdeep/ocean-bottom.svg" alt="Top" className="bottomImg"/>
                </div>
            </div>
        );
    }
}));

render(<Page><Downdeep /></Page>, document.getElementById('app'));
