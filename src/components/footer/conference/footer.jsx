var React = require('react');

var FlexRow = require('../../flex-row/flex-row.jsx');
var FooterBox = require('../container/footer.jsx');

require('./footer.scss');

var ConferenceFooter = React.createClass({
    type: 'ConferenceFooter',
    render: function () {
        return (
            <FooterBox>
                <div className="collaborators">
                    <h4>Sponsors</h4>
                    <FlexRow as="ul">
                        <li>
                            <a href="https://odl.mit.edu/">
                                <img src="/images/conference/footer/mit-odl.png"
                                     alt="MIT Office of Digital Learning" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.scratchfoundation.org/">
                                <img src="/images/conference/footer/scratch-foundation.png"
                                     alt="Scratch Foundation" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.legofoundation.com/">
                                <img src="/images/conference/footer/lego-foundation.png"
                                     alt="LEGO Foundation" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.google.com/">
                                <img src="/images/conference/footer/google.png"
                                     alt="Google" />
                            </a>
                        </li>
                        <li>
                            <a href="http://www.siegelendowment.org/">
                                <img src="/images/conference/footer/siegel-endowment.png"
                                     alt="Siegel Family Endowment" />
                            </a>
                        </li>
                    </FlexRow>
                </div>
                <FlexRow className="scratch-links">
                    <div className="family">
                        <h4>Scratch Family</h4>
                        <FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="https://scratch.mit.edu" target="_blank">Scratch</a>
                                </li>
                                <li>
                                    <a href="http://www.scratchjr.org/" target="_blank">ScratchJr</a>
                                </li>
                            </FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="http://www.scratchfoundation.org/" target="_blank">Scratch Foundation</a>
                                </li>
                                <li>
                                    <a href="http://scratched.gse.harvard.edu/" target="_blank">ScratchEd</a>
                                </li>
                            </FlexRow>
                            <FlexRow as="ul" className="column">
                                <li>
                                    <a href="http://day.scratch.mit.edu" target="_blank">Scratch Day</a>
                                </li>
                            </FlexRow>
                        </FlexRow>
                        <p className="legal">
                            Scratch is a project of the Lifelong Kindergarten Group at the MIT Media Lab.
                        </p>
                    </div>
                    <div className="media">
                        <div className="contact-us">
                            <h4>Contact</h4>
                            <p>
                                <a href="mailto:help@scratch.mit.edu" target="_blank">
                                    Email Us
                                </a>
                            </p>
                        </div>
                        <div className="social">
                            <FlexRow as="ul">
                                <li>
                                    <a href="//www.twitter.com/scratch" target="_blank">
                                        <img src="/images/conference/footer/twitter.png" alt="scratch twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a href="//www.facebook.com/scratchteam" target="_blank">
                                        <img src="/images/conference/footer/facebook.png" alt="scratch facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a href="http://medium.com/scratchfoundation-blog" target="_blank">
                                        <img src="/images/conference/footer/medium.png" alt="scratch foundation blog" />
                                    </a>
                                </li>
                            </FlexRow>
                        </div>
                    </div>
                </FlexRow>
            </FooterBox>
        );
    }
});

module.exports = ConferenceFooter;
