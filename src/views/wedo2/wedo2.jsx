import {FormattedHTMLMessage} from 'react-intl';
import {FormattedMessage} from 'react-intl';
import React from 'react';

import Page from '../../components/page/www/page.jsx';
import render from '../../lib/render.jsx';

require('./wedo2.scss');

var Wedo2 = React.createClass({
    type: 'wedo2',
    render: function () {
        return (
            <div className="wedo">
                <div className="top-banner">
                    <div className="inner">
                        <div className="columns2">
                            <div className="banner-text">
                                <h2>LEGO WeDo 2.0 &amp; Scratch</h2>
                                <p className="intro">
                                    <FormattedMessage id='wedo2.intro' />
                                </p>
                            </div>
                            <div className="banner-photo">
                                <img src="/images/wedo/wedo-milo.png" />
                            </div>
                        </div>
                     </div>
                </div>

                <div className="inner">
                    <section id="getting-started">
                        <h3>
                            <FormattedMessage id='wedo2.getStarted' />
                        </h3>
                        <p className="callout">
                            <FormattedMessage id='wedo2.requirement' />
                        </p>
                        <div className="columns3">
                            <div className="column">
                                <img src="/images/wedo/download-device-manager.png" />
                                <h4>
                                    <FormattedMessage id='wedo2.installTitle' />
                                </h4>
                                <p>
                                    <FormattedHTMLMessage id='wedo2.installText' />
                                    <br />
                                    <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1084869222&mt=12">
                                        <FormattedMessage id='wedo2.downloadMac' />
                                    </a>
                                    <br />
                                    <a href="https://downloads.scratch.mit.edu/device-manager/ScratchDeviceManager-1.1.0.exe">
                                        <FormattedMessage id='wedo2.downloadWin' />
                                    </a>
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/wedo/set-up.png" />
                                <h4>
                                    <FormattedMessage id='wedo2.setupTitle' />
                                </h4>
                                <p>
                                    <FormattedHTMLMessage id='wedo2.setupText' />
                                </p>
                            </div>
                            <div className="column">
                                <img src="/images/wedo/create-and-share.png" />
                                <h4>
                                    <FormattedMessage id='wedo2.createTitle' />
                                </h4>
                                <p>
                                    <FormattedMessage id='wedo2.createText' />
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="banner">
                    <div className="inner" id="starter-projects">
                        <h3>
                            <FormattedMessage id='wedo2.starterProjects' />
                        </h3>
                        <div className="project-list">
                            <a href="/projects/101037564/?tip_bar=ext2#editor">
                                <div className="project-card">
                                    <img src="/images/wedo/motor.png" alt="" />
                                    <p>
                                        <FormattedMessage id='wedo2.starterMotor' />
                                    </p>
                                </div>
                            </a>
                            <a href="/projects/101038249/?tip_bar=ext2#editor">
                                <div className="project-card">
                                    <img src="/images/wedo/distance.png" alt="" />
                                    <p>
                                        <FormattedMessage id='wedo2.starterDistance' />
                                    </p>
                                </div>
                            </a>
                            <a href="/projects/101033190/?tip_bar=ext2#editor">
                                <div className="project-card">
                                    <img src="/images/wedo/tilt.png" alt="" />
                                    <p>
                                        <FormattedMessage id='wedo2.starterTilt' />
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="inner">
                    <section>
                        <h3>
                            <FormattedMessage id='wedo2.versionTitle' />
                        </h3>
                        <p>
                            <FormattedMessage id='wedo2.versionText' />
                        </p>
                        <div className="device-card">
                            <h4>LEGO WeDo 1.0 Hub</h4>
                            <img src="/images/wedo/wedo1.png" alt="LEGO WeDo 1.0 Hub" />
                            <a href="/projects/editor/?tip_bar=ext1">
                                <FormattedMessage id='wedo2.wedo1SetupInstructions' />
                            </a>
                        </div>
                        <div className="device-card">
                            <h4>LEGO WeDo 2.0 Hub</h4>
                            <img src="/images/wedo/wedo2.png" alt="LEGO WeDo 2.0 Hub" />
                            <a href="/projects/editor/?tip_bar=ext2">
                                <FormattedMessage id='wedo2.wedo2SetupInstructions' />
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
});

render(<Page><Wedo2 /></Page>, document.getElementById('app'));
