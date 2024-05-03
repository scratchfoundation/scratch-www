const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../../flex-row/flex-row.jsx');
const FooterBox = require('../../container/footer.jsx');
const LanguageChooser = require('../../../languagechooser/languagechooser.jsx');
const {getLocale} = require('../../../../lib/locales');

require('../footer.scss');

const ConferenceFooter = () => (
    <FooterBox>
        <FlexRow className="scratch-links">
            <div className="family">
                <h4><FormattedMessage id="footer.scratchFamily" /></h4>
                <FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href="https://scratch.mit.edu">Scratch</a>
                        </li>
                        <li>
                            <a href="https://www.scratchjr.org/">ScratchJr</a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href="http://www.scratchfoundation.org/">Scratch Foundation</a>
                        </li>
                        <li>
                            <a href="http://scratched.gse.harvard.edu/">ScratchEd</a>
                        </li>
                    </FlexRow>
                    <FlexRow
                        as="ul"
                        className="column"
                    >
                        <li>
                            <a href="http://day.scratch.mit.edu">Scratch Day</a>
                        </li>
                        <li>
                            <a href="http://sip.scratch.mit.edu">Scratch In Practice</a>
                        </li>
                    </FlexRow>
                </FlexRow>
            </div>
            <div className="media">
                <div className="contact-us">
                    <h4>
                        <FormattedMessage id="general.contact" />
                    </h4>
                    <p>
                        <a href="mailto:help@scratch.mit.edu">
                            <FormattedMessage id="general.emailUs" />
                        </a>
                    </p>
                </div>
                <div className="social">
                    <FlexRow as="ul">
                        <li>
                            <a href="//www.twitter.com/scratch">
                                <img
                                    alt="scratch twitter"
                                    src="/images/conference/footer/twitter.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="//www.facebook.com/scratchteam">
                                <img
                                    alt="scratch facebook"
                                    src="/images/conference/footer/facebook.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="https://medium.com/scratchteam-blog">
                                <img
                                    alt="scratch foundation blog"
                                    src="/images/conference/footer/medium.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/mitscratchteam/">
                                <img
                                    alt="scratch instagram"
                                    src="/images/conference/footer/instagram.png"
                                />
                            </a>
                        </li>
                        <li>
                            <a href="https://scratch-foundation.myshopify.com/ ">
                                <img
                                    alt="scratch shopify"
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
