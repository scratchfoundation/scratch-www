const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const FormattedMessage = require('react-intl').FormattedMessage;
const React = require('react');

const FlexRow = require('../../../flex-row/flex-row.jsx');
const FooterBox = require('../../container/footer.jsx');
const LanguageChooser = require('../../../languagechooser/languagechooser.jsx');

require('../footer.scss');

const ConferenceFooter = props => (
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
                    </FlexRow>
                </FlexRow>
            </div>
            <div className="media">
                <div className="contact-us">
                    <h4>Contact</h4>
                    <p>
                        <a href="mailto:help@scratch.mit.edu">
                            Email Us
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
                            <a href="http://medium.com/scratchfoundation-blog">
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
        <LanguageChooser locale={props.intl.locale} />
    </FooterBox>
);

ConferenceFooter.propTypes = {
    intl: intlShape
};

module.exports = injectIntl(ConferenceFooter);
