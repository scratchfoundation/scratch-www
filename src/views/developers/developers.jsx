var React = require('react');
var render = require('../../lib/render.jsx');

var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;

var Page = require('../../components/page/www/page.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');

require('./developers.scss');

var Developers = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div className="developers">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1><FormattedMessage id='developers.title' /></h1>
                        <p className="intro">
                            <FormattedHTMLMessage id='developers.intro' />
                        </p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#projects">
                                <li>
                                    <FormattedMessage id='developers.projectsTitle' />
                                </li>
                            </a>
                            <a href="#principles">
                                <li>
                                    <FormattedMessage id='developers.principlesTitle' />
                                </li>
                            </a>
                            <a href="#donate">
                                <li>
                                    <FormattedMessage id='developers.donateTitle' />
                                </li>
                            </a>
                            <a href="#partners">
                                <li>
                                    <FormattedMessage id='developers.partnersTitle' />
                                </li>
                            </a>
                            <a href="#faq">
                                <li>
                                    <FormattedMessage id='developers.faqTitle' />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>

                <div className="inner">
                    <section id="projects">
                        <span className="nav-spacer"></span>
                        <h2>Projects</h2>
                        <p className="intro">
                            <FormattedMessage id='developers.projectsIntro' />
                        </p>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='developers.scratchBlocksTitle' /></h3>
                                <p>
                                    <FormattedHTMLMessage id='developers.scratchBlocksIntro' />
                                </p>
                                <p>
                                    <FormattedMessage id='developers.scratchBlocksBody' />
                                </p>
                            </div>
                            <img className="sidebar column" src="/images/developers/block-sketch.png" alt="blocks" />
                        </FlexRow>
                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='developers.wwwTitle' /></h3>
                                <p>
                                    <FormattedHTMLMessage id='developers.wwwIntro' />
                                </p>
                            </div>

                            <img className="sidebar column" src="/images/developers/www-sketch.png" alt="www" />
                        </FlexRow>
                    </section>

                    <section id="principles">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='developers.principlesTitle' /></h2>
                        <p className="intro">
                            <FormattedHTMLMessage id='developers.principlesIntro' />
                        </p>

                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='developers.learningPrinciplesTitle' /></h3>
                                <dl>
                                    <dt><FormattedMessage id='developers.learningPrinciplesProjectsTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.learningPrinciplesProjectsBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.learningPrinciplesPassionTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.learningPrinciplesPassionBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.learningPrinciplesPeersTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.learningPrinciplesPeersBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.learningPrinciplesPlayTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.learningPrinciplesPlayBody' />
                                    </dd>
                                </dl>
                            </div>
                        </FlexRow>

                        <FlexRow className="sidebar-row">
                            <div className="body-copy column">
                                <h3><FormattedMessage id='developers.designPrinciplesTitle' /></h3>
                                <dl>
                                    <dt><FormattedMessage id='developers.designPrinciplesRoomTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.designPrinciplesRoomBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.designPrinciplesSimpleTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.designPrinciplesSimpleBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.designPrinciplesGlobalTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.designPrinciplesGlobalBody' />
                                    </dd>
                                    <dt><FormattedMessage id='developers.designPrinciplesTinkerTitle' /></dt>
                                    <dd>
                                        <FormattedMessage id='developers.designPrinciplesTinkerBody' />
                                    </dd>
                                </dl>
                            </div>
                        </FlexRow>
                    </section>

                    <section id="donate">
                        <span className="nav-spacer"></span>
                        <h2><FormattedMessage id='developers.donateTitle' /></h2>
                        <p>
                            <FormattedHTMLMessage id='developers.donateIntro' />
                        </p>
                        <p>
                            <FormattedMessage id='developers.donateBody' />
                        </p>
                        <p>
                            <FormattedMessage id='developers.donateThanks' />
                        </p>
                    </section>

                    <section id="partners">
                        <span className="nav-spacer"></span>
                        <h3><FormattedMessage id='developers.partnersTitle' /></h3>
                        <p>
                            <FormattedMessage id='developers.partnersIntro' />
                        </p>

                        <FlexRow className="logos">
                            <img className="logo" src="/images/developers/google.png" alt="google" />
                            <img className="logo" src="/images/developers/intel.png" alt="intel" />
                            <img className="logo" src="/images/developers/cn.png" alt="cartoon network" />
                            <img className="logo" src="/images/developers/lemann.png" alt="lemann foundation" />
                        </FlexRow>
                    </section>
                </div>

                <TitleBanner className="faq-banner">
                    <div className="inner">
                        <section id="faq">
                            <span className="nav-spacer"></span>
                            <h3><FormattedMessage id='developers.faqTitle' /></h3>
                            <FlexRow className="three-col-row">
                                <div className="faq column">
                                    <h4><FormattedMessage id='developers.faqAboutTitle' /></h4>
                                    <p>
                                        <FormattedHTMLMessage id='developers.faqAboutBody' />
                                    </p>
                                </div>
                                <div className="faq column">
                                    <h4><FormattedMessage id='developers.faqRulesTitle' /></h4>
                                    <p>
                                        <FormattedMessage id='developers.faqRulesBody' />
                                    </p>
                                </div>
                                <div className="faq column">
                                    <h4>
                                        <FormattedMessage id='developers.faqNameTitle' />
                                    </h4>
                                    <p>
                                        <FormattedMessage id='developers.faqNameBody' />
                                    </p>
                                </div>
                                <div className="faq column">
                                    <h4><FormattedMessage id='developers.faqReleasesTitle' /></h4>
                                    <p>
                                        <FormattedMessage id='developers.faqReleasesBody' />
                                    </p>
                                </div>
                                <div className="faq column">
                                    <h4><FormattedMessage id='developers.faqDifferencesTitle' /></h4>
                                    <p>
                                        <FormattedMessage id='developers.faqDifferencesBody' />
                                    </p>
                                </div>
                                <div className="faq column">
                                    <h4><FormattedMessage id='developers.faqCollabTitle' /></h4>
                                    <p>
                                        <FormattedHTMLMessage id='developers.faqCollabBody' />
                                    </p>
                                </div>
                            </FlexRow>
                        </section>
                    </div>
                </TitleBanner>
            </div>
        );
    }
});

render(<Page><Developers /></Page>, document.getElementById('app'));
