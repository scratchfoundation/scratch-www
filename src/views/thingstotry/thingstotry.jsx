var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
var Page = require('../../components/page/www/page.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');
var TTTModal = require('../../components/modal/ttt/modal.jsx');
var Tiles = require('./ttt.json');

require('./thingstotry.scss');

var ThingsToTry = injectIntl(React.createClass({
    type: 'ThingsToTry',
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

        Tiles.map(function (tile) {
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
                    key={tile.title}
                    onGuideClick={this.showTTTModal.bind(this, translatedTile)}
                    {...translatedTile}
                />
            );
        }, this); // don't forget to pass 'this' into map function
        return translatedTiles;
    },
    render: function () {
        return (
            <div className="ttt">
                <TitleBanner className="masthead mod-ttt-title">
                    <section className="ttt-section">
                        <img className="ttt-banner-image" src="/svgs/ttt/resources.svg" alt=""/>
                    </section>
                    <h1>
                        <FormattedMessage id="ttt.title" />
                    </h1>
                    <p className="intro">
                        <FormattedHTMLMessage id="ttt.subTitle" />
                    </p>
                </TitleBanner>

                <div className="inner">
                    <section className="ttt-section">
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
            </div>
        );
    }
}));

render(<Page><ThingsToTry /></Page>, document.getElementById('app'));
