var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');
var Page = require('../../components/page/www/page.jsx');
var Box = require('../../components/box/box.jsx');

require('./dmca.scss');

var Dmca = React.createClass({
    type: 'Dmca',
    render: function () {
        return (
            <div className="inner">
                <Box title={'DMCA'}>
                    <p><FormattedMessage id='dmca.intro' /></p>
                    <br/>
                    <p>Copyright Agent / Mitchel Resnick</p>
                    <p>MIT Media Laboratory</p>
                    <p>77 Massachusetts Ave</p>
                    <p>Room E14-445A</p>
                    <p>Cambridge, MA 02139</p>
                    <p>Tel: (617) 253-9783</p>
                    <br/>
                    <p><FormattedMessage id='dmca.llkresponse' /></p>
                    <br/>
                    <p><FormattedMessage id='dmca.assessment' /></p>
                    <br/>
                    <p><FormattedMessage id='dmca.eyetoeye' /></p>
                    <br/>
                    <p><FormattedMessage id='dmca.afterfiling' /></p>
                </Box>
            </div>
        );
    }
});

render(<Page><Dmca /></Page>, document.getElementById('app'));
