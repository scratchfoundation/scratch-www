const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const MasonryGrid = require('../../components/masonrygrid/masonrygrid.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');
const TTTTile = require('../../components/ttt-tile/ttt-tile.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const Tiles = require('./microworlds.json');

require('./microworldshomepage.scss');

const MicroworldsHomepage = props => (
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
                {Tiles.map((tile, key) => (
                    <TTTTile
                        key={key}
                        thumbUrl={tile.thumbUrl}
                        title={props.intl.formatMessage({id: tile.title})}
                        tutorialLoc={tile.tutorialLoc}
                    />
                ))}
            </MasonryGrid>
        </div>
    </div>
);

MicroworldsHomepage.propTypes = {
    intl: intlShape
};

const WrappedMicroworldsHomepage = injectIntl(MicroworldsHomepage);

render(<Page><WrappedMicroworldsHomepage /></Page>, document.getElementById('app'));
