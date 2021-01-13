const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Button = require('../../components/forms/button.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const render = require('../../lib/render.jsx');
const Page = require('../../components/page/www/page.jsx');

require('./sec.scss');

const EducationCollaborative = () => (
    <div className="education-collaborative">
        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="sec.title" />
                        </h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage
                                id="sec.intro"
                            />
                        </p>
                            <a
                                href="https://forms.gle/Py7jgaE2ZK1YdbUF7"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                    <Button className="title-banner-button">
                                        <img src="/images/sec/apply-icon.svg" />
                                        <FormattedMessage id="sec.applyNow" />
                                    </Button>
                            </a>
                    </div>
                    <img
                        alt=""
                        className="title-banner-img short"
                        src="/images/sec/SEC-top-image.png"
                    />
                </FlexRow>
            </div>
        </TitleBanner>
                <section className="band">
                    <div className="inner">
                        <h4 className="applyBanner"><FormattedMessage id="sec.applyBanner" /></h4>
                    </div>
                </section>
        <div className="inner">
            <section id="projects">
                <h2><FormattedMessage id="sec.projectsTitle" /></h2>
                <p><FormattedMessage id="sec.projectsIntro" /></p>
                <p><FormattedMessage id="sec.projectsIntro2" /></p>
                <p><i><FormattedMessage id="sec.projectsIntro3" /></i></p>

            </section>
            <section id="expectations-for-sec">
                <h3><FormattedMessage id="sec.expectationsFromSec" /></h3>
                <ul>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint1" /></li>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint2" /></li>
                    <li><FormattedMessage id="sec.expectationsFromSecPoint3" /></li>
                    <li><b><FormattedMessage id="sec.expectationsFromSecPoint4" /></b></li>
                </ul>
            </section>

            <section id="expectations-for-orgs">
                <h3><FormattedMessage id="sec.expectationsFromOrgs" /></h3>
                <ul>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint1" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint2" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint3" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint4" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint5" /></li>
                    <li><FormattedMessage id="sec.expectationsFromOrgsPoint6" /></li>
                </ul>
            </section>

            <section id="eligibility">
                <h3><FormattedMessage id="sec.eligibilityTitle" /></h3>
                <p><FormattedMessage id="sec.eligibilityPrefix" /></p>
                <ul>
                    <li><FormattedMessage id="sec.eligibilityPoint1" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint2" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint3" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint4" /></li>
                    <li><FormattedMessage id="sec.eligibilityPoint5" /></li>

                </ul>
            </section>
        </div>

        <TitleBanner className="masthead">
            <div className="inner">
                <FlexRow className="masthead-info uneven">
                    <div className="long">
                        <h1><FormattedMessage id="sec.applyTitle" /></h1>
                        <p className="intro">
                            <FormattedMessage id="sec.applyDeadline" />
                        </p>
                        <SubNavigation
                            align="left"
                            className="sec-apply-buttons"
                        >
                            <a
                                href="https://forms.gle/Py7jgaE2ZK1YdbUF7"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <li><FormattedMessage id="sec.applyButton" /></li>
                            </a>
                        </SubNavigation>
                    </div>
                    <img
                        alt=""
                        className="short"
                        src="/images/sec/SEC-bottom-image.png"
                    />
                </FlexRow>
            </div>
        </TitleBanner>
        <div className="inner sec-faq">
            <section>
                <h3><FormattedMessage id="sec.faqHeader" /></h3>
                <dl>
                    <dt><FormattedMessage id="sec.faqWhatIs" /></dt>
                    <dd><FormattedMessage id="sec.faqWhatIsAnswer" /></dd>
                    <dd>
                        <FormattedMessage id="sec.faqWhatIsAnswer2"
                            values={{
                                lclLink: (
                                    <a
                                        href=" https://learn.media.mit.edu/lcl/weeks/week1/"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="sec.faqLCLWebsite" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="sec.faqWhen" /></dt>
                    <dd><FormattedMessage id="sec.faqWhenAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqUsingScratch" /></dt>
                    <dd><FormattedMessage id="sec.faqUsingScratchAnswer" /></dd>
                    <dd><FormattedMessage id="sec.faqUsingScratchAnswer2" /></dd>
                    <dt><FormattedMessage id="sec.faqBackground" /></dt>
                    <dd><FormattedMessage id="sec.faqBackgroundAnswer" /></dd>
                    <dd><FormattedMessage id="sec.faqBackgroundAnswer2" /></dd>
                    <dt><FormattedMessage id="sec.faqEligible" /></dt>
                    <dd><FormattedMessage id="sec.faqEligibleAnswer" /></dd>
                    <dd><FormattedMessage id="sec.faqEligibleAnswer2" /></dd>
                    <dt><FormattedMessage id="sec.faqInternational" /></dt>
                    <dd><FormattedMessage id="sec.faqInternationalAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqEnglish" /></dt>
                    <dd><FormattedMessage id="sec.faqEnglishAnswer" /></dd>
                    <dd><FormattedMessage id="sec.faqEnglishAnswer2" /></dd>
                    <dt><FormattedMessage id="sec.faqHowManyMembers" /></dt>
                    <dd><FormattedMessage id="sec.faqHowManyMembersAnswer" /></dd>
                    <dd><FormattedMessage id="sec.faqHowManyMembersAnswer2" /></dd>
                    <dt><FormattedMessage id="sec.faqNotified" /></dt>
                    <dd><FormattedMessage id="sec.faqNotifiedAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqHours" /></dt>
                    <dd><FormattedMessage id="sec.faqHoursAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqVirtual" /></dt>
                    <dd><FormattedMessage id="sec.faqVirtualAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqWorkshopLanguage" /></dt>
                    <dd><FormattedMessage id="sec.faqWorkshopLanguageAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqCost" /></dt>
                    <dd><FormattedMessage id="sec.faqCostAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqCulturallySustaining" /></dt>
                    <dd><FormattedMessage id="sec.faqCulturallySustainingAnswer" /></dd>
                    <dt><FormattedMessage id="sec.faqFuture" /></dt>
                    <dd>
                        <FormattedMessage
                            id="sec.faqFutureAnswer"
                            values={{
                                subscribeLink: (
                                    <a
                                        href="https://us9.list-manage.com/subscribe?u=96e741c12c99f46f1f3e95e09&id=149bd1a4c2"
                                        target="_blank"
                                    >
                                        <FormattedMessage id="sec.faqMailingList" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                </dl>
            </section>
        </div>
    </div>
);

render(<Page><EducationCollaborative /></Page>, document.getElementById('app'));
