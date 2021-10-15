const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const MediaQuery = require('react-responsive').default;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const render = require('../../../../lib/render.jsx');
const frameless = require('../../../../lib/frameless');

const Avatar = require('../../../../components/avatar/avatar.jsx');
const Page = require('../../../../components/page/www/page.jsx');
const Grid = require('../../../../components/grid/grid.jsx');
const Button = require('../../../../components/forms/button.jsx');
const FlexRow = require('../../../../components/flex-row/flex-row.jsx');
const Comment = require('../../../../components/comment/comment.jsx');
const CountryBlurb = require('../../../../components/country-blurb/country-blurb.jsx');
const AnnualReportExample = require('../../../../components/annual-report-example/annual-report-example.jsx');
const TimelineCard = require('../../../../components/timeline-card/timeline-card.jsx');
const WorldMap = require('../../../../components/world-map/world-map.jsx');
const CountryUsage = require('./country-usage.json');
const IndiaProjects = require('./india-projects.json');
const PeopleGrid = require('../../../../components/people-grid/people-grid.jsx');
const People = require('./people.json');
const BLMProjects = require('./blm-projects.json');
const VideoPreview = require('../../../../components/video-preview/video-preview.jsx');
const Supporters = require('./supporters.json');
import { TwitterTweetEmbed } from 'react-twitter-embed';


require('./annual-report.scss');

// Founder’s Message / Mission / Reach / Themes / Director’s Message / Supporters / Team / Donate

// Some constants used for the page subnav and section refs
const SECTIONS = {
    founders_message: 'founders-message',
    mission: 'mission',
    reach: 'reach',
    themes: 'themes',
    directors_message: 'directors_message',
    supporters: 'supporters',
    team: 'team',
    donate: 'donate'
};

const SECTION_NAMES = {
    founders_message: <FormattedMessage id="annualReport.2020.subnavFoundersMessage" />,
    mission: <FormattedMessage id="annualReport.2020.subnavMission" />,
    reach: <FormattedMessage id="annualReport.2020.subnavReach" />,
    themes: <FormattedMessage id="annualReport.2020.subnavThemes" />,
    directors_message: <FormattedMessage id="annualReport.2020.subnavDirectors_message" />,
    supporters: <FormattedMessage id="annualReport.2020.subnavSupporters" />,
    team: <FormattedMessage id="annualReport.2020.subnavTeam" />,
    donate: <FormattedMessage id="annualReport.2020.subnavDonate" />
};

// Constants used for world map data processing/formatting for use with Plotly
const countryNames = Object.keys(CountryUsage);
const countryData = countryNames.map(key =>
    `<b>${CountryUsage[key].display}</b><br>${CountryUsage[key].count.toLocaleString('en')}`
);
const colorIndex = countryNames.map(key => CountryUsage[key]['log count']);

// Create the div given a list of supporter names,
// this will contain two columns of names either of equal size
// or with the left column containing 1 more item than the right
const createSupportersLists = (inKind, supportersList) => {
    supportersList.sort();
    const splitIndex = Math.ceil(supportersList.length / 2);
    const firstHalf = supportersList.slice(0, splitIndex);
    const secondHalf = supportersList.slice(splitIndex);
    
    return (
        <div className="supporters-list">
            <ul className="supporters-list-side">
                {
                    firstHalf.map((supporter, index) => (
                        <li key={index}>
                            {supporter}
                            {inKind.includes(supporter) && 
                                <span className="in-kind"></span>
                            }
                        </li>
                        ))
                }
            </ul>
            <ul className="supporters-list-side">
                {
                    secondHalf.map((supporter, index) => (
                        <li key={index}>
                            {supporter}
                            {inKind.includes(supporter) && 
                                <span className="in-kind"></span>
                            }
                        </li>
                        ))
                }
            </ul>
        </div>
    );
};

class AnnualReport extends React.Component {
    constructor (props) {
        super(props);

        // Storage for each of the section refs when we need to refer
        // to them in the scroll handling code
        // These will be stored with a short lowercase key representing
        // the specific section (e.g. 'mission')
        this.sectionRefs = {};

        this.subnavRef = null;

        this.state = {
            currentlyVisible: SECTIONS.founders_message, // The currently visible section
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
        // Return a button click handler that will close the dropdown if open
        // and scrolls to the correct section
        return () => {
            this.setState({dropdownVisible: false});
            this.scrollTo(this.sectionRefs[sectionName]);
        };
    }

    scrollTo (element) {
        if (element) {
            const sectionTop = this.getDimensionsOfSection(element).offsetTop;
            window.scrollTo({top: sectionTop, behavior: 'smooth'});
            // The smooth scrolling doesn't work on Safari
            // but this code allows scrolling to the correct part of the section
            // in Safari since the css property 'scrollMarginTop' is also not supported there
        }
    }

    // Generically create a ref for the given section, stored in
    // this.sectionRefs
    setRef (sectionName) {
        return ref => (this.sectionRefs[sectionName] = ref);
    }

    setSubnavRef (ref) {
        this.subnavRef = ref;
    }

    // Calculate the dimensions of a given section for use in figuring out
    // which section is currently visible
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

    // While scrolling, update the subnav to reflect the currently visible section
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

    // Click handler for responsive subnav dropdown
    handleDropDownClick () {
        this.setState({dropdownVisible: !this.state.dropdownVisible});
    }

    render () {
        // Element containing buttons to scroll to each of the sections in the
        // annual report. The layout of this component will be different on
        // different screen sizes (see below)
        const subnav =
            (<FlexRow className="inner">
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.founders_message}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.founders_message)}
                >
                    {SECTION_NAMES.founders_message}
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.mission}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.mission)}
                >
                    <FormattedMessage id="annualReport.2020.subnavMission" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.reach}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.reach)}
                >
                    <FormattedMessage id="annualReport.2020.subnavReach" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.themes}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.themes)}
                >
                    <FormattedMessage id="annualReport.2020.subnavThemes" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.directors_message}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.directors_message)}
                >
                    <FormattedMessage id="annualReport.2020.subnavDirectorsMessage" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.supporters}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.supporters)}
                >
                    <FormattedMessage id="annualReport.2020.subnavSupporters" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.team}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.team)}
                >
                    <FormattedMessage id="annualReport.2020.subnavTeam" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.donate}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.donate)}
                >
                    <FormattedMessage id="annualReport.2020.subnavDonate" />
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
                                    className={classNames({rotated: this.state.dropdownVisible})}
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
                    {/* For large screens, show whole subnav, with no dropdown */}
                    <MediaQuery minWidth={frameless.tabletPortrait}>
                        {subnav}
                    </MediaQuery>
                </div>
                <div className="annual-report-content">
                    <div
                        className="message-section"
                        ref={this.setRef(SECTIONS.founders_message)}
                    >
                        <div className="inner">
                            <FlexRow className="masthead">
                                <div className="masthead-content">
                                    <p className="message-year">
                                        <FormattedMessage id="annualReport.2020.mastheadYear" />
                                    </p>
                                    <h1>
                                        <FormattedMessage id="annualReport.2020.mastheadTitle" />
                                    </h1>
                                </div>
                                <img src="/images/annual-report/2020/founders-message/Masthead_Illustration.svg" />
                            </FlexRow>
                            <MediaQuery minWidth={frameless.desktop}>
                                <img
                                    className="wave-icon-desktop"
                                    src="/images/annual-report/message/wave-icon.svg"
                                />
                            </MediaQuery>
                            <FlexRow className="message-content">
                                <MediaQuery maxWidth={frameless.desktop - 1}>
                                    {/* Show the wave icon inside this div in smaller screens */}
                                    <div className="wave-icon-and-title">
                                        <img src="/images/annual-report/2020/founders-message/Wave_Icon.svg" />
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.foundersMessageTitle" />
                                        </h2>
                                    </div>
                                </MediaQuery>
                                <MediaQuery minWidth={frameless.desktop}>
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.foundersMessageTitle" />
                                    </h2>
                                </MediaQuery>
                                <div className="message-from-team">
                                    <p>
                                        <FormattedMessage id="annualReport.2020.foundersMessageP1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.foundersMessageP2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.foundersMessageP3" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.foundersMessageP4" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.foundersMessageP5" />
                                    </p>
                                    <div className="founders-signature">
                                        <img
                                            className="mitch-photo"
                                            src="/images/annual-report/2020/founders-message/mitch_headshot.jpg"
                                        />
                                        <div className="signature-container">
                                            <p className="message-signature">
                                                <FormattedMessage id="annualReport.2020.foundersMessageSignature" />
                                            </p>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.foundersMessageScratchTitle" />
                                            </p>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.foundersMessageAffiliation" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FlexRow>
                        </div>
                        <div className="transition-images">
                            <img src="/images/annual-report/message/blocks.svg" />
                            <img src="/images/annual-report/message/banana.svg" />
                        </div>
                    </div>
                    <div
                        className="mission-section"
                        ref={this.setRef(SECTIONS.mission)}
                    >
                        <div className="inner">
                            <h2><FormattedMessage id="annualReport.2020.missionTitle" /></h2>
                            <h5><FormattedMessage id="annualReport.2020.visionHeader" /></h5>
                            <p className="mission-subtitle"><FormattedMessage id="annualReport.2020.visionSubtitle" /></p>
                            <h5><FormattedMessage id="annualReport.2020.missionHeader" /></h5>
                            <p className="mission-subtitle"><FormattedMessage id="annualReport.2020.missionSubtitle" /></p>
                            <p><FormattedMessage id="annualReport.2020.missionP1" /></p>
                            <p><FormattedMessage id="annualReport.2020.missionP2" /></p>
                            <p>
                                <FormattedMessage
                                    id="annualReport.2020.missionP3"
                                    values={{
                                        fourPsItalics: (
                                            <i>
                                                <FormattedMessage id="annualReport.2020.fourPs" />
                                            </i>
                                        )
                                    }}
                                />
                            </p>
                        </div>
                        <div className="four-ps">
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-projects">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionProjectsTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionProjectsDescription" /></p>
                                    </div>
                                    <img src="/images/annual-report/mission/Projects Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery
                                className="one-p top"
                                maxWidth={frameless.tabletPortrait - 1}
                            >
                                <div className="title-and-description">
                                    <h3><FormattedMessage id="annualReport.2020.missionProjectsTitle" /></h3>
                                    <p><FormattedMessage id="annualReport.2020.missionProjectsDescription" /></p>
                                </div>
                                <div className="small-p four-ps-projects">
                                    <img src="/images/annual-report/mission/Projects Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-passion">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPassionTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPassionDescription" /></p>
                                    </div>
                                    <img src="/images/annual-report/mission/Passion Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery
                                className="one-p"
                                maxWidth={frameless.tabletPortrait - 1}
                            >
                                <div className="title-and-description">
                                    <h3><FormattedMessage id="annualReport.2020.missionPassionTitle" /></h3>
                                    <p className="no-margin-bottom">
                                        <FormattedMessage id="annualReport.2020.missionPassionDescription" />
                                    </p>
                                </div>
                                <div className="small-p four-ps-passion">
                                    <img src="/images/annual-report/mission/Passion Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-peers">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPeersTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPeersDescription" /></p>
                                    </div>
                                    <img src="/images/annual-report/mission/Peers Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery
                                className="one-p"
                                maxWidth={frameless.tabletPortrait - 1}
                            >
                                <div className="title-and-description">
                                    <h3><FormattedMessage id="annualReport.2020.missionPeersTitle" /></h3>
                                    <p><FormattedMessage id="annualReport.2020.missionPeersDescription" /></p>
                                </div>
                                <div className="small-p four-ps-peers">
                                    <img src="/images/annual-report/mission/Peers Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-play">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPlayTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPlayDescription" /></p>
                                    </div>
                                    <img src="/images/annual-report/mission/Play Illustration.svg" />
                                </div>
                            </MediaQuery>
                            <MediaQuery
                                className="one-p"
                                maxWidth={frameless.tabletPortrait - 1}
                            >
                                <div className="title-and-description">
                                    <h3><FormattedMessage id="annualReport.2020.missionPlayTitle" /></h3>
                                    <p><FormattedMessage id="annualReport.2020.missionPlayDescription" /></p>
                                </div>
                                <div className="small-p four-ps-play">
                                    <img src="/images/annual-report/mission/Play Illustration.svg" />
                                </div>
                            </MediaQuery>
                        </div>
                    </div>
                    <div
                        className="reach-section"
                        ref={this.setRef(SECTIONS.reach)}
                    >
                        <div className="inner">
                            <div className="reach-intro">
                                <div className="hed">
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.reachTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.reachSubtitle" />
                                    </p>
                                </div>
                                <img src="/images/annual-report/2020/data/Calendar.svg" />
                                <div className="reach-numbers">
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2020.reachNewUsersNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.reachNewUsers" />
                                        </h4>
                                        <div className="increase bubble">
                                            <FormattedMessage id="annualReport.2020.reachNewUsersIncrease" />
                                        </div>
                                    </div>
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2020.reachProjectsCreatedNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.reachProjectsCreated" />
                                        </h4>
                                        <div className="increase bubble">
                                            <FormattedMessage id="annualReport.2020.reachProjectsCreatedIncrease" />
                                        </div>
                                    </div>
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2020.reachProjectCreatorsNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.reachProjectCreators" />
                                        </h4>
                                        <div className="increase bubble">
                                            <FormattedMessage id="annualReport.2020.reachProjectCreatorsIncrease" />
                                        </div>
                                    </div>
                                    <img className="comment-viz" src="/images/annual-report/2020/data/Comments-visualization.svg" />
                                    <div className="reach-datapoint increase">
                                        <FormattedMessage
                                            id="annualReport.2020.reachIncreaseInCommentsNumber"
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.reachComments" />
                                        </h4>
                                        <div className="bubble">
                                            <FormattedMessage
                                            id="annualReport.2020.reachIncreaseInCommentsOld"
                                            values={{
                                                million: (
                                                    <FormattedMessage id="annualReport.2020.reachMillion" />
                                                )
                                            }}
                                            />
                                            <img src="/images/annual-report/2020/Symbols-UI/Arrow_Next.svg" />
                                            <FormattedMessage
                                            id="annualReport.2020.reachIncreaseInCommentsIncrease"
                                            values={{
                                                million: (
                                                    <FormattedMessage id="annualReport.2020.reachMillion" />
                                                )
                                            }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="map-inner">
                            <div className="reach-map">
                                <h3>
                                    <FormattedMessage id="annualReport.2020.reachGlobalCommunity" />
                                </h3>
                                <p>
                                    <FormattedMessage id="annualReport.2020.reachMapBlurb" />
                                </p>
                                <div className="map-key">
                                    <div className="map-scale">
                                        <div>0</div>
                                        <img src="/images/annual-report/reach/Map Key.svg" />
                                        <div>
                                            <FormattedMessage id="annualReport.2020.reachMap20M" />
                                        </div>
                                    </div>
                                    <div>
                                        <FormattedMessage id="annualReport.2020.reachMapLog" />
                                    </div>
                                </div>
                                <div className="map-wrapper">
                                    <MediaQuery minWidth={frameless.desktop}>
                                        <WorldMap
                                            className="map"
                                            colorIndex={colorIndex}
                                            countryData={countryData}
                                            countryNames={countryNames}
                                        />
                                    </MediaQuery>
                                    <MediaQuery
                                        maxWidth={frameless.desktop - 1}
                                        minWidth={frameless.tabletPortrait}
                                    >
                                        <WorldMap
                                            className="map"
                                            colorIndex={colorIndex}
                                            countryData={countryData}
                                            countryNames={countryNames}
                                        />
                                    </MediaQuery>
                                    <MediaQuery
                                        maxWidth={frameless.tabletPortrait - 1}
                                        minWidth={frameless.mobileIntermediate}
                                    >
                                        <WorldMap
                                            className="map"
                                            colorIndex={colorIndex}
                                            countryData={countryData}
                                            countryNames={countryNames}
                                        />
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.mobileIntermediate - 1}>
                                        <WorldMap
                                            className="map"
                                            colorIndex={colorIndex}
                                            countryData={countryData}
                                            countryNames={countryNames}
                                        />
                                    </MediaQuery>
                                </div>
                            </div>
                        </div>
                        <div className="inner">
                            <div className="reach-translation">
                                <div className="reach-translation-intro">
                                    <h3>
                                        <FormattedMessage id="annualReport.2020.reachTranslationTitle" />
                                    </h3>
                                    <div className="inline">
                                        <img src="/images/annual-report/2020/Symbols-UI/Arrow_up.svg" />
                                        <FormattedMessage id="annualReport.2020.reachTranslationIncrease" />
                                    </div>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.reachTranslationBlurb" />
                                    </p>
                                </div>
                                <img src="/images/annual-report/2020/data/translated-illustration.svg" />
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img src="/images/annual-report/reach/horizontal-command.svg" />
                            </div>
                        </MediaQuery>
                    </div>
                    <div className="reach-scratch-jr">
                        <div className="inner">
                            <div className="scratch-jr-intro">
                                <img src="/images/annual-report/2020/data/ScratchJr_Logo.svg" />
                                <p>
                                    <FormattedMessage id="annualReport.2020.reachScratchJrBlurb" />
                                </p>
                            </div>
                            <div className="reach-datapoint">
                                <FormattedMessage
                                    id="annualReport.2020.reachDownloadsMillion"
                                    values={{
                                        million: (
                                            <div className="million">
                                                <FormattedMessage id="annualReport.2020.reachMillion" />
                                            </div>
                                        )
                                    }}
                                />
                                <h4>
                                    <FormattedMessage id="annualReport.2020.reachDownloads" />
                                </h4>
                                <div className="increase bubble dark">
                                    <FormattedMessage id="annualReport.2020.reachDownloadsIncrease" />
                                </div>
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img src="/images/annual-report/reach/horizontal-loop.svg" />
                            </div>
                        </MediaQuery>
                    </div>
                    <div
                        className="initiatives-section"
                        ref={this.setRef(SECTIONS.themes)}
                    >
                        <div className="initiatives-intro">
                            <div className="inner">
                                <h2>
                                    <FormattedMessage id="annualReport.2020.themesTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2020.themesDescription" />
                                </p>
                                <div className="initiatives-pillars">
                                    <div className="three-pillars">
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.connectivityTitle" />
                                            </h4>
                                        </div>
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.adaptationTitle" />
                                            </h4>
                                        </div>
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.communityTitle" />
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="equity-and-global">
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.equity" />
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="initiatives-connectivity">
                            <div className="initiatives-subsection-header connectivity">
                                <div className="inner">
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.connectivityTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.connectivityIntro" />
                                    </p>
                                </div>
                            </div>
                            <div className="initiatives-subsection-content connectivity">
                                {/* eslint-disable max-len */}
                                <div className="inner">
                                    <div className="content">
                                        <div className="text">
                                            <div className="spotlight bubble connectivity">
                                                <FormattedMessage id="annualReport.2020.spotlightStory" />
                                            </div>
                                            <h2>
                                                <FormattedMessage id="annualReport.2020.connectivityIndia" />
                                            </h2>
                                            <p className="larger">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaIntro" />
                                            </p>
                                        </div>
                                        <div className="images">
                                            <Grid
                                                    showAvatar
                                                    items={IndiaProjects}
                                                    showFavorites={false}
                                                    showLoves={false}
                                                    showViews={false}
                                                />
                                        </div>
                                    </div>
                                    <p className="about-breaker">
                                        <FormattedMessage id="annualReport.2020.connectivityIndiaParagraph" />
                                    </p>
                                    <div className="content around">
                                        <img src="/images/annual-report/2020/connectivity/India_Data/data_projectscreatedonline_graphic.svg" />
                                        <div className="india-numbers">
                                            <h2>
                                                <FormattedMessage
                                                id="annualReport.2020.connectivityIndiaProjectsNumber"
                                                values={{
                                                    million: (
                                                        <span className="million">
                                                            <FormattedMessage id="annualReport.2020.reachMillion" />
                                                        </span>
                                                    )
                                                }}
                                            />
                                            </h2>
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaProjectsSubhead" />
                                            </h4>
                                            <div className="increase bubble inverted">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaProjectsIncreasePercent" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content around users">
                                        <div className="users-text">
                                            <p>
                                                <span className="bold">
                                                    <FormattedMessage id="annualReport.2020.connectivityRegistedUsers" />
                                                </span>
                                                <FormattedMessage id="annualReport.2020.connectivityRegistedUsersNumbers" />
                                            </p>
                                        </div>
                                        <img src="/images/annual-report/2020/connectivity/India_Data/data_alltimeusers_graphic.svg" />
                                    </div>
                                    <div className="content around users">
                                        <div className="stats">
                                            <p className="bold">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaUsers" />
                                            </p>
                                            <h2>
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaUsersPercent" />
                                            </h2>
                                            <p className="bold">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaYear" />
                                            </p>
                                            <div className="bubble inverted">
                                                <FormattedMessage
                                                id="annualReport.2020.connectivityIndiaUsersOld"
                                                values={{
                                                    million: (
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    )
                                                }}
                                                />
                                                <img src="/images/annual-report/2020/Symbols-UI/Arrow_Next_purple.svg" />
                                                <FormattedMessage
                                                id="annualReport.2020.connectivityIndiaUsersNew"
                                                values={{
                                                    million: (
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    )
                                                }}
                                                />
                                            </div>
                                        </div>
                                        <div className="stats">
                                            <p className="bold">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaProjects" />
                                            </p>
                                            <h2>
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaProjectsPercent" />
                                            </h2>
                                            <p className="bold">
                                                <FormattedMessage id="annualReport.2020.connectivityIndiaYear" />
                                            </p>
                                            <div className="bubble inverted">
                                                <FormattedMessage
                                                id="annualReport.2020.connectivityIndiaProjectsOld" />
                                                <img src="/images/annual-report/2020/Symbols-UI/Arrow_Next_purple.svg" />
                                                <FormattedMessage
                                                id="annualReport.2020.connectivityIndiaProjectsNew"
                                                values={{
                                                    million: (
                                                        <FormattedMessage id="annualReport.2020.reachMillion" />
                                                    )
                                                }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="world">
                                        <div className="spotlight bubble connectivity">
                                            <FormattedMessage id="annualReport.2020.spotlightStory" />
                                        </div>
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.connectivityWorld" />
                                        </h2>
                                        <p className="bold">
                                            <FormattedMessage id="annualReport.2020.connectivityWorldSubtitle" />
                                        </p>
                                    </div>
                                    {/* <div className="big-video"> */}
                                    <div className="video-container">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/connectivity/Scratch Around the World Video.svg"
                                                thumbnailWidth="1000"
                                                videoHeight="450"
                                                videoId="rlsjbx0st4"
                                                videoWidth="700"
                                            />
                                        </MediaQuery>
                                        <MediaQuery
                                            maxWidth={frameless.tabletPortrait - 1}
                                            minWidth={frameless.mobile}
                                        >
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/connectivity/Scratch Around the World Video.svg"
                                                thumbnailWidth="800"
                                                videoHeight="320"
                                                videoId="rlsjbx0st4"
                                                videoWidth="568"
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/connectivity/Scratch Around the World Video.svg"
                                                thumbnailWidth="500"
                                                videoHeight="216"
                                                videoId="rlsjbx0st4"
                                                videoWidth="380"
                                            />
                                        </MediaQuery>
                                    </div>
                                    {/* </div> */}
                                    <div className="flex-content">
                                        <CountryBlurb
                                            className="reverse"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Scratch Al Sur logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryChileTitle'}
                                            )}
                                            list_icon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryChile'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryChileParagraph'}
                                            )}
                                            large_image="/images/annual-report/2020/connectivity/Scratch Around the World/Scratch Al Sur graphic.svg"
                                        />
                                        <CountryBlurb
                                            className="regular"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Brazil Creative Learning Network logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryBrazilTitle'}
                                            )}
                                            list_icon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryBrazil'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryBrazilParagraph'}
                                            )}
                                            large_image="/images/annual-report/2020/connectivity/Scratch Around the World/Brazil Creative Learning Network graphic.svg"
                                        />
                                        <CountryBlurb
                                            className="reverse"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Quest Alliance logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryIndiaTitle'}
                                            )}
                                            list_icon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryIndia'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryIndiaParagraph'}
                                            )}
                                            large_image="/images/annual-report/2020/connectivity/Scratch Around the World/Quest Alliance graphic.svg"
                                        />
                                        <CountryBlurb
                                            className="regular"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Raspberry Pi logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryUSATitle'}
                                            )}
                                            list_icon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryUSA'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryUSAParagraph'}
                                            )}
                                            large_image="/images/annual-report/2020/connectivity/Scratch Around the World/Raspberry Pi graphic.svg"
                                        />
                                    </div>
                                    <div className="resources">
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.connectivityResources" />
                                        </h2>
                                        <p className="bold">
                                            <FormattedMessage id="annualReport.2020.connectivityResourcesSubtitle" />
                                        </p>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.connectivityResourcesParagraph" />
                                        </p>
                                    </div>
                                    <div className="flex-content">
                                        <AnnualReportExample
                                            className="reverse"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample1Title'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample1Paragraph'}
                                            )}
                                            type="image"
                                            large_image="/images/annual-report/2020/connectivity/TutorialUI.svg"
                                        />
                                        <AnnualReportExample
                                            className="regular"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample2Title'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample2Paragraph'}
                                            )}
                                            type="video"
                                            video_id="xfh9bvbeik"
                                            large_image="/images/annual-report/2020/connectivity/Getting Started with Scratch video.png"
                                        />
                                        <AnnualReportExample
                                            className="full-width"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample3Title'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample3Paragraph'}
                                            )}
                                            type="image"
                                            large_image="/images/annual-report/2020/connectivity/isiXhosa_scratcheditor.jpg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="initiatives-adaptation">
                            <div className="initiatives-subsection-header adaptation">
                                <div className="inner">
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.adaptationTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.adaptationIntro" />
                                    </p>
                                </div>
                            </div>
                            <div className="community-quotes">
                                <div className="community-quote">
                                    <div className="quote-person">
                                        <Avatar
                                            alt=""
                                            src="/images/annual-report/2020/adaptation/quote_benedikthochwartner.svg"
                                        />
                                        <div>
                                            <h5>
                                                <FormattedMessage id="annualReport.2020.adaptationQuoteName" />
                                            </h5>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.adaptationQuoteTitle" />
                                            </p>
                                        </div>
                                    </div>
                                    <Comment
                                        comment={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.adaptationQuoteText'}
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="initiatives-subsection-content">
                                {/* eslint-disable max-len */}
                                <div className="inner">
                                    <div className="content flex-content">
                                        <div className="text">
                                            <div className="spotlight bubble adaptation">
                                                <FormattedMessage id="annualReport.2020.spotlightStory" />
                                            </div>
                                            <h2>
                                                <FormattedMessage id="annualReport.2020.adaptationHighlightName" />
                                            </h2>
                                            <p className="larger">
                                                <FormattedMessage id="annualReport.2020.adaptationHighlightTitle" />
                                            </p>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.adaptationHighlightText" />
                                            </p>
                                        </div>
                                        <div className="images">
                                            <img src="/images/annual-report/2020/adaptation/Aaron Reuland Illustration_Photo.svg" />
                                        </div>
                                    </div>
                                    <div className="flex-content">
                                        <div className="annual-report-example regular between">
                                            <div className="half">
                                            <iframe src="https://scratch.mit.edu/projects/389148460/embed" allowtransparency="true" width="375" height="310" frameborder="0" scrolling="no" allowfullscreen></iframe>
                                            </div>
                                            <div className="half">
                                                <p>Aaron’s students worked together to build a “kooky” version of their town called “Norwouldn’t,” packed with storybook creatures, original artwork, and interconnecting narratives. It was one of many collaborative Scratch projects Aaron facilitated to remind students that even while COVID-19 kept them inside their homes, they were still part of a caring and joyful community.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="world">
                                        <div className="spotlight bubble adaptation">
                                            <FormattedMessage id="annualReport.2020.spotlightStory" />
                                        </div>
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.adaptationHighlightTitle2" />
                                        </h2>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.adaptationHighlightText2b" />
                                        </p>
                                    </div>
                                    <div className="world">
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.adaptationHighlightTitle3" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.adaptationHighlightText3b" />
                                        </p>
                                    </div>
                                    <div className="video-container">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/adaptation/Create-along video.svg"
                                                thumbnailWidth="1000"
                                                videoHeight="320"
                                                videoId="IGDCZGfj_cQ"
                                                videoWidth="568"
                                            />
                                        </MediaQuery>
                                        <MediaQuery
                                            maxWidth={frameless.tabletPortrait - 1}
                                            minWidth={frameless.mobile}
                                        >
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/adaptation/Create-along video.svg"
                                                thumbnailWidth="800"
                                                videoHeight="320"
                                                videoId="IGDCZGfj_cQ"
                                                videoWidth="568"
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/adaptation/Create-along video.svg"
                                                thumbnailWidth="500"
                                                videoHeight="216"
                                                videoId="IGDCZGfj_cQ"
                                                videoWidth="380"
                                            />
                                        </MediaQuery>
                                    </div>

                                    <div className="flex-content">
                                        <AnnualReportExample
                                            className="regular"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationHighlightTitle4'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationHighlightText4b'}
                                            )}
                                            type="image"
                                            large_image="/images/annual-report/2020/adaptation/hackyourwindow_gif.gif"
                                        />
                                    </div>
                                    <div className="left-align">
                                        <h5><FormattedMessage id="annualReport.2020.adaptationEducatorsTitle" /></h5>
                                        <p><FormattedMessage id="annualReport.2020.adaptationEducatorsText" /></p>
                                    </div>
                                </div>
                                <div className="tweet-container">
                                    <div className="tweets">
                                        <TwitterTweetEmbed
                                            tweetId={'1247966777503551489'}
                                        />
                                        <TwitterTweetEmbed
                                            tweetId={'1247968609806229505'}
                                        />
                                    </div>
                                </div>
                                <div className="inner">
                                    <div className="snapshot bubble adaptation">
                                        <FormattedMessage id="annualReport.2020.adaptationSnapshot" />
                                    </div>
                                    <div className="flex-content lg">
                                        <AnnualReportExample
                                            className="regular"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationSnapshot1Title'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationSnapshot1Text'}
                                            )}
                                            type="image"
                                            large_image="/images/annual-report/2020/adaptation/Computer Clubhouse Illustration.svg"
                                        />
                                    </div>
                                    <div className="flex-content lg">
                                        <AnnualReportExample
                                            className="reverse"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationSnapshot2Title'}
                                            )}
                                            paragraph={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationSnapshot2Text'}
                                            )}
                                            type="image"
                                            large_image="/images/annual-report/2020/adaptation/BYIS Graphic.svg"
                                        />
                                    </div>          

                                </div>

                                {/* <div className="community-hero-img" /> */}
                                
                            </div>
                            <div className="initiatives-community">
                                <div className="initiatives-subsection-header community">
                                    <div className="inner">
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.communityTitle" />
                                        </h2>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.communityIntro" />
                                        </p>
                                    </div>
                                </div>
                                <div className="initiatives-subsection-content">
                                    <div className="world">
                                        <div className="spotlight bubble community">
                                            <FormattedMessage id="annualReport.2020.spotlightStory" />
                                        </div>
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.communityTitle1" />
                                        </h2>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.communityText1" />
                                        </p>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.communityText2" />
                                        </p>
                                    </div>
                                    <div className="bg-image-container">
                                        <img src="/images/annual-report/2020/community/Creative Computing Sprinkles left.svg"></img>
                                        <img src="/images/annual-report/2020/community/Creative Computing Sprinkles right.svg"></img>
                                    </div>
                                    <div className="iframe-holder">
                                        <iframe src="https://scratch.mit.edu/projects/412126066/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>
                                        <p>project by u/STORMPRIMEX</p>
                                    </div>
                                    <a className="download community" href="https://drive.google.com/file/d/1Kpwf4vN5I6SYY3l941v0IsP_tHVasuXW/view">
                                        <span>Virtual Family Coding Nights Guide</span>
                                        <img src="/images/annual-report/2020/Symbols-UI/File Download.svg" />
                                    </a>

                                    <div className="community-quotes">
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt="Kendra Mallory"
                                                    src="/images/annual-report/2020/community/quote_kendramallory.svg"
                                                />
                                                <div>
                                                    <h5>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteName" />
                                                    </h5>
                                                    <p>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteTitle" />
                                                    </p>
                                                </div>
                                            </div>
                                            <Comment
                                                className="community"
                                                comment={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.communityQuoteText'}
                                                )}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="inner center">
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.communityScratchCommunity" />
                                    </h2>
                                </div>
                                <div className="background-community-images">
                                    <img src="/images/annual-report/2020/community/Online Community Illustration Wave.svg"></img>
                                    <img src="/images/annual-report/2020/community/Online Community Illustration.svg"></img>
                                </div>
                                <div className="inner center">
                                    <p>
                                        <FormattedMessage id="annualReport.2020.communityScratchCommunityIntro" />
                                    </p>
                                </div>
                                <div className="inner">
                                    <div className="community-quotes double">
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt="angelical avatar"
                                                    src="/images/annual-report/2020/community/avatar_angelical.jpg"
                                                />
                                                <div>
                                                    <h5>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteGroupName1" />
                                                    </h5>
                                                </div>
                                            </div>
                                            <Comment
                                                className="community"
                                                comment={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.communityQuoteGroupText1'}
                                                )}
                                            />
                                        </div>
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt="dlore2009 avatar"
                                                    src="/images/annual-report/2020/community/avatar_dlore2009.jpg"
                                                />
                                                <div>
                                                    <h5>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteGroupName2" />
                                                    </h5>
                                                </div>
                                            </div>
                                            <Comment
                                                className="community"
                                                comment={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.communityQuoteGroupText2'}
                                                )}
                                            />
                                        </div>
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt="qood"
                                                    src="/images/annual-report/2020/community/avatar_qood.jpg"
                                                />
                                                <div>
                                                    <h5>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteGroupName3" />
                                                    </h5>
                                                </div>
                                            </div>
                                            <Comment
                                                className="community"
                                                comment={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.communityQuoteGroupText3'}
                                                )}
                                            />
                                        </div>
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt="Mechanical_pencil avatar"
                                                    src="/images/annual-report/2020/community/avatar_Mechanical_pencil.jpg"
                                                />
                                                <div>
                                                    <h5>
                                                        <FormattedMessage id="annualReport.2020.communityQuoteGroupName4" />
                                                    </h5>
                                                </div>
                                            </div>
                                            <Comment
                                                className="community"
                                                comment={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.communityQuoteGroupText4'}
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* go into timeline section */}
                                <div className="year-in-review">
                                    <img className="upper-wave" src="/images/annual-report/2020/community/Timeline/Wave (upper).svg" />
                                    <div className="inner center yr">
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.yearInReview" />
                                        </h2>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.yearInReviewText" />
                                        </p>
                                    </div>
                                    <TimelineCard 
                                        className="center"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard1Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard1Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard1Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard1Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/endofthedecade_sds.jpg"
                                        attribution="project by u/lukiepie2011"
                                    />
                                    <TimelineCard 
                                        className="left"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard1Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard2Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard2Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard2Text'}
                                        )}
                                    />
                                    <TimelineCard 
                                        className="left"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard3Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard3Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard3Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard3Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/createalong.jpg"
                                        // videoId=""
                                    />
                                    <TimelineCard 
                                        className="right"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard4Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard4Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard4Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard4Text'}
                                        )}
                                    />
                                    <TimelineCard 
                                        className="right"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard5Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard5Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard5Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard5Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/blmvideo.png"
                                        videoId="r1pmlyylye"
                                    />
                                    <TimelineCard 
                                        className="left"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard6Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard6Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard6Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard6Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/funathome_sds.jpg"
                                        attribution="project by u/cellie"
                                    />
                                    <TimelineCard 
                                        className="left"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard7Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard7Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard7Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard7Text'}
                                        )}
                                    />
                                    <TimelineCard 
                                        className="right"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard8Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard8Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard8Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard8Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/scratchcamp.jpg"
                                        attribution="project by u/LGMammoth"
                                    />
                                    <TimelineCard 
                                        className="center"
                                        link={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard9Link'}
                                                )}
                                        date={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard9Date'}
                                                )}
                                        title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.yearInReviewCard9Title'}
                                                )}
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.yearInReviewCard9Text'}
                                        )}
                                        image="/images/annual-report/2020/community/Timeline/Images/scratchtober.jpg"
                                        attribution="project by u/IDK_HAVE_SOME_NUMBER"
                                    />
                                    <div className="illustrations">
                                        <img className="april" src="/images/annual-report/2020/community/Timeline/April Illustration.svg" />
                                        <img className="may" src="/images/annual-report/2020/community/Timeline/May Illustration.svg" />
                                        <img className="june" src="/images/annual-report/2020/community/Timeline/June Illustration.svg" />
                                        <img className="july" src="/images/annual-report/2020/community/Timeline/July Illustration.svg" />
                                    </div>
                                    <img className="lower-wave" src="/images/annual-report/2020/community/Timeline/Wave (lower).svg" />
                                </div>
                                <div className="initiatives-subsection-content">
                                    <div className="inner">
                                        <div className="community-quotes">
                                            <div className="community-quote">
                                                <div className="quote-person">
                                                    <Avatar
                                                        alt="Anna Lytical"
                                                        src="/images/annual-report/2020/community/quote_annalytical.svg"
                                                    />
                                                    <div>
                                                        <h5>
                                                            <FormattedMessage id="annualReport.2020.communityQuote2Name" />
                                                        </h5>
                                                        <p>
                                                            <FormattedMessage id="annualReport.2020.communityQuote2Title" />
                                                        </p>
                                                    </div>
                                                </div>
                                                <Comment
                                                    className="community"
                                                    comment={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.communityQuote2Text'}
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="content flex-content split">
                                            <div className="text">
                                                <div className="snapshot bubble community">
                                                    <FormattedMessage id="annualReport.2020.adaptationSnapshot" />
                                                </div>
                                                <h2>
                                                    <FormattedMessage id="annualReport.2020.communitySnapshotTitle" />
                                                </h2>
                                                <p>
                                                    <FormattedMessage id="annualReport.2020.communitySnapshotText" />
                                                </p>
                                            </div>
                                            <div className="images">
                                                <img src="/images/annual-report/2020/community/Tools Illustration.svg" />
                                            </div>
                                        </div>
                                        <div className="world">
                                            <h2>
                                                <FormattedMessage id="annualReport.2020.communitySnapshot2Title" />
                                            </h2>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.communitySnapshot2Text" />
                                            </p>
                                        </div>
                                        <div className="community-sds">
                                            <div className="sds-list">
                                                <div className="sds-tile">
                                                    <a
                                                        href="/studios/6234813/"
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src="/images/annual-report/2020/community/tutorials_virtualtown.jpg"
                                                        />
                                                        <FormattedMessage id="annualReport.2020.tutorial1" />
                                                    </a>
                                                </div>
                                                <div className="sds-tile">
                                                    <a
                                                        href="/studios/5801323/"
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src="/images/annual-report/2020/community/tutorials_catchgame.jpg"
                                                        />
                                                        <FormattedMessage id="annualReport.2020.tutorial2" />
                                                    </a>
                                                </div>
                                                <div className="sds-tile">
                                                    <a
                                                        href="/studios/5702799/"
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src="/images/annual-report/2020/community/tutorials_characterdesigner.jpg"
                                                        />
                                                        <FormattedMessage id="annualReport.2020.tutorial3" />
                                                    </a>
                                                </div>
                                                <div className="sds-tile">
                                                    <a
                                                        href="/studios/5944573/"
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src="/images/annual-report/2020/community/tutorials_virtualpet.jpg"
                                                        />
                                                        <FormattedMessage id="annualReport.2020.tutorial4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            {/* eslint-enable max-len */}
                        </div>
                        
                    </div>
                    <div
                        className="directors-message"
                        ref={this.setRef(SECTIONS.directors_message)}
                    >
                        <div className="inner">
                            <div className="flex-content">
                                <div className="header">
                                    <h2>
                                        <FormattedMessage id="annualReport.2020.EDMessageTitle" />
                                    </h2>
                                </div>
                                <div className="text">
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText3" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText4" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText5" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText6" />
                                    </p>
                                    <div className="signature">
                                        <Avatar
                                            alt="Shawna Young"
                                            src="/images/annual-report/2020/shawna_headshot.jpg"
                                        />
                                        <div>
                                            <h5>
                                                <FormattedMessage id="annualReport.2020.EDName" />
                                            </h5>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.EDTitle" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="looking-forward">
                        <h2>
                            <FormattedMessage id="annualReport.2020.lookingForward" />
                        </h2>
                        <p>
                            <FormattedMessage id="annualReport.2020.lookingForwardText1" />
                        </p>
                        <img className="illo" src="/images/annual-report/2020/Looking Forward Illustration.svg" />
                        <p>
                            <FormattedMessage id="annualReport.2020.lookingForwardText2" />
                        </p>
                        <h5>
                            <FormattedMessage id="annualReport.2020.learnMore" />
                        </h5>
                        <ul>
                            <li>
                                <a href="https://www.legofoundation.com/en/about-us/news/the-lego-foundation-and-scratch-foundation-announce-partnership-to-support-learning-through-play-with-technology-for-millions-of-children-across-the-world/">
                                    <FormattedMessage id="annualReport.2020.learnMoreLink1Text" />
                                </a>
                            </li>
                            <li>
                                <a href="https://blog.google/outreach-initiatives/education/cs-ed-week-2020/">
                                    <FormattedMessage id="annualReport.2020.learnMoreLink2Text" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div
                        className="supporters-section"
                        ref={this.setRef(SECTIONS.supporters)}
                    >
                        <div className="inner">
                            <div className="supporters-heading">
                                <h2>
                                    <FormattedMessage id="annualReport.2020.supportersTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2020.supportersIntro" />
                                </p>
                            </div>
                            <div className="supporters-subsection">
                                <div className="supporters-blurb">
                                    <h4>
                                        <FormattedMessage id="annualReport.2020.ourSupporters" />
                                    </h4>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.ourSupportersText" />
                                    </p>
                                </div>
                            </div>
                            <div className="supporters-subsection supporters-lists">
                                <div className="supporters-level">
                                    <h4>
                                        <FormattedMessage id="annualReport.2020.supportersFoundingTitle" />
                                    </h4>
                                    <hr />
                                    <p className="italics">
                                        <FormattedMessage id="annualReport.2020.supportersFoundingText" />
                                    </p>
                                    {createSupportersLists(Supporters.inKind, Supporters.founding)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersCatPartnersTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.catPartners)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersCreativityTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.creativity)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersCollaborationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.collaboration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersImaginationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.imagination)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersInspirationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.inspiration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersExplorationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.exploration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2020.supportersPlayTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.play)}
                                </div>
                                <span className="legend">
                                    <span className="in-kind"></span>
                                    indicates in-kind support
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        className="leadership-section"
                        ref={this.setRef(SECTIONS.team)}
                    >
                        <div className="inner">
                            <h2>
                                <FormattedMessage id="annualReport.2020.leadershipTitle" />
                            </h2>
                            <h3>
                                <FormattedMessage id="annualReport.2020.leadershipBoard" />
                            </h3>
                            <FlexRow className="leadership-board">
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipChair" />
                                    </b>
                                    <h4>Mitch Resnick</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipProfessor" />
                                    <br />MIT Media Lab
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipViceChair" />
                                    </b>
                                    <h4>David Siegel</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipCoFounder" />
                                    <br />Two Sigma
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardMember" />
                                    </b>
                                    <h4>Margaret Honey</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipPresidentCEO" />
                                    <br />New York Hall of Science
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardMember" />
                                    </b>
                                    <h4>Christina Miller</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipFormerPresident" />
                                    <br />Cartoon Network
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardMember" />
                                    </b>
                                    <h4>Avraham Kadar</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipFounderCEO" />
                                    <br />BrainPOP
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardMember" />
                                    </b>
                                    <h4>Ursula Burns</h4>
                                    <FormattedMessage id="annualReport.2020.leadershipFormerChairCEO" />
                                    <br />Xerox
                                </div>
                            </FlexRow>
                            <h4>
                                <FormattedMessage id="annualReport.2020.leadershipBoardSecretaryTreasurer" />
                            </h4>
                            <FlexRow className="leadership-board">
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardSecretary" />
                                    </b>
                                    <h4>Sheri Vammen</h4>
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2020.leadershipBoardTreasurer" />
                                    </b>
                                    <h4>Rich Sauer</h4>
                                </div>
                            </FlexRow>
                            <div className="leadership-scratch-team">
                                <h3>
                                    <FormattedMessage id="annualReport.2020.leadershipScratchTeam" />
                                </h3>
                                <div className="executive-director">
                                    <PeopleGrid
                                        linkToNewTab
                                        people={[{
                                            userName: 'Champ99',
                                            userId: 900283,
                                            name: 'Champika'
                                        }]}
                                    />
                                    <FormattedMessage id="annualReport.2020.leadershipInterim" />
                                </div>
                                <PeopleGrid
                                    linkToNewTab
                                    people={People}
                                />
                                <p className="thank-you">
                                    <FormattedMessage id="annualReport.2020.teamThankYou" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="donate-section"
                        ref={this.setRef(SECTIONS.donate)}
                    >
                        <FlexRow className="donate-info">
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <img src="/images/annual-report/donate-illustration.svg" />
                            </MediaQuery>
                            <div className="donate-content">
                                <h2>
                                    <FormattedMessage id="annualReport.2020.donateTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2020.donateMessage" />
                                </p>
                                <a
                                    href="https://secure.donationpay.org/scratchfoundation/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <Button className="donate-button">
                                        <FormattedMessage id="annualReport.2020.donateButton" />
                                    </Button>
                                </a>
                            </div>
                        </FlexRow>
                    </div>
                </div>
            </div>
        );
    }
}

AnnualReport.propTypes = {
    intl: intlShape
};

const WrappedAnnualReport = injectIntl(AnnualReport);

render(
    <Page><WrappedAnnualReport /></Page>, document.getElementById('app')
);
