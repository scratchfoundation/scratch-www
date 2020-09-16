const bindAll = require('lodash.bindall');
const classNames = require('classnames');
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

const MediaQuery = require('react-responsive').default;
const frameless = require('../../lib/frameless');

require('./annual-report.scss');

const SECTIONS = {
    message: 'message',
    mission: 'mission',
    reach: 'reach',
    milestones: 'milestones',
    initiatives: 'initiatives',
    financials: 'financials',
    supporters: 'supporters',
    leadership: 'leadership',
    donate: 'donate'
};

const SECTION_NAMES = {
    message: <FormattedMessage id="annualReport.subnavMessage" />,
    mission: <FormattedMessage id="annualReport.subnavMission" />,
    reach: <FormattedMessage id="annualReport.subnavReach" />,
    milestones: <FormattedMessage id="annualReport.subnavMilestones" />,
    initiatives: <FormattedMessage id="annualReport.subnavInitiatives" />,
    financials: <FormattedMessage id="annualReport.subnavFinancials" />,
    supporters: <FormattedMessage id="annualReport.subnavSupporters" />,
    leadership: <FormattedMessage id="annualReport.subnavLeadership" />,
    donate: <FormattedMessage id="annualReport.subnavDonate" />
};

class AnnualReport extends React.Component {
    constructor () {
        super();

        // Storage for each of the section refs when we need to refer
        // to them in the scroll handling code
        // These will be stored with a short lowercase key representing
        // the specific section (e.g. 'mission')
        this.sectionRefs = {};

        this.subnavRef = null;

        this.state = {
            currentlyVisible: SECTIONS.message,
            dropdownVisible: false
        };

        bindAll(this, [
            'scrollTo',
            'setRef',
            'setSubnavRef',
            'handleSubnavItemClick',
            'getDimensionsOfSection',
            'handleScroll',
            'handleDropDownClick'
        ]);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnMount () {
        window.removeEventListener('scroll', this.handleScroll);
    }

    // A generic handler for a subnav item that takes the name of the
    // section to scroll to (all lowercase)
    handleSubnavItemClick (sectionName) {
        // Return a button click handler that scrolls to the
        // correct section
        return () => {
            this.scrollTo(this.sectionRefs[sectionName]);
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

    setRef (sectionName) {
        return ref => (this.sectionRefs[sectionName] = ref);
    }

    setSubnavRef (ref) {
        this.subnavRef = ref;
    }

    getDimensionsOfSection (sectionRef) {
        const {height} = sectionRef.getBoundingClientRect();
        const offsetTop = sectionRef.offsetTop;
        const offsetBottom = offsetTop + height;

        return {
            height,
            offsetTop,
            offsetBottom
        };
    }

    handleScroll () {
        const subnavHeight = this.getDimensionsOfSection(this.subnavRef).height;
        // The additional 50 is to account for the main site nav height
        const currentScrollPosition = window.scrollY + subnavHeight + 50;

        // Find which section is currently visible based on our scroll position
        for (const key in this.sectionRefs) {
            if (!this.sectionRefs.hasOwnProperty(key)) continue;
            const currentRef = this.sectionRefs[key];
            const {offsetBottom, offsetTop} = this.getDimensionsOfSection(currentRef);
            if (currentScrollPosition > offsetTop && currentScrollPosition < offsetBottom) {
                if (this.state.currentlyVisible !== key) {
                    this.setState({currentlyVisible: key});
                    return;
                }
            }
        }
    }

    handleDropDownClick () {
        this.setState({dropdownVisible: !this.state.dropdownVisible});
    }

    render () {
        const subnav = (<FlexRow className="inner">
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.message}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.message)}
            >
                {SECTION_NAMES.message}
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.mission}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.mission)}
            >
                <FormattedMessage id="annualReport.subnavMission" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.reach}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.reach)}
            >
                <FormattedMessage id="annualReport.subnavReach" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.milestones}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.milestones)}
            >
                <FormattedMessage id="annualReport.subnavMilestones" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.initiatives}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.initiatives)}
            >
                <FormattedMessage id="annualReport.subnavInitiatives" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.financials}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.financials)}
            >
                <FormattedMessage id="annualReport.subnavFinancials" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.supporters}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.supporters)}
            >
                <FormattedMessage id="annualReport.subnavSupporters" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.leadership}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.leadership)}
            >
                <FormattedMessage id="annualReport.subnavLeadership" />
            </a>
            <a
                className={classNames(
                    {selectedItem: this.state.currentlyVisible === SECTIONS.donate}
                )}
                onClick={this.handleSubnavItemClick(SECTIONS.donate)}
            >
                <FormattedMessage id="annualReport.subnavDonate" />
            </a>
        </FlexRow>);


        return (
            <div>
                <div
                    className="subnavigation"
                    ref={this.setSubnavRef}
                >
                    {/* Top Bar */}
                    <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                        <div className="sectionIndicator inner" >
                            {SECTION_NAMES[this.state.currentlyVisible]}
                            <Button
                                className="dropdown-button"
                                onClick={this.handleDropDownClick}
                            >
                                <img
                                    className={classNames({rotated: this.state.subNavVisible})}
                                    src="/images/annual-report/dropdown-arrow.svg"
                                />
                            </Button>
                        </div>
                        {this.state.dropdownVisible ?
                            /* Bottom Bar */
                            <div className="inner">
                                <hr />
                                {subnav}
                            </div> :
                            null
                        }
                    </MediaQuery>
                    {/* Bottom Bar */}
                    <MediaQuery minWidth={frameless.tabletPortrait}>
                        {subnav}
                    </MediaQuery>
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
                    ref={this.setRef(SECTIONS.mission)}
                >
                    <div className="inner">
                    </div>
                </div>
                <div
                    className="milestones-section section"
                    id="milestones"
                    ref={this.setRef(SECTIONS.milestones)}
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
                    ref={this.setRef(SECTIONS.reach)}
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
                    ref={this.setRef(SECTIONS.initiatives)}
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
                    ref={this.setRef(SECTIONS.financials)}
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
                    ref={this.setRef(SECTIONS.supporters)}
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
                    ref={this.setRef(SECTIONS.donate)}
                >
                    <FlexRow className="donate-info">
                        <MediaQuery minWidth={frameless.tabletPortrait}>
                            <img src="/images/annual-report/donate-illustration.svg" />
                        </MediaQuery>
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
