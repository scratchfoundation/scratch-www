const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const React = require('react');
const MediaQuery = require('react-responsive').default;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const render = require('../../../lib/render.jsx');
const frameless = require('../../../lib/frameless');

const Avatar = require('../../../components/avatar/avatar.jsx');
const Page = require('../../../components/page/www/page.jsx');
const Grid = require('../../../components/grid/grid.jsx');
const Button = require('../../../components/forms/button.jsx');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const Comment = require('../../../components/comment/comment.jsx');
const CountryBlurb = require('./country-blurb/country-blurb.jsx');
const TextAndMediaSnippet = require('../../../components/text-and-media-snippet/text-and-media-snippet.jsx');
const TimelineCard = require('../../../components/timeline-card/timeline-card.jsx');
const WorldMap = require('../../../components/world-map/world-map.jsx');
const CountryUsage = require('./country-usage.json');
const IndiaProjects = require('./india-projects.json');
const PeopleGrid = require('../../../components/people-grid/people-grid.jsx');
const People = require('./people.json');
const VideoPreview = require('../../../components/video-preview/video-preview.jsx');
const Supporters = require('./supporters.json');
import {TwitterTweetEmbed} from 'react-twitter-embed';


require('./annual-report.scss');

// Founder’s Message / Mission / Reach / Themes / Director’s Message / Supporters / Team / Donate

// Some constants used for the page subnav and section refs
const SECTIONS = {
    founders_message: 'founders_message',
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
    directors_message: <FormattedMessage id="annualReport.2020.subnavDirectorsMessage" />,
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
const minColor = 'rgba(46, 142, 184, .05)';
const maxColor = 'rgba(46, 142, 184, 1)';

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
                                <span className="in-kind" />
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
                                <span className="in-kind" />
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
        IndiaProjects[0].alt = this.props.intl.formatMessage({id: 'annualReport.2020.altIndia1'});
        IndiaProjects[1].alt = this.props.intl.formatMessage({id: 'annualReport.2020.altIndia2'});
        IndiaProjects[2].alt = this.props.intl.formatMessage({id: 'annualReport.2020.altIndia3'});
        IndiaProjects[3].alt = this.props.intl.formatMessage({id: 'annualReport.2020.altIndia4'});
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
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altDropdownArrow'})}
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
                                <img
                                    src="/images/annual-report/2020/founders-message/Masthead_Illustration.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altMastheadIllustration'}
                                    )}
                                />
                            </FlexRow>
                            <MediaQuery minWidth={frameless.desktop}>
                                <img
                                    className="wave-icon-desktop"
                                    src="/images/annual-report/2020/founders-message/Wave_Icon.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altWave'}
                                    )}
                                />
                            </MediaQuery>
                            <FlexRow className="message-content">
                                <MediaQuery maxWidth={frameless.desktop - 1}>
                                    {/* Show the wave icon inside this div in smaller screens */}
                                    <div className="wave-icon-and-title">
                                        <img
                                            src="/images/annual-report/2020/founders-message/Wave_Icon.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altWave'}
                                            )}
                                        />
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
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altMitchHeadshot'}
                                            )}
                                        />
                                        <div className="signature-container">
                                            <p className="message-signature">Mitch Resnick</p>
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
                            <img
                                src="/images/annual-report/message/blocks.svg"
                                alt={this.props.intl.formatMessage(
                                    {id: 'annualReport.2020.altBlocks'}
                                )}
                            />
                            <img
                                src="/images/annual-report/message/banana.svg"
                                alt={this.props.intl.formatMessage(
                                    {id: 'annualReport.2020.altBanana'}
                                )}
                            />
                        </div>
                    </div>
                    <div
                        className="mission-section"
                        ref={this.setRef(SECTIONS.mission)}
                    >
                        <div className="inner">
                            <h2><FormattedMessage id="annualReport.2020.missionTitle" /></h2>
                            <h5><FormattedMessage id="annualReport.2020.visionHeader" /></h5>
                            <p className="mission-subtitle">
                                <FormattedMessage id="annualReport.2020.visionSubtitle" />
                            </p>
                            <h5><FormattedMessage id="annualReport.2020.missionHeader" /></h5>
                            <p className="mission-subtitle">
                                <FormattedMessage id="annualReport.2020.missionSubtitle" />
                            </p>
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
                                        <h3>
                                            <FormattedMessage id="annualReport.2020.missionProjectsTitle" />
                                        </h3>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.missionProjectsDescription" />
                                        </p>
                                    </div>
                                    <img
                                        src="/images/annual-report/mission/Projects Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altProjectsIllustration'}
                                        )}
                                    />
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
                                    <img
                                        src="/images/annual-report/mission/Projects Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altProjectsIllustration'}
                                        )}
                                    />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-passion">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPassionTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPassionDescription" /></p>
                                    </div>
                                    <img
                                        src="/images/annual-report/mission/Passion Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPassionIllustration'}
                                        )}
                                    />
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
                                    <img
                                        src="/images/annual-report/mission/Passion Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPassionIllustration'}
                                        )}
                                    />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-peers">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPeersTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPeersDescription" /></p>
                                    </div>
                                    <img
                                        src="/images/annual-report/mission/Peers Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPeersIllustration'}
                                        )}
                                    />
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
                                    <img
                                        src="/images/annual-report/mission/Peers Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPeersIllustration'}
                                        )}
                                    />
                                </div>
                            </MediaQuery>
                            <MediaQuery minWidth={frameless.tabletPortrait}>
                                <div className="one-p four-ps-play">
                                    <div className="title-and-description">
                                        <h3><FormattedMessage id="annualReport.2020.missionPlayTitle" /></h3>
                                        <p><FormattedMessage id="annualReport.2020.missionPlayDescription" /></p>
                                    </div>
                                    <img
                                        src="/images/annual-report/mission/Play Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPlayIllustration'}
                                        )}
                                    />
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
                                    <img
                                        src="/images/annual-report/mission/Play Illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altPlayIllustration'}
                                        )}
                                    />
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
                                <img
                                    src="/images/annual-report/2020/data/Calendar.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altCalendar'}
                                    )}
                                />
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
                                    <img
                                        className="comment-viz"
                                        src="/images/annual-report/2020/data/Comments-visualization.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altCommentsVisualization'}
                                        )}
                                    />
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
                                            <img
                                                src="/images/annual-report/2020/Symbols-UI/Arrow_Next.svg"
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altArrowNext'}
                                                )}
                                            />
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
                                        <div className="map-legend" />
                                        <div>
                                            <FormattedMessage id="annualReport.2020.reachMap24M" />
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
                                            minColor={minColor}
                                            maxColor={maxColor}
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
                                            minColor={minColor}
                                            maxColor={maxColor}
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
                                            minColor={minColor}
                                            maxColor={maxColor}
                                        />
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.mobileIntermediate - 1}>
                                        <WorldMap
                                            className="map"
                                            colorIndex={colorIndex}
                                            countryData={countryData}
                                            countryNames={countryNames}
                                            minColor={minColor}
                                            maxColor={maxColor}
                                        />
                                    </MediaQuery>
                                </div>
                            </div>
                        </div>
                        <div className="inner translation">
                            <div className="reach-translation">
                                <div className="reach-translation-intro">
                                    <h3>
                                        <FormattedMessage id="annualReport.2020.reachTranslationTitle" />
                                    </h3>
                                    <div className="inline">
                                        <img
                                            src="/images/annual-report/2020/Symbols-UI/Arrow_up.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altArrowUp'}
                                            )}
                                        />
                                        <span className="bold">
                                            <FormattedMessage
                                                id="annualReport.2020.reachTranslationIncrease"
                                            />
                                        </span>
                                    </div>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.reachTranslationBlurb" />
                                    </p>
                                </div>
                                <img
                                    src="/images/annual-report/2020/data/translated-illustration.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altTranslated'}
                                    )}
                                />
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img
                                    src="/images/annual-report/reach/horizontal-command.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altScratchHorizontalCommand'}
                                    )}
                                />
                            </div>
                        </MediaQuery>
                    </div>
                    <div className="reach-scratch-jr">
                        <div className="inner">
                            <div className="scratch-jr-intro">
                                <img
                                    src="/images/annual-report/2020/data/ScratchJr_Logo.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altScratchJr'}
                                    )}
                                />
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
                                    <FormattedMessage
                                        id="annualReport.2020.reachDownloadsIncrease"
                                        values={{
                                            million: (
                                                <div className="million">
                                                    <FormattedMessage id="annualReport.2020.reachMillion" />
                                                </div>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img
                                    src="/images/annual-report/reach/horizontal-loop.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altHorizontalLoop'}
                                    )}
                                />
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
                                            <div className="spotlight bubble connectivity india">
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
                                        <img
                                            src="/images/annual-report/2020/connectivity/India_Data/data_projectscreatedonline_graphic.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altPieChart'}
                                            )}
                                        />
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
                                        <img
                                            src="/images/annual-report/2020/connectivity/India_Data/data_alltimeusers_graphic.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altUsers'}
                                            )}
                                        />
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
                                                <img
                                                    src="/images/annual-report/2020/Symbols-UI/Arrow_Next_purple.svg"
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altArrowNext'}
                                                    )}
                                                />
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
                                                    id="annualReport.2020.connectivityIndiaProjectsOld"
                                                />
                                                <img
                                                    src="/images/annual-report/2020/Symbols-UI/Arrow_Next_purple.svg"
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altArrowNext'}
                                                    )}
                                                />
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
                                        <span className="subtitle bold">
                                            <FormattedMessage id="annualReport.2020.connectivityWorldSubtitle" />
                                        </span>
                                    </div>
                                </div>
                                <div className="video-container connectivity">
                                    <div className="video-background connectivity">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/connectivity/aroundtheworld_videothumb.png"
                                                videoId="rlsjbx0st4"
                                                thumbnailWidth="580"
                                                videoHeight={580 * .568}
                                                videoWidth="580"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altConnectivityVideoPreview'}
                                                    )
                                                }
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
                                                thumbnail="/images/annual-report/2020/connectivity/aroundtheworld_videothumb.png"
                                                videoId="rlsjbx0st4"
                                                thumbnailWidth="400"
                                                videoHeight={400 * .568}
                                                videoWidth="400"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altConnectivityVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/connectivity/aroundtheworld_videothumb.png"
                                                videoId="rlsjbx0st4"
                                                thumbnailWidth="300"
                                                videoHeight={300 * .568}
                                                videoWidth="300"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altConnectivityVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                    </div>
                                </div>
                                <div className="inner">
                                    <div className="flex-content">
                                        <CountryBlurb
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Scratch Al Sur logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryChileTitle'}
                                            )}
                                            listIcon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryChile'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altChile'}
                                            )}
                                            iconAlt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altChileIcon'}
                                            )}
                                            largeImage="/images/annual-report/2020/connectivity/Scratch Around the World/Scratch Al Sur graphic.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityCountryChileParagraph"
                                            />
                                        </CountryBlurb>
                                        <CountryBlurb
                                            className="reverse"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Brazil-Creative-Learning-Network-logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryBrazilTitle'}
                                            )}
                                            listIcon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryBrazil'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altBrazil'}
                                            )}
                                            iconAlt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altBrazilIcon'}
                                            )}
                                            largeImage="/images/annual-report/2020/connectivity/Scratch Around the World/Brazil Creative Learning Network graphic.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityCountryBrazilParagraph"
                                            />
                                        </CountryBlurb>
                                        <CountryBlurb
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Quest Alliance logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryIndiaTitle'}
                                            )}
                                            listIcon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryIndia'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altIndia'}
                                            )}
                                            iconAlt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altIndiaIcon'}
                                            )}
                                            largeImage="/images/annual-report/2020/connectivity/Scratch Around the World/Quest Alliance graphic.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityCountryIndiaParagraph"
                                                values={{
                                                    QuestAllianceLink: (
                                                        <a href="https://www.facebook.com/118389481508616/videos/818137148590473">
                                                            Quest Alliance
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </CountryBlurb>
                                        <CountryBlurb
                                            className="reverse"
                                            icon="/images/annual-report/2020/connectivity/Scratch Around the World/Raspberry-Pi-logo.png"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryUSATitle'}
                                            )}
                                            listIcon="/images/annual-report/2020/Symbols-UI/Location_icon.svg"
                                            country={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityCountryUSA'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altUSA'}
                                            )}
                                            iconAlt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altUSAIcon'}
                                            )}
                                            largeImage="/images/annual-report/2020/connectivity/Scratch Around the World/Raspberry Pi graphic.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityCountryUSAParagraph"
                                                values={{
                                                    USALink: (
                                                        <a href="https://www.youtube.com/watch?v=kR1o69koAgc">
                                                            Scratch Team members
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </CountryBlurb>
                                    </div>
                                    <div className="resources">
                                        <h2>
                                            <FormattedMessage id="annualReport.2020.connectivityResources" />
                                        </h2>
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.connectivityResourcesSubtitle" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.connectivityResourcesParagraph" />
                                        </p>
                                    </div>
                                    <div className="flex-content">
                                        <TextAndMediaSnippet
                                            className="regular top" /* Text should be left when side by side, and on top when top and bottom */
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample1Title'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altTutorial'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2020/connectivity/TutorialUI.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityExample1Paragraph"
                                            />
                                        </TextAndMediaSnippet>
                                        <MediaQuery minWidth={frameless.desktop}>
                                            <TextAndMediaSnippet
                                                className="reverse"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.connectivityExample2Title'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altGettingStarted'}
                                                )}
                                                type="video"
                                                videoId="xfh9bvbeik"
                                                largeImage="/images/annual-report/2020/connectivity/Getting Started with Scratch video.png"
                                                spinnerColor="blue"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.connectivityExample2Paragraph"
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.desktop - 1}>
                                            <TextAndMediaSnippet
                                                className="regular"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.connectivityExample2Title'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altGettingStarted'}
                                                )}
                                                type="video"
                                                videoId="xfh9bvbeik"
                                                largeImage="/images/annual-report/2020/connectivity/Getting Started with Scratch video.png"
                                                spinnerColor="blue"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.connectivityExample2Paragraph"
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                        <TextAndMediaSnippet
                                            className="full-width"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.connectivityExample3Title'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altEditor'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2020/connectivity/isiXhosa_scratcheditor.jpg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.connectivityExample3Paragraph"
                                            />
                                        </TextAndMediaSnippet>
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
                                <div className="community-quote single">
                                    <div className="quote-person">
                                        <Avatar
                                            alt={this.props.intl.formatMessage({id: 'annualReport.2020.altBenedict'})}
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
                                    <div className="spotlight bubble adaptation">
                                        <FormattedMessage id="annualReport.2020.spotlightStory" />
                                    </div>
                                    <div className="content flex-content aaron">
                                        <div className="text">
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
                                            <img
                                                src="/images/annual-report/2020/adaptation/Aaron Reuland Illustration_Photo.svg"
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAaronReuland'}
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-content">
                                        <div className="text-and-media-snippet regular">
                                            <div className="half">
                                                <MediaQuery
                                                    minWidth={frameless.desktop}
                                                >
                                                    <iframe
                                                        src="https://scratch.mit.edu/projects/601589442/embed"
                                                        allowTransparency="true"
                                                        width="360"
                                                        height={((360 * .76) + 45)}
                                                        frameBorder="0"
                                                        scrolling="no"
                                                        allowFullScreen
                                                    />
                                                </MediaQuery>
                                                <MediaQuery
                                                    maxWidth={frameless.desktop - 1}
                                                    minWidth={frameless.mobile}
                                                >
                                                    <iframe
                                                        src="https://scratch.mit.edu/projects/601589442/embed"
                                                        allowTransparency="true"
                                                        width="430"
                                                        height={((430 * .76) + 45)}
                                                        frameBorder="0"
                                                        scrolling="no"
                                                        allowFullScreen
                                                    />
                                                </MediaQuery>
                                                <MediaQuery maxWidth={frameless.mobile - 1}>
                                                    <iframe
                                                        src="https://scratch.mit.edu/projects/601589442/embed"
                                                        allowTransparency="true"
                                                        width="300"
                                                        height={((300 * .76) + 45)}
                                                        frameBorder="0"
                                                        scrolling="no"
                                                        allowFullScreen
                                                    />
                                                </MediaQuery>
                                            </div>
                                            <div className="half">
                                                <p>
                                                    <FormattedMessage id="annualReport.2020.aaronText" />
                                                </p>
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
                                            <FormattedMessage
                                                id="annualReport.2020.adaptationHighlightText2b"
                                                values={{
                                                    linkText: (
                                                        <a href="https://sip.scratch.mit.edu/scratchathome/">
                                                            #ScratchAtHome initiative
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </p>
                                    </div>
                                    <div className="world">
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.adaptationHighlightTitle3" />
                                        </h4>
                                        <p>
                                            <FormattedMessage
                                                id="annualReport.2020.adaptationHighlightText3b"
                                                values={{
                                                    linkText: (
                                                        <a href="https://www.youtube.com/playlist?list=PLpfxVARjkP-953-E52NskKvbCBXEgHkwr">
                                                           Create-Alongs
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="video-container themes adaptation">
                                    <div className="video-background adaptation">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/adaptation/createalongs_videothumb.png"
                                                videoId="uzfapi7t03"
                                                thumbnailWidth="580"
                                                videoHeight={580 * .568}
                                                videoWidth="580"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altAdaptationVideoPreview'}
                                                    )
                                                }
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
                                                thumbnail="/images/annual-report/2020/adaptation/createalongs_videothumb.png"
                                                videoId="uzfapi7t03"
                                                thumbnailWidth="400"
                                                videoHeight={400 * .568}
                                                videoWidth="400"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altAdaptationVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2020.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2020/adaptation/createalongs_videothumb.png"
                                                videoId="uzfapi7t03"
                                                thumbnailWidth="300"
                                                videoHeight={300 * .568}
                                                videoWidth="300"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altAdaptationVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                    </div>
                                </div>
                                <div className="inner">
                                    <div className="flex-content">
                                        <MediaQuery minWidth={frameless.desktop}>
                                            <TextAndMediaSnippet
                                                className="reverse"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.adaptationHighlightTitle4'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altHackYourWindow'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2020/adaptation/hackyourwindow_gif.gif"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.adaptationHighlightText4b"
                                                    values={{
                                                        linkText: (
                                                            <a href="https://scratch.mit.edu/studios/25970382">
                                                                Hack Your Window
                                                            </a>
                                                        )
                                                    }}
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.desktop - 1}>
                                            <TextAndMediaSnippet
                                                className="regular"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.adaptationHighlightTitle4'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altHackYourWindow'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2020/adaptation/hackyourwindow_gif.gif"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.adaptationHighlightText4b"
                                                    values={{
                                                        linkText: (
                                                            <a href="https://scratch.mit.edu/studios/25970382">
                                                                Hack Your Window
                                                            </a>
                                                        )
                                                    }}
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                    </div>
                                    <div className="connecting-educators">
                                        <h4><FormattedMessage id="annualReport.2020.adaptationEducatorsTitle" /></h4>
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
                                    <div className="flex-content lg">
                                        <div className="snapshot bubble adaptation bump">
                                            <FormattedMessage id="annualReport.2020.adaptationSnapshot" />
                                        </div>
                                        <TextAndMediaSnippet
                                            className="reverse big-title"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.adaptationSnapshot1Title'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altScratchInteraction'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2020/adaptation/Computer Clubhouse Illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2020.adaptationSnapshot1Text"
                                                values={{
                                                    linkText: (
                                                        <a href="https://theclubhousenetwork.org/">
                                                            The Clubhouse Network
                                                        </a>
                                                    )
                                                }}
                                            />
                                        </TextAndMediaSnippet>
                                    </div>
                                    <div className="flex-content lg">
                                        <MediaQuery minWidth={frameless.desktop}>
                                            <TextAndMediaSnippet
                                                className="regular big-title"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.adaptationSnapshot2Title'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altImageBubbles'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2020/adaptation/BYIS Graphic.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.adaptationSnapshot2Text"
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.desktop - 1}>
                                            <TextAndMediaSnippet
                                                className="reverse big-title"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.adaptationSnapshot2Title'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altImageBubbles'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2020/adaptation/BYIS Graphic.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2020.adaptationSnapshot2Text"
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                    </div>
                                </div>

                                {/* <div className="community-hero-img" /> */}
                                
                            </div>
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
                                    <img
                                        src="/images/annual-report/2020/community/Creative Computing Sprinkles left.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altSprinklesLeft'})}
                                    />
                                    <img
                                        src="/images/annual-report/2020/community/Creative Computing Sprinkles right.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altSprinklesRight'})}
                                    />
                                </div>
                                <div className="iframe-holder">
                                    <MediaQuery
                                        minWidth={frameless.mobile}
                                    >
                                        <iframe
                                            src="https://scratch.mit.edu/projects/601595010/embed"
                                            allowTransparency="true"
                                            width="480"
                                            height={((480 * .76) + 45)}
                                            frameBorder="0"
                                            scrolling="no"
                                            allowFullScreen
                                        />
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.mobile - 1}>
                                        <iframe
                                            src="https://scratch.mit.edu/projects/601595010/embed"
                                            allowTransparency="true"
                                            width="300"
                                            height={((300 * .76) + 45)}
                                            frameBorder="0"
                                            scrolling="no"
                                            allowFullScreen
                                        />
                                    </MediaQuery>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.projectBy" /> u/STORMPRIMEX
                                    </p>
                                </div>
                                <a
                                    className="download community"
                                    href="https://drive.google.com/file/d/1Kpwf4vN5I6SYY3l941v0IsP_tHVasuXW/view"
                                >
                                    <span>
                                        <FormattedMessage id="annualReport.2020.communityDownloadButton" />
                                    </span>
                                    <img
                                        src="/images/annual-report/2020/Symbols-UI/File Download.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altFileDownload'})}
                                    />
                                </a>

                                <div className="community-quotes">
                                    <div className="community-quote single">
                                        <div className="quote-person">
                                            <Avatar
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAvatar'}
                                                )}
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
                                <img
                                    src="/images/annual-report/2020/community/Online Community Illustration Wave.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altWaveTop'})}
                                />
                                <img
                                    src="/images/annual-report/2020/community/Online Community Illustration.png"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altWaveBottom'})}
                                />
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
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAvatar'}
                                                )}
                                                src="https://cdn2.scratch.mit.edu/get_image/user/36591_60x60.png"
                                            />
                                            <div>
                                                <h5>
                                                    angelical
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
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAvatar'}
                                                )}
                                                src="https://cdn2.scratch.mit.edu/get_image/user/61442584_60x60.png"
                                            />
                                            <div>
                                                <h5>
                                                    dlore2009
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
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAvatar'}
                                                )}
                                                src="/images/annual-report/2020/community/avatar_qood.jpg"
                                            />
                                            <div>
                                                <h5>
                                                    qood
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
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2020.altAvatar'}
                                                )}
                                                src="https://cdn2.scratch.mit.edu/get_image/user/176301_60x60.png"
                                            />
                                            <div>
                                                <h5>
                                                    Mechanical_pencil
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
                                <img
                                    className="upper-wave"
                                    src="/images/annual-report/2020/community/Timeline/Wave (upper).svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altWaveBottom'})}
                                />
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
                                    link="https://scratch.mit.edu/studios/25528144"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard1Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard1Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard1Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altJanuaryCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/endofthedecade_sds.jpg"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.projectBy'}
                                    )}
                                    attribution="u/lukiepie2011"
                                />
                                <img
                                    className="connector left"
                                    src="/images/annual-report/2020/community/Timeline/lines/jan_apr_line.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/studios/26160799/"
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
                                    link="https://www.youtube.com/watch?v=uR5C173yrJs"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard3Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard3Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard3Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altAprilCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/createalong.jpg"
                                />
                                <img
                                    className="connector"
                                    src="/images/annual-report/2020/community/Timeline/lines/apr_may_line.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="right"
                                    link="https://scratch.mit.edu/projects/400944766/"
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
                                    link="https://scratch.wistia.com/medias/r1pmlyylye"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard5Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard5Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard5Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altMayCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/blmvideo.png"
                                    videoId="r1pmlyylye"
                                    spinnerColor="blue"
                                />
                                <img
                                    className="connector"
                                    src="/images/annual-report/2020/community/Timeline/lines/may_jun_line.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/studios/26498205"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard6Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard6Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard6Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altJuneCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/funathome_sds.jpg"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.projectBy'}
                                    )}
                                    attribution="u/cellie"
                                />
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/studios/26938704/"
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
                                <img
                                    className="connector"
                                    src="/images/annual-report/2020/community/Timeline/lines/jun_jul_line.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="right"
                                    link="https://scratch.mit.edu/studios/27388950/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard8Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard8Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard8Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altJulyCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/scratchcamp.jpg"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.projectBy'}
                                    )}
                                    attribution="u/LGMammoth"
                                />
                                <img
                                    className="connector right"
                                    src="/images/annual-report/2020/community/Timeline/lines/jul_oct_line.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="center"
                                    link="https://scratch.mit.edu/studios/27737452"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard9Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard9Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.yearInReviewCard9Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altOctoberCard'}
                                    )}
                                    image="/images/annual-report/2020/community/Timeline/Images/scratchtober.jpg"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.projectBy'}
                                    )}
                                    attribution="u/IDK_HAVE_SOME_NUMBER"
                                />
                                <div className="illustrations">
                                    <img
                                        className="april"
                                        src="/images/annual-report/2020/community/Timeline/April Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altApril'})}
                                    />
                                    <img
                                        className="may"
                                        src="/images/annual-report/2020/community/Timeline/May Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altMay'})}
                                    />
                                    <img
                                        className="june"
                                        src="/images/annual-report/2020/community/Timeline/June Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altJune'})}
                                    />
                                    <img
                                        className="june-2"
                                        src="/images/annual-report/2020/community/Timeline/avatar_Bellevue91.png"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2020.altAvatar'}
                                        )}
                                    />
                                    <img
                                        className="july"
                                        src="/images/annual-report/2020/community/Timeline/July Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altJuly'})}
                                    />
                                </div>
                                <img
                                    className="lower-wave"
                                    src="/images/annual-report/2020/community/Timeline/Wave (lower).svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2020.altWaveBottom'})}
                                />
                            </div>
                            <div className="initiatives-subsection-content">
                                <div className="wide inner community">
                                    <div className="community-quotes">
                                        <div className="community-quote">
                                            <div className="quote-person">
                                                <Avatar
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2020.altAvatar'}
                                                    )}
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
                                    <div className="content two-wide split">
                                        <div className="text">
                                            <div className="snapshot bubble community">
                                                <FormattedMessage id="annualReport.2020.adaptationSnapshot" />
                                            </div>
                                            <h4>
                                                <FormattedMessage id="annualReport.2020.communitySnapshotTitle" />
                                            </h4>
                                            <p>
                                                <FormattedMessage id="annualReport.2020.communitySnapshotText" />
                                            </p>
                                        </div>
                                        <div className="images">
                                            <img
                                                src="/images/annual-report/2020/community/Tools Illustration.svg"
                                                alt={this.props.intl.formatMessage({id: 'annualReport.2020.altToolsIllustration'})}
                                            />
                                        </div>
                                    </div>
                                    <div className="world">
                                        <h4>
                                            <FormattedMessage id="annualReport.2020.communitySnapshot2Title" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="annualReport.2020.communitySnapshot2Text" />
                                        </p>
                                    </div>
                                    <div className="community-sds">
                                        <div className="sds-list">
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=eekrc3Xs9Z0"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2020/community/tutorials_virtualtown.jpg"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altVirtualTown'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2020.tutorial1" />
                                                </a>
                                            </div>
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=7NN5v2wSL4U"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2020/community/tutorials_catchgame.jpg"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altCatchGame'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2020.tutorial2" />
                                                </a>
                                            </div>
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=-3oCdNIeU_8"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2020/community/tutorials_characterdesigner.jpg"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altCharacterDesigner'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2020.tutorial3" />
                                                </a>
                                            </div>
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=irhNLRWwhv0"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2020/community/tutorials_virtualpet.jpg"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2020.altVirtualPet'})}
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
                                    <p className="pull-quote">
                                        <FormattedMessage id="annualReport.2020.EDMessagePullQuote" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText5" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2020.EDMessageText6" />
                                    </p>
                                    <div className="signature">
                                        <Avatar
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2020.altAvatar'}
                                            )}
                                            src="/images/annual-report/2020/shawna_headshot.jpg"
                                        />
                                        <div>
                                            <h5>
                                                Shawna Young
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
                        <img
                            className="illo"
                            src="/images/annual-report/2020/Looking Forward Illustration.svg"
                            alt={this.props.intl.formatMessage({id: 'annualReport.2020.altLookingForward'})}
                        />
                        <p>
                            <FormattedMessage id="annualReport.2020.lookingForwardText2" />
                        </p>
                        <h5>
                            <FormattedMessage id="annualReport.2020.learnMore" />
                        </h5>
                        <ul>
                            <li>
                                <a
                                    href="https://www.legofoundation.com/en/about-us/news/the-lego-foundation-and-scratch-foundation-announce-partnership-to-support-learning-through-play-with-technology-for-millions-of-children-across-the-world/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <FormattedMessage id="annualReport.2020.learnMoreLink1Text" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://blog.google/outreach-initiatives/education/cs-ed-week-2020/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
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
                            <div className="supporters-subsection">
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
                                    <span className="in-kind" />
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
                                    <h4>Mitchel Resnick</h4>
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
                                    <br />Xerox Corporation and VEON Ltd.
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
                                            userName: 'Onyx45',
                                            userId: 63526043,
                                            name: 'Shawna'
                                        }]}
                                    />
                                    <FormattedMessage id="annualReport.2020.leadershipED" />
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
                                <img
                                    src="/images/annual-report/donate-illustration.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2020.altDonateIllustration'}
                                    )}
                                />
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
