var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');

var InformationPage = require('../../components/informationpage/informationpage.jsx');
var Page = require('../../components/page/www/page.jsx');

var Dmca = React.createClass({
    type: 'Dmca',
    render: function () {
        return (
                <InformationPage title={'DMCA'}>
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
                </InformationPage>
        );
    }
});

render(<Page><Dmca /></Page>, document.getElementById('app'));
