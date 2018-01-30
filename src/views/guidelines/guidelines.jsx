const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Box = require('../../components/box/box.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./guidelines.scss');

const Guidelines = () => (
    <div className="inner guidelines">
        <Box
            title={
                <FormattedMessage id="guidelines.title" />
            }
        >
            <p>
                <FormattedMessage
                    className="intro"
                    id="guidelines.header"
                />
            </p>
            <dl>
                <dt><FormattedMessage id="guidelines.respectheader" /></dt>
                <dd><FormattedMessage id="guidelines.respectbody" /></dd>
                <dt><FormattedMessage id="guidelines.constructiveheader" /></dt>
                <dd><FormattedMessage id="guidelines.constructivebody" /></dd>
                <dt><FormattedMessage id="guidelines.shareheader" /></dt>
                <dd><FormattedMessage id="guidelines.sharebody" /></dd>
                <dt><FormattedMessage id="guidelines.privacyheader" /></dt>
                <dd><FormattedMessage id="guidelines.privacybody" /></dd>
                <dt><FormattedMessage id="guidelines.honestyheader" /></dt>
                <dd><FormattedMessage id="guidelines.honestybody" /></dd>
                <dt><FormattedMessage id="guidelines.friendlyheader" /></dt>
                <dd><FormattedMessage id="guidelines.friendlybody" /></dd>
            </dl>
            <div className="guidelines-footer">
                <p><FormattedMessage id="guidelines.footer" /></p>
                <img
                    alt="sprites"
                    src="//cdn.scratch.mit.edu/scratchr2/static/images/help/spritesforcommunityguid.png"
                />
            </div>
        </Box>
    </div>
);

render(<Page><Guidelines /></Page>, document.getElementById('app'));
