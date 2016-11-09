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
                <TitleBanner className="masthead">
                    <section className="ttt-section mod-title-banner">
                        <img src="/svgs/ttt/resources.svg" />
                    </section>
                    <h1>
                        <FormattedMessage id='ttt.title' />
                    </h1>
                        <p>
                            <FormattedHTMLMessage id='ttt.subTitle' />
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
                                        imageUrl={tile.thumbUrl}
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
