const React = require('react');

const FlexRow = require('../../../flex-row/flex-row.jsx');
const FooterBox = require('../../container/footer.jsx');
const externalLinks = require('../../../../lib/external-links.js');

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
                            src="/images/conference/footer/mit-odl.png"
                        />
                    </a>
                </li>
                <li className="intel">
                    <a href={externalLinks.intel.homepage}>
                        <img
                            alt="Intel"
                            src="/images/conference/footer/intel.png"
                        />
                    </a>
                </li>
                <li className="lego">
                    <a href={externalLinks.lego.foundation}>
                        <img
                            alt="LEGO Foundation"
                            src="/images/conference/footer/lego-foundation.png"
                        />
                    </a>
                </li>
                <li className="google">
                    <a href={externalLinks.google.homepage}>
                        <img
                            alt="Google"
                            src="/images/conference/footer/google.png"
                        />
                    </a>
                </li>
                <li className="siegel">
                    <a href={externalLinks.siegelFamilyEndowment.homepage}>
                        <img
                            alt="Siegel Family Endowment"
                            src="/images/conference/footer/siegel-endowment.png"
                        />
                    </a>
                </li>
                <li className="nostarch">
                    <a href={externalLinks.noStarchPress.homepage}>
                        <img
                            alt="No Starch Press"
                            src="/images/conference/footer/no-starch.png"
                        />
                    </a>
                </li>
                <li className="scratchfoundation">
                    <a href={externalLinks.scratchFoundation.homepage}>
                        <img
                            alt="Scratch Foundation"
                            src="/images/conference/footer/scratch-foundation.png"
                        />
                    </a>
                </li>
            </FlexRow>
        </div>
        <FlexRow className="scratch-links">
            <div className="family">
                <h4>Scratch Family</h4>
                <FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href="/">Scratch</a>
                        </li>
                        <li>
                            <a href={externalLinks.scratchJr.homepage}>ScratchJr</a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href={externalLinks.scratchFoundation.homepage}>Scratch Foundation</a>
                        </li>
                        <li>
                            <a href={externalLinks.hgse.scratchEd}>ScratchEd</a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href={externalLinks.scratch.day}>Scratch Day</a>
                        </li>
                    </FlexRow>
                </FlexRow>
            </div>
            <div className="media">
                <div className="contact-us">
                    <h4>Contact</h4>
                    <p>
                        <a href={`mailto:${externalLinks.scratch.helpEmail}`}>
                            Email Us
                        </a>
                    </p>
                </div>
                <div className="social">
                    <FlexRow as="ul">
                        <li>
                            <a href={externalLinks.scratch.twitter}>
                                <img
                                    alt="scratch twitter"
                                    src="/images/conference/footer/twitter.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href={externalLinks.scratch.facebook}>
                                <img
                                    alt="scratch facebook"
                                    src="/images/conference/footer/facebook.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href={externalLinks.scratch.blog}>
                                <img
                                    alt="scratch foundation blog"
                                    src="/images/conference/footer/medium.png"
                                />
                            </a>
                        </li>
                    </FlexRow>
                </div>
            </div>
        </FlexRow>
    </FooterBox>
);

module.exports = ConferenceFooter;
