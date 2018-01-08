var injectIntl = require('react-intl').injectIntl;
var React = require('react');

var Box = require('../../components/box/box.jsx');
var InformationPage = require('../../components/informationpage/informationpage.jsx');
var Page = require('../../components/page/www/page.jsx');
var render = require('../../lib/render.jsx');

require('./preview-faq.scss');

var PreviewFaq = injectIntl(React.createClass({
    type: 'PreviewFaq',
    render: function () {
        return (
            <InformationPage title={this.props.intl.formatMessage({id: 'preview-faq.title'})}>
                <div className="inner">
                    <Box
                        title={''}
                    >
                        <iframe
                            className="preview-faq-iframe"
                            src="https://docs.google.com/document/d/e/2PACX-1vQZFrpOagYqEwcrBBCplIomiyguPAodIJVnCq9Sr11WDI_aa2b-JtDWak-Aiu-cwWobTXftRMF6wBbd/pub?embedded=true"
                        ></iframe>
                    </Box>
                </div>
            </InformationPage>
        );
    }
}));

render(<Page><PreviewFaq /></Page>, document.getElementById('app'));
