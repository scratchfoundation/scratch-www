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
        <FlexRow className="scratch-links">
            <div className="family">
                <h4><FormattedMessage id="footer.scratchFamily" /></h4>
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
                            <a href={externalLinks.scratchFoundation.blog}>
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
        <LanguageChooser locale={getLocale()} />
    </FooterBox>
);

module.exports = ConferenceFooter;
