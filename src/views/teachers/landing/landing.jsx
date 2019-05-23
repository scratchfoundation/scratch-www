const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');
const Button = require('../../../components/forms/button.jsx');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

require('./landing.scss');

const Landing = props => (

    <div className="educators">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    <FormattedMessage id="teacherlanding.title" />
                </h1>
                <FlexRow className="masthead-info">
                    <p className="title-banner-p intro">
                        <FormattedMessage id="teacherlanding.intro" />
                    </p>
                    <div className="video-player">
                        <iframe
                            allowFullScreen
                            allowTransparency="true"
                            frameBorder="0"
                            height="180"
                            scrolling="no"
                            src={`https://fast.wistia.net/embed/iframe/h8hay3nnt4?seo=false&videoFoam=true`}
                            title=""
                            width="320"
                        />
                    </div>
                </FlexRow>
            </div>
            <div className="band">
                <SubNavigation className="inner">
                    <a href="#resources">
                        <li>
                            <FormattedMessage id="teacherlanding.resourcesTitle" />
                        </li>
                    </a>
                    <a href="#connect">
                        <li>
                            <FormattedMessage id="teacherlanding.connectTitle" />
                        </li>
                    </a>
                    <a href="#news">
                        <li>
                            <FormattedMessage id="teacherlanding.newsTitle" />
                        </li>
                    </a>
                    <a href="#teacher-accounts">
                        <li>
                            <FormattedMessage id="teacherlanding.teacherAccountsTitle" />
                        </li>
                    </a>
                </SubNavigation>
            </div>
        </TitleBanner>

        <div className="feature">
            <div className="inner">
                <section id="sip">
                    <FlexRow className="educators-using">
                        <div className="using-scratch-image">
                            <img src="/images/teachers/makey-activity.png" />
                        </div>
                        <div className="sip-info">
                            <h2><FormattedMessage id="teacherlanding.howUsingScratch" /></h2>
                            <p>
                                <FormattedMessage
                                    id="teacherlanding.sip"
                                    values={{
                                        abbreviatedSipName: (
                                            <FormattedMessage id="teacherlanding.abbreviatedSipName" />
                                        ),
                                        sipName: (
                                            <FormattedMessage id="teacherlanding.sipName" />
                                        )
                                    }}
                                />
                            </p>
                            <a
                                href="https://sip.scratch.mit.edu/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <Button className="sip-button large icon-right">
                                    <FormattedMessage id="teacherlanding.seeLatest" />
                                    <img src="/svgs/project/r-arrow.svg" />
                                </Button>
                            </a>
                        </div>
                    </FlexRow>
                </section>
            </div>
        </div>

        <div className="inner">
            <section id="resources">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherlanding.educatorResourcesTitle" /></h2>
                <FlexRow className="educator-community">
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.educatorGuides"
                                values={{
                                    educatorLink: (
                                        <a
                                            href={props.intl.formatMessage({
                                                id: 'guides.EducatorGuidesAllLink'
                                            })}
                                        >
                                            <FormattedMessage id="teacherlanding.educatorGuideLinkText" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.creativeComputing"
                                values={{
                                    scratchEdLink: (
                                        <a href="http://scratched.gse.harvard.edu/guide/">
                                            <FormattedMessage id="teacherlanding.scratchEdLinkText" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
            <section>
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherlanding.studentResourcesTitle" /></h2>
                <FlexRow className="guides-and-tutorials">
                    <div>
                        <a href="/projects/editor/?tutorial=all">
                            <img
                                alt="tips window icon"
                                src="/svgs/teachers/scratch-tutorials-icons.svg"
                            />
                        </a>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.tutorialResources"
                                values={{
                                    tutorialLink: (
                                        <a href="/projects/editor/?tutorial=all">
                                            <FormattedMessage id="teacherlanding.tutorialLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <a
                            href={props.intl.formatMessage({
                                id: 'cards.scratch-cards-allLink'
                            })}
                        >
                            <img
                                alt="cards icon"
                                src="/svgs/teachers/coding-cards-icon.svg"
                            />
                        </a>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.codingCardResources"
                                values={{
                                    codingCardLink: (
                                        <a
                                            href={props.intl.formatMessage({
                                                id: 'cards.scratch-cards-allLink'
                                            })}
                                        >
                                            <FormattedMessage id="teacherlanding.codingCardLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <a href="/ideas">
                            <img
                                alt="creative computing icon"
                                src="/svgs/teachers/ideas-page-icon.svg"
                            />
                        </a>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.ideasResources"
                                values={{
                                    ideasPageLink: (
                                        <a href="http://scratch.mit.edu/ideas">
                                            <FormattedMessage id="teacherlanding.ideasLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
            <section id="connect">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherlanding.connectingWithEducators" /></h2>
                <FlexRow className="educator-community">
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.teachingWithScratch"
                                values={{
                                    teachingWithScratchLink: (
                                        <a href="https://www.facebook.com/groups/TeachingwithScratch/">
                                            <FormattedMessage id="teacherlanding.teachingWithScratchLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.attendMeetups"
                                values={{
                                    meetupLink: (
                                        <a href="https://www.meetup.com/pro/scratched/">
                                            <FormattedMessage id="teacherlanding.meetupLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
            <section>
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherlanding.moreGetStartedTitle" /></h2>
                <FlexRow className="educator-community">
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.csFirst"
                                values={{
                                    csFirstLink: (
                                        <a href="http://g.co/csfirst">
                                            <FormattedMessage id="teacherlanding.csFirstLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.codeClub"
                                values={{
                                    codeClubLink: (
                                        <a href="https://codeclubprojects.org/en-GB/scratch/">
                                            <FormattedMessage id="teacherlanding.codeClubLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
            <section id="news">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="teacherlanding.newsAndUpdatesTitle" /></h2>
                <FlexRow className="educator-community">
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.followUs"
                                values={{
                                    facebookLink: (
                                        <a href="https://www.facebook.com/scratchteam/">
                                            Facebook
                                        </a>
                                    ),
                                    twitterLink: (
                                        <a href="https://twitter.com/scratch">
                                            Twitter
                                        </a>
                                    ),
                                    instagramLink: (
                                        <a href="https://www.instagram.com/mitscratchteam/">
                                            Instagram
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage
                                id="teacherlanding.signupTips"
                                values={{
                                    signupTipsLink: (
                                        <a href="http://eepurl.com/cws7_f ">
                                            <FormattedMessage id="teacherlanding.signupTipsLink" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                    </div>
                </FlexRow>
            </section>
        </div>
        <div id="teacher-accounts">
            <div className="inner account-flex">
                <div id="left">
                    <h2>
                        <FormattedMessage id="teacherlanding.accountsTitle" />
                    </h2>
                    <p>
                        <FormattedHTMLMessage id="teacherlanding.accountsDescription" />
                    </p>
                    <SubNavigation
                        align="left"
                        className="teacher-account-buttons"
                    >
                        <a href="/educators/register">
                            <li><FormattedMessage id="teacherlanding.requestAccount" /></li>
                        </a>
                    </SubNavigation>
                </div>
                <img
                    alt="teacher account"
                    id="teacher-icon"
                    src="/images/teachers/teacher-account.png"
                />
            </div>
        </div>
    </div>
);

Landing.propTypes = {
    intl: intlShape
};
const WrappedLanding = injectIntl(Landing);

render(<Page><WrappedLanding /></Page>, document.getElementById('app'));
