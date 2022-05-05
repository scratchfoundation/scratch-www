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
const Button = require('../../../components/forms/button.jsx');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const TextAndMediaSnippet = require('../../../components/text-and-media-snippet/text-and-media-snippet.jsx');
const TimelineCard = require('../../../components/timeline-card/timeline-card.jsx');
const PeopleGrid = require('../../../components/people-grid/people-grid.jsx');
const People = require('./people.json');
const Tag = require('../../../components/tag/tag.jsx');
const VideoPreview = require('../../../components/video-preview/video-preview.jsx');
const VideoPreviewYouTube = require('./video-preview-youtube/video-preview-youtube.jsx');
const Supporters = require('./supporters.json');
import {TwitterTweetEmbed} from 'react-twitter-embed';
const Organizations = require('./orgs.json');


require('./annual-report.scss');

// Director’s Message / Mission / Reach / Themes / Founder's Message / Supporters / Team / Donate

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
    directors_message: <FormattedMessage id="annualReport.2021.subnavDirectorsMessage" />,
    mission: <FormattedMessage id="annualReport.2021.subnavMission" />,
    reach: <FormattedMessage id="annualReport.2021.subnavReach" />,
    themes: <FormattedMessage id="annualReport.2021.subnavThemes" />,
    founders_message: <FormattedMessage id="annualReport.2021.subnavFoundersMessage" />,
    supporters: <FormattedMessage id="annualReport.2021.subnavSupporters" />,
    team: <FormattedMessage id="annualReport.2021.subnavTeam" />,
    donate: <FormattedMessage id="annualReport.2021.subnavDonate" />
};

const COUNTRIES = [
    'Uganda',
    'India',
    'USA'
];

const COUNTRIES2 = [
    'Brazil',
    'Australia',
    'South Africa',
    'UK',
    'Mexico',
    'Spain',
    'Kenya',
    'Cambodia',
    'Nigeria',
    'Canada'
];

const CountryOrgList = props => (
    <ul className="org-list-ul">
        {/* eslint-disable */}
        {Organizations.filter(org => org.country === props.country).map((org, i) => {
            return <li className="organization" key={i}>{org.name}</li>;
        })}
        {/* eslint-enable */}
    </ul>
);

const CreateOrgList = props => (
    <div className="org-list">
        {/* eslint-disable */}
        {props.array.map((country, i) => {
            return <div className="country-org-list" key={i}><h5>{country}</h5><CountryOrgList country={country} /></div>;
        })}
        {/* eslint-enable */}
    </div>
);

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
            currentlyVisible: SECTIONS.directors_message, // The currently visible section
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
                        {selectedItem: this.state.currentlyVisible === SECTIONS.directors_message}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.directors_message)}
                >
                    <FormattedMessage id="annualReport.2021.subnavDirectorsMessage" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.mission}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.mission)}
                >
                    <FormattedMessage id="annualReport.2021.subnavMission" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.reach}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.reach)}
                >
                    <FormattedMessage id="annualReport.2021.subnavReach" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.themes}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.themes)}
                >
                    <FormattedMessage id="annualReport.2021.subnavThemes" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.founders_message}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.founders_message)}
                >
                    <FormattedMessage id="annualReport.2021.subnavFoundersMessage" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.supporters}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.supporters)}
                >
                    <FormattedMessage id="annualReport.2021.subnavSupporters" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.team}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.team)}
                >
                    <FormattedMessage id="annualReport.2021.subnavTeam" />
                </a>
                <a
                    className={classNames(
                        {selectedItem: this.state.currentlyVisible === SECTIONS.donate}
                    )}
                    onClick={this.handleSubnavItemClick(SECTIONS.donate)}
                >
                    <FormattedMessage id="annualReport.2021.subnavDonate" />
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
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altDropdownArrow'})}
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
                        ref={this.setRef(SECTIONS.directors_message)}
                    >
                        <div className="inner">
                            <FlexRow className="masthead">
                                <div className="masthead-content">
                                    <p className="message-year">
                                        <FormattedMessage id="annualReport.2021.mastheadYear" />
                                    </p>
                                    <h1>
                                        <FormattedMessage id="annualReport.2021.mastheadTitle" />
                                    </h1>
                                </div>
                                <img
                                    src="/images/annual-report/2021/Masthead Illustration.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altMastheadIllustration'}
                                    )}
                                />
                            </FlexRow>
                            <MediaQuery minWidth={frameless.desktop}>
                                <img
                                    className="wave-icon-desktop"
                                    src="/images/annual-report/2021/Wave Icon.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altWave'}
                                    )}
                                />
                            </MediaQuery>
                            <FlexRow className="message-content">
                                <MediaQuery maxWidth={frameless.desktop - 1}>
                                    {/* Show the wave icon inside this div in smaller screens */}
                                    <div className="wave-icon-and-title">
                                        <img
                                            src="/images/annual-report/2021/Wave Icon.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altWave'}
                                            )}
                                        />
                                        <h2>
                                            <FormattedMessage id="annualReport.2021.directorsMessageTitle" />
                                        </h2>
                                    </div>
                                </MediaQuery>
                                <MediaQuery minWidth={frameless.desktop}>
                                    <h2>
                                        <FormattedMessage id="annualReport.2021.directorsMessageTitle" />
                                    </h2>
                                </MediaQuery>
                                <div className="message-from-team directors-message">
                                    <p>
                                        <FormattedMessage id="annualReport.2021.directorsMessageP1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.directorsMessageP2" />
                                    </p>
                                    <p className="pull-quote">
                                        <FormattedMessage id="annualReport.2021.directorsMessagePullquote" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.directorsMessageP3" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.directorsMessageP4" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.directorsMessageP5" />
                                    </p>
                                    <div className="directors-signature">
                                        <img
                                            className="shawna-photo"
                                            src="/images/annual-report/2020/shawna_headshot.jpg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altAvatar'}
                                            )}
                                        />
                                        <div className="signature-container">
                                            <p className="message-signature">Shawna Young</p>
                                            <p>
                                                <FormattedMessage id="annualReport.2021.EDTitle" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FlexRow>
                        </div>
                    </div>
                    <div
                        className="mission-section"
                        ref={this.setRef(SECTIONS.mission)}
                    >
                        <div className="inner">
                            <h4><FormattedMessage id="annualReport.2021.missionTitle" /></h4>
                            <p><FormattedMessage id="annualReport.2021.missionP1" /></p>
                            <p><FormattedMessage id="annualReport.2021.missionP2" /></p>
                            <h5><FormattedMessage id="annualReport.2021.visionHeader" /></h5>
                            <p>
                                <FormattedMessage id="annualReport.2021.visionSubtitle" />
                            </p>
                            <h5><FormattedMessage id="annualReport.2021.missionHeader" /></h5>
                            <p>
                                <FormattedMessage id="annualReport.2021.missionSubtitle" />
                            </p>
                            <h5><FormattedMessage id="annualReport.2021.valuesHeader" /></h5>
                            <p>
                                <FormattedMessage id="annualReport.2021.valuesSubtitle" />
                            </p>
                        </div>
                        <div className="four-up">
                            {/* eslint-disable max-len */}
                            <div className="one-p four-up-creative-expression">
                                <div className="four-up-title creative-expression">
                                    <h3>
                                        <FormattedMessage id="annualReport.2021.creativeExpressionTitle" />
                                    </h3>
                                </div>
                                <p className="inner"><FormattedMessage id="annualReport.2021.creativeExpressionDescription" /></p>
                            </div>
                            <div className="one-p equitable-opportunities">
                                <div className="four-up-title equitable-opportunities">
                                    <h3><FormattedMessage id="annualReport.2021.EquitableOpportunitiesTitle" /></h3>
                                </div>
                                <p className="inner"><FormattedMessage id="annualReport.2021.EquitableOpportunitiesDescription" /></p>
                            </div>
                            <div className="one-p progressive-improvement">
                                <div className="four-up-title progressive-improvement">
                                    <h3><FormattedMessage id="annualReport.2021.progressiveImprovementTitle" /></h3>
                                </div>
                                <p className="inner"><FormattedMessage id="annualReport.2021.progressiveImprovementDescription" /></p>
                            </div>
                            <div className="one-p playful-engagement">
                                <div className="four-up-title playful-engagement">
                                    <h3><FormattedMessage id="annualReport.2021.playfulEngagementTitle" /></h3>
                                </div>
                                <p className="inner"><FormattedMessage id="annualReport.2021.playfulEngagementDescription" /></p>
                            </div>
                            {/* eslint-enable max-len */}
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
                                        <FormattedMessage id="annualReport.2021.reachTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.reachSubtitle" />
                                    </p>
                                </div>
                                <img
                                    src="/images/annual-report/2021/0_Data Section/Calendar.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCalendar'}
                                    )}
                                />
                                <div className="reach-numbers">
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2021.reachProjectCreatorsNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2021.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2021.reachProjectCreators" />
                                        </h4>
                                        <Tag
                                            text={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.reachProjectCreatorsIncrease'}
                                            )}
                                            color="darken"
                                            type="increase"
                                        />
                                    </div>
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2021.reachProjectsCreatedNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2021.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2021.reachProjectsCreated" />
                                        </h4>
                                        <Tag
                                            text={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.reachProjectsCreatedIncrease'}
                                            )}
                                            color="darken"
                                            type="increase"
                                        />
                                    </div>
                                    <div className="reach-datapoint">
                                        <FormattedMessage
                                            id="annualReport.2021.reachNewUsersNumber"
                                            values={{
                                                million: (
                                                    <div className="million">
                                                        <FormattedMessage id="annualReport.2021.reachMillion" />
                                                    </div>
                                                )
                                            }}
                                        />
                                        <h4>
                                            <FormattedMessage id="annualReport.2021.reachNewUsers" />
                                        </h4>
                                        <Tag
                                            text={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.reachNewUsersIncrease'}
                                            )}
                                            color="darken"
                                            type="increase"
                                        />
                                    </div>
                                </div>
                                <div className="reach-numbers">
                                    <div className="datapoint world">
                                        <img
                                            className="world"
                                            src="/images/annual-report/2021/0_Data Section/World.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altWorldVisualization'}
                                            )}
                                        />
                                        <p>
                                            <FormattedMessage
                                                id="annualReport.2021.reachScratchAroundTheWorld"
                                                values={{
                                                    numberOfCountries: (
                                                        <b>
                                                            {/* eslint-disable max-len */}
                                                            <FormattedMessage id="annualReport.2021.reachScratchAroundTheWorldBold" />
                                                            {/* eslint-enable max-len */}
                                                        </b>
                                                    )
                                                }}
                                            />
                                        </p>
                                    </div>
                                    <div className="datapoint saudi-arabia">
                                        <div className="text-content">
                                            <h4>
                                                <FormattedMessage
                                                    id="annualReport.2021.reachSaudiArabiaTitle"
                                                />
                                            </h4>
                                            <p>
                                                <FormattedMessage
                                                    id="annualReport.2021.reachSaudiArabiaDescription"
                                                />
                                            </p>
                                        </div>
                                        <img
                                            className="world"
                                            src="/images/annual-report/2021/0_Data Section/Saudi Arabia.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altSaudiArabiaVisualization'}
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="reach-section t"
                    >
                        <div className="translation">
                            <div className="inner">
                                <div className="reach-translation">
                                    <div className="reach-translation-intro">
                                        <h3>
                                            <FormattedMessage id="annualReport.2021.reachTranslationTitle" />
                                        </h3>
                                        <div className="inline">
                                            <img
                                                src="/images/annual-report/2020/Symbols-UI/Arrow_up.svg"
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altArrowUp'}
                                                )}
                                            />
                                            <span className="bold">
                                                <FormattedMessage
                                                    id="annualReport.2021.reachTranslationIncrease"
                                                />
                                            </span>
                                        </div>
                                        <p>
                                            <FormattedMessage id="annualReport.2021.reachTranslationBlurb" />
                                        </p>
                                    </div>
                                    <img
                                        src="/images/annual-report/2020/data/translated-illustration.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2021.altTranslated'}
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img
                                    src="/images/annual-report/reach/horizontal-command.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altScratchHorizontalCommand'}
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
                                        {id: 'annualReport.2021.altScratchJr'}
                                    )}
                                />
                                <p>
                                    <FormattedMessage id="annualReport.2021.reachScratchJrBlurb" />
                                </p>
                            </div>
                            <div className="reach-datapoint">
                                <FormattedMessage
                                    id="annualReport.2021.reachDownloadsMillion"
                                    values={{
                                        million: (
                                            <div className="million">
                                                <FormattedMessage id="annualReport.2021.reachMillion" />
                                            </div>
                                        )
                                    }}
                                />
                                <h4>
                                    <FormattedMessage id="annualReport.2021.reachDownloads" />
                                </h4>
                                <Tag
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.reachDownloadsIncrease'}
                                    )}
                                    color="darken"
                                    type="increase dark"
                                />
                            </div>
                        </div>
                        <MediaQuery minWidth={frameless.mobile}>
                            <div className="scratch-jr-transition-img">
                                <img
                                    src="/images/annual-report/reach/horizontal-loop.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altHorizontalLoop'}
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
                                    <FormattedMessage id="annualReport.2021.themesTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2021.themesDescription" />
                                </p>
                                <div className="initiatives-pillars">
                                    <div className="three-pillars">
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2021.SECTitle" />
                                            </h4>
                                        </div>
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2021.accessTitle" />
                                            </h4>
                                        </div>
                                        <div className="pillar-splash">
                                            <h4>
                                                <FormattedMessage id="annualReport.2021.communityTitle" />
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="initiatives-SEC">
                            <div className="initiatives-subsection-header SEC">
                                <div className="inner">
                                    <h2>
                                        <FormattedMessage id="annualReport.2021.SECTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.SECIntro" />
                                    </p>
                                </div>
                            </div>
                            <div className="initiatives-subsection-content SEC">
                                <div className="content two-up">
                                    <div className="p-content">
                                        <h4>
                                            <FormattedMessage id="annualReport.2021.SECWhatIs" />
                                        </h4>
                                        <p><FormattedMessage id="annualReport.2021.SECWhatIsP1" /></p>
                                        <p><FormattedMessage id="annualReport.2021.SECWhatIsP2" /></p>
                                        <p><FormattedMessage id="annualReport.2021.SECWhatIsP3" /></p>
                                    </div>
                                    <div className="stats">
                                        <div className="stat-block">
                                            <div className="stat-num">
                                                <FormattedMessage id="annualReport.2021.SECOrgNumber" />
                                            </div>
                                            <div className="stat-label">
                                                <FormattedMessage id="annualReport.2021.SECOrgLabel" />
                                            </div>
                                        </div>
                                        <div className="stat-block">
                                            <div className="stat-num">
                                                <FormattedMessage id="annualReport.2021.SECCountryNumber" />
                                            </div>
                                            <div className="stat-label">
                                                <FormattedMessage id="annualReport.2021.SECCountryLabel" />
                                            </div>
                                        </div>
                                        <div className="stat-block">
                                            <div className="stat-num">
                                                <FormattedMessage id="annualReport.2021.SECPartnerNumber" />
                                            </div>
                                            <div className="stat-label">
                                                <FormattedMessage id="annualReport.2021.SECPartnerLabel" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="map">
                                    <p><FormattedMessage id="annualReport.2021.SECMapParagraph" /></p>
                                    <img
                                        src="/images/annual-report/2021/1_SEC Section/Map.svg"
                                        alt={this.props.intl.formatMessage(
                                            {id: 'annualReport.2021.altMap'}
                                        )}
                                    />
                                    <h4 className="map-org-header">2020-2021 Organizations</h4>
                                    <div className="country-org-lists">
                                        <CreateOrgList array={COUNTRIES} />
                                        <CreateOrgList array={COUNTRIES2} />
                                    </div>
                                    <h4 className="map-org-header">2020-2021 Partner Cohort</h4>
                                    <div className="country-org-lists">
                                        <div className="org-list">
                                            <div className="country-org-list">
                                                <ul className="partner">
                                                    <li>Raspberry Pi Foundation</li>
                                                    <li>Stanford d. School</li>
                                                    <li>Chicago Public Schools</li>
                                                    <li>Micro:bit Educational Foundation</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="org-list">
                                            <div className="country-org-list">
                                                <ul className="partner">
                                                    <li>STEM Nola</li>
                                                    <li>Brazilian Creative Learning Network (BCLN)</li>
                                                    <li>The Tinkering Studio</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* 4/25 */}
                                
                                
                                <div className="inner">
                                    <MediaQuery minWidth={frameless.tabletPortrait}>
                                        <div className="content flex-content">
                                            <div className="text">
                                                <Tag
                                                    text={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.spotlightStory'}
                                                    )}
                                                    color="blue"
                                                    type="spotlight"
                                                />
                                                <h4>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightTitle" />
                                                </h4>
                                                <p className="larger">
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightLocation" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightText1" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightText2" />
                                                </p>
                                            </div>
                                            <div className="images">
                                                {/* eslint-disable max-len */}
                                                <img
                                                    src="/images/annual-report/2021/1_SEC Section/Bridges to Science.svg"
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altSECSpotlightImage'}
                                                    )}
                                                />
                                                {/* eslint-enable max-len */}
                                            </div>
                                        </div>
                                    </MediaQuery>
                                    <MediaQuery
                                        maxWidth={frameless.tabletPortrait - 1}
                                        // minWidth={frameless.mobile}
                                    >
                                        <div className="content flex-content">
                                            <div className="text">
                                                <Tag
                                                    text={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.spotlightStory'}
                                                    )}
                                                    color="green"
                                                    type="spotlight"
                                                />
                                                <h4>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightTitle" />
                                                </h4>
                                                <p className="larger">
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightLocation" />
                                                </p>
                                            </div>
                                            <div className="images">
                                                {/* eslint-disable max-len */}
                                                <img
                                                    src="/images/annual-report/2021/1_SEC Section/Bridges to Science.svg"
                                                    alt={this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altSECSpotlightImage'}
                                                    )}
                                                />
                                                {/* eslint-enable max-len */}
                                            </div>
                                            <div className="text">
                                                <p>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightText1" />
                                                </p>
                                                <p>
                                                    <FormattedMessage id="annualReport.2021.SECSpotlightText2" />
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </MediaQuery>
                                    <div className="content">
                                        <p className="pull-quote blue">
                                            <FormattedMessage id="annualReport.2021.SECPullQuote" />
                                        </p>
                                        <p className="pull-quote-attr">
                                            <FormattedMessage id="annualReport.2021.SECPullQuoteAttr" />
                                        </p>
                                    </div>
                                </div>
                                <div className="inner stacked">
                                    <div className="workshop">
                                        <h4>
                                            <FormattedMessage id="annualReport.2021.SECWorkshops" />
                                        </h4>
                                        <p>
                                            <FormattedMessage id="annualReport.2021.SECWorkshopsText" />
                                        </p>
                                        <h4 className="center">
                                            <FormattedMessage id="annualReport.2021.SECWorkshopsSubtitle" />
                                        </h4>
                                        <img
                                            className="sec-image"
                                            src="/images/annual-report/2021/1_SEC Section/Workshops.svg"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altSECWorkshops'}
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="initiatives-access">
                            <div className="initiatives-subsection-header access">
                                <div className="inner">
                                    <h2>
                                        <FormattedMessage id="annualReport.2021.accessTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.accessIntro" />
                                    </p>
                                </div>
                            </div>
                            <div className="world access">
                                <Tag
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.spotlightStory'}
                                    )}
                                    color="green"
                                    type="spotlight"
                                />
                                <h4>
                                    <FormattedMessage id="annualReport.2021.accessASL" />
                                </h4>
                                <p className="subhed">
                                    <FormattedMessage
                                        id="annualReport.2021.accessASLText"
                                    />
                                </p>
                                {/* eslint-disable max-len */}
                                <img
                                    src="/images/annual-report/2021/2_Access Section/Access Spotlight Story Illustration.svg"
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altAccessibility'}
                                    )}
                                />
                                {/* eslint-enable */}
                                <p>
                                    <FormattedMessage
                                        id="annualReport.2021.accessASLText2"
                                    />
                                </p>
                                <div className="content">
                                    <p className="pull-quote green left">
                                        <FormattedMessage id="annualReport.2021.accessPullQuote" />
                                    </p>
                                    <p className="pull-quote-attr right">
                                        <FormattedMessage id="annualReport.2021.accessPullQuoteAttr" />
                                    </p>
                                </div>
                                <p>
                                    <FormattedMessage
                                        id="annualReport.2021.accessASLText3"
                                    />
                                </p>
                                <div className="video-container SEC">
                                    <div className="video-background SEC">
                                        {/* eslint-disable max-len */}
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                spinnerColor="transparent-gray"
                                                thumbnail="/images/annual-report/2021/2_Access Section/Deaf Kids Code Video.png"
                                                videoId="i2g46ikddf"
                                                thumbnailWidth="580"
                                                videoHeight={String(580 * .568)}
                                                videoWidth="580"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altSECVideoPreview'}
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
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                spinnerColor="transparent-gray"
                                                thumbnail="/images/annual-report/2021/2_Access Section/Deaf Kids Code Video.png"
                                                videoId="i2g46ikddf"
                                                thumbnailWidth="400"
                                                videoHeight={String(400 * .568)}
                                                videoWidth="400"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altSECVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreview
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                spinnerColor="transparent-gray"
                                                thumbnail="/images/annual-report/2021/2_Access Section/Deaf Kids Code Video.png"
                                                videoId="i2g46ikddf"
                                                thumbnailWidth="300"
                                                videoHeight={String(300 * .568)}
                                                videoWidth="300"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altSECVideoPreview'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        {/* eslint-enable max-len */}
                                    </div>
                                </div>
                            </div>
                            {/* DEI Committees */}
                            <div className="inner">
                                <div className="flex-content">
                                    <MediaQuery minWidth={frameless.tabletPortrait}>
                                        {/* eslint-disable max-len */}
                                        <TextAndMediaSnippet
                                            className="regular first"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.accessDEICommittee'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altaccessDEICommittee'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/2_Access Section/Committees start illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeText"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                        {/* eslint-disable max-len */}
                                        <h4>
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommittee"
                                            />
                                        </h4>
                                        <TextAndMediaSnippet
                                            className="regular"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altaccessDEICommittee'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/2_Access Section/Committees start illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeText"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                </div>
                            </div>
                            {/* Accessibility */}
                            <div className="green">
                                <div className="inner">
                                    <div className="flex-content">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="reverse"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessDEICommitteeAccessibility'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessDEICommitteeAccessibility'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/Accessibility Committee Illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeAccessibilityText"
                                                />
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeAccessibilityText2"
                                                />
                                            </TextAndMediaSnippet>
                                            {/* eslint-enable */}
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="regular"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessDEICommitteeAccessibility'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessDEICommitteeAccessibility'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/Accessibility Committee Illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeAccessibilityText"
                                                />
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeAccessibilityText2"
                                                />
                                            </TextAndMediaSnippet>
                                            {/* eslint-enable */}
                                        </MediaQuery>
                                    </div>
                                </div>
                            </div>
                            {/* G-JEDI */}
                            <div className="inner">
                                <div className="flex-content">
                                    <MediaQuery minWidth={frameless.tabletPortrait}>
                                        {/* eslint-disable max-len */}
                                        <TextAndMediaSnippet
                                            className="regular"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.accessDEICommitteeG-JEDI'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altaccessDEICommitteeG-JEDI'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/2_Access Section/G-JEDI Committee Illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeG-JEDIText"
                                            />
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeG-JEDIText2"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                        {/* eslint-disable max-len */}
                                        <TextAndMediaSnippet
                                            className="regular"
                                            title={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.accessDEICommitteeG-JEDI'}
                                            )}
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altaccessDEICommitteeG-JEDI'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/2_Access Section/G-JEDI Committee Illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeG-JEDIText"
                                            />
                                            <FormattedMessage
                                                id="annualReport.2021.accessDEICommitteeG-JEDIText2"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                </div>
                            </div>
                            {/* Equity x Design */}
                            {/* link: https://design-justice.pubpub.org */}
                            <div className="green">
                                <div className="inner">
                                    <div className="flex-content">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="reverse"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessDEICommitteeEquityXDesign'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessDEICommitteeEquityXDesign'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/Equity x Design Committee Illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeEquityXDesignText"
                                                />
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeEquityXDesignText2"
                                                />
                                            </TextAndMediaSnippet>
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="regular"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessDEICommitteeEquityXDesign'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessDEICommitteeEquityXDesign'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/Equity x Design Committee Illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeEquityXDesignText"
                                                />
                                                <FormattedMessage
                                                    id="annualReport.2021.accessDEICommitteeEquityXDesignText2"
                                                />
                                            </TextAndMediaSnippet>
                                            {/* eslint-enable */}
                                        </MediaQuery>
                                    </div>
                                </div>
                            </div>
                            {/* 10 new languages */}
                            <div className="inner">
                                <Tag
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.accessSnapshot'}
                                    )}
                                    color="green"
                                    type="snapshot left-align languages"
                                />
                                <div className="flex-content">
                                    <div className="text-and-media-snippet regular">
                                        <div className="half">
                                            
                                            <h4>
                                                <FormattedMessage id="annualReport.2021.access10NewLanguages" />
                                            </h4>
                                            <p>
                                                <FormattedMessage id="annualReport.2021.access10NewLanguagesText" />
                                            </p>
                                        </div>
                                        <div className="half">
                                            <MediaQuery
                                                minWidth={frameless.desktop}
                                            >
                                                <iframe
                                                    src="https://scratch.mit.edu/projects/430997530/embed"
                                                    width="360"
                                                    height={((360 * .76) + 45)}
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    allowFullScreen
                                                />
                                            </MediaQuery>
                                            <MediaQuery maxWidth={frameless.desktop - 1}>
                                                <iframe
                                                    src="https://scratch.mit.edu/projects/430997530/embed"
                                                    width="300"
                                                    height={((300 * .76) + 45)}
                                                    frameBorder="0"
                                                    scrolling="no"
                                                    allowFullScreen
                                                />
                                            </MediaQuery>
                                        </div>
                                    </div>
                                </div>
                                {/* South Africa */}
                                <div className="inner">
                                    <div className="flex-content">
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="reverse"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessSouthAfrica'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessSouthAfrica'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/zero-rated scratch illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessSouthAfricaText"
                                                />
                                            </TextAndMediaSnippet>
                                            {/* eslint-enable */}
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.tabletPortrait - 1}>
                                            {/* eslint-disable max-len */}
                                            <TextAndMediaSnippet
                                                className="regular"
                                                title={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.accessSouthAfrica'}
                                                )}
                                                alt={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.altaccessSouthAfrica'}
                                                )}
                                                type="image"
                                                largeImage="/images/annual-report/2021/2_Access Section/zero-rated scratch illustration.svg"
                                            >
                                                <FormattedMessage
                                                    id="annualReport.2021.accessSouthAfricaText"
                                                />
                                            </TextAndMediaSnippet>
                                            {/* eslint-enable */}
                                        </MediaQuery>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="initiatives-community">
                            <div className="initiatives-subsection-header community">
                                <div className="inner">
                                    <h2>
                                        <FormattedMessage id="annualReport.2021.communityTitle" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.communityIntro" />
                                    </p>
                                </div>
                            </div>
                            <div className="initiatives-subsection-content">
                                <div className="world">
                                    <Tag
                                        text={this.props.intl.formatMessage(
                                            {id: 'annualReport.2021.accessSnapshot'}
                                        )}
                                        color="purple"
                                        type="snapshot"
                                    />
                                    {/* eslint-disable max-len */}
                                    <h4>
                                        <FormattedMessage id="annualReport.2021.communityScratchConference" />
                                    </h4>
                                    <p>
                                        <FormattedMessage
                                            id="annualReport.2021.communityScratchConferenceText1"
                                            values={{
                                                more_bold: (
                                                    <b>
                                                        <FormattedMessage id="annualReport.2021.communityScratchConferenceText1More" />
                                                    </b>
                                                )
                                            }}
                                        />
                                    </p>
                                    {/* eslint-enable max-len */}
                                </div>
                                <div className="tweet-container">
                                    <div className="tweets">
                                        <TwitterTweetEmbed
                                            tweetId={'1418269822270337026'}
                                        />
                                        <TwitterTweetEmbed
                                            tweetId={'1418262789764825089'}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* volunteer translators */}
                            <div className="inner">
                                <div className="flex-content">
                                    <h4 className="special">
                                        <FormattedMessage
                                            id="annualReport.2021.communityVolunteerTranslators"
                                        />
                                    </h4>
                                    <MediaQuery minWidth={frameless.desktop}>
                                        {/* eslint-disable max-len */}
                                        <TextAndMediaSnippet
                                            className="regular"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altcommunityVolunteerTranslators'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/3_Community Section/Languages illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.communityVolunteerTranslatorsText"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                    <MediaQuery maxWidth={frameless.desktop - 1}>
                                        {/* eslint-disable max-len */}
                                        <TextAndMediaSnippet
                                            className="regular"
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altcommunityVolunteerTranslators'}
                                            )}
                                            type="image"
                                            largeImage="/images/annual-report/2021/3_Community Section/Languages illustration.svg"
                                        >
                                            <FormattedMessage
                                                id="annualReport.2021.communityVolunteerTranslatorsText"
                                            />
                                        </TextAndMediaSnippet>
                                        {/* eslint-enable */}
                                    </MediaQuery>
                                    <p className="contain-p">
                                        <FormattedMessage
                                            id="annualReport.2021.communityVolunteerTranslatorsText2"
                                        />
                                    </p>
                                </div>
                                <div className="thank-you-image">
                                    {/* eslint-disable max-len */}
                                    <img
                                        src="/images/annual-report/2021/3_Community Section/Thank You Translators.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altcommunityThankYou'})}
                                    />
                                    {/* eslint-enable max-len */}
                                </div>
                            </div>

                            <div className="inner center">
                                <h3>
                                    <FormattedMessage id="annualReport.2021.communityScratchCommunity" />
                                </h3>
                                <p>
                                    <FormattedMessage id="annualReport.2021.communityScratchCommunityIntro" />
                                </p>
                            </div>

                            {/* go into timeline section */}
                            <div className="sparkles">
                                <img
                                    className="sparkle-left"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/Left Sparkles.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altSparkle'})}
                                />
                                <img
                                    className="down-arrow"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/Down Arrow.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altDownArrow'})}
                                />
                                <img
                                    className="sparkle-right"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/Right Sparkles.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altSparkle'})}
                                />
                            </div>
                            <div className="year-in-review">
                                <TimelineCard
                                    className="center"
                                    link="https://scratch.mit.edu/studios/28659922/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard1Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard1Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard1Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard1'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Poetic Cafe.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@KAKE93"
                                />
                                <img
                                    className="connector left"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/jan to feb.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altConnectingLine'})}
                                />
                                {/* eslint-disable max-len */}
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/studios/28738118/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard2Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard2Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard2Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard2'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Black History Month.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@debabeth"
                                />
                                <TimelineCard
                                    className="left"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard3Date'}
                                    )}
                                    link="https://scratch.mit.edu/studios/29293970/"
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard3Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard3Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard3'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/April Fools.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@Animator_Aryu"
                                />
                                <img
                                    className="connector"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/april to may.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="right"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard4Date'}
                                    )}
                                    link="https://scratch.mit.edu/studios/29722528"
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard4Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard4Text'}
                                    )}
                                />
                                <TimelineCard
                                    className="right"
                                    link="https://scratch.mit.edu/studios/29835647/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard5Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard5Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard5Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard5'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Pride Month.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@ratchild"
                                />
                                <img
                                    className="connector"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/june to aug.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/projects/555796820/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard6Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard6Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard6Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard6'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Scratch Camp.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@Cupwing"
                                />
                                <TimelineCard
                                    className="left"
                                    link="https://scratch.mit.edu/studios/30379533/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard7Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard7Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard7Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard7'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Scratchtober.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@twingamerdudesreal"
                                />
                                <img
                                    className="connector left"
                                    src="/images/annual-report/2021/3_Community Section/Timeline/oct to dec.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altConnectingLine'})}
                                />
                                <TimelineCard
                                    className="center"
                                    link="https://sip.scratch.mit.edu/hoc-2021/"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard8Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard8Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard8Text'}
                                    )}
                                />
                                <TimelineCard
                                    className="center"
                                    link="https://scratch.mit.edu/studios/30751265/curators"
                                    date={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard9Date'}
                                    )}
                                    title={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard9Title'}
                                    )}
                                    text={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.yearInReviewCard9Text'}
                                    )}
                                    alt={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.altCard9'}
                                    )}
                                    image="/images/annual-report/2021/3_Community Section/Timeline/Year in Review.png"
                                    projectBy={this.props.intl.formatMessage(
                                        {id: 'annualReport.2021.projectBy'}
                                    )}
                                    attribution="@12_468"
                                />
                                <div className="illustrations">
                                    <img
                                        className="april"
                                        src="/images/annual-report/2021/3_Community Section/Timeline/April Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altApril'})}
                                    />
                                    <img
                                        className="june"
                                        src="/images/annual-report/2021/3_Community Section/Timeline/June Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altJune'})}
                                    />
                                    <p className="june">
                                        <FormattedMessage id="annualReport.2021.JuneIlloAttr" />
                                    </p>
                                    <img
                                        className="august"
                                        src="/images/annual-report/2021/3_Community Section/Timeline/Oct Illustration.svg"
                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altAugust'})}
                                    />
                                    <p className="august">
                                        <FormattedMessage id="annualReport.2021.OctIlloAttr" />
                                    </p>
                                </div>
                                {/* eslint-enable max-len */}
                            </div>
                            
                            <div className="initiatives-subsection-content lab">
                                <div className="wide inner community">
                                    <div className="content two-wide split">
                                        <div className="text">
                                            <Tag
                                                text={this.props.intl.formatMessage(
                                                    {id: 'annualReport.2021.spotlightStory'}
                                                )}
                                                color="purple"
                                                type="snapshot"
                                            />
                                            <h4>
                                                <FormattedMessage id="annualReport.2021.communityScratchLabTitle" />
                                            </h4>
                                            <MediaQuery
                                                minWidth={frameless.tabletPortrait}
                                            >
                                                <p>
                                                    <FormattedMessage id="annualReport.2021.communityScratchLabText" />
                                                </p>
                                            </MediaQuery>
                                        </div>
                                        {/* eslint-disable max-len */}
                                        <div className="images">
                                            <img
                                                src="/images/annual-report/2021/3_Community Section/Scratch Lab logo.png"
                                                alt={this.props.intl.formatMessage({id: 'annualReport.2021.altScratchLogoText'})}
                                            />
                                        </div>
                                        {/* eslint-enable max-len */}
                                        <MediaQuery
                                            maxWidth={frameless.tabletPortrait - 1}
                                        >
                                            <p>
                                                <FormattedMessage id="annualReport.2021.communityScratchLabText" />
                                            </p>
                                        </MediaQuery>
                                    </div>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.communityScratchLabText2" />
                                    </p>
                                </div>
                            </div>
                            <div className="aaa-video">
                                <MediaQuery minWidth={frameless.tabletPortrait}>
                                    <VideoPreview
                                        buttonMessage={
                                            this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                        }
                                        spinnerColor="transparent-gray"
                                        thumbnail="/images/annual-report/2021/3_Community Section/Scratch Lab video.png"
                                        videoId="go1wqxifjk"
                                        thumbnailWidth="580"
                                        videoHeight={String(580 * .568)}
                                        videoWidth="580"
                                        alt={
                                            this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altScratchLabVideo'}
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
                                            this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                        }
                                        spinnerColor="transparent-gray"
                                        thumbnail="/images/annual-report/2021/3_Community Section/Scratch Lab video.png"
                                        videoId="go1wqxifjk"
                                        thumbnailWidth="400"
                                        videoHeight={String(400 * .568)}
                                        videoWidth="400"
                                        alt={
                                            this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altScratchLabVideo'}
                                            )
                                        }
                                    />
                                </MediaQuery>
                                <MediaQuery maxWidth={frameless.mobile - 1}>
                                    <VideoPreview
                                        buttonMessage={
                                            this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                        }
                                        spinnerColor="transparent-gray"
                                        thumbnail="/images/annual-report/2021/3_Community Section/Scratch Lab video.png"
                                        videoId="go1wqxifjk"
                                        thumbnailWidth="300"
                                        videoHeight={String(300 * .568)}
                                        videoWidth="300"
                                        alt={
                                            this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altScratchLabVideo'}
                                            )
                                        }
                                    />
                                </MediaQuery>
                            </div>
                            <div className="initiatives-subsection-content lab second">
                                <div className="wide inner community">
                                    <div className="community-sds">
                                        <p>
                                            <FormattedMessage id="annualReport.2021.communityScratchLabText3" />
                                        </p>
                                        <p>
                                            <FormattedMessage id="annualReport.2021.communityScratchLabText4" />
                                        </p>
                                        <div className="sds-list">
                                            {/* eslint-disable max-len */}
                                            <div className="sds-tile">
                                                <img
                                                    src="/images/annual-report/2021/3_Community Section/Scratch Lab hat.png"
                                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altHat'})}
                                                />
                                            </div>
                                            <div className="sds-tile">
                                                <img
                                                    src="/images/annual-report/2021/3_Community Section/Scratch Lab text.png"
                                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altScratchText'})}
                                                />
                                            </div>
                                            <div className="sds-tile">
                                                <img
                                                    src="/images/annual-report/2021/3_Community Section/Scratch Lab star.png"
                                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altStar'})}
                                                />
                                            </div>
                                            {/* eslint-enable max-len */}
                                        </div>
                                    </div>
                                    <div style={{width: '100%'}}>
                                        <h4 style={{textAlign: 'center'}}>
                                            <FormattedMessage id="annualReport.2021.communitySnapshot2Title" />
                                        </h4>
                                        <div className="content two-wide split yt">
                                            <MediaQuery
                                                minWidth={frameless.tabletPortrait}
                                            >
                                                <div className="text">
                                                    <p>
                                                        {/* eslint-disable max-len */}
                                                        <FormattedMessage id="annualReport.2021.communitySnapshot2Text" />
                                                        {/* eslint-enable max-len */}
                                                    </p>
                                                </div>
                                            </MediaQuery>
                                            <div className="images yt-splash">
                                                <div className="num-block one">
                                                    <div className="num">
                                                        <FormattedMessage id="annualReport.2021.ytData1" />
                                                    </div>
                                                    <div className="small-text">
                                                        <FormattedMessage id="annualReport.2021.ytData1Sub" />
                                                    </div>
                                                </div>
                                                <div className="num-block two">
                                                    <div className="num">
                                                        <FormattedMessage id="annualReport.2021.ytData2" />
                                                    </div>
                                                    <div className="small-text">
                                                        <FormattedMessage id="annualReport.2021.ytData2Sub" />
                                                    </div>
                                                </div>
                                                <div className="num-block three">
                                                    <div className="small-text">
                                                        <FormattedMessage id="annualReport.2021.ytData3Top" />
                                                    </div>
                                                    <div className="num">
                                                        <FormattedMessage id="annualReport.2021.ytData3" />
                                                    </div>
                                                    <div className="small-text">
                                                        <FormattedMessage id="annualReport.2021.ytData3Sub" />
                                                    </div>
                                                </div>
                                            </div>
                                            <MediaQuery
                                                maxWidth={frameless.tabletPortrait - 1}
                                            >
                                                <div className="text">
                                                    <p>
                                                        {/* eslint-disable max-len */}
                                                        <FormattedMessage id="annualReport.2021.communitySnapshot2Text" />
                                                        {/* eslint-enable max-len */}
                                                    </p>
                                                </div>
                                            </MediaQuery>
                                        </div>
                                        {/* eslint-disable max-len */}
                                        <MediaQuery minWidth={frameless.tabletPortrait}>
                                            <VideoPreviewYouTube
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2021/3_Community Section/YT video spotlight video.png"
                                                videoId="uv8mbL-MC58"
                                                thumbnailWidth="580"
                                                videoHeight={String(580 * .568)}
                                                videoWidth="580"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altScratchLabVideo'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        <MediaQuery
                                            maxWidth={frameless.tabletPortrait - 1}
                                            minWidth={frameless.mobile}
                                        >
                                            <VideoPreviewYouTube
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2021/3_Community Section/YT video spotlight video.png"
                                                videoId="uv8mbL-MC58"
                                                thumbnailWidth="400"
                                                videoHeight={String(400 * .568)}
                                                videoWidth="400"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altScratchLabVideo'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        <MediaQuery maxWidth={frameless.mobile - 1}>
                                            <VideoPreviewYouTube
                                                buttonMessage={
                                                    this.props.intl.formatMessage({id: 'annualReport.2021.watchVideo'})
                                                }
                                                thumbnail="/images/annual-report/2021/3_Community Section/YT video spotlight video.png"
                                                videoId="uv8mbL-MC58"
                                                thumbnailWidth="300"
                                                videoHeight={String(300 * .568)}
                                                videoWidth="300"
                                                alt={
                                                    this.props.intl.formatMessage(
                                                        {id: 'annualReport.2021.altScratchLabVideo'}
                                                    )
                                                }
                                            />
                                        </MediaQuery>
                                        {/* eslint-enable max-len */}
                                    </div>
                                    <div className="community-sds">
                                        <p>
                                            <FormattedMessage id="annualReport.2021.communitySnapshot2Text2" />
                                        </p>
                                        <div className="sds-list">
                                            {/* eslint-disable max-len */}
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=zM9MYI6bVMk"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2021/3_Community Section/about me.png"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altAboutMe'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2021.tutorial1" />
                                                </a>
                                            </div>
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=4v1CIKehF6E"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2021/3_Community Section/clicker game.png"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altClickerGame'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2021.tutorial2" />
                                                </a>
                                            </div>
                                            <div className="sds-tile">
                                                <a
                                                    href="https://www.youtube.com/watch?v=TZu2QwkYQm0"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="/images/annual-report/2021/3_Community Section/mouse trail.png"
                                                        alt={this.props.intl.formatMessage({id: 'annualReport.2021.altMouseTrail'})}
                                                    />
                                                    <FormattedMessage id="annualReport.2021.tutorial3" />
                                                </a>
                                            </div>
                                            {/* eslint-enable max-len */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div
                        className="founders-message"
                        ref={this.setRef(SECTIONS.founders_message)}
                    >
                        <div className="inner">
                            <div className="flex-content">
                                <div className="header">
                                    <h2>
                                        <FormattedMessage id="annualReport.2021.FounderMessageTitle" />
                                    </h2>
                                </div>
                                <div className="text">
                                    <h4>
                                        <FormattedMessage id="annualReport.2021.FounderMessageSubTitle" />
                                    </h4>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.FounderMessageText1" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.FounderMessageText2" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.FounderMessageText3" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.FounderMessageText4" />
                                    </p>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.FounderMessageText5" />
                                    </p>
                                    <div className="signature">
                                        <Avatar
                                            alt={this.props.intl.formatMessage(
                                                {id: 'annualReport.2021.altAvatar'}
                                            )}
                                            src="/images/annual-report/2021/mitch_headshot.jpg"
                                        />
                                        <div>
                                            <h5>
                                                Mitch Resnick
                                            </h5>
                                            <p>
                                                <FormattedMessage id="annualReport.2021.FounderTitle" />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="looking-forward">
                        <h2>
                            <FormattedMessage id="annualReport.2021.lookingForward" />
                        </h2>
                        <p>
                            <FormattedMessage id="annualReport.2021.lookingForwardText1" />
                        </p>
                        <div className="sds-list">
                            <div className="sds-tile">
                                <img
                                    src="/images/annual-report/2021/4_Looking Forward/looking forward 1.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altLookingForward1'})}
                                />
                                <FormattedMessage id="annualReport.2021.LookingForward1" />
                            </div>
                            <div className="sds-tile">
                                <img
                                    src="/images/annual-report/2021/4_Looking Forward/looking forward 2.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altLookingForward2'})}
                                />
                                <FormattedMessage id="annualReport.2021.LookingForward2" />
                            </div>
                            <div className="sds-tile">
                                <img
                                    src="/images/annual-report/2021/4_Looking Forward/looking forward 3.svg"
                                    alt={this.props.intl.formatMessage({id: 'annualReport.2021.altLookingForward3'})}
                                />
                                <FormattedMessage id="annualReport.2021.LookingForward3" />
                            </div>
                        </div>
                        <p>
                            <FormattedMessage id="annualReport.2021.lookingForwardText2" />
                        </p>
                    </div>
                    <div
                        className="supporters-section"
                        ref={this.setRef(SECTIONS.supporters)}
                    >
                        <div className="inner">
                            <div className="supporters-heading">
                                <h2>
                                    <FormattedMessage id="annualReport.2021.supportersTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2021.supportersIntro" />
                                </p>
                            </div>
                            <div className="supporters-subsection">
                                <div className="supporters-blurb">
                                    <h4>
                                        <FormattedMessage id="annualReport.2021.ourSupporters" />
                                    </h4>
                                    <p>
                                        <FormattedMessage id="annualReport.2021.ourSupportersText" />
                                    </p>
                                </div>
                            </div>
                            <div className="supporters-subsection">
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersCatPartnersTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.catPartners)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersCreativityTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.creativity)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersCollaborationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.collaboration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersImaginationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.imagination)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersInspirationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.inspiration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersExplorationTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.exploration)}
                                </div>
                                <div className="supporters-level">
                                    <h5>
                                        <FormattedMessage id="annualReport.2021.supportersPlayTitle" />
                                    </h5>
                                    <hr />
                                    {createSupportersLists(Supporters.inKind, Supporters.play)}
                                </div>
                                <div className="supporters-level">
                                    <h4>
                                        <FormattedMessage id="annualReport.2021.supportersFoundingTitle" />
                                    </h4>
                                    <hr />
                                    <p className="italics">
                                        <FormattedMessage id="annualReport.2021.supportersFoundingText" />
                                    </p>
                                    {createSupportersLists(Supporters.inKind, Supporters.founding)}
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
                                <FormattedMessage id="annualReport.2021.leadershipTitle" />
                            </h2>
                            <h3 style={{margin: '0 25px'}}>
                                <FormattedMessage id="annualReport.2021.leadershipBoard" />
                            </h3>
                            <FlexRow className="leadership-board">
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipChair" />
                                    </b>
                                    <h4>Mitchel Resnick</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipProfessor" />
                                    <br />MIT Media Lab
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipViceChair" />
                                    </b>
                                    <h4>David Siegel</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipCoFounder" />
                                    <br />Two Sigma
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardMember" />
                                    </b>
                                    <h4>Margaret Honey</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipPresidentCEO" />
                                    <br />New York Hall of Science
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardMember" />
                                    </b>
                                    <h4>Christina Miller</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipFormerPresident" />
                                    <br />Cartoon Network
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardMember" />
                                    </b>
                                    <h4>Avraham Kadar</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipFounderCEO" />
                                    <br />BrainPOP
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardMember" />
                                    </b>
                                    <h4>Ursula Burns</h4>
                                    <FormattedMessage id="annualReport.2021.leadershipFormerChairCEO" />
                                    <br />Xerox Corporation and VEON Ltd.
                                </div>
                            </FlexRow>
                            <h4>
                                <FormattedMessage id="annualReport.2021.leadershipBoardSecretaryTreasurer" />
                            </h4>
                            <FlexRow className="leadership-board">
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardSecretary" />
                                    </b>
                                    <h4>Sheri Vammen</h4>
                                </div>
                                <div className="board-member">
                                    <b className="board-title">
                                        <FormattedMessage id="annualReport.2021.leadershipBoardTreasurer" />
                                    </b>
                                    <h4>Rich Sauer</h4>
                                </div>
                            </FlexRow>
                            <div className="leadership-scratch-team">
                                <h3>
                                    <FormattedMessage id="annualReport.2021.leadershipScratchTeam" />
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
                                    <FormattedMessage id="annualReport.2021.leadershipED" />
                                </div>
                                <PeopleGrid
                                    linkToNewTab
                                    people={People}
                                />
                                <p className="thank-you">
                                    <FormattedMessage id="annualReport.2021.teamThankYou" />
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
                                        {id: 'annualReport.2021.altDonateIllustration'}
                                    )}
                                />
                            </MediaQuery>
                            <div className="donate-content">
                                <h2>
                                    <FormattedMessage id="annualReport.2021.donateTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="annualReport.2021.donateMessage" />
                                </p>
                                <p>
                                    <FormattedMessage id="annualReport.2021.donateMessage2" />
                                </p>
                                <a
                                    href="https://secure.donationpay.org/scratchfoundation/"
                                    rel="noreferrer noopener"
                                    target="_blank"
                                >
                                    <Button className="donate-button">
                                        <FormattedMessage id="annualReport.2021.donateButton" />
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
