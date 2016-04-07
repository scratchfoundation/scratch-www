var React = require('react');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Page = require('../../components/container/page/www/page.jsx');

require('./about.scss');

var About = React.createClass({
    type: 'About',
    render: function () {
        return (
            <div className="inner">
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
                            <h2><FormattedMessage id='about.whoUsesScratch' /></h2>
                            <img src="/images/about/who-uses-scratch.jpg" alt="" />
                            <p><FormattedHTMLMessage id='about.whoUsesScratchDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.literacy' /></h2>
                            <iframe
                                src="https://embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                                scrolling="no"
                                webkitAllowFullScreen
                                mozallowfullscreen
                                allowFullScreen />
                            <p><FormattedHTMLMessage id='about.literacyDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.aroundTheWorld' /></h2>
                            <img src="/images/about/around-the-world.png" alt="" />
                            <p><FormattedHTMLMessage id='about.aroundTheWorldDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.schools' /></h2>
                            <img src="/images/about/scratch-in-schools.jpg" alt="" />
                            <p><FormattedHTMLMessage id='about.schoolsDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.quotes' /></h2>
                            <img src="/images/about/quotes.gif" alt="Quotes about Scratch" />
                            <p><FormattedHTMLMessage id='about.quotesDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.research' /></h2>
                            <img src="/images/about/research-remix.png" alt="" />
                            <p><FormattedHTMLMessage id='about.researchDescription' /></p>
                        </li>

                        <li>
                            <h2><FormattedMessage id='about.learnMore' /></h2>
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
                            <h2><FormattedMessage id='about.support' /></h2>
                            <p><FormattedHTMLMessage id='about.supportDescription' /></p>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

render(<Page><About /></Page>, document.getElementById('app'));
