const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

require('./landing.scss');

const Landing = () => (
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
                    <div className="ted-talk">
                        <iframe
                            allowFullScreen
                            frameBorder="0"
                            src="https://www.youtube.com/embed/uPSuG063jhA?border=0&wmode=transparent"
                        />
                    </div>
                </FlexRow>
            </div>
            <div className="band">
                <SubNavigation className="inner">
                    <a href="#in-practice">
                        <li>
                            <FormattedMessage id="teacherlanding.inPracticeTitle" />
                        </li>
                    </a>
                    <a href="#resources">
                        <li>
                            <FormattedMessage id="teacherlanding.resourcesAnchor" />
                        </li>
                    </a>
                    <a href="#teacher-accounts">
                        <li>
                            <FormattedMessage id="general.teacherAccounts" />
                        </li>
                    </a>
                </SubNavigation>
            </div>
        </TitleBanner>

        <div className="inner">
            <section id="in-practice">
                <span className="nav-spacer" />
                <h2>
                    <FormattedMessage id="teacherlanding.inPracticeTitle" />
                </h2>
                <p className="intro">
                    <FormattedMessage id="teacherlanding.inPracticeIntro" />
                </p>
                <FlexRow className="general-usage">
                    <p><FormattedHTMLMessage id="teacherlanding.generalUsageSettings" /></p>
                    <p><FormattedHTMLMessage id="teacherlanding.generalUsageGradeLevels" /></p>
                    <p><FormattedHTMLMessage id="teacherlanding.generalUsageSubjectAreas" /></p>
                </FlexRow>
            </section>
            <section id="resources">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="general.resourcesTitle" /></h2>
                <FlexRow className="educator-community">
                    <div>
                        <h3>
                            <FormattedMessage id="teacherlanding.scratchEdTitle" />
                        </h3>
                        <p>
                            <FormattedHTMLMessage id="teacherlanding.scratchEdDescription" />
                        </p>
                    </div>
                    <div>
                        <h3>
                            <FormattedMessage id="teacherlanding.meetupTitle" />
                        </h3>
                        <p>
                            <FormattedHTMLMessage id="teacherlanding.meetupDescription" />
                        </p>
                    </div>
                </FlexRow>
                <h3 id="guides-header">
                    <FormattedMessage id="teacherlanding.guidesTitle" />
                </h3>
                <FlexRow className="guides-and-tutorials">
                    <div>
                        <a href="/tips">
                            <img
                                alt="cards icon"
                                src="/svgs/teachers/v2-cards.svg"
                            />
                        </a>
                        <p>
                            <FormattedHTMLMessage id="teacherlanding.tttPage" />
                        </p>
                    </div>
                    <div>
                        <a href="/projects/editor/?tip_bar=home">
                            <img
                                alt="tips window icon"
                                src="/svgs/teachers/tips-window.svg"
                            />
                        </a>
                        <p>
                            <FormattedHTMLMessage id="teacherlanding.tipsWindow" />
                        </p>
                    </div>
                    <div>
                        <a href="http://scratched.gse.harconstd.edu/guide/">
                            <img
                                alt="creative computing icon"
                                src="/svgs/teachers/creative-computing.svg"
                            />
                        </a>
                        <p>
                            <FormattedHTMLMessage id="teacherlanding.creativeComputing" />
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

render(<Page><Landing /></Page>, document.getElementById('app'));
