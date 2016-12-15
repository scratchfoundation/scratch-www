var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
var Page = require('../../components/page/www/page.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');
var Tiles = require('./ttt.json');

var classNames = require('classnames');

require('../thingstotry/thingstotry.scss');

var MicroworldsHomepage = injectIntl(React.createClass({
    type: 'MicroworldsHomepage',
    getInitialState: function () {
        return {
            currentTile: Tiles[0]
        };
    },
    renderTTTTiles: function () {
        var formatMessage = this.props.intl.formatMessage;
        var translatedTiles = [];
        var translatedTile = {};

        Tiles.map(function (tile, key) {
            translatedTile = {
                title: formatMessage({id: tile.title}),
                tutorialLoc: tile.tutorialLoc,
                thumbUrl: tile.thumbUrl,
                bannerUrl: tile.bannerUrl
            };
            translatedTiles.push(
                <TTTTile
                    key={key}
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
                    </section>
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="ttt.title" />
                    </h1>
                    <p className="intro title-banner-p">
                        <FormattedHTMLMessage id="ttt.subTitle" />
                    </p>
                </TitleBanner>

                <div className="inner">
                    <section className="ttt-section">
                        <MasonryGrid >
                            {this.renderTTTTiles()}
                        </MasonryGrid>
                    </section>

                </div>
            </div>
        );
    }
}));

render(<Page><MicroworldsHomepage /></Page>, document.getElementById('app'));
