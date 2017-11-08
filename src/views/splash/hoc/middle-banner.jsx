var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var MediaQuery = require('react-responsive');
var React = require('react');

var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');
var TTTModal = require('../../../components/modal/ttt/modal.jsx');
var TTTTile = require('../../../components/ttt-tile/ttt-tile.jsx');

var frameless = require('../../../lib/frameless');
var tiles = require('../../tips/ttt');

require('../../../components/forms/button.scss');
require('./middle-banner.scss');

var MiddleBanner = injectIntl(React.createClass({
    getInitialState: function () {
        return {
            currentTile: tiles[1],
            TTTModalOpen: false
        };
    },
    showTTTModal: function (tile) {
        return this.setState({
            currentTile: tile,
            TTTModalOpen: true
        });
    },
    hideTTTModal: function () {
        return this.setState({TTTModalOpen: false});
    },
    renderTTTTiles: function () {
        var formatMessage = this.props.intl.formatMessage;
        
        var tileObjects = {
            flyTile: {
                title: formatMessage({id: tiles[1].title}),
                description: formatMessage({id: tiles[1].description}),
                tutorialLoc: tiles[1].tutorialLoc,
                activityLoc: formatMessage({id: tiles[1].activityLoc}),
                guideLoc: formatMessage({id: tiles[1].guideLoc}),
                thumbUrl: tiles[1].thumbUrl,
                bannerUrl: tiles[1].bannerUrl
            },
            musicTile: {
                title: formatMessage({id: tiles[2].title}),
                description: formatMessage({id: tiles[2].description}),
                tutorialLoc: tiles[2].tutorialLoc,
                activityLoc: formatMessage({id: tiles[2].activityLoc}),
                guideLoc: formatMessage({id: tiles[2].guideLoc}),
                thumbUrl: tiles[2].thumbUrl,
                bannerUrl: tiles[2].bannerUrl
            },
            pongTile: {
                title: formatMessage({id: tiles[7].title}),
                description: formatMessage({id: tiles[7].description}),
                tutorialLoc: tiles[7].tutorialLoc,
                activityLoc: formatMessage({id: tiles[7].activityLoc}),
                guideLoc: formatMessage({id: tiles[7].guideLoc}),
                thumbUrl: tiles[7].thumbUrl,
                bannerUrl: tiles[7].bannerUrl
            }
        };
        
        return [
            <TTTTile
                key={1}
                className="mod-banner"
                onGuideClick={this.showTTTModal.bind(this, tileObjects.flyTile)}
                {...tileObjects.flyTile}
            />,
            <TTTTile
                key={2}
                className="mod-banner"
                onGuideClick={this.showTTTModal.bind(this, tileObjects.musicTile)}
                {...tileObjects.musicTile}
            />,
            <TTTTile
                key={7}
                className="mod-banner mod-last-tile"
                onGuideClick={this.showTTTModal.bind(this, tileObjects.pongTile)}
                {...tileObjects.pongTile}
            />
        ];
    },
    render: function () {
        return (
            <TitleBanner className="mod-splash-middle">
                <div className="middle-banner inner">
                    <FlexRow className="middle-banner-header">
                        <h1 className="middle-banner-header-h1">
                            <FormattedMessage id="middleBanner.header" />
                        </h1>
                        <a href="/tips" className="button mod-ttt-try-button">
                            <FormattedMessage id="middleBanner.ttt" />
                        </a>
                    </FlexRow>
                    <MediaQuery minWidth={frameless.tablet}>
                        <FlexRow className="middle-banner-tiles">
                            {this.renderTTTTiles()}
                        </FlexRow>
                        <TTTModal
                            isOpen={this.state.TTTModalOpen}
                            onRequestClose={this.hideTTTModal}
                            {...this.state.currentTile}
                        />
                    </MediaQuery>
                </div>
            </TitleBanner>
        );
    }
}));

module.exports = MiddleBanner;
