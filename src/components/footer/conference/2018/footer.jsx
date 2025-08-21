const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../../flex-row/flex-row.jsx');
const FooterBox = require('../../container/footer.jsx');
const LanguageChooser = require('../../../languagechooser/languagechooser.jsx');
const externalLinks = require('../../../../lib/external-links.js');
const {getLocale} = require('../../../../lib/locales.js');

require('../footer.scss');

const ConferenceFooter = () => (
    <FooterBox>
        <div className="collaborators">
            <h4>Sponsors</h4>
            <FlexRow as="ul">
                <li className="odl">
                    <a href={externalLinks.mit.odl}>
                        <img
                            alt="MIT Office of Digital Learning"
                            src="/images/conference/footer/2018/mit-ol-logo.png"
                        />
                    </a>
                </li>
                <li className="google">
                    <a href={externalLinks.google.homepage}>
                        <img
                            alt="Google"
                            src="/images/conference/footer/2018/google.png"
                        />
                    </a>
                </li>
                <li className="epam">
                    <a href={externalLinks.epam.homepage}>
                        <img
                            alt="EPAM Systems"
                            src="/images/conference/footer/2018/epam.png"
                        />
                    </a>
                </li>
                <li className="intel">
                    <a href={externalLinks.intel.homepage}>
                        <img
                            alt="Intel"
                            src="/images/conference/footer/2018/intel.png"
                        />
                    </a>
                </li>
                <li className="lego">
                    <a href={externalLinks.lego.foundation}>
                        <img
                            alt="The LEGO Foundation"
                            src="/images/conference/footer/2018/lego-foundation.png"
                        />
                    </a>
                </li>
                <li className="siegel">
                    <a href={externalLinks.siegelFamilyEndowment.homepage}>
                        <img
                            alt="Siegel Family Endowment"
                            src="/images/conference/footer/2018/siegel.png"
                        />
                    </a>
                </li>
                <li className="cartoon-network">
                    <a href={externalLinks.cartoonNetwork.homepage}>
                        <img
                            alt="Cartoon Network"
                            src="/images/conference/footer/2018/cartoon-network.png"
                        />
                    </a>
                </li>
                <li className="scratchfoundation">
                    <a href={externalLinks.scratchFoundation.homepage}>
                        <img
                            alt="Scratch Foundation"
                            src="/images/conference/footer/2018/scratch-foundation.png"
                        />
                    </a>
                </li>
            </FlexRow>
        </div>
        <FlexRow className="scratch-links">
            <div className="family">
                <h4><FormattedMessage id="footer.scratchFamily" /></h4>
                <FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a
                                href="/"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Scratch
                            </a>
                        </li>
                        <li>
                            <a
                                href={externalLinks.scratchJr.homepage}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ScratchJr
                            </a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a
                                href={externalLinks.scratchFoundation.homepage}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Scratch Foundation
                            </a>
                        </li>
                        <li>
                            <a
                                href={externalLinks.hgse.scratchEd}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                ScratchEd
                            </a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a
                                href={externalLinks.scratch.day}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Scratch Day
                            </a>
                        </li>
                    </FlexRow>
                </FlexRow>
            </div>
            <div className="media">
                <div className="contact-us">
                    <h4>Contact</h4>
                    <p>
                        <a
                            href={externalLinks.scratch.conferenceEmail}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Email Us
                        </a>
                    </p>
                </div>
                <div className="social">
                    <FlexRow as="ul">
                        <li>
                            <a
                                href={externalLinks.scratch.twitter}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <img
                                    alt="scratch twitter"
                                    src="/images/conference/footer/twitter.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href={externalLinks.scratch.facebook}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <img
                                    alt="scratch facebook"
                                    src="/images/conference/footer/facebook.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href={externalLinks.scratch.blog}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <img
                                    alt="scratch team blog"
                                    src="/images/conference/footer/medium.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                href={externalLinks.scratchFoundation.shop}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                <img
                                    alt="scratch store"
                                    src="/images/conference/footer/shopify-white.svg"
                                />
                            </a>
                        </li>
                    </FlexRow>
                </div>
            </div>
        </FlexRow>
        <LanguageChooser locale={getLocale()} />
    </FooterBox>
);

module.exports = ConferenceFooter;
