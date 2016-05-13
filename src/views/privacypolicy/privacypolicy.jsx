var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var render = require('../../lib/render.jsx');
var Page = require('../../components/page/www/page.jsx');
var Box = require('../../components/box/box.jsx');

require('./privacypolicy.scss');

var Privacypolicy = React.createClass({
    type: 'Privacypolicy',
    render: function () {
        return (
            <div className="inner">
                <Box title={<FormattedMessage id='privacypolicy.title' />}>
                    <p><FormattedHTMLMessage id='privacypolicy.introOne' /></p>
                    <p><i><FormattedMessage id='privacypolicy.introTwo' /></i></p>
                    <h3><FormattedMessage id='privacypolicy.whatinfo' /></h3>
                    <p>
                        <b><FormattedMessage id='privacypolicy.accountinfotitle' /></b>
                        <FormattedMessage id='privacypolicy.accountinfobody' />
                    </p>
                    <p>
                        <b><FormattedMessage id='privacypolicy.usergeneratedtitle' /></b>
                        <FormattedHTMLMessage id='privacypolicy.usergeneratedbody' />
                    </p>
                    <p>
                        <b><FormattedMessage id='privacypolicy.usageinfotitle' /></b>
                        <FormattedMessage id='privacypolicy.usageinfobody' />
                    </p>
                    <p>
                        <b><FormattedMessage id='privacypolicy.googleanalyticstitle' /></b>
                        <FormattedMessage id='privacypolicy.googleanalyticsbody' />
                    </p>
                    <p>
                        <b><FormattedMessage id='privacypolicy.cookiestitle' /></b>
                        <FormattedMessage id='privacypolicy.cookiesbody' />
                    </p>
                    <h3><FormattedMessage id='privacypolicy.infousage' /></h3>
                    <ul>
                        <li><FormattedMessage id='privacypolicy.agegender' /></li>
                        <li><FormattedMessage id='privacypolicy.birthmonth' /></li>
                        <li><FormattedMessage id='privacypolicy.emailaddress' /></li>
                        <li><FormattedMessage id='privacypolicy.emailupdates' /></li>
                        <li><FormattedHTMLMessage id='privacypolicy.additionalemails' /></li>
                        <li><FormattedMessage id='privacypolicy.abusivebehavior' /></li>
                        <li><FormattedHTMLMessage id='privacypolicy.researchinfo' /></li>
                        <li><FormattedMessage id='privacypolicy.thirdparty' /></li>
                        <li>
                            <FormattedMessage id='privacypolicy.exceptions' />
                            <ul>
                                <li><FormattedMessage id='privacypolicy.lawrequirement' /></li>
                                <li><FormattedMessage id='privacypolicy.technicalreasons' /></li>
                            </ul>
                        </li>
                    </ul>
                    <h3><FormattedMessage id='privacypolicy.updateheader' /></h3>
                    <p><FormattedHTMLMessage id='privacypolicy.updateuser' /></p>
                    <p><FormattedMessage id='privacypolicy.deleteuser' /></p>
                    <h3><FormattedMessage id='privacypolicy.infoprotectionheader' /></h3>
                    <p><FormattedMessage id='privacypolicy.infoprotectionbody' /></p>
                    <h3><FormattedMessage id='privacypolicy.policychangesheader' /></h3>
                    <p><FormattedMessage id='privacypolicy.policychangesbody' /></p>
                </Box>
            </div>
        );
    }
});

render(<Page><Privacypolicy /></Page>, document.getElementById('app'));
