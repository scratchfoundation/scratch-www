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
                <ul className="ul">
                    <li className="li-left">
                        <ul className="li-left-ul">
                            <li>
                                <a
                                    className="link"
                                    href="/conference"
                                >
                                    <span className="">Mission</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    className="link"
                                    href="/conference"
                                >
                                    <span className="">Reach</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
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
        <div className="mission">
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
        <div className="our-reach">
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
        <div className="history">
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
        <div className="our-work">
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
        <div className="financials">
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
        <div className="supporters">
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
        <div className="donate-section">
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
