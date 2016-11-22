var FormattedMessage = require('react-intl').FormattedMessage;
var injectIntl = require('react-intl').injectIntl;
var MediaQuery = require('react-responsive');
var React = require('react');

var FlexRow = require('../../../components/flex-row/flex-row.jsx');
var TitleBanner = require('../../../components/title-banner/title-banner.jsx');
var TTTModal = require('../../../components/modal/ttt/modal.jsx');
var TTTTile = require('../../../components/ttt-tile/ttt-tile.jsx');

var frameless = require('../../../lib/frameless');
var tiles = require('../../thingstotry/ttt');

require('../../../components/forms/button.scss');
require('./hoc-banner.scss');

var HocBanner = injectIntl(React.createClass({
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
            nameTile: {
                title: formatMessage({id: tiles[0].title}),
                description: formatMessage({id: tiles[0].description}),
                tutorialLoc: tiles[0].tutorialLoc,
                activityLoc: formatMessage({id: tiles[0].activityLoc}),
                guideLoc: formatMessage({id: tiles[0].guideLoc}),
                thumbUrl: tiles[0].thumbUrl,
                bannerUrl: tiles[0].bannerUrl
            },
            musicTile: {
                title: formatMessage({id: tiles[2].title}),
                description: formatMessage({id: tiles[2].description}),
                tutorialLoc: tiles[2].tutorialLoc,
                activityLoc: formatMessage({id: tiles[2].activityLoc}),
                guideLoc: formatMessage({id: tiles[2].guideLoc}),
                thumbUrl: tiles[2].thumbUrl,
                bannerUrl: tiles[2].bannerUrl
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
                key={0}
                className="mod-banner"
                onGuideClick={this.showTTTModal.bind(this, tileObjects.nameTile)}
                {...tileObjects.nameTile}
            />,
            <TTTTile
                key={2}
                className="mod-banner"
                onGuideClick={this.showTTTModal.bind(this, tileObjects.musicTile)}
                {...tileObjects.musicTile}
            />
        ];
    },
    render: function () {
        return (
            <TitleBanner className="mod-splash-hoc">
                <div className="hoc-banner inner">
                    <FlexRow className="hoc-banner-header">
                        <h1 className="hoc-banner-header-h1">
                            <FormattedMessage id="hoc-banner.header" />
                        </h1>
                        <a href="/go" className="button mod-ttt-try-button">
                            <FormattedMessage id="hoc-banner.ttt" />
                        </a>
                    </FlexRow>
                    <MediaQuery minWidth={frameless.desktop}>
                        <FlexRow className="hoc-banner-tiles">
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

module.exports = HocBanner;
