const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');
const render = require('../../lib/render.jsx');

const Box = require('../../components/box/box.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const Page = require('../../components/page/www/page.jsx');

require('./cards.scss');

class Cards extends React.Component {
    constructor (props) {
        super(props);
        bindAll([
            'pdfLocaleMismatch'
        ]);
    }
    pdfLocaleMismatch (locale, pdf, englishPdf) {
        if (pdf === englishPdf && locale.indexOf('en') !== 0) {
            return true;
        }
        return false;
    }
    render () {
        const locale = this.props.intl.locale || 'en';
        const formatMessage = this.props.intl.formatMessage;
        const englishLinks = {
            'cards.starterLink': 'https://resources.scratch.mit.edu/www/cards/en/Scratch2Cards.pdf',
            'cards.nameLink': 'https://resources.scratch.mit.edu/www/cards/en/nameCards.pdf',
            'cards.flyLink': 'https://resources.scratch.mit.edu/www/cards/en/flyCards.pdf',
            'cards.raceLink': 'https://resources.scratch.mit.edu/www/cards/en/raceCards.pdf',
            'cards.musicLink': 'https://resources.scratch.mit.edu/www/cards/en/musicCards.pdf',
            'cards.hideLink': 'https://resources.scratch.mit.edu/www/cards/en/hide-seekCards.pdf',
            'cards.storyLink': 'https://resources.scratch.mit.edu/www/cards/en/storyCards.pdf',
            'cards.dressupLink': 'https://resources.scratch.mit.edu/www/cards/en/fashionCards.pdf',
            'cards.pongLink': 'https://resources.scratch.mit.edu/www/cards/en/pongCards.pdf',
            'cards.danceLink': 'https://resources.scratch.mit.edu/www/cards/en/danceCards.pdf',
            'cards.catchLink': 'https://resources.scratch.mit.edu/www/cards/en/catchCards.pdf',
            'cards.petLink': 'https://resources.scratch.mit.edu/www/cards/en/petCards.pdf'
        };
        const formattedLinks = {
            'cards.starterLink': formatMessage({id: 'cards.Scratch2CardsLink'}),
            'cards.nameLink': formatMessage({id: 'cards.nameCardsLink'}),
            'cards.flyLink': formatMessage({id: 'cards.flyCardsLink'}),
            'cards.raceLink': formatMessage({id: 'cards.raceCardsLink'}),
            'cards.musicLink': formatMessage({id: 'cards.musicCardsLink'}),
            'cards.hideLink': formatMessage({id: 'cards.hide-seekCardsLink'}),
            'cards.storyLink': formatMessage({id: 'cards.storyCardsLink'}),
            'cards.dressupLink': formatMessage({id: 'cards.fashionCardsLink'}),
            'cards.pongLink': formatMessage({id: 'cards.pongCardsLink'}),
            'cards.danceLink': formatMessage({id: 'cards.danceCardsLink'}),
            'cards.catchLink': formatMessage({id: 'cards.catchCardsLink'}),
            'cards.petLink': formatMessage({id: 'cards.petCardsLink'})
        };

        /* eslint-disable indent */
        return (
            <div className="inner cards">
                <div className="cards-intro">
                    <div className="cards-intro-content">
                        <h1 className="cards-intro-content-header">
                            <FormattedMessage id="cards.introHeader" />
                        </h1>
                        <p className="cards-intro-content-body">
                            <FormattedMessage id="cards.introContent" />
                        </p>
                    </div>
                    <img
                        alt="Card Use Explanation"
                        className="cards-intro-img"
                        src="/images/cards/card-use-overview.png"
                    />
                </div>
                <div className="cards-container">
                    <Box title={''}>
                        <FlexRow>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.starter" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.starterLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-starter.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.starterLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.starterLink'],
                                        englishLinks['cards.starterLink']
                                    )) ? [
                                        <span key="english-cards">
                                            <FormattedMessage id="cards.english" />
                                        </span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.name" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.nameLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-name.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.nameLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.nameLink'],
                                        englishLinks['cards.nameLink']
                                    )) ? [
                                        <span key="name-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.fly" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.flyLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-fly.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.flyLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.flyLink'],
                                        englishLinks['cards.flyLink']
                                    )) ? [
                                        <span key="fly-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.race" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.raceLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-race.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.raceLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.raceLink'],
                                        englishLinks['cards.raceLink']
                                    )) ? [
                                        <span key="race-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.music" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.musicLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-music.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.musicLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.musicLink'],
                                        englishLinks['cards.musicLink']
                                    )) ? [
                                        <span key="music-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.hide" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.hideLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-hide.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.hideLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.hideLink'],
                                        englishLinks['cards.hideLink']
                                    )) ? [
                                        <span key="hide-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.story" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.storyLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-story.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.storyLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.storyLink'],
                                        englishLinks['cards.storyLink']
                                    )) ? [
                                        <span key="story-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.dressup" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.dressupLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-dressup.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.dressupLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.dressupLink'],
                                        englishLinks['cards.dressupLink']
                                    )) ? [
                                        <span key="dress-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.pong" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.pongLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-pong.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.pongLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.pongLink'],
                                        englishLinks['cards.pongLink']
                                    )) ? [
                                        <span key="pong-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.dance" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.danceLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-dance.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.danceLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.danceLink'],
                                        englishLinks['cards.danceLink']
                                    )) ? [
                                        <span key="dance-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.catch" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.catchLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-catch.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.catchLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.catchLink'],
                                        englishLinks['cards.catchLink']
                                    )) ? [
                                        <span key="catch-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id="cards.pet" />
                                </h4>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.petLink']}
                                >
                                    <img
                                        alt=""
                                        src="/images/cards/cards-pet.jpg"
                                    />
                                </a>
                                <a
                                    className="flex-row-card-link"
                                    href={formattedLinks['cards.petLink']}
                                >
                                    <img
                                        alt=""
                                        className="flex-row-card-link-icon"
                                        src="/svgs/pdf-icon-ui-blue.svg"
                                    />
                                    <FormattedMessage id="cards.viewCard" />
                                    {(this.pdfLocaleMismatch(
                                        locale,
                                        formattedLinks['cards.petLink'],
                                        englishLinks['cards.petLink']
                                    )) ? [
                                        <span key="pet-link"> (<FormattedMessage id="cards.english" />)</span>
                                    ] : []}
                                </a>
                            </div>
                        </FlexRow>
                    </Box>
                </div>
            </div>
        );
    }
}

Cards.propTypes = {
    intl: intlShape
};

const LocalizedCards = injectIntl(Cards);

render(<Page><LocalizedCards /></Page>, document.getElementById('app'));
