var React = require('react');
var injectIntl = require('react-intl').injectIntl;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');
var frameless = require('../../lib/frameless.js');

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
        var tileOrder = [
            'AnimateYourName',
            'Race',
            'Fashion',
            'Catch',
            'MakeItFly',
            'HideAndSeek',
            'Pong',
            'VirtualPet',
            'MakeMusic',
            'Story',
            'Dance'
        ];
        if (window.innerWidth < frameless.tablet) {
            tileOrder = [
                'AnimateYourName',
                'MakeItFly',
                'MakeMusic',
                'Race',
                'HideAndSeek',
                'Story',
                'Fashion',
                'Pong',
                'Dance',
                'Catch',
                'VirtualPet'
            ];
        }
        else if (window.innerWidth < frameless.desktop) {
            tileOrder = [
                'AnimateYourName',
                'MakeMusic',
                'HideAndSeek',
                'Fashion',
                'Dance',
                'VirtualPet',
                'MakeItFly',
                'Race',
                'Story',
                'Pong',
                'Catch'
            ];
        }
        return (
            <div className="ttt">
                <TitleBanner className="masthead">
                    <section className="ttt-section mod-title-banner">
                        image goes here
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
                            {tileOrder.map(function (tile) {
                                return (
                                    <TTTTile
                                        key={tile}
                                        title={formatMessage({id: Tiles[tile].title})}
                                        description={formatMessage({id: Tiles[tile].description})}
                                        imageURL={Tiles[tile].thumbURL}
                                        tutorialLoc={formatMessage({id: Tiles[tile].tutorialLoc})}
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
