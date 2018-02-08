const cheerio = require('cheerio');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');
const xhr = require('xhr');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./preview-faq.scss');

class PreviewFaq extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            faqDoc: {__html: ''}
        };
    }
    componentDidMount () {
        xhr({
            method: 'GET',
            uri: 'https://docs.google.com/document/d/e/2PACX-1vQZFrpOagYqEwcrBBCplIomiyguPAodIJVnCq9Sr11WDI_aa2b-JtDWak-Aiu-cwWobTXftRMF6wBbd/pub?embedded=true'
        }, (error, response, body) => {
            const $ = cheerio.load(body);
            this.setState({faqDoc: {__html: $('html').html()}});
        });
    }
    render () {
        return (
            <InformationPage title={this.props.intl.formatMessage({id: 'preview-faq.title'})}>
                <div className="inner">
                    <div
                        className="preview-faq"
                        dangerouslySetInnerHTML={this.state.faqDoc} // eslint-disable-line react/no-danger
                    />
                </div>
            </InformationPage>
        );
    }
}

PreviewFaq.propTypes = {
    intl: intlShape
};

const WrappedPreviewFAQ = injectIntl(PreviewFaq);

render(<Page><WrappedPreviewFAQ /></Page>, document.getElementById('app'));
