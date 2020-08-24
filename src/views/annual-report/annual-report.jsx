const bindAll = require('lodash.bindall');
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const NavigationBox = require('../../components/navigation/base/navigation.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./annual-report.scss');

const AnnualReport = () => (
    <div>
        <div className="subnavigation">
            <FlexRow className="inner">
                 <a
                            className="link"
                            href="/annual-report#message"
                        >
                            <FormattedMessage id="annualReport.subnavMessage" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#mission"
                        >
                            <FormattedMessage id="annualReport.subnavMission" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#reach"
                        >
                            <FormattedMessage id="annualReport.subnavReach" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#timeline"
                        >
                            <FormattedMessage id="annualReport.subnavTimeline" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#work"
                        >
                            <FormattedMessage id="annualReport.subnavWork" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#financials"
                        >
                            <FormattedMessage id="annualReport.subnavFinancials" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#supporters"
                        >
                            <FormattedMessage id="annualReport.subnavSupporters" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#leadership"
                        >
                            <FormattedMessage id="annualReport.subnavLeadership" />
                        </a>
                        <a
                            className="link"
                            href="/annual-report#donate"
                        >
                            <FormattedMessage id="annualReport.subnavDonate" />
                        </a>
            </FlexRow>
        </div>
        <div className="banner-wrapper">
            <TitleBanner className="masthead masthead">
                <div className="title-banner-p">
                    <img src="/images/ideas/masthead-illustration.svg" />
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="ideas.headerMessage" />
                    </h1>
                    <a href="/projects/editor/?tutorial=all">
                        <Button className="ideas-button">
                            <img src="/images/ideas/bulb-icon.svg" />
                            <FormattedMessage id="ideas.headerButtonMessage" />
                        </Button>
                    </a>
                </div>
            </TitleBanner>
        </div>
        <div className="mission" id="mission">
            <div className="inner">
                <FlexRow
                    as="section"
                    className="tips-info-section tips-left"
                >
                    <div className="ideas-image">
                        <img src="/images/ideas/getting-started-illustration.svg" />
                    </div>
                    <div>
                        <h2>
                            <FormattedMessage id="ideas.gettingStartedTitle" />
                        </h2>
                        <p>
                            <FormattedHTMLMessage id="ideas.gettingStartedText" />
                        </p>
                        <a href="/projects/editor/?tutorial=getStarted">
                            <Button className="ideas-button">
                                <img src="/images/ideas/try-it-icon.svg" />
                                <FormattedMessage id="ideas.tryIt" />
                            </Button>
                        </a>
                    </div>
                </FlexRow>
            </div>
        </div>
        <div className="our-reach" id="reach">
            <div className="inner">
                <section className="ttt-section">
                    <div className="ttt-head">
                        <h2>
                            <FormattedMessage id="ideas.activityGuidesTitle" />
                        </h2>
                        <p>
                            <FormattedHTMLMessage id="ideas.activityGuidesText" />
                        </p>
                    </div>
                    <a
                        className="wide-button"
                        href="/projects/editor/?tutorial=all"
                    >
                        <Button className="ideas-button wide-button">
                            <FormattedMessage id="ideas.seeAllTutorials" />
                        </Button>
                    </a>
                </section>
            </div>
        </div>
        <div className="history" id="history">
            <div className="inner">
                <section className="ttt-section">
                    <div className="ttt-head">
                        <h2>
                            <FormattedMessage id="ideas.activityGuidesTitle" />
                        </h2>
                        <p>
                            <FormattedHTMLMessage id="ideas.activityGuidesText" />
                        </p>
                    </div>
                    <a
                        className="wide-button"
                        href="/projects/editor/?tutorial=all"
                    >
                        <Button className="ideas-button wide-button">
                            <FormattedMessage id="ideas.seeAllTutorials" />
                        </Button>
                    </a>
                </section>
            </div>
        </div>
        <div className="our-work" id="work">
            <div className="inner">
                <section className="ttt-section">
                    <div className="ttt-head">
                        <h2>
                            <FormattedMessage id="ideas.activityGuidesTitle" />
                        </h2>
                        <p>
                            <FormattedHTMLMessage id="ideas.activityGuidesText" />
                        </p>
                    </div>
                    <a
                        className="wide-button"
                        href="/projects/editor/?tutorial=all"
                    >
                        <Button className="ideas-button wide-button">
                            <FormattedMessage id="ideas.seeAllTutorials" />
                        </Button>
                    </a>
                </section>
            </div>
        </div>
        <div className="financials" id="financials">
            <div className="financials-content">
                <h1 className="financials-h1">
                    <FormattedMessage id="annualReport.financialsTitle" />
                </h1>
                <div className="financials-subsection">
                    <h2>
                        <FormattedMessage id="annualReport.financialsRevenue" />
                    </h2>
                    <hr />
                    <div className="circle-and-words">
                        <span className="financials-dot" />
                        <div className="key-and-money">
                            <p>
                                <FormattedMessage id="annualReport.financialsGrants" />
                            </p>
                            <p>
                                <FormattedMessage id="annualReport.financialsGrantsAmt" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="financials-subsection">
                    <h2>
                        <FormattedMessage id="annualReport.financialsExpenses" />
                    </h2>
                    <hr/>
                </div>
            </div>
        </div>
        <div className="supporters" id="supporters">
            <div className="inner">
                <section className="ttt-section">
                    <div className="ttt-head">
                        <h2>
                            <FormattedMessage id="ideas.activityGuidesTitle" />
                        </h2>
                        <p>
                            <FormattedHTMLMessage id="ideas.activityGuidesText" />
                        </p>
                    </div>
                    <a
                        className="wide-button"
                        href="/projects/editor/?tutorial=all"
                    >
                        <Button className="ideas-button wide-button">
                            <FormattedMessage id="ideas.seeAllTutorials" />
                        </Button>
                    </a>
                </section>
            </div>
        </div>
        <div className="donate-section" id="donate">
            <FlexRow className="donate-info">
                <img src="/images/annual-report/donate-illustration.svg" />
                <div className="donate-content">
                    <h1 className="donate-h1">
                        <FormattedMessage id="annualReport.donateTitle" />
                    </h1>
                    <p className="donate-p">
                        <FormattedMessage id="annualReport.donateMessage" />
                    </p>
                    <a href="https://secure.donationpay.org/scratchfoundation/">
                        <Button className="donate-button">
                            <FormattedMessage id="annualReport.donateButton" />
                        </Button>
                    </a>
                </div>
            </FlexRow>
        </div>
    </div>
);

render(
    <Page><AnnualReport /></Page>, document.getElementById('app'));
