import React from 'react';
import {injectIntl} from 'react-intl';
import {FormattedHTMLMessage} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import render from '../../lib/render.jsx';

import MasonryGrid from '../../components/masonrygrid/masonrygrid.jsx';
import Page from '../../components/page/www/page.jsx';
import Button from '../../components/forms/button.jsx';
import TitleBanner from '../../components/title-banner/title-banner.jsx';
import FlexRow from '../../components/flex-row/flex-row.jsx';
import TTTTile from '../../components/ttt-tile/ttt-tile.jsx';
import TTTModal from '../../components/modal/ttt/modal.jsx';
import Tiles from './ttt.json';

require('./tips.scss');

var Tips = injectIntl(React.createClass({
    type: 'Tips',
    getInitialState: function () {
        return {currentTile: Tiles[0], TTTModalOpen: false};
    },
    showTTTModal: function (tile) {
        // expects translated tile
        this.setState({currentTile: tile, TTTModalOpen: true});
    },
    hideTTTModal: function () {
        this.setState({TTTModalOpen: false});
    },
    renderTTTTiles: function () {
        var formatMessage = this.props.intl.formatMessage;
        var translatedTile = {};

        return Tiles.map(function (tile, key) {
            translatedTile = {
                title: formatMessage({id: tile.title}),
                description: formatMessage({id: tile.description}),
                tutorialLoc: tile.tutorialLoc,
                activityLoc: formatMessage({id: tile.activityLoc}),
                guideLoc: formatMessage({id: tile.guideLoc}),
                thumbUrl: tile.thumbUrl,
                bannerUrl: tile.bannerUrl
            };
            return (<TTTTile
                key={key}
                onGuideClick={this.showTTTModal.bind(this, translatedTile)}
                {...translatedTile}/>);
        }, this); // don't forget to pass 'this' into map function
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <div className="tips">
                <TitleBanner className="masthead mod-blue-bg">
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="tips.title"/>
                    </h1>
                    <p className="intro title-banner-p">
                        <FormattedHTMLMessage
                            id="tips.subTitle"
                            values={{
                                GettingStartedPDF: formatMessage({id: 'guides.Getting-Started-Guide-Scratch2Link'})
                            }}
                        />
                    </p>
                    <p className="title-banner-p">
                        <a href="/projects/editor/?tip_bar=getStarted">
                            <Button className="tips-button getting-started-button">
                                <img src="/images/tips/blocks-icon.svg"/>
                                <FormattedMessage id="tips.tryGettingStarted"/>
                            </Button>
                        </a>
                    </p>

                </TitleBanner>
                <div className="inner">
                    <section className="ttt-section">
                        <div className="ttt-head">
                            <h2>
                                <FormattedMessage id="tips.tttHeader"/>
                            </h2>
                            <p>
                                <FormattedHTMLMessage id="tips.tttBody"/>
                            </p>
                        </div>
                        <MasonryGrid >
                            {this.renderTTTTiles()}
                        </MasonryGrid>
                        <TTTModal
                            isOpen={this.state.TTTModalOpen}
                            onRequestClose={this.hideTTTModal}
                            {...this.state.currentTile}/>
                    </section>
                </div>
                <div className="tips-resources">
                    <div className="inner">
                        <FlexRow as="section" className="tips-info-section cards-info">
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="tips.cardsHeader"/>
                                </h2>
                                <p>
                                    <FormattedHTMLMessage id="tips.cardsBody"/>
                                </p>
                                <p className="tips-cards-buttons">
                                    <a href={formatMessage({id: 'cards.ScratchCardsAllLink'})}>
                                        <Button className="tips-button">
                                            <FormattedMessage id="tips.cardsDownload"/>
                                        </Button>
                                    </a>
                                    <a
                                        href="https://scratch-foundation.myshopify.com/collections/all-products/products/scratch-coding-cards-creative-coding-activities-for-kids"
                                        target="_blank">
                                        <Button className="tips-button purchase-button">
                                            <FormattedMessage id="tips.cardsPurchase"/>
                                            <img src="/images/tips/arrow-icon.svg"/>
                                        </Button>
                                    </a>
                                </p>
                            </div>
                            <div className="tips-info-body tips-illustration">
                                <img src="/images/tips/cards-illustration.svg"/>
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="inner">
                    <div className="tips-divider"></div>
                </div>
                <div className="tips-resources">
                    <div className="inner">
                        <FlexRow as="section" className="tips-info-section">
                            <div className="tips-info-body tips-illustration">
                                <img src="/images/tips/project-illustration.svg" className="mod-flow-left"/>
                            </div>
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="tips.starterProjectsHeader"/>
                                </h2>
                                <p>
                                    <FormattedHTMLMessage id="tips.starterProjectsBody"/>
                                </p>
                                <p>
                                    <a href="/starter_projects">
                                        <Button className="tips-button">
                                            <FormattedMessage id="tips.starterProjectsPlay"/>
                                        </Button>
                                    </a>
                                </p>
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section mod-align-top"
                        >
                            <div className="tips-info-body mod-narrow">
                                <img
                                    src="/images/tips/download-icon.svg"
                                    className="tips-icon"
                                />
                                <h3>
                                    <FormattedMessage id="tips.offlineEditorHeader"/>
                                </h3>
                                <p>
                                    <FormattedHTMLMessage id="tips.offlineEditorBody"/>
                                </p>
                            </div>
                            <div className="tips-info-body mod-narrow">
                                <img
                                    src="/images/tips/question-icon.svg"
                                    className="tips-icon"
                                />
                                <h3>
                                    <FormattedMessage id="tips.questionsHeader"/>
                                </h3>
                                <p>
                                    <FormattedHTMLMessage id="tips.questionsBody"/>
                                </p>
                            </div>
                        </FlexRow>
                </div>
            </div>
        );
    }
}));

render(
    <Page><Tips/></Page>, document.getElementById('app'));
