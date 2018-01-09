var cheerio = require('cheerio');
var injectIntl = require('react-intl').injectIntl;
var React = require('react');
var xhr = require('xhr');

var InformationPage = require('../../components/informationpage/informationpage.jsx');
var Page = require('../../components/page/www/page.jsx');
var render = require('../../lib/render.jsx');

require('./preview-faq.scss');

var PreviewFaq = injectIntl(React.createClass({
    type: 'PreviewFaq',
    getInitialState: function () {
        return {
            faqDoc: {__html: ''}
        };
    },
    componentDidMount: function () {
        xhr({
            method: 'GET',
            uri: 'https://docs.google.com/document/d/e/2PACX-1vQZFrpOagYqEwcrBBCplIomiyguPAodIJVnCq9Sr11WDI_aa2b-JtDWak-Aiu-cwWobTXftRMF6wBbd/pub?embedded=true'
        }, function (error, response, body) {
            var $ = cheerio.load(body);
            this.setState({faqDoc: {__html: $('html').html()}});
        }.bind(this));
    },
    render: function () {
        return (
            <InformationPage title={this.props.intl.formatMessage({id: 'preview-faq.title'})}>
                <div className="inner">
                    <div
                        className="preview-faq"
                        dangerouslySetInnerHTML={this.state.faqDoc}
                    />
                </div>
            </InformationPage>
        );
    }
}));

render(<Page><PreviewFaq /></Page>, document.getElementById('app'));
