var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var Box = require('../../components/box/box.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var Page = require('../../components/page/www/page.jsx');

require('./cards.scss');

var Cards = injectIntl(React.createClass({
    type: 'Cards',
    pdfLocaleMismatch: function (locale, pdf, englishPdf) {
        if (pdf === englishPdf && locale.indexOf('en') !== 0) {
            return true;
        }
        return false;
    },
    render: function () {
        var locale = this.props.intl.locale || 'en';
        var formatMessage = this.props.intl.formatMessage;
        var englishLinks = {
            'cards.starterLink': '/pdfs/cards/Scratch2Cards.pdf',
            'cards.nameLink': '/pdfs/cards/AnimateYourNameCards.pdf',
            'cards.flyLink': '/pdfs/cards/FlyCards.pdf',
            'cards.raceLink': '/pdfs/cards/RaceGameCards.pdf',
            'cards.musicLink': '/pdfs/cards/MusicCards.pdf',
            'cards.hideLink': '/pdfs/cards/Hide-and-Seek-Cards.pdf',
            'cards.storyLink': '/pdfs/cards/StoryCards.pdf',
            'cards.dressupLink': '/pdfs/cards/DressupCards.pdf',
            'cards.pongLink': '/pdfs/cards/PongCards.pdf',
            'cards.danceLink': '/pdfs/cards/DanceCards.pdf',
            'cards.catchLink': '/pdfs/cards/CatchCards.pdf',
            'cards.petLink': '/pdfs/cards/PetCards.pdf'
        };
        var formattedLinks = {
            'cards.starterLink': formatMessage({id: 'cards.starterLink'}),
            'cards.nameLink': formatMessage({id: 'cards.nameLink'}),
            'cards.flyLink': formatMessage({id: 'cards.flyLink'}),
            'cards.raceLink': formatMessage({id: 'cards.raceLink'}),
            'cards.musicLink': formatMessage({id: 'cards.musicLink'}),
            'cards.hideLink': formatMessage({id: 'cards.hideLink'}),
            'cards.storyLink': formatMessage({id: 'cards.storyLink'}),
            'cards.dressupLink': formatMessage({id: 'cards.dressupLink'}),
            'cards.pongLink': formatMessage({id: 'cards.pongLink'}),
            'cards.danceLink': formatMessage({id: 'cards.danceLink'}),
            'cards.catchLink': formatMessage({id: 'cards.catchLink'}),
            'cards.petLink': formatMessage({id: 'cards.petLink'})
        };
        return (
            <div className="inner cards">
                <div className="cards-intro">
                    <div className="cards-intro-content">
                        <h1 className="cards-intro-content-header">
                            <FormattedMessage id='cards.introHeader' />
                        </h1>
                        <p className="cards-intro-content-body">
                            <FormattedMessage id='cards.introContent' />
                        </p>
                    </div>
                    <img src='/images/cards/card-use-overview.png'
                         alt="Card Use Explanation"
                         className="cards-intro-img" />
                </div>
                <div className="cards-container">
                    <Box title={''}>
                        <FlexRow>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.starter' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.starterLink']}>
                                    <img src="/images/cards/cards-starter.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.starterLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.starterLink'],
                                            englishLinks['cards.starterLink']
                                        )
                                    ) ? [
                                        <span> <FormattedMessage id='cards.english' /></span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.name' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.nameLink']}>
                                    <img src="/images/cards/cards-name.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.nameLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.nameLink'],
                                            englishLinks['cards.nameLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.fly' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.flyLink']}>
                                    <img src="/images/cards/cards-fly.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.flyLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.flyLink'],
                                            englishLinks['cards.flyLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.race' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.raceLink']}>
                                    <img src="/images/cards/cards-race.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.raceLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.raceLink'],
                                            englishLinks['cards.raceLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.music' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.musicLink']}>
                                    <img src="/images/cards/cards-music.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.musicLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.musicLink'],
                                            englishLinks['cards.musicLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.hide' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.hideLink']}>
                                    <img src="/images/cards/cards-hide.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.hideLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.hideLink'],
                                            englishLinks['cards.hideLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.story' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.storyLink']}>
                                    <img src="/images/cards/cards-story.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.storyLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.storyLink'],
                                            englishLinks['cards.storyLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.dressup' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.dressupLink']}>
                                    <img src="/images/cards/cards-dressup.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.dressupLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.dressupLink'],
                                            englishLinks['cards.dressupLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.pong' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.pongLink']}>
                                    <img src="/images/cards/cards-pong.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.pongLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.pongLink'],
                                            englishLinks['cards.pongLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.dance' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.danceLink']}>
                                    <img src="/images/cards/cards-dance.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.danceLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.danceLink'],
                                            englishLinks['cards.danceLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.catch' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.catchLink']}>
                                    <img src="/images/cards/cards-catch.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.catchLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.catchLink'],
                                            englishLinks['cards.catchLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                            <div className="flex-row-card">
                                <h4 className="flex-row-card-header">
                                    <FormattedMessage id='cards.pet' />
                                </h4>
                                <a className="flex-row-card-link" href={formattedLinks['cards.petLink']}>
                                    <img src="/images/cards/cards-pet.jpg" alt="" />
                                </a>
                                <a className="flex-row-card-link" href={formattedLinks['cards.petLink']}>
                                    <img src="/svgs/pdf-icon-ui-blue.svg" alt="" className="flex-row-card-link-icon" />
                                    <FormattedMessage id='cards.viewCard' />
                                    {(
                                        this.pdfLocaleMismatch(
                                            locale,
                                            formattedLinks['cards.petLink'],
                                            englishLinks['cards.petLink']
                                        )
                                    ) ? [
                                        <span> (<FormattedMessage id='cards.english' />)</span>
                                    ] : []}
                                </a>
                            </div>
                        </FlexRow>
                    </Box>
                </div>
            </div>
        );
    }
}));

render(<Page><Cards /></Page>, document.getElementById('app'));
