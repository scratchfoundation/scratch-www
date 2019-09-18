const React = require('react');

const FlexRow = require('../../../flex-row/flex-row.jsx');
const FooterBox = require('../../container/footer.jsx');

require('../footer.scss');

const ConferenceFooter = () => (
    <FooterBox>
        <div className="collaborators">
            <h4>Sponsors</h4>
            <FlexRow as="ul">
                <li className="odl">
                    <a href="https://odl.mit.edu/">
                        <img
                            alt="MIT Office of Digital Learning"
                            src="/images/conference/footer/mit-odl.png"
                        />
                    </a>
                </li>
                <li className="intel">
                    <a href="http://www.intel.com/content/www/us/en/homepage.html">
                        <img
                            alt="Intel"
                            src="/images/conference/footer/intel.png"
                        />
                    </a>
                </li>
                <li className="lego">
                    <a href="http://www.legofoundation.com/">
                        <img
                            alt="LEGO Foundation"
                            src="/images/conference/footer/lego-foundation.png"
                        />
                    </a>
                </li>
                <li className="google">
                    <a href="http://www.google.com/">
                        <img
                            alt="Google"
                            src="/images/conference/footer/google.png"
                        />
                    </a>
                </li>
                <li className="siegel">
                    <a href="http://www.siegelendowment.org/">
                        <img
                            alt="Siegel Family Endowment"
                            src="/images/conference/footer/siegel-endowment.png"
                        />
                    </a>
                </li>
                <li className="nostarch">
                    <a href="https://www.nostarch.com/">
                        <img
                            alt="No Starch Press"
                            src="/images/conference/footer/no-starch.png"
                        />
                    </a>
                </li>
                <li className="scratchfoundation">
                    <a href="http://www.scratchfoundation.org/">
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
    </FooterBox>
);

module.exports = ConferenceFooter;
