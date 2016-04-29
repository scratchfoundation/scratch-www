var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;

var render = require('../../lib/render.jsx');
var Page = require('../../components/page/www/page.jsx');
var Box = require('../../components/box/box.jsx');

require('./guidelines.scss');

var Guidelines = React.createClass({
    type: 'Guidelines',
    render: function () {
        return (
            <div className="inner">
                <Box title={<FormattedMessage id='guidelines.title' />}>
                    <p><FormattedMessage id='guidelines.header' className="intro" /></p>
                    <dl>
                        <dt><FormattedMessage id='guidelines.respectheader' /></dt>
                        <dd><FormattedMessage id='guidelines.respectbody' /></dd>
                        <dt><FormattedMessage id='guidelines.constructiveheader' /></dt>
                        <dd><FormattedMessage id='guidelines.constructivebody' /></dd>
                        <dt><FormattedMessage id='guidelines.shareheader' /></dt>
                        <dd><FormattedMessage id='guidelines.sharebody' /></dd>
                        <dt><FormattedMessage id='guidelines.privacyheader' /></dt>
                        <dd><FormattedMessage id='guidelines.privacybody' /></dd>
                        <dt><FormattedMessage id='guidelines.honestyheader' /></dt>
                        <dd><FormattedMessage id='guidelines.honestybody' /></dd>
                        <dt><FormattedMessage id='guidelines.friendlyheader' /></dt>
                        <dd><FormattedMessage id='guidelines.friendlybody' /></dd>
                    </dl>
                    <div className="guidelines-footer">
                        <p><FormattedMessage id='guidelines.footer' /></p>
                        <img src="//cdn.scratch.mit.edu/scratchr2/static/images/help/spritesforcommunityguid.png"
                            alt="sprites"/>
                    </div>
                </Box>
            </div>
        );
    }
});

render(<Page><Guidelines /></Page>, document.getElementById('app'));
