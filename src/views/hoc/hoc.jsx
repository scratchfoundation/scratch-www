var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var React = require('react');
var render = require('../../lib/render.jsx');

var Button = require('../../components/forms/button.jsx');
var Box = require('../../components/box/box.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var Page = require('../../components/page/www/page.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./hoc.scss');

var Hoc = React.createClass({
    type: 'Hoc',

    getInitialState: function () {
        return {
            bgClass: ''
        };
    },
    onCardEnter: function (bgClass) {
        this.setState({
            bgClass: bgClass
        });
    },
    render: function () {
        return (
            <div className="hoc">
                <TitleBanner className={this.state.bgClass}>
                    <h1 className="title-banner-h1">
                        <FormattedMessage id='hoc.title' />
                    </h1>
                    <p className="title-banner-p">
                        <FormattedMessage id='hoc.subTitle' />
                    </p>

                    <section className="hoc-section mod-title-banner">
                        <FlexRow>
                            <div className="flex-row-card">
                                <a href="/projects/editor/?tip_bar=name">
                                    <div className="flex-row-card-info"
                                         onMouseEnter={this.onCardEnter.bind(this, 'mod-name-bg')}>
                                        <img className="flex-row-card-info-img"
                                             src="/images/hoc/name-tutorial.jpg"
                                             alt="" />
                                        <Button className="flex-row-card-info-button">
                                            <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="flex-row-card" onMouseEnter={this.onCardEnter.bind(this, 'mod-wbb-bg')}>
                                <a href="/projects/editor/?tip_bar=fly">
                                    <div className="flex-row-card-info">
                                        <img className="flex-row-card-info-img"
                                             src="/images/hoc/make-it-fly-tutorial.jpg"
                                             alt="" />
                                        <Button className="flex-row-card-info-button">
                                            <FormattedMessage id='hoc.tipsMakeItFlyTitle' />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="flex-row-card" onMouseEnter={this.onCardEnter.bind(this, 'mod-dance-bg')}>
                                <a href="/projects/editor/?tip_bar=music">
                                    <div className="flex-row-card-info">
                                        <img className="flex-row-card-info-img"
                                             src="/images/hoc/make-music-tutorial.png"
                                             alt="" />
                                        <Button className="flex-row-card-info-button">
                                            <FormattedMessage id='hoc.tipsMakeMusicTitle' />
                                        </Button>
                                    </div>
                                </a>
                            </div>
                        </FlexRow>
                    </section>
                    
                    <SubNavigation>
                        <li className="description">
                            <FormattedMessage id='hoc.findOutMore' />:
                        </li>
                        <a href="/about/">
                            <li>
                                <FormattedMessage id='general.about' />
                            </li>
                        </a>
                        <a href="/parents/">
                            <li>
                                <FormattedMessage id='general.forParents' />
                            </li>
                        </a>
                        <a href="/educators/">
                            <li>
                                <FormattedMessage id='general.forEducators'/>
                            </li>
                        </a>
                    </SubNavigation>
                </TitleBanner>

                

                <div className="inner">
                    <Box title={''}>
                        <section id="teacher" className="hoc-section">
                            <div className="hoc-section-column">
                                <h3>
                                    <FormattedMessage id='hoc.activityCardsHeader' />
                                </h3>
                                <p className="section-paragraph">
                                    <FormattedHTMLMessage id='hoc.activityCardsInfo1' />
                                </p>
                            </div>

                            <div className="hoc-section-resource">
                                <img className="hoc-section-resource-img"
                                     src="/svgs/tips-card.svg"
                                     alt="" />
                                <div className="hoc-section-resource-info">
                                    <h5 className="hoc-section-resource-info-header">
                                        <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                    </h5>
                                    <a className="hoc-section-resource-anchor"
                                       href="/scratchr2/static/pdfs/help/AnimateYourNameCards.pdf">
                                        <FormattedMessage id='hoc.activityCards' />
                                    </a>
                                    <a className="hoc-section-resource-anchor"
                                       href="/scratchr2/static/pdfs/help/AnimateYourNameGuide.pdf">
                                        <FormattedMessage id='hoc.facilitatorGuide' />
                                    </a>
                                </div>
                            </div>
                            <div className="hoc-section-resource">
                                <img className="hoc-section-resource-img"
                                     src="/svgs/tips-card.svg"
                                     alt="" />
                                <div className="hoc-section-resource-info">
                                    <h5 className="hoc-section-resource-info-header">
                                        <FormattedMessage id='hoc.tipsMakeItFlyTitle' />
                                    </h5>
                                    <a className="hoc-section-resource-anchor"
                                       href="/scratchr2/static/pdfs/help/FlyCards.pdf">
                                        <FormattedMessage id='hoc.activityCards' />
                                    </a>
                                </div>
                            </div>
                            <div className="hoc-section-resource">
                                <img className="hoc-section-resource-img"
                                     src="/svgs/tips-card.svg"
                                     alt="" />
                                <div className="hoc-section-resource-info">
                                    <h5 className="hoc-section-resource-info-header">
                                        <FormattedMessage id='hoc.tipsMakeMusicTitle' />
                                    </h5>
                                    <a className="hoc-section-resource-anchor"
                                       href="/scratchr2/static/pdfs/help/MusicCards.pdf">
                                        <FormattedMessage id='hoc.activityCards' />
                                    </a>
                                </div>
                            </div>
                        </section>

                        <section className="hoc-section">
                            <div className="hoc-section-column mod-split">
                                <h3>
                                    <FormattedMessage id='hoc.helpScratch' />
                                </h3>
                                <p className="hoc-section-paragraph">
                                    <FormattedHTMLMessage id='hoc.helpScratchDescription' />
                                </p>
                            </div>
                            <div className="hoc-section-column mod-split">
                                <img className="hoc-section-column-img"
                                     src="/images/hoc/tips-test-animation.gif"
                                     alt="Tips Window Animation" />
                            </div>
                        </section>

                        <section className="hoc-section">
                            <div className="hoc-section-column">
                                <h3>
                                    <FormattedMessage id='hoc.moreActivities' />
                                </h3>
                                <p className="hoc-section-paragraph">
                                    <FormattedHTMLMessage id='hoc.moreDescription' />
                                 </p>
                            </div>

                            <FlexRow>
                                <div className="flex-row-card">
                                    <a href="/projects/editor/?tip_bar=getStarted">
                                        <div className="flex-row-card-info">
                                            <img className="flex-row-card-info-img"
                                                 src="/images/hoc/getting-started-tutorial.jpg" alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsGetStarted' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-row-card">
                                    <a href="/hide/">
                                        <div className="flex-row-card-info">
                                            <img className="flex-row-card-info-img"
                                                 src="/images/hoc/hide-seek-tutorial.jpg"
                                                 alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsHideAndSeekTitle' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-row-card">
                                    <a href="/projects/editor/?tip_bar=dance">
                                        <div className="flex-row-card-info">
                                            <img className="flex-row-card-info-img"
                                                 src="/images/hoc/dance-tutorial.jpg"
                                                 alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsDanceTitle' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>
                            </FlexRow>
                        </section>

                        <section className="hoc-section">
                            <div className="hoc-section-column">
                                <h3>
                                    <FormattedMessage id='hoc.addToStudios' />
                                </h3>
                                <p className="hoc-section-paragraph">
                                    <FormattedHTMLMessage id='hoc.addToStudiosDescription' />
                                 </p>
                            </div>

                            <FlexRow className="mod-studio">
                                <div className="hoc-section-studio">
                                    <img className="hoc-section-studio-img"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="hoc-section-studio-info">
                                        <a href="/studios/432299/">
                                            <h5 className="hoc-section-studio-info-header">
                                                <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>

                                <div className="hoc-section-studio">
                                    <img className="hoc-section-studio-img"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="hoc-section-studio-info">
                                        <a href="/studios/1999784/">
                                            <h5 className="hoc-section-studio-info-header">
                                                <FormattedMessage id='hoc.tipsMakeMusicTitle' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>

                                <div className="hoc-section-studio">
                                    <img className="hoc-section-studio-img"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="hoc-section-studio-info">
                                        <a href="/studios/2050750/">
                                            <h5 className="hoc-section-studio-info-header">
                                                <FormattedMessage id='hoc.tipsMakeItFlyTitle' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>
                            </FlexRow>
                        </section>
                    </Box>

                    <section className="hoc-section">
                        <h3>
                            <FormattedMessage
                                id='general.collaborators'
                                defaultMessage={'Collaborators'} />
                        </h3>
                        <div className="hoc-section-logos">
                            <a href="http://scratched.gse.harvard.edu/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/scratchEd-logo.png"
                                     alt="ScratchEd" />
                            </a>
                            <a href="https://code.org/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/code-org-logo.png"
                                     alt="code.org" />
                            </a>
                            <a href="http://www.cartoonnetwork.com/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/cn-logo.png"
                                     alt="Cartoon Network" />
                            </a>
                            <a href="http://www.madewithcode.com/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/made-with-code-logo.png"
                                     alt="Made with Code" />
                            </a>
                            <a href="http://www.paalive.org/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/paa-logo.png"
                                     alt="Progressive Arts Alliance" />
                            </a>
                            <a href="http://www.catrobat.org/">
                                <img className="hoc-section-logos-img"
                                     src="/images/hoc/pocketcode-logo.png"
                                     alt="Pocket Code" />
                            </a>
                        </div>

                        <div className="hoc-section-trademark">
                            <p className="hoc-section-paragraph legal">
                                <FormattedHTMLMessage id='hoc.officialNotice' />
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><Hoc /></Page>, document.getElementById('app'));
