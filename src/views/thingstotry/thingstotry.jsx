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

require('./thingstotry.scss');

var ThingsToTry = injectIntl(React.createClass({
    type: 'ThingsToTry',

    getInitialState: function () {
        return {
            bgClass: ''
        };
    },
    onCardEnter: function (bgClass) {
        this.setState({
            bgClass: bgClass
        });
    },
    render: function () {
        var formatMessage = this.props.intl.formatMessage;

        return (
            <div className="ttt">
                <TitleBanner className="masthead mod-ttt">
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
                            {Tiles.map(function (tile) {
                                return (
                                    <TTTTile
                                        key={tile.title}
                                        title={formatMessage({id: tile.title})}
                                        description={formatMessage({id: tile.description})}
                                        thumbUrl={tile.thumbUrl}
                                        tutorialLoc={formatMessage({id: tile.tutorialLoc})}
                                    />
                                );
                            })}

                        </MasonryGrid>
                    </section>

                </div>
            </div>
        );
    }
}));

render(<Page><ThingsToTry /></Page>, document.getElementById('app'));
