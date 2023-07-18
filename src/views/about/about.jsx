const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Button = require('../../components/forms/button.jsx');
const Page = require('../../components/page/www/page.jsx');
const Video = require('../../components/video/video.jsx');
const injectIntl = require('react-intl').injectIntl;

require('./about.scss');

const tedLink = chunks => <a href="https://www.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code">{chunks}</a>;
const About = injectIntl(({intl}) => (
    <div className="inner about">
        <h1><FormattedMessage id="general.aboutScratch" /></h1>

        <div className="masthead">
            <div>
                <p><FormattedMessage
                    id="about.introOne"
                    values={{foundationLink: (
                        <a
                            href="https://www.scratchfoundation.org/"
                            rel="noreferrer noopener"
                            target="_blank"
                        >
                            <FormattedMessage id="about.foundationText" />
                        </a>
                    )}}
                /></p>
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
                    <h2><FormattedMessage id="about.whoUsesScratch" /></h2>
                    <img
                        alt=""
                        src="/images/about/who-uses-scratch.jpg"
                    />
                    <p><FormattedMessage id="about.whoUsesScratchDescription" /></p>
                </li>

                <li>
                    <h2><FormattedMessage id="about.literacy" /></h2>
                    <a href="https://www.ted.com/talks/mitch_resnick_let_s_teach_kids_to_code">
                        <img
                            alt={intl.formatMessage(
                                {id: 'about.literacyImageDescription'}
                            )}
                            src="/images/about/ted-thumbnail.jpg"
                        />
                    </a>
                    <p>
                        <FormattedMessage
                            id="about.literacyDescription"
                            values={{
                                a: tedLink
                            }}
                        />
                    </p>
                </li>

                <li>
                    <h2><FormattedMessage id="about.aroundTheWorld" /></h2>
                    <img
                        alt=""
                        src="/images/about/around-the-world.png"
                    />
                    <p><FormattedMessage
                        id="about.aroundTheWorldDescription"
                        values={{
                            countryCount: 200,
                            languageCount: 70,
                            translationLink: (
                                <a
                                    href="https://github.com/scratchfoundation/scratch-l10n/wiki/Guide-for-Scratch-Translators"
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
                    <h2><FormattedMessage id="about.schools" /></h2>
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
                    <h2><FormattedMessage id="about.quotes" /></h2>
                    <img
                        alt="Quotes about Scratch"
                        src="/images/about/quotes.gif"
                    />
                    <p><FormattedMessage
                        id="about.quotesDescription"
                        values={{
                            quotesLink: (
                                <a
                                    href="/info/quotes/"
                                >
                                    <FormattedMessage id="about.quotesLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>

                <li>
                    <h2><FormattedMessage id="about.research" /></h2>
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
                            lifelongKindergartenGroupLink: (
                                <a
                                    href="https://www.media.mit.edu/groups/lifelong-kindergarten/overview/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
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
                                <a
                                    href="/statistics"
                                >
                                    <FormattedMessage id="about.statisticsLinkText" />
                                </a>
                            ),
                            annualReportLink: (
                                <a
                                    href="https://www.scratchfoundation.org/annualreport"
                                >
                                    <FormattedMessage id="about.annualReportLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                </li>

                <li>
                    <h2><FormattedMessage id="about.learnMore" /></h2>
                    <ul className="list">
                        <li>
                            <a href="/faq"><FormattedMessage id="about.learnMoreFaq" /></a>
                        </li>
                        <li>
                            <a href="/parents"><FormattedMessage id="about.learnMoreParents" /></a>
                        </li>
                        <li>
                            <a href="/educators"><FormattedMessage id="about.learnMoreEducators" /></a>
                        </li>
                        <li>
                            <a href="https://www.scratchfoundation.org/annualreport"><FormattedMessage id="about.learnMoreAnnualReport" /></a>
                        </li>
                    </ul>
                </li>

                <li>
                    <h2><FormattedMessage id="about.support" /></h2>
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
                            donateLink: (
                                <a
                                    href="https://www.scratchfoundation.org/donate"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="about.donateLinkText" />
                                </a>
                            )
                        }}
                    /></p>
                    <a
                        href="https://www.scratchfoundation.org/donate"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        <Button className="about-button">
                            <FormattedMessage id="about.donateButton" />
                        </Button>
                    </a>
                </li>
            </ul>
        </div>
    </div>
));

render(<Page><About /></Page>, document.getElementById('app'));
