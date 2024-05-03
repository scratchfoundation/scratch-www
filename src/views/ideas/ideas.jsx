const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const React = require('react');

const Button = require('../../components/forms/button.jsx');
const FlexRow = require('../../components/flex-row/flex-row.jsx');
const MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const TTTModal = require('../../components/modal/ttt/modal.jsx');
const TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');

const Page = require('../../components/page/www/page.jsx');
const intlShape = require('../../lib/intl-shape');
const render = require('../../lib/render.jsx');

const Tiles = require('./ttt.json');

require('./ideas.scss');

class Ideas extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleShowTTTModal',
            'handleHideTTTModal',
            'renderTiles'
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
    renderTiles () {
        return Tiles.map((tile, key) => {
            const translatedTile = {
                tutorialUrl: `/projects/editor/?tutorial=${tile.tutorialUrl}`,
                modalImage: tile.modalImage,
                modalImageDescription: this.props.intl.formatMessage({id: tile.modalImageDescription}),
                description: this.props.intl.formatMessage({id: tile.description}),
                guideUrl: this.props.intl.formatMessage({id: tile.guideUrl}),
                thumbImage: tile.thumbImage,
                thumbImageDescription: this.props.intl.formatMessage({id: tile.thumbImageDescription}),
                title: this.props.intl.formatMessage({id: tile.title}),
                cardsUrl: this.props.intl.formatMessage({id: tile.cardsUrl})
            };
            return (
                <TTTTile
                    key={key}
                    onClick={() => { // eslint-disable-line react/jsx-no-bind
                        this.handleShowTTTModal(translatedTile);
                    }}
                    {...translatedTile}
                />
            );
        });
    }
    render () {
        return (
            <div>
                <div className="banner-wrapper">
                    <TitleBanner className="masthead ideas-banner">
                        <div className="title-banner-p">
                            <img
                                alt={this.props.intl.formatMessage({id: 'ideas.headerImageDescription'})}
                                src="/images/ideas/masthead-illustration.svg"
                            />
                            <h1 className="title-banner-h1">
                                <FormattedMessage id="ideas.headerMessage" />
                            </h1>
                            <a href="/projects/editor/?tutorial=all">
                                <Button className="banner-button">
                                    <img
                                        alt=""
                                        src="/images/ideas/bulb-yellow-icon.svg"
                                    />
                                    <FormattedMessage id="ideas.headerButtonMessage" />
                                </Button>
                            </a>
                        </div>
                    </TitleBanner>
                </div>
                <div className="tips-getting-started">
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section tips-left"
                        >
                            <div className="ideas-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'ideas.gettingStartedImageDescription'})}
                                    src="/images/ideas/getting-started-illustration.svg"
                                />
                            </div>
                            <div>
                                <h2>
                                    <FormattedMessage id="ideas.gettingStartedTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="ideas.gettingStartedText" />
                                </p>
                                <a href="/projects/editor/?tutorial=getStarted">
                                    <Button className="ideas-button">
                                        <img
                                            alt=""
                                            src="/images/ideas/try-it-icon.svg"
                                        />
                                        <FormattedMessage id="ideas.tryIt" />
                                    </Button>
                                </a>
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="tips-activity-guides">
                    <div className="inner">
                        <section className="ttt-section">
                            <div className="ttt-head">
                                <h2>
                                    <FormattedMessage id="ideas.activityGuidesTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="ideas.activityGuidesText" />
                                </p>
                            </div>
                            <MasonryGrid >
                                {this.renderTiles()}
                            </MasonryGrid>
                            <TTTModal
                                isOpen={this.state.TTTModalOpen}
                                onRequestClose={this.handleHideTTTModal}
                                {...this.state.currentTile}
                            />
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
                <div>
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section cards-info ideas-all-cards"
                        >
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="ideas.cardsTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="ideas.cardsText" />
                                </p>
                                <a
                                    href={this.props.intl.formatMessage({
                                        id: 'cards.scratch-cards-allLink'
                                    })}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    <Button className="ideas-button">
                                        <img
                                            alt=""
                                            src="/images/ideas/download-icon.svg"
                                        />
                                        <FormattedMessage id="general.downloadPDF" />
                                    </Button>
                                </a>
                            </div>
                            <div className="tips-info-body tips-illustration">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'ideas.cardsIllustrationDescription'})}
                                    src="/images/ideas/cards-illustration.svg"
                                />
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="inner">
                    <div className="tips-divider" />
                </div>
                <div>
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="ideas-starter tips-info-section tips-left"
                        >
                            <div className="ideas-image">
                                <img
                                    alt={this.props.intl.formatMessage({id: 'ideas.starterProjectsImageDescription'})}
                                    src="/images/ideas/starter-projects-illustration.svg"
                                />
                            </div>
                            <div className="tips-info-body">
                                <h2>
                                    <FormattedMessage id="ideas.starterProjectsTitle" />
                                </h2>
                                <p>
                                    <FormattedMessage id="ideas.starterProjectsText" />
                                </p>
                                <p>
                                    <a href="/starter_projects">
                                        <Button className="ideas-button">
                                            <FormattedMessage id="ideas.starterProjectsButton" />
                                        </Button>
                                    </a>
                                </p>
                            </div>
                        </FlexRow>
                    </div>
                </div>
                <div className="gray-area">
                    <div className="inner">
                        <FlexRow
                            as="section"
                            className="tips-info-section mod-align-top"
                        >
                            <div className="tips-info-body mod-narrow">
                                <img
                                    className="tips-icon"
                                    alt=""
                                    src="/images/tips/download-icon.svg"
                                />
                                <h3>
                                    <FormattedMessage id="ideas.desktopEditorHeader" />
                                </h3>
                                <p>
                                    <FormattedMessage
                                        id="ideas.desktopEditorBodyHTML"
                                        values={{a: chunks => <a href="/download">{chunks}</a>}}
                                    />
                                </p>
                            </div>
                            <div className="tips-info-body mod-narrow">
                                <img
                                    className="tips-icon"
                                    alt=""
                                    src="/images/tips/question-icon.svg"
                                />
                                <h3>
                                    <FormattedMessage id="ideas.questionsHeader" />
                                </h3>
                                <p>
                                    <FormattedMessage
                                        id="ideas.questionsBodyHTML"
                                        values={{
                                            faq: chunks => <a href="/info/faq">{chunks}</a>,
                                            forum: chunks => <a href="/discuss/7/">{chunks}</a>
                                        }}
                                    />
                                </p>
                            </div>
                        </FlexRow>
                    </div>
                </div>
            </div>
        );
    }
}

Ideas.propTypes = {
    intl: intlShape
};

const WrappedIdeas = injectIntl(Ideas);

render(
    <Page><WrappedIdeas /></Page>, document.getElementById('app'));
