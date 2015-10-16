var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;

var LanguageChooser = require('../languagechooser/languagechooser.jsx');

require('./footer.scss');

var Footer = React.createClass({
    type: 'Footer',
    render: function () {
        return (
            <div className="inner">
                <div className="lists">
                    <dl>
                        <dt>
                            <FormattedMessage
                                id='general.about'
                                defaultMessage={'About'} />
                        </dt>
                        <dd><a href="/about/">
                            <FormattedMessage
                                id='footer.about'
                                defaultMessage={'About Scratch'} />
                        </a></dd>
                        <dd><a href="/parents/">
                            <FormattedMessage
                                id='general.forParents'
                                defaultMessage={'For Parents'} />
                        </a></dd>
                        <dd><a href="/educators/">
                            <FormattedMessage
                                id='general.forEducators'
                                defaultMessage={'For Educators'} />
                        </a></dd>
                        <dd><a href="/info/credits/">
                            <FormattedMessage
                                id='general.credits'
                                defaultMessage={'Credits'} />
                        </a></dd>
                        <dd><a href="/jobs/">
                            <FormattedMessage
                                id='general.jobs'
                                defaultMessage={'Jobs'} />
                        </a></dd>
                        <dd><a href="http://wiki.scratch.mit.edu/wiki/Scratch_Press">
                            <FormattedMessage
                                id='general.press'
                                defaultMessage={'Press'} />
                        </a></dd>
                    </dl>

                    <dl>
                        <dt>
                            <FormattedMessage
                                id='general.communityHeader'
                                defaultMessage={'Community'} />
                        </dt>
                        <dd><a href="/community_guidelines/">
                            <FormattedMessage
                                id='general.guidelines'
                                defaultMessage={'Community Guidelines'} />
                        </a></dd>
                        <dd><a href="/discuss/">
                            <FormattedMessage
                                id='footer.discuss'
                                defaultMessage={'Discussion Forums'} />
                        </a></dd>
                        <dd><a href="https://wiki.scratch.mit.edu/">
                            <FormattedMessage
                                id='general.wiki'
                                defaultMessage={'Scratch Wiki'} />
                        </a></dd>
                        <dd><a href="/statistics/">
                            <FormattedMessage
                                id='general.statistics'
                                defaultMessage={'Statistics'} />
                        </a></dd>
                    </dl>

                    <dl>
                        <dt>
                            <FormattedMessage
                                id='general.support'
                                defaultMessage={'Support'} />
                        </dt>
                        <dd><a href="/help/">
                            <FormattedMessage
                                id='footer.help'
                                defaultMessage={'Help Page'} />
                        </a></dd>
                        <dd><a href="/info/faq/">
                            <FormattedMessage
                                id='general.faq'
                                defaultMessage={'FAQ'} />
                        </a></dd>
                        <dd><a href="/scratch2download/">
                            <FormattedMessage
                                id='general.offlineEditor'
                                defaultMessage={'Offline Editor'} />
                        </a></dd>
                        <dd><a href="/contact-us/">
                            <FormattedMessage
                                id='general.contactUs'
                                defaultMessage={'Contact Us'} />
                        </a></dd>
                        <dd><a href="https://secure.donationpay.org/codetolearn/">
                            <FormattedMessage
                                id='general.donate'
                                defaultMessage={'Donate'} />
                        </a></dd>
                    </dl>

                    <dl>
                        <dt>
                            <FormattedMessage
                                id='general.legal'
                                defaultMessage={'Legal'} />
                        </dt>
                        <dd><a href="/terms_of_use/">
                            <FormattedMessage
                                id='general.termsOfUse'
                                defaultMessage={'Terms of Use'} />
                            Terms of Use
                        </a></dd>
                        <dd><a href="/privacy_policy/">
                            <FormattedMessage
                                id='privacyPolicy'
                                defaultMessage={'Privacy Policy'} />
                        </a></dd>
                        <dd><a href="/DMCA/">
                            <FormattedMessage
                                id='general.dmca'
                                defaultMessage={'DMCA'} />
                        </a></dd>
                    </dl>

                    <dl>
                        <dt>
                            <FormattedMessage
                                id='footer.scratchFamily'
                                defaultMessage={'Scratch Family'} />
                        </dt>
                        <dd><a href="http://scratched.gse.harvard.edu/">
                            <FormattedMessage
                                id='general.scratchEd'
                                defaultMessage={'ScratchEd'} />
                        </a></dd>
                        <dd><a href="http://www.scratchjr.org/">
                            <FormattedMessage
                                id='general.scratchJr'
                                defaultMessage={'ScratchJr'} />
                        </a></dd>
                        <dd><a href="http://day.scratch.mit.edu/">
                            <FormattedMessage
                                id='general.scratchday'
                                defaultMessage={'Scratch Day'} />
                        </a></dd>
                        <dd><a href="/conference/">
                            <FormattedMessage
                                id='general.scratchConference'
                                defaultMessage={'Scratch Conference'} />
                        </a></dd>
                        <dd><a href="http://www.scratchfoundation.org/">
                            <FormattedMessage
                                id='general.scratchFoundation'
                                defaultMessage={'Scratch Foundation'} />
                        </a></dd>
                    </dl>
                </div>

                <LanguageChooser />

                <div className="copyright">
                    <p>
                        <FormattedMessage
                            id='general.copyright'
                            defaultMessage={
                                'Scratch is a project of the Lifelong Kindergarten Group at the MIT Media Lab'
                            } />
                    </p>
                </div>
            </div>
        );
    }
});

module.exports = Footer;
