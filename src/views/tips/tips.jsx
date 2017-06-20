var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
var Page = require('../../components/page/www/page.jsx');
var Button = require('../../components/forms/button.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');
var TTTModal = require('../../components/modal/ttt/modal.jsx');
var Tiles = require('./ttt.json');

require('./tips.scss');

var Tips = injectIntl(React.createClass({
    type: 'Tips',
    getInitialState: function () {
        return {
            currentTile: Tiles[0],
            TTTModalOpen: false
        };
    },
    showTTTModal: function (tile) {
        // expects translated tile
        this.setState({currentTile: tile});
        this.setState({TTTModalOpen: true});
    },
    hideTTTModal: function () {
        this.setState({TTTModalOpen: false});
    },
    renderTTTTiles: function () {
        var formatMessage = this.props.intl.formatMessage;
        var translatedTiles = [];
        var translatedTile = {};

        Tiles.map(function (tile, key) {
            translatedTile = {
                title: formatMessage({id: tile.title}),
                description: formatMessage({id: tile.description}),
                tutorialLoc: tile.tutorialLoc,
                activityLoc: formatMessage({id: tile.activityLoc}),
                guideLoc: formatMessage({id: tile.guideLoc}),
                thumbUrl: tile.thumbUrl,
                bannerUrl: tile.bannerUrl
            };
            translatedTiles.push(
                <TTTTile
                    key={key}
                    onGuideClick={this.showTTTModal.bind(this, translatedTile)}
                    {...translatedTile}
                />
            );
        }, this); // don't forget to pass 'this' into map function
        return translatedTiles;
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;
        return (
            <div className="tips">
                <TitleBanner className="masthead mod-blue-bg">
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="tips.title" />
                    </h1>
                    <p className="intro title-banner-p">
                        <FormattedHTMLMessage
                            id="tips.subTitle"
                            values={{GettingStartedPDF:
                                formatMessage({id: 'guides.Getting-Started-Guide-Scratch2Link'})}}
                        />
                    </p>
                    <p className="title-banner-p">
                        <Button className="tips-button getting-started-button">
                            <a href="/projects/editor/?tip_bar=getStarted">
                                <img src="/images/tips/blocks-icon.svg"/>
                                <FormattedMessage id="tips.tryGettingStarted" />
                            </a>
                        </Button>
                    </p>
                    
                </TitleBanner>
                <div className="inner">
                    <section className="tips-section">
                        <div className="ttt-head">
                            <h2>
                                <FormattedMessage id="tips.tttHeader" />
                            </h2>
                            <p>
                                <FormattedHTMLMessage id="tips.tttBody" />
                            </p>
                        </div>
                        <MasonryGrid >
                            {this.renderTTTTiles()}
                        </MasonryGrid>
                        <TTTModal
                            isOpen={this.state.TTTModalOpen}
                            onRequestClose={this.hideTTTModal}
                            {...this.state.currentTile}
                        />
                    </section>
                </div>
                <div id="tips-cards-section">
                    <div className="inner">
                        <section className="tips-section">
                            <FlexRow className="tips-info-section cards-info">
                                <div className="tips-info-body">
                                    <h2>
                                        <FormattedMessage id="tips.cardsHeader" />
                                    </h2>
                                    <p>
                                        <FormattedHTMLMessage id="tips.cardsBody" />
                                    </p>
                                    <p>
                                        <Button className="tips-button">
                                            <a href="/">
                                                <FormattedMessage id="tips.cardsDownload" />
                                            </a>
                                        </Button>
                                        <Button className="tips-button purchase-button">
                                            <a
                                                href="https://www.amazon.com/Scratch-Coding-Cards-Creative-Activities/dp/1593277741/ref=sr_1_1?ie=UTF8&qid=1494450316&sr=8-1&keywords=scratch+cards"
                                                target="_blank">
                                                <FormattedMessage id="tips.cardsPurchase" />
                                                <img src="/images/tips/arrow-icon.svg" />
                                            </a>
                                        </Button>
                                    </p>
                                </div>
                                <div className="tips-info-body tips-illustration">
                                    <img src="/images/tips/cards-illustration.svg" />
                                </div>
                            </FlexRow>
                        </section>
                    </div>
                </div>
                <div className="inner">
                    <div className="tips-divider"></div>
                </div>
                <div id="tips-starters-section">
                    <div className="inner">
                        <section className="tips-section">
                            <FlexRow className="tips-info-section">
                                <div className="tips-info-body tips-illustration">
                                    <img src="/images/tips/project-illustration.svg" />
                                </div>
                                <div className="tips-info-body">
                                    <h2>
                                        <FormattedMessage id="tips.starterProjectsHeader" />
                                    </h2>
                                    <p>
                                        <FormattedHTMLMessage id="tips.starterProjectsBody" />
                                    </p>
                                    <p>
                                        <Button className="tips-button">
                                            <a href="/starter_projects">
                                                <FormattedMessage id="tips.starterProjectsPlay" />
                                            </a>
                                        </Button>
                                    </p>
                                </div>
                            </FlexRow>
                        </section>
                    </div>
                </div>
                <div className="inner">
                    <section className="tips-section">
                        <FlexRow className="tips-info-section mod-align-top">
                            <div className="tips-info-body mod-narrow">
                                <img src="/images/tips/download-icon.svg" />
                                <h3>
                                    <FormattedMessage id="tips.offlineEditorHeader" />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage id="tips.offlineEditorBody" />
                                </p>
                            </div>
                            <div className="tips-info-body mod-narrow">
                                <img src="/images/tips/question-icon.svg" />
                                <h3>
                                    <FormattedMessage id="tips.questionsHeader" />
                                </h3>
                                <p>
                                    <FormattedHTMLMessage id="tips.questionsBody" />
                                </p>
                            </div>
                        </FlexRow>
                    </section>
                </div>
            </div>
        );
    }
}));

render(<Page><Tips /></Page>, document.getElementById('app'));
