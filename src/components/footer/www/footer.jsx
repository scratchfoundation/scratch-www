const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const MediaQuery = require('react-responsive').default;
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const FooterBox = require('../container/footer.jsx');
const LanguageChooser = require('../../languagechooser/languagechooser.jsx');

const frameless = require('../../../lib/frameless');
const intlShape = require('../../../lib/intl-shape');
const {getLocale} = require('../../../lib/locales.js');
const getScratchWikiLink = require('../../../lib/scratch-wiki');

require('./footer.scss');

const Footer = props => (
    <FooterBox>
        <MediaQuery maxWidth={frameless.mobileIntermediate - 1}>
            <div className="lists">
                <dl>
                    <dd>
                        <a href="/about">
                            <FormattedMessage id="general.aboutScratch" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchfoundation.org/opportunities">
                            <FormattedMessage id="general.jobs" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/contact-us/">
                            <FormattedMessage id="general.contactUs" />
                        </a>
                    </dd>
                </dl>
                <dl>
                    <dd>
                        <a href="/terms_of_use">
                            <FormattedMessage id="general.termsOfUse" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/privacy_policy">
                            <FormattedMessage id="general.privacyPolicy" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/community_guidelines">
                            <FormattedMessage id="general.guidelines" />
                        </a>
                    </dd>
                </dl>
            </div>
        </MediaQuery>
        <MediaQuery minWidth={frameless.mobileIntermediate}>
            <div className="lists">
                <dl>
                    <dt>
                        <FormattedMessage id="general.about" />
                    </dt>
                    <dd>
                        <a href="/about">
                            <FormattedMessage id="general.aboutScratch" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/parents/">
                            <FormattedMessage id="general.forParents" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/educators">
                            <FormattedMessage id="general.forEducators" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/developers">
                            <FormattedMessage id="general.forDevelopers" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/credits">
                            <FormattedMessage id="general.credits" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://scratchfoundation.org/supporters">
                            <FormattedMessage id="general.donors" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchfoundation.org/careers">
                            <FormattedMessage id="general.jobs" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchfoundation.org/donate">
                            <FormattedMessage id="general.donate" />
                        </a>
                    </dd>

                </dl>
                <dl>
                    <dt>
                        <FormattedMessage id="general.community" />
                    </dt>
                    <dd>
                        <a href="/community_guidelines">
                            <FormattedMessage id="general.guidelines" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/discuss/">
                            <FormattedMessage id="footer.discuss" />
                        </a>
                    </dd>
                    <dd>
                        <a href={props.scratchWikiLink}>
                            <FormattedMessage id="general.wiki" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/statistics/">
                            <FormattedMessage id="general.statistics" />
                        </a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <FormattedMessage id="general.support" />
                    </dt>
                    <dd>
                        <a href="/ideas">
                            <FormattedMessage id="general.ideas" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/faq">
                            <FormattedMessage id="general.faq" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/download">
                            <FormattedMessage id="general.download" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/contact-us/">
                            <FormattedMessage id="general.contactUs" />
                        </a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <FormattedMessage id="general.legal" />
                    </dt>
                    <dd>
                        <a href="/terms_of_use">
                            <FormattedMessage id="general.termsOfUse" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/privacy_policy">
                            <FormattedMessage id="general.privacyPolicy" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/DMCA">
                            <FormattedMessage id="general.dmca" />
                        </a>
                    </dd>
                </dl>

                <dl>
                    <dt>
                        <FormattedMessage id="footer.scratchFamily" />
                    </dt>
                    <dd>
                        <a href="http://scratched.gse.harvard.edu/">
                            <FormattedMessage id="general.scratchEd" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchjr.org/">
                            <FormattedMessage id="general.scratchJr" />
                        </a>
                    </dd>
                    <dd>
                        <a href="http://day.scratch.mit.edu/">
                            Scratch Day
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchfoundation.org/scratch-conference">
                            <FormattedMessage id="general.scratchConference" />
                        </a>
                    </dd>
                    <dd>
                        <a href="http://www.scratchfoundation.org/">
                            <FormattedMessage id="general.scratchFoundation" />
                        </a>
                    </dd>
                    <dd>
                        <a href="/store">
                            <FormattedMessage id="general.scratchStore" />
                        </a>
                    </dd>

                </dl>
            </div>
        </MediaQuery>
        <LanguageChooser locale={getLocale()} />
    </FooterBox>
);

Footer.propTypes = {
    intl: intlShape.isRequired, // eslint-disable-line react/no-unused-prop-types
    scratchWikiLink: PropTypes.string
};

const mapStateToProps = (state, ownProps) => ({
    scratchWikiLink: getScratchWikiLink(ownProps.intl.locale)
});

const ConnectedFooter = connect(mapStateToProps)(Footer);
module.exports = injectIntl(ConnectedFooter);
