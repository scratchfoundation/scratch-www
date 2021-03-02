const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Button = require('../../components/forms/button.jsx');
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
                            languageCount: 60,
                            translationLink: (
                                <a
                                    href="https://github.com/LLK/scratch-l10n/wiki/Guide-for-Scratch-Translators"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
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
                            scratchForEducatorsLink: (
                                <a href="/educators">
                                    <FormattedMessage id="about.scratchForEducatorsLinkText" />
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
                            lifelongKindergartenGroupLink: (
                                <a href="http://llk.media.mit.edu">
                                    <FormattedMessage id="about.lifelongKindergartenGroupLinkText" />
                                </a>
                            ),
                            codingAtACrossroadsLink: (
                                <a
                                    href="https://cacm.acm.org/magazines/2020/11/248219-coding-at-a-crossroads/fulltext"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="about.codingAtACrossroadsLinkText" />
                                </a>
                            ),
                            lifelongKindergartenBookLink: (
                                <a
                                    href="https://mitpress.mit.edu/books/lifelong-kindergarten"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="about.lifelongKindergartenBookLinkText" />
                                </a>
                            ),
                            statisticsLink: (
                                <a href="/statistics">
                                    <FormattedMessage id="about.statisticsLinkText" />
                                </a>
                            ),
                            annualReportLink: (
                                <a href="/annual-report">
                                    <FormattedMessage id="about.annualReportLinkText" />
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
                        <li>
                            <a href="/annual-report"><FormattedMessage id="about.learnMoreAnnualReport" /></a>
                        </li>
                    </ul>
                </li>

                <li>
                    <h3><FormattedMessage id="about.support" /></h3>
                    <p><FormattedMessage
                        id="about.supportDescription"
                        values={{
                            donorsLink: (
                                <a
                                    href="https://www.scratchfoundation.org/supporters"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="about.donorsLinkText" />
                                </a>
                            ),
                            annualReportLink: (
                                <a href="/annual-report">
                                    <FormattedMessage id="about.annualReportLinkText" />
                                </a>
                            ),
                            donateLink: (
                                <a
                                    href="//secure.donationpay.org/scratchfoundation/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
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
                    <a href="//secure.donationpay.org/scratchfoundation/">
                        <Button className="about-button">
                            <FormattedMessage id="about.donateButton" />
                        </Button>
                    </a>

                </li>
            </ul>
        </div>
    </div>
);

render(<Page><About /></Page>, document.getElementById('app'));
