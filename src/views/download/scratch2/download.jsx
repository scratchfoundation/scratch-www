const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const React = require('react');

const api = require('../../../lib/api');
const FlexRow = require('../../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../../components/title-banner/title-banner.jsx');

const Page = require('../../../components/page/www/page.jsx');
const render = require('../../../lib/render.jsx');

require('./download.scss');
require('../../../components/forms/button.scss');

class Download extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            swfVersion: ''
        };
    }
    componentDidMount () {
        let uri = '/scratchr2/static/sa/version.xml';
        if (this.props.intl.locale === 'pt-br') {
            uri = '/scratchr2/static/sa/pt-br/version.xml';
        }

        api({
            host: '',
            uri: uri,
            responseType: 'string'
        }, (err, body, res) => {
            if (err || res.statusCode >= 400) {
                return this.setState({
                    swfVersion: -1
                });
            }

            const doc = new DOMParser().parseFromString(body, 'text/xml');
            return this.setState({
                swfVersion: doc.getElementsByTagName('versionNumber')[0].childNodes[0].nodeValue
            });
        });
    }
    render () {
        let downloadPath = '/scratchr2/static/sa/Scratch-';
        let downloadUrls = null;
        if (this.props.intl.locale === 'pt-br') {
            downloadPath = '/scratchr2/static/sa/pt-br/Scratch-';
        }
        if (this.state.swfVersion.length > 0 && this.state.swfVersion !== -1) {
            downloadUrls = {
                mac: `${downloadPath}${this.state.swfVersion}.dmg`,
                mac105: `${downloadPath}${this.state.swfVersion}.air`,
                windows: `${downloadPath}${this.state.swfVersion}.exe`
            };
        }

        return (
            <div className="download">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id="download.title" />
                        </h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage id="download.intro" />
                        </p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a
                                className="sub-nav-item"
                                href="#installation"
                            >
                                <li>
                                    <FormattedMessage id="download.installation" />
                                </li>
                            </a>
                            <a
                                className="sub-nav-item"
                                href="#updates"
                            >
                                <li>
                                    <FormattedMessage id="download.updatesTitle" />
                                </li>
                            </a>
                            <a
                                className="sub-nav-item"
                                href="#other"
                            >
                                <li>
                                    <FormattedMessage id="download.otherVersionsTitle" />
                                </li>
                            </a>
                            <a
                                className="sub-nav-item"
                                href="#issues"
                            >
                                <li>
                                    <FormattedMessage id="download.knownIssuesTitle" />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>
                <div className="download-content">
                    <section
                        className="installation"
                        id="installation"
                    >
                        <div className="inner">
                            <p className="callout">
                                <FormattedHTMLMessage id="download.introMac" />
                            </p>
                            <FlexRow className="three-col-row">
                                <div className="installation-column">
                                    <div className="installation-column-number">
                                        <h2 className="installation-column-number-text">{'1'}</h2>
                                    </div>
                                    <h3><FormattedMessage id="download.airTitle" /></h3>
                                    <p><FormattedHTMLMessage id="download.airBody" /></p>
                                    <ul className="installation-downloads">
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.macOSX" /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.macOlder" /> -
                                            {' '}<a href="http://airdownload.adobe.com/air/mac/download/2.6/AdobeAIR.zip">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.windows" /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="installation-column">
                                    <div className="installation-column-number">
                                        <h2 className="installation-column-number-text">{'2'}</h2>
                                    </div>
                                    <h3><FormattedMessage id="download.offlineEditorTitle" /></h3>
                                    <p><FormattedMessage id="download.offlineEditorBody" /></p>
                                    {downloadUrls === null ? [] : [
                                        <ul
                                            className="installation-downloads"
                                            key="installation-downloads"
                                        >
                                            <li className="installation-downloads-item">
                                                <FormattedMessage id="download.macOSX" /> -
                                                {' '}<a href={downloadUrls.mac}>
                                                    <FormattedMessage id="download.download" />
                                                </a>
                                            </li>
                                            <li className="installation-downloads-item">
                                                <FormattedMessage id="download.macOlder" /> -
                                                {' '}<a href={downloadUrls.mac105}>
                                                    <FormattedMessage id="download.download" />
                                                </a>
                                            </li>
                                            <li className="installation-downloads-item">
                                                <FormattedMessage id="download.windows" /> -
                                                {' '}<a href={downloadUrls.windows}>
                                                    <FormattedMessage id="download.download" />
                                                </a>
                                            </li>
                                        </ul>
                                    ]}
                                    {this.state.swfVersion === -1 ? [
                                        <p key="not-available">
                                            <i><FormattedMessage id="download.notAvailable" /></i>
                                        </p>
                                    ] : []}
                                </div>
                                <div className="installation-column">
                                    <div className="installation-column-number">
                                        <h2 className="installation-column-number-text">{'3'}</h2>
                                    </div>
                                    <h3><FormattedMessage id="download.supportMaterialsTitle" /></h3>
                                    <p><FormattedMessage id="download.supportMaterialsBody" /></p>
                                    <ul className="installation-downloads">
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.starterProjects" /> -
                                            {' '}<a href="https://scratch.mit.edu/scratchr2/static/sa/Scratch2StarterProjects.zip">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.gettingStarted" /> -
                                            {' '}<a href="https://cdn.scratch.mit.edu/scratchr2/static/__709da8e5f3d72129538a4ccdbcbf5f2a__/pdfs/help/Getting-Started-Guide-Scratch2.pdf">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id="download.scratchCards" /> -
                                            {' '}<a href="https://cdn.scratch.mit.edu/scratchr2/static/__709da8e5f3d72129538a4ccdbcbf5f2a__/pdfs/help/Scratch2Cards.pdf">
                                                <FormattedMessage id="download.download" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </FlexRow>
                        </div>
                    </section>
                    <div className="inner">
                        <section id="updates">
                            <span className="nav-spacer" />
                            <h2><FormattedMessage id="download.updatesTitle" /></h2>
                            <p><FormattedMessage id="download.updatesBody" /></p>
                            {this.state.swfVersion === -1 ? [] : [
                                <p key="current-version">
                                    <FormattedMessage
                                        id="download.currentVersion"
                                        values={{
                                            version: this.state.swfVersion
                                        }}
                                    />
                                </p>
                            ]}
                        </section>

                        <section id="other">
                            <span className="nav-spacer" />
                            <h2><FormattedMessage id="download.otherVersionsTitle" /></h2>
                            <p><FormattedHTMLMessage id="download.otherVersionsOlder" /></p>
                            <p><FormattedHTMLMessage id="download.otherVersionsAdmin" /></p>
                        </section>

                        <section id="issues">
                            <span className="nav-spacer" />
                            <h2><FormattedMessage id="download.knownIssuesTitle" /></h2>
                            <p><FormattedMessage id="download.knownIssuesOne" /></p>
                            <p><FormattedMessage id="download.knownIssuesTwo" /></p>
                            <p><FormattedHTMLMessage id="download.knownIssuesThree" /></p>
                            <p><FormattedMessage id="download.knownIssuesFour" /></p>
                            <a
                                className="button mod-link"
                                href="https://scratch.mit.edu/discuss/3/"
                            >
                                <FormattedMessage id="download.reportBugs" />
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

Download.propTypes = {
    intl: intlShape
};

const WrappedDownload = injectIntl(Download);

render(<Page><WrappedDownload /></Page>, document.getElementById('app'));
