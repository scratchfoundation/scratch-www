const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const MediaQuery = require('react-responsive').default;
const React = require('react');

const FooterBox = require('../container/footer.jsx');
const LanguageChooser = require('../../languagechooser/languagechooser.jsx');

const frameless = require('../../../lib/frameless');

require('./footer.scss');

var interwiki_mapping = {
            'de': 'https://de.scratch-wiki.info',
            'ru': 'https://ru.scratch-wiki.info/',
            'nl': 'https://nl.scratch-wiki.info/',
            'id': 'https://id.scratch-wiki.info/',
            'ja': 'https://ja.scratch-wiki.info/',
            'hu': 'https://hu.scratch-wiki.info/',
            'fr': 'https://fr.scratch-wiki.info/',
            'ita': 'https://test.scratch-wiki.info/wiki/Ita:Pagina_Iniziale',
            'spa': 'https://test.scratch-wiki.info/wiki/Spa:Scratch_Wiki_Espa%C3%B1ol',
            'por': 'https://test.scratch-wiki.info/wiki/Por:In%C3%ADcio_do_Wiki_do_Scratch',
            'tur': 'https://test.scratch-wiki.info/wiki/Tur:Ana_Sayfa',
            'hin': 'https://test.scratch-wiki.info/wiki/Hin:%E0%A4%AE%E0%A5%81%E0%A4%96%E0%A4%AA%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%A0',
            'pol': 'https://test.scratch-wiki.info/wiki/Pol:Strona_g%C5%82%C3%B3wna',
            'zho': 'https://test.scratch-wiki.info/wiki/Zho:%E9%A6%96%E9%A1%B5',
            'kor': 'https://test.scratch-wiki.info/wiki/Kor:%EC%8A%A4%ED%81%AC%EB%9E%98%EC%B9%98_%EC%9C%84%ED%82%A4_%EB%8C%80%EB%AC%B8',
            'heb': 'https://test.scratch-wiki.info/wiki/Heb:%D7%A2%D7%9E%D7%95%D7%93_%D7%A8%D7%90%D7%A9%D7%99',
            'slv': 'https://test.scratch-wiki.info/wiki/Slv:Glavna_stran',
            'ara': 'https://test.scratch-wiki.info/wiki/Ara:%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9_%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9',
            'lat': 'https://test.scratch-wiki.info/wiki/Lat:Pagina_prima',
            'ukr': 'https://test.scratch-wiki.info/wiki/Ukr:%D0%93%D0%BE%D0%BB%D0%BE%D0%B2%D0%BD%D0%B0_%D0%A1%D1%82%D0%BE%D1%80%D1%96%D0%BD%D0%BA%D0%B0',
            'sqi': 'https://test.scratch-wiki.info/wiki/Sqi:Faqja_Kryesore',
            'ben': 'https://test.scratch-wiki.info/wiki/Ben:%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%A7%E0%A6%BE%E0%A6%A8_%E0%A6%AA%E0%A6%BE%E0%A6%A4%E0%A6%BE'
        };
        var wiki_link = null;
        if (this.props.intl.locale in interwiki_mapping) {
            wikilink = interwiki_mapping[this.props.intl.locale];
        } else {
            wikilink = 'https://en.scratch-wiki.info';
        }

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
                        <a href="https://www.scratchfoundation.org/opportunities">
                            <FormattedMessage id="general.jobs" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://www.scratchfoundation.org/media-kit/">
                            <FormattedMessage id="general.press" />
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
                        <a href="{wikilink}">
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
                        <a href="/info/faq">
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
                    <dd>
                        <a href="/store">
                            <FormattedMessage id="general.scratchStore" />
                        </a>
                    </dd>
                    <dd>
                        <a href="https://secure.donationpay.org/scratchfoundation/">
                            <FormattedMessage id="general.donate" />
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
                        <a href="/conference">
                            <FormattedMessage id="general.scratchConference" />
                        </a>
                    </dd>
                    <dd>
                        <a href="http://www.scratchfoundation.org/">
                            <FormattedMessage id="general.scratchFoundation" />
                        </a>
                    </dd>
                </dl>
            </div>
        </MediaQuery>
        <LanguageChooser locale={props.intl.locale} />
    </FooterBox>
);

Footer.propTypes = {
    intl: intlShape.isRequired
};

module.exports = injectIntl(Footer);
