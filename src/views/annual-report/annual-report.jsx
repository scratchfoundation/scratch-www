const bindAll = require('lodash.bindall');
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
// const injectIntl = require('react-intl').injectIntl;
// const intlShape = require('react-intl').intlShape;
const React = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
// const MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
// const NavigationBox = require('../../components/navigation/base/navigation.jsx');
const Comment = require('../../components/comment/comment.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./annual-report.scss');

class AnnualReport extends React.Component {
    constructor () {
        super();
        this.messageRef = null;
        this.missionRef = null;
        this.reachRef = null;
        this.milestonesRef = null;
        this.initiativesRef = null;
        this.financialsRef = null;
        this.supportersRef = null;
        this.leadershipRef = null;
        this.donateRef = null;

        this.sectionRefs = {
            message: () => this.messageRef,
            mission: () => this.missionRef,
            reach: () => this.reachRef,
            milestones: () => this.milestonesRef,
            initiatives: () => this.initiativesRef,
            financials: () => this.financialsRef,
            supporters: () => this.supportersRef,
            leadership: () => this.leadershipRef,
            donate: () => this.donateRef
        };

        bindAll(this, [
            'scrollTo',
            'setMessageRef',
            'setMissionRef',
            'setReachRef',
            'setMilestonesRef',
            'setInitiativesRef',
            'setFinancialsRef',
            'setSupportersRef',
            'setLeadershipRef',
            'setDonateRef',
            'handleSubNavItemClick'
        ]);
    }

    // A generic handler for a subnav item that takes the name of the
    // section to scroll to (all lowercase)
    handleSubNavItemClick (sectionName) {
        // Return a button click handler that scrolls to the
        // correct section
        return () => {
            this.scrollTo(this.sectionRefs[sectionName]());
        };
    }

    scrollTo (element) {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setMessageRef (ref) {
        this.messageRef = ref;
    }
    setMissionRef (ref) {
        this.missionRef = ref;
    }
    setReachRef (ref) {
        this.reachRef = ref;
    }
    setMilestonesRef (ref) {
        this.milestonesRef = ref;
    }
    setInitiativesRef (ref) {
        this.initiativesRef = ref;
    }
    setFinancialsRef (ref) {
        this.financialsRef = ref;
    }
    setSupportersRef (ref) {
        this.supportersRef = ref;
    }
    setLeadershipRef (ref) {
        this.leadershipRef = ref;
    }
    setDonateRef (ref) {
        this.donateRef = ref;
    }

    render () {
        return (
            <div>
                <div className="subnavigation">
                    <FlexRow className="inner">
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('message')}
                        >
                            <FormattedMessage id="annualReport.subnavMessage" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('mission')}
                        >
                            <FormattedMessage id="annualReport.subnavMission" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('reach')}
                        >
                            <FormattedMessage id="annualReport.subnavReach" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('milestones')}
                        >
                            <FormattedMessage id="annualReport.subnavMilestones" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('initiatives')}
                        >
                            <FormattedMessage id="annualReport.subnavInitiatives" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('financials')}
                        >
                            <FormattedMessage id="annualReport.subnavFinancials" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('supporters')}
                        >
                            <FormattedMessage id="annualReport.subnavSupporters" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('leadership')}
                        >
                            <FormattedMessage id="annualReport.subnavLeadership" />
                        </a>
                        <a
                            className="link"
                            onClick={this.handleSubNavItemClick('donate')}
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
                <div
                    className="mission section"
                    id="mission"
                    ref={this.setMissionRef}
                >
                    <div className="inner">
                    </div>
                </div>
                <div
                    className="milestones-section section"
                    id="milestones"
                    ref={this.setMilestonesRef}
                >
                    <div className="inner">
                        <div className="milestones-intro">
                            <h2>
                                <FormattedMessage id="annualReport.milestonesTitle" />
                            </h2>
                            <p>
                                <FormattedMessage id="annualReport.milestonesDescription" />
                            </p>
                        </div>
                        <div className="milestones-boxes">
                            <div className="milestone-box first">
                                <h4>
                                    2003
                                    {/* TODO should this be localized? */}
                                </h4>
                                <p>
                                    <FormattedMessage id="annualReport.milestones2003Message" />
                                </p>
                            </div>
                            <div className="milestone-box">
                                <h4>
                                    2004
                                    {/* TODO should this be localized? */}
                                </h4>
                                <p>
                                    <FormattedMessage id="annualReport.milestones2004Message" />
                                </p>
                                <img src="/images/annual-report/milestones/2004_Clubhouse.jpg" />
                            </div>
                            <div className="milestone-box last">
                                <h4>
                                    2007
                                    {/* TODO should this be localized? */}
                                </h4>
                                <p>
                                    <FormattedMessage id="annualReport.milestones2007Message" />
                                </p>
                                <img src="/images/annual-report/milestones/2007_EarlyScratch.png" />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="our-reach section"
                    id="reach"
                    ref={this.setReachRef}
                >
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
                <div
                    className="initiatives section"
                    id="initiatives"
                    ref={this.setInitiativesRef}
                >
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
                <div
                    className="financials-section section"
                    id="financials"
                    ref={this.setFinancialsRef}
                >
                    <div className="inner">
                        <h2 className="financials-h2">
                            <FormattedMessage id="annualReport.financialsTitle" />
                        </h2>
                        <h3>
                            <FormattedMessage id="annualReport.financialsRevenue" />
                        </h3>
                        <hr />
                        <div className="financials-content">
                            <div className="financials-table">
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/blue-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsGrants" />
                                        </p>
                                        <p>
                                            $3,898,078
                                            <span className="percentage"> (82.7%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/yellow-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsEvents" />
                                        </p>
                                        <p>
                                            $700,000
                                            <span className="percentage"> (14.8%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/green-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsOther" />
                                        </p>
                                        <p>
                                            $114,982
                                            <span className="percentage"> (2.4%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <div className="key-and-money total">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsTotal" />
                                        </p>
                                        <p>
                                            $4,713,060
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="graph"
                                src="/images/annual-report/revenue-graph.svg"
                            />
                        </div>
                        <h3>
                            <FormattedMessage id="annualReport.financialsExpenses" />
                        </h3>
                        <hr />
                        <div className="financials-content">
                            <div className="financials-table">
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/blue-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsProgram" />
                                        </p>
                                        <p>
                                            $1,135,767
                                            <span className="percentage"> (48.8%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/yellow-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsGeneral" />
                                        </p>
                                        <p>
                                            $224,104
                                            <span className="percentage"> (9.6%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <img src="/images/annual-report/green-circle.svg" />
                                    <div className="key-and-money">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsFundraising" />
                                        </p>
                                        <p>
                                            $962,958
                                            <span className="percentage"> (41.4%)</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="circle-and-words">
                                    <div className="key-and-money total">
                                        <p className="key">
                                            <FormattedMessage id="annualReport.financialsTotal" />
                                        </p>
                                        <p>
                                            $2,322,829
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <img
                                className="graph"
                                src="/images/annual-report/expenses-graph.svg"
                            />
                        </div>
                        <div className="financials-button-wrapper">
                            <a href="https://secure.donationpay.org/scratchfoundation/">
                                <Button className="financials-button">
                                    <FormattedMessage id="annualReport.financialsButton" />
                                    <img
                                        className="download-icon"
                                        src="/images/annual-report/download-icon.svg"
                                    />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="supporters-section section"
                    id="supporters"
                    ref={this.setSupportersRef}
                >
                    <div className="inner">
                        <div className="supporters-heading">
                            <h2>
                                <FormattedMessage id="annualReport.supportersTitle" />
                            </h2>
                            <p>
                                <FormattedHTMLMessage id="annualReport.supportersIntro" />
                            </p>
                        </div>
                        <div className="subsection-tag">
                            <FormattedHTMLMessage id="annualReport.supportersSpotlightTitle" />
                        </div>
                        <div className="supporters-subsection">
                            <div className="supporters-blurb">
                                <h3>
                                    <FormattedMessage id="annualReport.supportersSFETitle" />
                                </h3>
                                <p>
                                    <FormattedMessage id="annualReport.supportersSFEDescription" />
                                </p>
                            </div>
                            <div className="david-siegel">
                                <div className="ds-info">
                                    <img src="/images/annual-report/david-siegel-photo.svg" />
                                    <div>
                                        <h3>David Siegel</h3>
                                        <div>Co-Founder and<br /> Co-Chairman<br /> Two Sigma</div>
                                    </div>
                                </div>
                                <div className="ds-quote">
                                    {/* eslint-disable-next-line */}
                                    <Comment comment="Making sure that Scratch remains free and accessible for kids everywhere is one of the most impactful ways we can help young learners engage and thrive in an increasingly digital world. Supporting Scratch is more important today than ever before." />
                                </div>
                            </div>
                        </div>
                        <div className="supporters-subsection">
                            <div className="supporters-blurb">
                                <h4>
                                    <FormattedHTMLMessage id="annualReport.supportersTitle" />
                                </h4>
                                <p>
                                    <FormattedHTMLMessage id="annualReport.supportersAllDescription" />
                                </p>
                            </div>
                            <div className="supporters-level">
                                <h5>Founding Partners — $10,00,000+</h5>
                                <hr />
                                <p>We are especially grateful to our Founding Partners who supported us from the early days of Scratch, each providing at least $10,000,000 of cumulative support, in various forms.</p>
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>National Science Foundation</li>
                                        <li>Massachusetts Institute of Technology</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Siegel Family Endowment</li>
                                        <li>LEGO Foundation</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Innovation Circle — $5,00,000+</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>Google</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Creativity Circle — $1,00,000++</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>Little Bluebridge Foundation</li>
                                        <li>Smilegate Foundation</li>
                                        <li>TAL Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Turner Broadcasting System / Cartoon Network (?)</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Imagination Circle — $200,000+</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>BrainPOP</li>
                                        <li>Cindy and Evan Goldberg</li>
                                        <li>Kahn-Rowe Family Fund</li>
                                        <li>LEGO Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Mark Dalton</li>
                                        <li>Morgan Stanley</li>
                                        <li>Paul T. Jones</li>
                                        <li>Two Sigma</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Inspiration Circle — $50,000+</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>BrainPOP</li>
                                        <li>Cindy and Evan Goldberg</li>
                                        <li>Kahn-Rowe Family Fund</li>
                                        <li>LEGO Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Mark Dalton</li>
                                        <li>Morgan Stanley</li>
                                        <li>Paul T. Jones</li>
                                        <li>Two Sigma</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Collaboration Circle — $20,000+</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>BrainPOP</li>
                                        <li>Cindy and Evan Goldberg</li>
                                        <li>Kahn-Rowe Family Fund</li>
                                        <li>LEGO Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Mark Dalton</li>
                                        <li>Morgan Stanley</li>
                                        <li>Paul T. Jones</li>
                                        <li>Two Sigma</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="supporters-level">
                                <h5>Tinkering Circle — $5,000+</h5>
                                <hr />
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>BrainPOP</li>
                                        <li>Cindy and Evan Goldberg</li>
                                        <li>Kahn-Rowe Family Fund</li>
                                        <li>LEGO Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Mark Dalton</li>
                                        <li>Morgan Stanley</li>
                                        <li>Paul T. Jones</li>
                                        <li>Two Sigma</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="supporters-subsection">
                            <div className="supporters-level">
                                <h3>
                                    <FormattedHTMLMessage id="annualReport.supportersInKindTitle" />
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae commodo orci, quis ultricies nisi
                                </p>
                                <div className="supporters-list">
                                    <ul className="supporters-list-side">
                                        <li>Amazon Web Services</li>
                                        <li>Cindy and Evan Goldberg</li>
                                        <li>Kahn-Rowe Family Fund</li>
                                        <li>LEGO Education</li>
                                    </ul>
                                    <ul className="supporters-list-side">
                                        <li>Mark Dalton</li>
                                        <li>Morgan Stanley</li>
                                        <li>Paul T. Jones</li>
                                        <li>Two Sigma</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="donate-section section"
                    id="donate"
                    ref={this.setDonateRef}
                >
                    <FlexRow className="donate-info">
                        <img src="/images/annual-report/donate-illustration.svg" />
                        <div className="donate-content">
                            <h2 className="donate-h2">
                                <FormattedMessage id="annualReport.donateTitle" />
                            </h2>
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
    }
}

render(
    <Page><AnnualReport /></Page>, document.getElementById('app')
);
