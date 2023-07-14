import React, {useState} from 'react';
import {FormattedMessage, injectIntl} from 'react-intl';

import Page from '../../../components/page/www/page.jsx';
const intlShape = require('../../../lib/intl-shape');
import render from '../../../lib/render.jsx';

import FlexRow from '../../../components/flex-row/flex-row.jsx';

import OSChooser from '../../../components/os-chooser/os-chooser.jsx';
import detectOS from '../../../lib/detect-os.js';

import HardwareCard from '../../../components/extension-landing/hardware-card.jsx';
import ExtensionRequirements from '../../../components/extension-landing/extension-requirements.jsx';
import ExtensionSection from '../../../components/extension-landing/extension-section.jsx';
import ExtensionTroubleshooting from '../../../components/extension-landing/extension-troubleshooting.jsx';
import InstallScratchLink from '../../../components/extension-landing/install-scratch-link.jsx';

import {isDownloaded} from '../../../components/install-scratch/install-util.js';

import '../../../components/extension-landing/extension-landing.scss';
import './download.scss';

const ScratchLink = ({intl}) => {
    const [os, setOS] = useState(detectOS());

    return (
        <div className="extension-landing link">
            <div className="extension-header">
                <FlexRow className="inner">
                    <FlexRow className="column extension-info">
                        <FlexRow className="column extension-copy">
                            <h1><img
                                alt={intl.formatMessage({id: 'scratchLink.linkLogo'})}
                                className="headline-icon"
                                src="/images/scratchlink/scratch-link-logo.svg"
                            />{intl.formatMessage({id: 'scratchLink.headerTitle'})}</h1>
                            <FormattedMessage id="scratchLink.headerText" />

                        </FlexRow>
                        <ExtensionRequirements
                            hideAndroid
                            hideChromeOS
                            hideScratchLink
                        />
                    </FlexRow>
                    <div className="extension-image">
                        <img src="/images/download/scratch-link-illustration.svg" />
                    </div>
                </FlexRow>
            </div>
            <OSChooser
                currentOS={os}
                handleSetOS={setOS}
                hideChromeOS
                hideAndroid
            />
            {(isDownloaded(os)) && (
                <InstallScratchLink
                    hideScratchLink
                    currentOS={os}
                />
            )}
            <ExtensionSection className="things-to-try">
                <h2><FormattedMessage id="scratchLink.thingsToTry" /></h2>
                <h3><FormattedMessage id="scratchLink.compatibleDevices" /></h3>
                <div className="hardware-cards">
                    <HardwareCard
                        cardUrl="/microbit"
                        description={intl.formatMessage({id: 'scratchLink.microbitDescription'})}
                        imageAlt={intl.formatMessage({id: 'scratchLink.microbitTitle'})}
                        imageSrc="/images/microbit/microbit.svg"
                        title={intl.formatMessage({id: 'scratchLink.microbitTitle'})}
                    />
                    <HardwareCard
                        cardUrl="/ev3"
                        description={intl.formatMessage({id: 'scratchLink.ev3Description'})}
                        imageAlt={intl.formatMessage({id: 'scratchLink.ev3Title'})}
                        imageSrc="/images/ev3/ev3.svg"
                        title={intl.formatMessage({id: 'scratchLink.ev3Title'})}
                    />
                    <HardwareCard
                        cardUrl="/wedo"
                        description={intl.formatMessage({id: 'scratchLink.wedoDescription'})}
                        imageAlt={intl.formatMessage({id: 'scratchLink.wedoTitle'})}
                        imageSrc="/images/wedo2/wedo2.svg"
                        title={intl.formatMessage({id: 'scratchLink.wedoTitle'})}
                    />
                    <HardwareCard
                        cardUrl="/boost"
                        description={intl.formatMessage({id: 'scratchLink.boostDescription'})}
                        imageAlt={intl.formatMessage({id: 'scratchLink.boostTitle'})}
                        imageSrc="/images/boost/boost.svg"
                        title={intl.formatMessage({id: 'scratchLink.boostTitle'})}
                    />
                    <HardwareCard
                        cardUrl="/vernier"
                        description={intl.formatMessage({id: 'scratchLink.vernierDescription'})}
                        imageAlt={intl.formatMessage({id: 'scratchLink.vernierTitle'})}
                        imageSrc="/images/gdxfor/gdxfor.svg"
                        title={intl.formatMessage({id: 'scratchLink.vernierTitle'})}
                    />
                </div>
            </ExtensionSection>
            <ExtensionTroubleshooting
                deviceName={intl.formatMessage({id: 'scratchLink.headerTitle'})}
                scratchLinkOnly
            >
                {isDownloaded(os) && (
                    <React.Fragment>
                        <h3 className="faq-title"><FormattedMessage id="scratchLink.checkOSVersionTitle" /></h3>
                        <p>
                            <FormattedMessage
                                id="scratchLink.checkOSVersionText"
                                values={{
                                    winOSVersionLink: (
                                        <a
                                            href="https://support.microsoft.com/en-us/help/13443/windows-which-operating-system"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <FormattedMessage id="scratchLink.winOSVersionLinkText" />
                                        </a>
                                    ),
                                    macOSVersionLink: (
                                        <a
                                            href="https://support.apple.com/en-us/HT201260"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <FormattedMessage id="scratchLink.macOSVersionLinkText" />
                                        </a>
                                    )
                                }}
                            />
                        </p>
                        <p><FormattedMessage id="extensions.checkOsVersionText2" /></p>
                    </React.Fragment>
                )}
                <h3 className="faq-title"><FormattedMessage id="scratchLink.closeScratchCopiesTitle" /></h3>
                <p>
                    <FormattedMessage id="scratchLink.closeScratchCopiesText" />
                </p>
            </ExtensionTroubleshooting>
        </div>
    );
};

ScratchLink.propTypes = {
    intl: intlShape.isRequired
};

const WrappedScratchLink = injectIntl(ScratchLink);

render(<Page><WrappedScratchLink /></Page>, document.getElementById('app'));
