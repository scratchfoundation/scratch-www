var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Page = require('../../components/page/www/page.jsx');

require('./about.scss');

var About = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div className="inner about">
                <h1><FormattedMessage id='general.aboutScratch' /></h1>

                <div className="masthead">
                    <div>
                        <p><FormattedMessage id='about.introOne' /></p>
                        <p><FormattedMessage id='about.introTwo' /></p>
                        <p><FormattedMessage id='about.introThree' /></p>

                        <ul>
                            <li><a href = "/parents/"><FormattedMessage id="about.introParents" /></a></li>
                            <li><a href = "/educators/"><FormattedMessage id="about.introEducators" /></a></li>
                        </ul>
                    </div>

                    <div>
                        <iframe
                            title="Scratch Overview Video"
                            src="https://player.vimeo.com/video/65583694?title=0&byline=0&portrait=0"
                            frameBorder="0"
                            webkitAllowFullScreen
                            mozallowfullscreen
                            allowFullScreen />
                    </div>
                </div>

                <div className="body">
                    <ul>
                        <li>
                            <h3><FormattedMessage id='about.whoUsesScratch' /></h3>
                            <img src="/images/about/who-uses-scratch.jpg" alt="" />
                            <p><FormattedMessage id='about.whoUsesScratchDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='about.literacy' /></h3>
                            <iframe
                                src="https://embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                                scrolling="no"
                                webkitAllowFullScreen
                                mozallowfullscreen
                                allowFullScreen />
                            <p><FormattedMessage id='about.literacyDescription' /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='about.aroundTheWorld' /></h3>
                            <img src="/images/about/around-the-world.png" alt="" />
                            <p><FormattedMessage
                                id='about.aroundTheWorldDescription'
                                values={{
                                    translationLink: (
                                        <a href='http://wiki.scratch.mit.edu/wiki/How_to_Translate_Scratch'>
                                            <FormattedMessage id='about.translationLinkText' />
                                        </a>
                                    )
                                }}
                            /></p>
                        </li>
                        <li>
                            <h3><FormattedMessage id='about.schools' /></h3>
                            <img src="/images/about/scratch-in-schools.jpg" alt="" />
                            <p><FormattedMessage
                                id='about.schoolsDescription'
                                values={{
                                    scratchedLink: (
                                        <a href='http://scratched.gse.harvard.edu/'>
                                            <FormattedMessage id='about.scratchedLinkText' />
                                        </a>
                                    )
                                }}
                            /></p>
                        </li>
                        <li>
                            <h3><FormattedMessage id='about.quotes' /></h3>
                            <img src="/images/about/quotes.gif" alt="Quotes about Scratch" />
                            <p><FormattedMessage
                                id='about.quotesDescription'
                                values={{
                                    quotesLink: (
                                        <a href='/info/quotes/'>
                                            <FormattedMessage id='about.quotesLinkText'/>
                                        </a>
                                    )
                                }}
                            /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='about.research' /></h3>
                            <img src="/images/about/research-remix.png" alt="" />
                            <p><FormattedMessage
                                id='about.researchDescription'
                                values={{
                                    researchLink: (
                                        <a href='/info/research'>
                                            <FormattedMessage id='about.researchLinkText'/>
                                        </a>
                                    ),
                                    spfaLink: (
                                        <a href='http://web.media.mit.edu/~mres/papers/Scratch-CACM-final.pdf'>
                                            <FormattedMessage id='about.spfaLinkText'/>
                                        </a>
                                    ),
                                    statisticsLink: (
                                        <a href='/statistics'>
                                            <FormattedMessage id='about.statisticsLinkText'/>
                                        </a>
                                    )
                                }}
                            /></p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='about.learnMore' /></h3>
                            <p>
                                <ul className="list">
                                    <li>
                                        <a href="/help"><FormattedMessage id='about.learnMoreHelp' /></a>
                                    </li>
                                    <li>
                                        <a href="/info/faq"><FormattedMessage id='about.learnMoreFaq' /></a>
                                    </li>
                                    <li>
                                        <a href="/parents"><FormattedMessage id='about.learnMoreParents' /></a>
                                    </li>
                                    <li>
                                        <a href="/info/credits"><FormattedMessage id='about.learnMoreCredits' /></a>
                                    </li>
                                </ul>
                            </p>
                        </li>

                        <li>
                            <h3><FormattedMessage id='about.support' /></h3>
                            <p><FormattedMessage
                                id='about.supportDescription'
                                values={{
                                    supportersList: 'National Science Foundation, Scratch Foundation, Siegel Family Endowment, Google, LEGO Foundation, Intel, Cartoon Network, Lemann Foundation, MacArthur Foundation', // eslint-disable-line max-len
                                    creditsLink: (
                                        <a href='//scratch.mit.edu/info/credits'>
                                            <FormattedMessage id='about.creditsLinkText'/>
                                        </a>
                                    ),
                                    donateLink: (
                                        <a href='//secure.donationpay.org/scratchfoundation/'>
                                            <FormattedMessage id='about.donateLinkText'/>
                                        </a>
                                    ),
                                    donateemail: (
                                        <a href='mailto:donate@scratch.mit.edu'>
                                            donate@scratch.mit.edu
                                        </a>
                                    )
                                }}
                            /></p>
                         </li>
                    </ul>
                </div>
            </div>
        );
    }
});

render(<Page><About /></Page>, document.getElementById('app'));
