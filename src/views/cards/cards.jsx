import React from 'react';
import {injectIntl} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import render from '../../lib/render.jsx';

import Box from '../../components/box/box.jsx';
import FlexRow from '../../components/flex-row/flex-row.jsx';
import Page from '../../components/page/www/page.jsx';

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
        var formattedLinks = {
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
