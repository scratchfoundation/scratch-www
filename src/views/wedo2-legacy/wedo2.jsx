const FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./wedo2.scss');

const Wedo2 = () => (
    <div className="wedo">
        <div className="top-banner">
            <div className="inner">
                <div className="columns2">
                    <div className="banner-text">
                        <h2>LEGO WeDo 2.0 &amp; Scratch</h2>
                        <p className="intro">
                            <FormattedMessage id="wedoLegacy.intro" />
                        </p>
                    </div>
                    <div className="banner-photo">
                        <img src="/images/wedo-legacy/wedo-milo.png" />
                    </div>
                </div>
            </div>
        </div>

        <div className="inner">
            <section id="getting-started">
                <h3>
                    <FormattedMessage id="wedoLegacy.getStarted" />
                </h3>
                <p className="callout">
                    <FormattedMessage id="wedoLegacy.requirement" />
                </p>
                <div className="columns3">
                    <div className="column">
                        <img src="/images/wedo-legacy/download-device-manager.png" />
                        <h4>
                            <FormattedMessage id="wedoLegacy.installTitle" />
                        </h4>
                        <p>
                            <FormattedHTMLMessage id="wedoLegacy.installText" />
                            <br />
                            <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1084869222&mt=12">
                                <FormattedMessage id="wedoLegacy.downloadMac" />
                            </a>
                            <br />
                            <a href="https://downloads.scratch.mit.edu/device-manager/ScratchDeviceManager-1.1.0.exe">
                                <FormattedMessage id="wedoLegacy.downloadWin" />
                            </a>
                        </p>
                    </div>
                    <div className="column">
                        <img src="/images/wedo-legacy/set-up.png" />
                        <h4>
                            <FormattedMessage id="wedoLegacy.setupTitle" />
                        </h4>
                        <p>
                            <FormattedHTMLMessage id="wedoLegacy.setupText" />
                        </p>
                    </div>
                    <div className="column">
                        <img src="/images/wedo-legacy/create-and-share.png" />
                        <h4>
                            <FormattedMessage id="wedoLegacy.createTitle" />
                        </h4>
                        <p>
                            <FormattedMessage id="wedoLegacy.createText" />
                        </p>
                    </div>
                </div>
            </section>
        </div>

        <div className="banner">
            <div
                className="inner"
                id="starter-projects"
            >
                <h3>
                    <FormattedMessage id="wedoLegacy.starterProjects" />
                </h3>
                <div className="project-list">
                    <a href="/projects/101037564/?tip_bar=ext2#editor">
                        <div className="project-card">
                            <img
                                alt=""
                                src="/images/wedo-legacy/motor.png"
                            />
                            <p>
                                <FormattedMessage id="wedoLegacy.starterMotor" />
                            </p>
                        </div>
                    </a>
                    <a href="/projects/101038249/?tip_bar=ext2#editor">
                        <div className="project-card">
                            <img
                                alt=""
                                src="/images/wedo-legacy/distance.png"
                            />
                            <p>
                                <FormattedMessage id="wedoLegacy.starterDistance" />
                            </p>
                        </div>
                    </a>
                    <a href="/projects/101033190/?tip_bar=ext2#editor">
                        <div className="project-card">
                            <img
                                alt=""
                                src="/images/wedo-legacy/tilt.png"
                            />
                            <p>
                                <FormattedMessage id="wedoLegacy.starterTilt" />
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <div className="inner">
            <section>
                <h3>
                    <FormattedMessage id="wedoLegacy.versionTitle" />
                </h3>
                <p>
                    <FormattedMessage id="wedoLegacy.versionText" />
                </p>
                <div className="device-card">
                    <h4>LEGO WeDo 1.0 Hub</h4>
                    <img
                        alt="LEGO WeDo 1.0 Hub"
                        src="/images/wedo-legacy/wedo1.png"
                    />
                    <a href="/projects/editor/?tip_bar=ext1">
                        <FormattedMessage id="wedoLegacy.wedo1SetupInstructions" />
                    </a>
                </div>
                <div className="device-card">
                    <h4>LEGO WeDo 2.0 Hub</h4>
                    <img
                        alt="LEGO WeDo 2.0 Hub"
                        src="/images/wedo-legacy/wedo2.png"
                    />
                    <a href="/projects/editor/?tip_bar=ext2">
                        <FormattedMessage id="wedoLegacy.wedo2SetupInstructions" />
                    </a>
                </div>
            </section>
        </div>
    </div>
);

render(<Page><Wedo2 /></Page>, document.getElementById('app'));
