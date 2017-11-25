import React from 'react';
import {injectIntl} from 'react-intl';
import {FormattedHTMLMessage} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import render from '../../lib/render.jsx';

import MasonryGrid from '../../components/masonrygrid/masonrygrid.jsx';
import Page from '../../components/page/www/page.jsx';
import TitleBanner from '../../components/title-banner/title-banner.jsx';
import TTTTile from '../../components/ttt-tile/ttt-tile.jsx';
import Tiles from './microworlds.json';

require('./microworldshomepage.scss');

var MicroworldsHomepage = injectIntl(React.createClass({
    type: 'MicroworldsHomepage',
    render: function () {
        return (
            <div className="microworlds">
                <TitleBanner className="masthead mod-blue-bg">
                    <h1 className="title-banner-h1">
                        <FormattedMessage id="microworlds.title" />
                    </h1>
                    <p className="intro title-banner-p">
                        <FormattedHTMLMessage id="microworlds.subTitle" />
                    </p>
                </TitleBanner>
                <div className="inner">
                    <MasonryGrid >
                        {Tiles.map(
                            function (tile, key) {
                                return <TTTTile
                                    key={key}
                                    title={this.props.intl.formatMessage({id: tile.title})}
                                    tutorialLoc={tile.tutorialLoc}
                                    thumbUrl={tile.thumbUrl}
                                    />;
                            }, this)
                        }
                    </MasonryGrid>
                </div>
            </div>
        );
    }
}));

render(<Page><MicroworldsHomepage /></Page>, document.getElementById('app'));
