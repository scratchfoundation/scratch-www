var React = require('react');

var LanguageChooser = require('../languagechooser/languagechooser.jsx');

require('./footer.scss');

var Footer = React.createClass({
    type: 'Footer',
    render: function () {
        return (
            <div className="inner">
                <div className="lists">
                    <dl>
                        <dt>About</dt>
                        <dd><a href="/about/">About Scratch</a></dd>
                        <dd><a href="/parents/">For Parents</a></dd>
                        <dd><a href="/educators/">For Educators</a></dd>
                        <dd><a href="/info/credits/">Credits</a></dd>
                        <dd><a href="/jobs/">Jobs</a></dd>
                        <dd><a href="http://wiki.scratch.mit.edu/wiki/Scratch_Press">Press</a></dd>
                    </dl>

                    <dl>
                        <dt>Community</dt>
                        <dd><a href="/community_guidelines/">Community Guidelines</a></dd>
                        <dd><a href="/discuss/">Discussion Forums</a></dd>
                        <dd><a href="https://wiki.scratch.mit.edu/">Scratch Wiki</a></dd>
                        <dd><a href="/statistics/">Statistics</a></dd>
                    </dl>

                    <dl>
                        <dt>Support</dt>
                        <dd><a href="/help/">Help Page</a></dd>
                        <dd><a href="/info/faq/">FAQ</a></dd>
                        <dd><a href="/scratch2download/">Offline Editor</a></dd>
                        <dd><a href="/contact-us/">Contact Us</a></dd>
                        <dd><a href="https://secure.donationpay.org/codetolearn/">Donate</a></dd>
                    </dl>

                    <dl>
                        <dt>Legal</dt>
                        <dd><a href="/terms_of_use/">Terms of Use</a></dd>
                        <dd><a href="/privacy_policy/">Privacy Policy</a></dd>
                        <dd><a href="/DMCA/">DMCA</a></dd>
                    </dl>

                    <dl>
                        <dt>Scratch Family</dt>
                        <dd><a href="http://scratched.gse.harvard.edu/">ScratchEd</a></dd>
                        <dd><a href="http://www.scratchjr.org/">ScratchJr</a></dd>
                        <dd><a href="http://day.scratch.mit.edu/">Scratch Day</a></dd>
                        <dd><a href="/conference/">Scratch Conference</a></dd>
                        <dd><a href="http://www.scratchfoundation.org/">Scratch Foundation</a></dd>
                    </dl>
                </div>

                <LanguageChooser />

                <div className="copyright">
                    <p>Scratch is a project of the Lifelong Kindergarten Group at the MIT Media Lab</p>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
