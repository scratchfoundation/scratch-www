const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../components/flex-row/flex-row.jsx');
const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
const TitleBanner = require('../../components/title-banner/title-banner.jsx');

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

require('./scratch_1.4.scss');

const OnePointFour = () => (
    <div className="download">
        <TitleBanner className="masthead">
            <div className="inner">
                <h1 className="title-banner-h1">
                    Scratch 1.4
                </h1>
                <p className="title-banner-p intro">
                    <FormattedMessage id="onePointFour.intro" />
                </p>
            </div>
            <div className="band">
                <SubNavigation className="inner">
                    <a
                        className="sub-nav-item"
                        href="#installation"
                    >
                        <li>
                            <FormattedMessage id="onePointFour.downloads" />
                        </li>
                    </a>
                    <a
                        className="sub-nav-item"
                        href="#faqs"
                    >
                        <li>
                            <FormattedMessage id="onePointFour.faqsTitle" />
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
                        <FormattedMessage
                            id="onePointFour.introNote"
                            values={{
                                noteLabel: (
                                    <b><FormattedMessage id="onePointFour.introNoteLabel" /></b>
                                )
                            }}
                        />
                    </p>
                    <FlexRow className="three-col-row">
                        <div className="installation-column">
                            <img
                                alt="scratch for mac"
                                src="/images/scratch_1.4/scratch-mac.png"
                            />
                            <h3><FormattedMessage id="onePointFour.macTitle" /></h3>
                            <p><FormattedMessage id="onePointFour.macBody" /></p>
                            <ul className="installation-downloads">
                                <li className="installation-downloads-item">
                                    <a href="https://download.scratch.mit.edu/MacScratch1.4.dmg">
                                        MacScratch1.4.dmg
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="installation-column">
                            <img
                                alt="scratch for windows"
                                src="/images/scratch_1.4/scratch-win.png"
                            />
                            <h3><FormattedMessage id="onePointFour.windowsTitle" /></h3>
                            <p><FormattedMessage id="onePointFour.windowsBody" /></p>
                            <ul
                                className="installation-downloads"
                                key="installation-downloads"
                            >
                                <li className="installation-downloads-item">
                                    <a href="https://download.scratch.mit.edu/ScratchInstaller1.4.exe">
                                        ScratchInstaller1.4.exe
                                    </a>
                                </li>
                                <li className="installation-downloads-item">
                                    <FormattedMessage
                                        id="onePointFour.windowsNetwork"
                                        values={{
                                            windowsNetworkInstaller: (
                                                <a href="https://download.scratch.mit.edu/Scratch1.4.msi.installer.zip">
                                                    <FormattedMessage id="onePointFour.windowsNetworkInstaller" />
                                                </a>
                                            )
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="installation-column">
                            <img
                                alt="scratch for linux"
                                src="/images/scratch_1.4/scratch-linux.png"
                            />
                            <h3><FormattedMessage id="onePointFour.linuxTitle" /></h3>
                            <p><FormattedMessage id="onePointFour.linuxBody" /></p>
                            <ul className="installation-downloads">
                                <li className="installation-downloads-item">
                                    <FormattedMessage
                                        id="onePointFour.linuxOptions"
                                        values={{
                                            linuxInstall: (
                                                <a href="apt:scratch">
                                                    <FormattedMessage id="onePointFour.linuxInstall" />
                                                </a>
                                            ),
                                            linuxDownload: (
                                                <a href="http://ubuntu.media.mit.edu/ubuntu//pool/universe/s/scratch/scratch_1.4.0.6~dfsg1-5~ubuntu12.04.1_all.deb">
                                                    <FormattedMessage id="onePointFour.linuxDownload" />
                                                </a>
                                            )
                                        }}
                                    />
                                </li>
                            </ul>
                        </div>
                    </FlexRow>
                </div>
            </section>
            <div className="inner">
                <section id="faqs">
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="onePointFour.faqsTitle" /></h2>
                    <h3><FormattedMessage id="onePointFour.resourcesQ" /></h3>
                    <p>
                        <FormattedMessage
                            id="onePointFour.resourcesA"
                            values={{
                                gettingStartedGuide: (
                                    <a href="https://download.scratch.mit.edu/ScratchGettingStartedv14.pdf">
                                        <FormattedMessage id="onePointFour.gettingStartedGuide" />
                                    </a>
                                ),
                                referenceGuide: (
                                    <a href="https://download.scratch.mit.edu/ScratchReferenceGuide14.pdf">
                                        <FormattedMessage id="onePointFour.referenceGuide" />
                                    </a>
                                ),
                                scratchCards: (
                                    <a href="https://download.scratch.mit.edu/ScratchCardsAll-v1.4-PDF.zip">
                                        <FormattedMessage id="onePointFour.scratchCards" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <h3><FormattedMessage id="onePointFour.requirementsQ" /></h3>
                    <p><FormattedMessage id="onePointFour.requirementsDisplay" /></p>
                    <p><FormattedMessage id="onePointFour.requirementsOS" /></p>
                    <p><FormattedMessage id="onePointFour.requirementsDisk" /></p>
                    <p><FormattedMessage id="onePointFour.requirementsCPUMemory" /></p>
                    <p><FormattedMessage id="onePointFour.requirementsSoundVideo" /></p>
                    <h3><FormattedMessage id="onePointFour.errorQ" /></h3>
                    <ol>
                        <li><FormattedMessage id="onePointFour.errorFileTooBig" /></li>
                        <li><FormattedMessage id="onePointFour.errorInternet" /></li>
                        <li><FormattedMessage id="onePointFour.errorProxy" /></li>
                        <li><FormattedMessage id="onePointFour.errorLogin" /></li>
                    </ol>
                </section>
            </div>
        </div>
    </div>
);

render(<Page><OnePointFour /></Page>, document.getElementById('app'));
