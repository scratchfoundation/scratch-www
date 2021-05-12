const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const render = require('../../lib/render.jsx');
const Page = require('../../components/page/www/page.jsx');

require('./developers.scss');

const Developers = () => (
    <div className="developers">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    <FormattedMessage id="developers.title" />
                </h1>
                <p className="title-banner-p intro">
                    <FormattedMessage
                        id="developers.intro"
                        values={{
                            introLink: (
                                <a href="/credits">
                                    <FormattedMessage id="developers.introLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
            </div>
            <div className="band">
                <SubNavigation className="inner">
                    <a href="#projects">
                        <li>
                            <FormattedMessage id="developers.projectsTitle" />
                        </li>
                    </a>
                    <a href="#principles">
                        <li>
                            <FormattedMessage id="developers.principlesTitle" />
                        </li>
                    </a>
                    <a href="#join">
                        <li>
                            <FormattedMessage id="developers.joinTitle" />
                        </li>
                    </a>
                    <a href="#donate">
                        <li>
                            <FormattedMessage id="developers.donateTitle" />
                        </li>
                    </a>
                    <a href="#partners">
                        <li>
                            <FormattedMessage id="developers.partnersTitle" />
                        </li>
                    </a>
                    <a href="#faq">
                        <li>
                            <FormattedMessage id="developers.faqTitle" />
                        </li>
                    </a>
                </SubNavigation>
            </div>
        </TitleBanner>

        <div className="inner">
            <section id="projects">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="developers.projectsTitle" /></h2>
                <p className="intro">
                    <FormattedMessage id="developers.projectsIntro" />
                </p>
                <FlexRow className="sidebar-row">
                    <div className="body-copy column">
                        <h3><FormattedMessage id="developers.scratchBlocksTitle" /></h3>
                        <p>
                            <FormattedMessage
                                id="developers.scratchBlocksIntro"
                                values={{
                                    blocklyLink: (
                                        <a href="https://developers.google.com/blockly/">
                                            <FormattedMessage
                                                id="developers.scratchBlocksIntroBlocklyLinkText"
                                            />
                                        </a>
                                    ),
                                    githubLink: (
                                        <a href="https://github.com/LLK/scratch-blocks">
                                            <FormattedMessage
                                                id="developers.hereLinkText"
                                            />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                        <p>
                            <FormattedMessage id="developers.scratchBlocksBody" />
                        </p>
                    </div>
                    <img
                        alt="blocks"
                        className="sidebar column"
                        src="/images/developers/block-sketch.png"
                    />
                </FlexRow>
                <FlexRow className="sidebar-row">
                    <div className="body-copy column">
                        <h3><FormattedMessage id="developers.wwwTitle" /></h3>
                        <p>
                            <FormattedMessage
                                id="developers.wwwIntro"
                                values={{
                                    wwwIntroLink: (
                                        <a href="https://github.com/LLK/scratch-www">
                                            GitHub
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>

                    <img
                        alt="www"
                        className="sidebar column"
                        src="/images/developers/www-sketch.png"
                    />
                </FlexRow>
                <FlexRow className="sidebar-row">
                    <div className="body-copy column">
                        <h3>ScratchJr</h3>
                        <p>
                            <FormattedMessage
                                id="developers.jrBody"
                                values={{
                                    websiteLink: (
                                        <a href="https://www.scratchjr.org">
                                            <FormattedMessage id="developers.jrBodyWebsiteLinkText" />
                                        </a>
                                    ),
                                    githubLink: (
                                        <a href="https://github.com/LLK/scratchjr">
                                            GitHub
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>

            <section id="principles">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="developers.principlesTitle" /></h2>
                <p className="intro">
                    <FormattedMessage
                        id="developers.principlesIntro"
                        values={{
                            learningPrinciples: (
                                <b><FormattedMessage id="developers.LearningPrinciples" /></b>
                            ),
                            designPrinciples: (
                                <b><FormattedMessage id="developers.DesignPrinciples" /></b>
                            )
                        }}
                    />
                </p>

                <FlexRow className="sidebar-row">
                    <div className="body-copy column">
                        <h3><FormattedMessage id="developers.LearningPrinciples" /></h3>
                        <dl>
                            <dt><FormattedMessage id="developers.projectsTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.learningPrinciplesProjectsBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.learningPrinciplesPassionTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.learningPrinciplesPassionBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.learningPrinciplesPeersTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.learningPrinciplesPeersBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.learningPrinciplesPlayTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.learningPrinciplesPlayBody" />
                            </dd>
                        </dl>
                    </div>
                </FlexRow>

                <FlexRow className="sidebar-row">
                    <div className="body-copy column">
                        <h3><FormattedMessage id="developers.DesignPrinciples" /></h3>
                        <dl>
                            <dt><FormattedMessage id="developers.designPrinciplesRoomTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.designPrinciplesRoomBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.designPrinciplesSimpleTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.designPrinciplesSimpleBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.designPrinciplesGlobalTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.designPrinciplesGlobalBody" />
                            </dd>
                            <dt><FormattedMessage id="developers.designPrinciplesTinkerTitle" /></dt>
                            <dd>
                                <FormattedMessage id="developers.designPrinciplesTinkerBody" />
                            </dd>
                        </dl>
                    </div>
                </FlexRow>
            </section>

            <section id="join">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="developers.joinTitle" /></h2>
                <p>
                    <FormattedMessage
                        id="developers.joinBody"
                        values={{
                            jobsPageLink: (
                                <a href="https://www.scratchfoundation.org/opportunities">
                                    <FormattedMessage id="developers.joinBodyJobsLinkText" />
                                </a>
                            ),
                            emailLink: (
                                <a href="mailto:jobs+developers@scratch.mit.edu">
                                    jobs+developers@scratch.mit.edu
                                </a>
                            )
                        }}
                    />
                </p>
            </section>

            <section id="donate">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="developers.donateTitle" /></h2>
                <p>
                    <FormattedMessage
                        id="developers.donateIntro"
                        values={{
                            donateLink: (
                                <a href="https://secure.donationpay.org/scratchfoundation/">
                                    <FormattedMessage id="developers.donateIntroLinkText" />
                                </a>
                            )
                        }}
                    />
                </p>
                <p>
                    <FormattedMessage id="developers.donateBody" />
                </p>
                <p>
                    <FormattedMessage id="developers.donateThanks" />
                </p>
            </section>

            <section id="partners">
                <span className="nav-spacer" />
                <h3><FormattedMessage id="developers.partnersTitle" /></h3>
                <p>
                    <FormattedMessage id="developers.partnersIntro" />
                </p>

                <FlexRow className="logos">
                    <img
                        alt="google"
                        className="logo"
                        src="/images/developers/google.png"
                    />
                    <img
                        alt="intel"
                        className="logo"
                        src="/images/developers/intel.png"
                    />
                    <img
                        alt="cartoon network"
                        className="logo"
                        src="/images/developers/cn.png"
                    />
                    <img
                        alt="lemann foundation"
                        className="logo"
                        src="/images/developers/lemann.png"
                    />
                </FlexRow>
            </section>
        </div>

        <TitleBanner className="faq-banner">
            <div className="inner">
                <section id="faq">
                    <span className="nav-spacer" />
                    <h3><FormattedMessage id="developers.faqTitle" /></h3>
                    <FlexRow className="three-col-row">
                        <div className="faq column">
                            <h4><FormattedMessage id="developers.faqAboutTitle" /></h4>
                            <p>
                                <FormattedMessage
                                    id="developers.faqAboutBody"
                                    values={{
                                        llkLink: (
                                            <a href="https://www.media.mit.edu/groups/lifelong-kindergarten/overview">
                                                <FormattedMessage id="developers.faqAboutBodyLLKLinkText" />
                                            </a>
                                        ),
                                        mitLink: (
                                            <a href="http://media.mit.edu/">
                                                <FormattedMessage id="developers.faqAboutBodyMITLinkText" />
                                            </a>
                                        ),
                                        aboutLink: (
                                            <a href="/about">
                                                <FormattedMessage id="developers.hereLinkText" />
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="faq column">
                            <h4><FormattedMessage id="developers.faqRulesTitle" /></h4>
                            <p>
                                <FormattedMessage id="developers.faqRulesBody" />
                            </p>
                        </div>
                        <div className="faq column">
                            <h4>
                                <FormattedMessage id="developers.faqNameTitle" />
                            </h4>
                            <p>
                                <FormattedMessage id="developers.faqNameBody" />
                            </p>
                        </div>
                        <div className="faq column">
                            <h4><FormattedMessage id="developers.faqReleasesTitle" /></h4>
                            <p>
                                <FormattedMessage id="developers.faqReleasesBody" />
                            </p>
                        </div>
                        <div className="faq column">
                            <h4><FormattedMessage id="developers.faqDifferencesTitle" /></h4>
                            <p>
                                <FormattedMessage id="developers.faqDifferencesBody" />
                            </p>
                        </div>
                        <div className="faq column">
                            <h4><FormattedMessage id="developers.faqCollabTitle" /></h4>
                            <p>
                                <FormattedMessage
                                    id="developers.faqCollabBody"
                                    values={{
                                        githubLink: (
                                            <a href="https://github.com/LLK/">GitHub</a>
                                        ),
                                        contactUsLink: (
                                            <a href="/contact-us">
                                                Contact Us
                                            </a>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                    </FlexRow>
                </section>
            </div>
        </TitleBanner>
    </div>
);

render(<Page><Developers /></Page>, document.getElementById('app'));
