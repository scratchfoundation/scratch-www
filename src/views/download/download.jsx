var React = require('react');
var render = require('../../lib/render.jsx');

var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;

var Page = require('../../components/page/www/page.jsx');
var TitleBanner = require('../../components/title-banner/title-banner.jsx');
var FlexRow = require('../../components/flex-row/flex-row.jsx');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./download.scss');
require('../../components/forms/button.scss');

var Download = React.createClass({
    type: 'Download',
    render: function () {
        return (
            <div className="download">
                <TitleBanner className="masthead">
                    <div className="inner">
                        <h1 className="title-banner-h1">
                            <FormattedMessage id='download.title' />
                        </h1>
                        <p className="title-banner-p intro">
                            <FormattedMessage id='download.intro' />
                        </p>
                        <p className="title-banner-p intro">
                            <FormattedHTMLMessage id='download.introMac' />
                        </p>
                    </div>
                    <div className="band">
                        <SubNavigation className="inner">
                            <a href="#installation">
                                <li>
                                    <FormattedMessage id='download.installation' />
                                </li>
                            </a>
                            <a href="#updates">
                                <li>
                                    <FormattedMessage id='download.updatesTitle' />
                                </li>
                            </a>
                            <a href="#other">
                                <li>
                                    <FormattedMessage id='download.otherVersionsTitle' />
                                </li>
                            </a>
                            <a href="#issues">
                                <li>
                                    <FormattedMessage id='download.knownIssuesTitle' />
                                </li>
                            </a>
                        </SubNavigation>
                    </div>
                </TitleBanner>
                <div className="download-content">
                    <div className="inner">
                        <section id="installation">
                            <span className="nav-spacer"></span>
                            <FlexRow className="three-col-row">
                                <div className="installation-column">
                                    <h3><FormattedMessage id='download.airTitle' /></h3>
                                    <p><FormattedHTMLMessage id='download.airBody' /></p>
                                    <ul className="installation-downloads">
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.macOSX' /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.macOlder' /> -
                                            {' '}<a href="http://airdownload.adobe.com/air/mac/download/2.6/AdobeAIR.zip">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.windows' /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.linux' /> -
                                            {' '}<a href="http://airdownload.adobe.com/air/lin/download/2.6/AdobeAIRInstaller.bin">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="installation-column">
                                    <h3><FormattedMessage id='download.offlineEditorTitle' /></h3>
                                    <p><FormattedMessage id='download.offlineEditorBody' /></p>
                                    <ul className="installation-downloads">
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.macOSX' /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.macOlder' /> -
                                            {' '}<a href="http://airdownload.adobe.com/air/mac/download/2.6/AdobeAIR.zip">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.windows' /> -
                                            {' '}<a href="http://get.adobe.com/air/">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.linux' /> -
                                            {' '}<a href="http://airdownload.adobe.com/air/lin/download/2.6/AdobeAIRInstaller.bin">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="installation-column">
                                    <h3><FormattedMessage id='download.supportMaterialsTitle' /></h3>
                                    <p><FormattedMessage id='download.supportMaterialsBody' /></p>
                                    <ul className="installation-downloads">
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.starterProjects' /> -
                                            {' '}<a href="https://scratch.mit.edu/scratchr2/static/sa/Scratch2StarterProjects.zip">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.gettingStarted' /> -
                                            {' '}<a href="https://cdn.scratch.mit.edu/scratchr2/static/__709da8e5f3d72129538a4ccdbcbf5f2a__/pdfs/help/Getting-Started-Guide-Scratch2.pdf">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                        <li className="installation-downloads-item">
                                            <FormattedMessage id='download.scratchCards' /> -
                                            {' '}<a href="https://cdn.scratch.mit.edu/scratchr2/static/__709da8e5f3d72129538a4ccdbcbf5f2a__/pdfs/help/Scratch2Cards.pdf">
                                                <FormattedMessage id='download.download' />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </FlexRow>
                        </section>

                        <section id="updates">
                            <span className="nav-spacer"></span>
                            <h2><FormattedMessage id='download.updatesTitle' /></h2>
                            <p><FormattedMessage id='download.updatesBody' /></p>
                            <p><FormattedMessage id='download.currentVersion' /></p>
                        </section>

                        <section id="other">
                            <span className="nav-spacer"></span>
                            <h2><FormattedMessage id='download.otherVersionsTitle' /></h2>
                            <p><FormattedHTMLMessage id='download.otherVersionsOlder' /></p>
                            <p><FormattedHTMLMessage id='download.otherVersionsAdmin' /></p>
                        </section>

                        <section id="issues">
                            <span className="nav-spacer"></span>
                            <h2><FormattedMessage id='download.knownIssuesTitle' /></h2>
                            <p><FormattedMessage id='download.knownIssuesOne' /></p>
                            <p><FormattedMessage id='download.knownIssuesTwo' /></p>
                            <p><FormattedHTMLMessage id='download.knownIssuesThree' /></p>
                            <a href="https://scratch.mit.edu/discuss/3/" className='button'>
                                <FormattedMessage id='download.reportBugs' />
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
});

render(<Page><Download /></Page>, document.getElementById('app'));
