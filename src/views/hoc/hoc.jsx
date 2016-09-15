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
                    <h1>
                        <FormattedMessage id='hoc.title' />
                    </h1>
                    <p>
                        <FormattedMessage id='hoc.subTitle' />
                    </p>

                    <section className="section title-banner-section">
                        <FlexRow>
                            <div className="flex-row-card">
                                <a href="/projects/editor/?tip_bar=name">
                                    <div className="flex-row-card-info"
                                         onMouseEnter={this.onCardEnter.bind(this, 'name-bg')}>
                                        <img className="img card-info"
                                             src="/images/hoc/name-tutorial.jpg"
                                             alt="" />
                                        <Button className="card-info">
                                            <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="flex-row-card" onMouseEnter={this.onCardEnter.bind(this, 'wbb-bg')}>
                                <a href="/projects/editor/?tip_bar=fly">
                                    <div className="flex-row-card-info">
                                        <img className="img card-info"
                                             src="/images/hoc/make-it-fly-tutorial.png"
                                             alt="" />
                                        <Button className="card-info">
                                            <FormattedMessage id='hoc.tipsMakeItFlyTitle' />
                                        </Button>
                                    </div>
                                </a>
                            </div>

                            <div className="flex-row-card" onMouseEnter={this.onCardEnter.bind(this, 'dance-bg')}>
                                <a href="/projects/editor/?tip_bar=music">
                                    <div className="flex-row-card-info">
                                        <img className="img card-info"
                                             src="/images/hoc/make-music-tutorial.png"
                                             alt="" />
                                        <Button className="card-info">
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
                        <section id="teacher" className="section">
                            <div className="section-column">
                                <h3>
                                    <FormattedMessage id='hoc.activityCardsHeader' />
                                </h3>
                                <p className="section-paragraph">
                                    <FormattedHTMLMessage id='hoc.activityCardsInfo1' />
                                </p>
                            </div>

                            <div className="resource">
                                <img className="img mod-resource"
                                     src="/svgs/tips-card.svg"
                                     alt="" />
                                <div className="resource-info">
                                    <h5 className="resource-info-header">
                                        <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                    </h5>
                                    <a className="resource-anchor"
                                       href="/scratchr2/static/pdfs/help/AnimateYourNameCards.pdf">
                                        <FormattedMessage id='hoc.activityCards' />
                                    </a>
                                    <a className="resource-anchor"
                                       href="/scratchr2/static/pdfs/help/AnimateYourNameGuide.pdf">
                                        <FormattedMessage id='hoc.facilitatorGuide' />
                                    </a>
                                </div>
                            </div>
                        </section>

                        <section className="section">
                            <div className="section-column mod-split">
                                <h3>
                                    <FormattedMessage id='hoc.helpScratch' />
                                </h3>
                                <p className="section-paragraph">
                                    <FormattedHTMLMessage id='hoc.helpScratchDescription' />
                                </p>
                            </div>
                            <div className="section-column mod-split">
                                <img className="img mod-border"
                                     src="/images/hoc/tips-test-animation.gif"
                                     alt="Tips Window Animation" />
                            </div>
                        </section>

                        <section className="section">
                            <div className="section-column">
                                <h3>
                                    <FormattedMessage id='hoc.moreActivities' />
                                </h3>
                                <p className="section-paragraph">
                                    <FormattedHTMLMessage id='hoc.moreDescription' />
                                 </p>
                            </div>

                            <FlexRow>
                                <div className="flex-row-card">
                                    <a href="/projects/editor/?tip_bar=getStarted">
                                        <div className="flex-row-card-info">
                                            <img className="img card-info"
                                                 src="/images/hoc/getting-started-tutorial.jpg" alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsGetStarted' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-row-card">
                                    <a href="/bearstack/">
                                        <div className="flex-row-card-info">
                                            <img className="img card-info"
                                                 src="/images/hoc/bearstack-tutorial.jpg"
                                                 alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsBearstack' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-row-card">
                                    <a href="/hoops">
                                        <div className="flex-row-card-info">
                                            <img className="img card-info"
                                                 src="/images/hoc/bball-tutorial.jpg"
                                                 alt="" />
                                            <Button>
                                                <FormattedMessage id='hoc.tipsBBallHoops' />
                                            </Button>
                                        </div>
                                    </a>
                                </div>
                            </FlexRow>
                        </section>

                        <section className="section">
                            <div className="section-column">
                                <h3>
                                    <FormattedMessage id='hoc.addToStudios' />
                                </h3>
                                <p className="section-paragraph">
                                    <FormattedHTMLMessage id='hoc.addToStudiosDescription' />
                                 </p>
                            </div>

                            <FlexRow>
                                <div className="studio">
                                    <img className="img mod-studio"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="studio-info">
                                        <a href="/studios/432299/">
                                            <h5 className="studio-info-header">
                                                <FormattedMessage id='hoc.tipsAnimateYourNameTitle' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>

                            
                                <div className="studio">
                                    <img className="img mod-studio"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="studio-info">
                                        <a href="/studios/1672166/">
                                            <h5 className="studio-info-header">
                                                <FormattedMessage id='hoc.studioWeBareBears' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>
                            </FlexRow>

                            <FlexRow>
                                <div className="studio">
                                    <img className="img mod-studio"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="studio-info">
                                        <a href="/studios/1999784/">
                                            <h5 className="studio-info-header">
                                                <FormattedMessage id='hoc.tipsMakeMusicTitle' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>

                                <div className="studio">
                                    <img className="img mod-studio"
                                         src="/svgs/studio.svg"
                                         alt="" />
                                    <div className="studio-info">
                                        <a href="/studios/1672164/">
                                            <h5 className="studio-info-header">
                                                <FormattedMessage id='hoc.studioAlice' />
                                            </h5>
                                        </a>
                                    </div>
                                </div>
                            </FlexRow>
                        </section>
                    </Box>

                    <section className="section">
                        <h3>
                            <FormattedMessage
                                id='general.collaborators'
                                defaultMessage={'Collaborators'} />
                        </h3>
                        <div className="logos">
                            <a href="http://scratched.gse.harvard.edu/">
                                <img className="img mod-logo"
                                     src="/images/hoc/scratchEd-logo.png"
                                     alt="ScratchEd" />
                            </a>
                            <a href="https://code.org/">
                                <img className="img mod-logo"
                                     src="/images/hoc/code-org-logo.png"
                                     alt="code.org" />
                            </a>
                            <a href="http://www.cartoonnetwork.com/">
                                <img className="img mod-logo"
                                     src="/images/hoc/cn-logo.png"
                                     alt="Cartoon Network" />
                            </a>
                            <a href="http://www.madewithcode.com/">
                                <img className="img mod-logo"
                                     src="/images/hoc/made-with-code-logo.png"
                                     alt="Made with Code" />
                            </a>
                            <a href="http://www.paalive.org/">
                                <img className="img mod-logo"
                                     src="/images/hoc/paa-logo.png"
                                     alt="Progressive Arts Alliance" />
                            </a>
                            <a href="http://www.catrobat.org/">
                                <img className="img mod-logo"
                                     src="/images/hoc/pocketcode-logo.png"
                                     alt="Pocket Code" />
                            </a>
                        </div>

                        <div className="trademark">
                            <p className="section-paragraph legal">
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
