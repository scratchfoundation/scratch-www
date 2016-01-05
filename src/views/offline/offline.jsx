var React = require('react');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
var FormattedMessage = require('react-intl').FormattedMessage;
var render = require('../../lib/render.jsx');
var Box = require('../../components/box/box.jsx');


require('./offline.scss');

var Offline = React.createClass({
    type: 'Offline',
    render: function () {
        return (
            <div className="inner">
                <Box>
                    <div className="intro">
                        <h1><FormattedMessage id='offline.title' /></h1>
                        <p><FormattedMessage id='offline.intro' /></p>
                        <p><FormattedHTMLMessage id='offline.noteForMacUsers' /></p>
                    </div>
                    <div className="steps">
                        <div className="column">
                            <h4>Adobe AIR</h4>
                            <img src="/images/number1.png" />
                            <p><FormattedMessage id='offline.step1' />
                                <a href="https://get.adobe.com/air/"> Adobe AIR</a>.
                            </p>
                            <p>Mac OS X - <a href="https://get.adobe.com/air/">
                                <FormattedMessage id='general.download' /> </a>
                                <img src="/images/download.png" /></p>
                            <p><FormattedMessage id='offline.oldMacOS' /> - <a href="http://airdownload.adobe.
                            com/air/mac/download/2.6/AdobeAIR.zip">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                            <p>Windows - <a href="https://get.adobe.com/air/">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                            <p>Linux - <a href="http://airdownload.adobe.com/air/lin/
                            download/2.6/AdobeAIRInstaller.bin">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                        </div>
                        <div className="verticalLine" />
                        <div className="column">
                            <h4><FormattedMessage id='offline.offlineEditor' /></h4>
                            <img src="/images/number2.png" />
                            <p><FormattedMessage id='offline.step2' /></p>
                            <p>Mac OS X - <a href="/scratchr2/static/sa/Scratch-442.dmg">
                                <FormattedMessage id='general.download' /> </a>
                                <img src="/images/download.png" /></p>
                            <p><FormattedMessage id='offline.oldMacOS' /> - <a href="/scratchr2/static/sa/Scratch-442
                            .air">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                            <p>Windows - <a href="https://scratch.mit.edu/scratchr2/static/sa/Scratch-442.exe">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                            <p>Linux - <a href="https://scratch.mit.edu/scratchr2/static/sa/Scratch-442.air">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/download.png" /></p>
                        </div>
                        <div className="verticalLine" />
                        <div className="column">
                            <h4><FormattedMessage id='offline.supportMaterials' /></h4>
                            <img src="/images/number3.png" />
                            <p><FormattedMessage id='offline.step3' /></p>
                            <p><FormattedMessage id='offline.starterProjects' /> - <a href="/scra
                            tchr2/static/sa/Scratch2StarterProjects.zip">
                                <FormattedMessage id='general.download' /> </a>
                                <img src="/images/download.png" /></p>
                            <p><FormattedMessage id='offline.gettingStartedGuide' /> - <a href="https://cdn.scratch.mit.
                            edu/scratchr2/static/__cffb4767fa9e8fa191f4ebcdfa060830__/pdfs/help/Getting-Started-Guide-
                            Scratch2.pdf">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/pdf-icon.png" /></p>
                            <p><FormattedMessage id='offline.scratchCards' /> - <a href="https://cdn.scratch.mit.edu/sc
                            ratchr2/static/__cffb4767fa9e8fa191f4ebcdfa060830__/pdfs/help/Scratch2Cards.pdf">
                                <FormattedMessage id='general.download' /></a>
                                <img src="/images/pdf-icon.png" /></p>
                        </div>
                    </div>
                    <div className="more-info">
                        <div className="left-column">
                            <h4><FormattedMessage id='general.updates' /></h4>
                            <p><FormattedMessage id='offline.updates' /></p>
                            <p><FormattedMessage id='offline.currentVersion' /></p>
                            <h4><FormattedMessage id='offline.otherVersions' /></h4>
                            <p><FormattedMessage id='offline.scratch1.4' /> <a href="/scratch_1.4">Scratch 1.4</a></p>
                            <p><FormattedHTMLMessage id='offline.msi' /></p>
                        </div>
                        <div className="right-column">
                            <h4><FormattedMessage id='offline.knownIssues' /></h4>
                            <ul>
                                <li><FormattedMessage id='offline.crash' /></li>
                                <li><FormattedMessage id='offline.graphicEffects' /></li>
                                <li><FormattedHTMLMessage id='offline.backpack' /></li>
                            </ul>
                            <div class="button">
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        );
    }
});

render(<Offline />, document.getElementById('view'));