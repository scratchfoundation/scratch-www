const bindAll = require('lodash.bindall');
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const TTTModal = require('../../components/modal/ttt/modal.jsx');
const TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const Tiles = require('./ttt.json');

require('./tips.scss');

class Tips extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowTTTModal',
            'handleHideTTTModal',
            'renderTTTTiles'
        ]);
        this.state = {
            currentTile: Tiles[0],
            TTTModalOpen: false
        };
    }
    handleShowTTTModal (tile) {
        // expects translated tile
        this.setState({
            currentTile: tile,
            TTTModalOpen: true
        });
    }
    handleHideTTTModal () {
        this.setState({
            TTTModalOpen: false
        });
    }
    renderTTTTiles () {

        return Tiles.map((tile, key) => {
            const translatedTile = {
                activityLoc: this.props.intl.formatMessage({id: tile.activityLoc}),
                bannerUrl: tile.bannerUrl,
                description: this.props.intl.formatMessage({id: tile.description}),
                guideLoc: this.props.intl.formatMessage({id: tile.guideLoc}),
                thumbUrl: tile.thumbUrl,
                title: this.props.intl.formatMessage({id: tile.title}),
                tutorialLoc: tile.tutorialLoc
            };
            return (
                <TTTTile
                    key={key}
                    onGuideClick={() => { // eslint-disable-line react/jsx-no-bind
                        this.handleShowTTTModal(translatedTile);
                    }}
                    {...translatedTile}
                />
            );
        });
    }
    render () {
        return (
            <div className="tips">
                <TitleBanner className="masthead mod-blue-bg">
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="tips.title" />
                    </h1>
                    <p className="intro title-banner-p">
                        <FormattedHTMLMessage
                            id="tips.subTitle"
                            values={{
                                GettingStartedPDF: this.props.intl.formatMessage({
                                    id: 'guides.Getting-Started-Guide-Scratch2Link'
                                })
                            }}
                        />
                    </p>
                    <p className="title-banner-p">
                        <a href="/projects/editor/?tip_bar=getStarted">
                            <Button className="tips-button getting-started-button">
                                <img src="/images/tips/blocks-icon.svg" />
                                <FormattedMessage id="tips.tryGettingStarted" />
                            </Button>
                        </a>
                    </p>

                </TitleBanner>
                <div className="inner">
                    <section className="ttt-section">
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
                            onRequestClose={this.handleHideTTTModal}
                            {...this.state.currentTile}
                        />
                    </section>
                </div>
                <div className="tips-resources">
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section cards-info"
                        >
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="tips.cardsHeader" />
                                </h2>
                                <p>
                                    <FormattedHTMLMessage id="tips.cardsBody" />
                                </p>
                                <p className="tips-cards-buttons">
                                    <a
                                        href={this.props.intl.formatMessage({
                                            id: 'cards.ScratchCardsAllLink'
                                        })}
                                    >
                                        <Button className="tips-button">
                                            <FormattedMessage id="general.downloadPDF" />
                                        </Button>
                                    </a>
                                    <a
                                        href="https://scratch-foundation.myshopify.com/collections/all-products/products/scratch-coding-cards-creative-coding-activities-for-kids"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Button className="tips-button purchase-button">
                                            <FormattedMessage id="tips.cardsPurchase" />
                                            <img src="/images/tips/arrow-icon.svg" />
                                        </Button>
                                    </a>
                                </p>
                            </div>
                            <div className="tips-info-body tips-illustration">
                                <img src="/images/tips/cards-illustration.svg" />
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="inner">
                    <div className="tips-divider" />
                </div>
                <div className="tips-resources">
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section"
                        >
                            <div className="tips-info-body tips-illustration">
                                <img
                                    className="mod-flow-left"
                                    src="/images/tips/project-illustration.svg"
                                />
                            </div>
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="tips.starterProjectsHeader" />
                                </h2>
                                <p>
                                    <FormattedHTMLMessage id="tips.starterProjectsBody" />
                                </p>
                                <p>
                                    <a href="/starter_projects">
                                        <Button className="tips-button">
                                            <FormattedMessage id="tips.starterProjectsPlay" />
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
                                className="tips-icon"
                                src="/images/tips/download-icon.svg"
                            />
                            <h3>
                                <FormattedMessage id="tips.offlineEditorHeader" />
                            </h3>
                            <p>
                                <FormattedHTMLMessage id="tips.offlineEditorBody" />
                            </p>
                        </div>
                        <div className="tips-info-body mod-narrow">
                            <img
                                className="tips-icon"
                                src="/images/tips/question-icon.svg"
                            />
                            <h3>
                                <FormattedMessage id="tips.questionsHeader" />
                            </h3>
                            <p>
                                <FormattedHTMLMessage id="tips.questionsBody" />
                            </p>
                        </div>
                    </FlexRow>
                </div>
            </div>
        );
    }
}

Tips.propTypes = {
    intl: intlShape
};

const WrappedTips = injectIntl(Tips);

render(
    <Page><WrappedTips /></Page>, document.getElementById('app'));
