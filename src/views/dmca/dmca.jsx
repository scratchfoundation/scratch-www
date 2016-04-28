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
                    <p>
                        Copyright Agent / Mitchel Resnick<br/>
                        MIT Media Laboratory<br/>
                        77 Massachusetts Ave<br/>
                        Room E14-445A<br/>
                        Cambridge, MA 02139<br/>
                        Tel: (617) 253-9783
                    </p>
                    <p><FormattedMessage id='dmca.llkresponse' /></p>
                    <p><FormattedMessage id='dmca.assessment' /></p>
                    <p><FormattedMessage id='dmca.eyetoeye' /></p>
                    <p><FormattedMessage id='dmca.afterfiling' /></p>
                </Box>
            </div>
        );
    }
});

render(<Page><Dmca /></Page>, document.getElementById('app'));
