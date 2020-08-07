const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
const Video = require('../../components/video/video.jsx');

require('./about.scss');

const About = () => (
    <div className="inner about">
        <h1><FormattedMessage id="general.aboutScratch" /></h1>

        <div className="masthead">
            <div>
                <p><FormattedMessage id="about.introOne" /></p>
                <p><FormattedMessage id="about.introTwo" /></p>
                <p><FormattedMessage id="about.introThree" /></p>

                <ul>
                    <li><a href="/parents/"><FormattedMessage id="about.introParents" /></a></li>
                    <li><a href="/educators/"><FormattedMessage id="about.introEducators" /></a></li>
                </ul>
            </div>

            <div className="video-container">
                <Video
                    className="about-scratch-video"
                    videoId="sucupcznsp"
                />
            </div>
        </div>

        <div className="body">
            <ul>
                <li>
                    <h3><FormattedMessage id="about.whoUsesScratch" /></h3>
                    <img
                        alt=""
                        src="/images/about/who-uses-scratch.jpg"
                    />
                    <p><FormattedMessage id="about.whoUsesScratchDescription" /></p>
                </li>

                <li>
                    <h3><FormattedMessage id="about.literacy" /></h3>
                    <iframe
                        allowFullScreen
                        mozallowfullscreen={'true'}
                        scrolling="no"
                        src="https://embed-ssl.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code.html"
                        webkitallowfullscreen={'true'}
                    />
                    <p><FormattedMessage id="about.literacyDescription" /></p>
                </li>

                <li>
                    <h3><FormattedMessage id="about.aroundTheWorld" /></h3>
                    <img
                        alt=""
                        src="/images/about/around-the-world.png"
                    />
                    <p><FormattedMessage
                        id="about.aroundTheWorldDescription"
                        values={{
                            translationLink: (
                                <a href="https://github.com/LLK/scratch-l10n/wiki/Guide-for-Scratch-Translators">
                                    <FormattedMessage id="about.translationLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>
                <li>
                    <h3><FormattedMessage id="about.schools" /></h3>
                    <img
                        alt=""
                        src="/images/about/scratch-in-schools.jpg"
                    />
                    <p><FormattedMessage
                        id="about.schoolsDescription"
                        values={{
                            scratchedLink: (
                                <a href="http://scratched.gse.harvard.edu/">
                                    <FormattedMessage id="about.scratchedLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>
                <li>
                    <h3><FormattedMessage id="about.quotes" /></h3>
                    <img
                        alt="Quotes about Scratch"
                        src="/images/about/quotes.gif"
                    />
                    <p><FormattedMessage
                        id="about.quotesDescription"
                        values={{
                            quotesLink: (
                                <a href="/info/quotes/">
                                    <FormattedMessage id="about.quotesLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>

                <li>
                    <h3><FormattedMessage id="about.research" /></h3>
                    <img
                        alt=""
                        src="/images/about/research-remix.png"
                    />
                    <p><FormattedMessage
                        id="about.researchDescription"
                        values={{
                            researchLink: (
                                <a href="/research">
                                    <FormattedMessage id="about.researchLinkText" />
                                </a>
                            ),
                            spfaLink: (
                                <a href="http://web.media.mit.edu/~mres/papers/Scratch-CACM-final.pdf">
                                    <FormattedMessage id="about.spfaLinkText" />
                                </a>
                            ),
                            statisticsLink: (
                                <a href="/statistics">
                                    <FormattedMessage id="about.statisticsLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>

                <li>
                    <h3><FormattedMessage id="about.learnMore" /></h3>
                    <ul className="list">
                        <li>
                            <a href="/ideas"><FormattedMessage id="about.learnMoreHelp" /></a>
                        </li>
                        <li>
                            <a href="/info/faq"><FormattedMessage id="about.learnMoreFaq" /></a>
                        </li>
                        <li>
                            <a href="/parents"><FormattedMessage id="about.learnMoreParents" /></a>
                        </li>
                        <li>
                            <a href="/credits"><FormattedMessage id="about.learnMoreCredits" /></a>
                        </li>
                    </ul>
                </li>

                <li>
                    <h3><FormattedMessage id="about.support" /></h3>
                    <p><FormattedMessage
                        id="about.supportDescription"
                        values={{
                            supportersList: 'National Science Foundation, Scratch Foundation, Siegel Family Endowment, Google, LEGO Foundation, Intel, Cartoon Network, Lemann Foundation, MacArthur Foundation', // eslint-disable-line max-len
                            creditsLink: (
                                <a href="/credits">
                                    <FormattedMessage id="about.creditsLinkText" />
                                </a>
                            ),
                            donateLink: (
                                <a href="//secure.donationpay.org/scratchfoundation/">
                                    <FormattedMessage id="about.donateLinkText" />
                                </a>
                            ),
                            donateemail: (
                                <a href="mailto:donate@scratch.mit.edu">
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

render(<Page><About /></Page>, document.getElementById('app'));
