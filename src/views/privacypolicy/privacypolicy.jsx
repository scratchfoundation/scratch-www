const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const bold = chunks => <b>{chunks}</b>;
const contactUsLink = chunks => <a href="/contact-us">{chunks}</a>;
const downloadLink = chunks => <a href="/download">{chunks}</a>;
const cookiesLink = chunks => <a href="/cookies">{chunks}</a>;
const researchLink = chunks => <a href="/research">{chunks}</a>;
const termsOfUseLink = chunks => <a href="/terms_of_use">{chunks}</a>;
const guidelinesLink = chunks => <a href="/community_guidelines">{chunks}</a>;
const settingsLink = chunks => <a href="/accounts/settings">{chunks}</a>;
const resetPasswordLink = chunks => <a href="/accounts/password_change">{chunks}</a>;
const Privacypolicy = injectIntl(props => (
    <InformationPage
        title={props.intl.formatMessage({id: 'privacyPolicy.title'})}
    >
        <div className="inner info-inner">
            <section>
                <p className="lastupdate">
                    <i>
                        <FormattedMessage
                            id="privacyPolicy.lastUpdated"
                        />
                    </i>
                </p>
                <p className="intro">
                    <FormattedMessage
                        id="privacyPolicy.intro"
                        values={{
                            b: bold,
                            a: contactUsLink
                        }}
                    />
                </p>
                <p className="callout">
                    <FormattedMessage
                        id="privacyPolicy.offlineEditor"
                        values={{
                            a: downloadLink
                        }}
                    />
                </p>
            </section>
            <section id="collection">
                <dl>
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="privacyPolicy.collectionTitle" /></h2>
                    <p>
                        <FormattedMessage
                            id="privacyPolicy.collection1"
                            values={{
                                b: bold
                            }}
                        />
                    </p>
                    <p>
                        <FormattedMessage id="privacyPolicy.collection2" />
                    </p>
                    <h3><FormattedMessage id="privacyPolicy.youProvide" /></h3>
                    <dt><FormattedMessage id="privacyPolicy.accountInformationTitle" /></dt>
                    <dd>
                        <FormattedMessage id="privacyPolicy.accountInformationIntro" />
                        <ul>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.yourAccount"
                                    values={{
                                        b: bold
                                    }}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.teacherAccount"
                                    values={{
                                        b: bold
                                    }}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.studentAccount"
                                    values={{
                                        b: bold
                                    }}
                                />
                            </li>
                        </ul>
                    </dd>
                    <dt><FormattedMessage id="privacyPolicy.userGeneratedContentTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.userGeneratedContentBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.communicationsTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.communicationsBody" /></dd>
                    <h3><FormattedMessage id="privacyPolicy.automaticallyCollect" /></h3>
                    <dt><FormattedMessage id="privacyPolicy.locationInformationTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.locationInformationBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.cookiesTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="privacyPolicy.cookiesBody"
                            values={{
                                a: cookiesLink
                            }}
                        />
                    </dd>
                    <h3><FormattedMessage id="privacyPolicy.otherSources" /></h3>
                    <dt><FormattedMessage id="privacyPolicy.thirdPartyInformationTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.thirdPartyInformationBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.publicSourceInformationTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.publicSourceInformationBody" /></dd>
                </dl>
            </section>
            <section id="usage">
                <dl>
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="privacyPolicy.usageTitle" /></h2>
                    <p><FormattedMessage id="privacyPolicy.usageBody" /></p>
                    <dt><FormattedMessage id="privacyPolicy.usage.internalAndServiceTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.usage.internalAndServiceBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.usage.analyticsTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.usage.analyticsBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.communicationsTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.usage.communicationsBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.usage.researchTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="privacyPolicy.usage.researchBody"
                            values={{
                                a: researchLink
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="privacyPolicy.usage.legalTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="privacyPolicy.usage.legalBody"
                            values={{
                                terms: termsOfUseLink,
                                guidelines: guidelinesLink
                            }}
                        />
                    </dd>
                    <h2><FormattedMessage id="privacyPolicy.legalGrounds.title" /></h2>
                    <p><FormattedMessage id="privacyPolicy.legalGrounds.intro" /></p>
                    <ul>
                        <li>
                            <FormattedMessage id="privacyPolicy.legalGrounds.communications" />
                        </li>
                        <li>
                            <FormattedMessage id="privacyPolicy.legalGrounds.services" />
                        </li>
                        <li>
                            <FormattedMessage id="privacyPolicy.legalGrounds.obligation" />
                        </li>
                        <li>
                            <FormattedMessage id="privacyPolicy.legalGrounds.thirdParty" />
                        </li>
                    </ul>
                </dl>
            </section>
            <section id="share">
                <dl>
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="privacyPolicy.share.title" /></h2>
                    <p>
                        <FormattedMessage id="privacyPolicy.share.intro" />
                    </p>
                    <dt><FormattedMessage id="privacyPolicy.share.serviceProvidersTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.share.serviceProvidersBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.share.researchTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.share.researchBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.share.mergerTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.share.mergerBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.share.legalTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.share.legalBody" /></dd>
                </dl>
            </section>
            <section id="thirdparties">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.thirdPartyServices.title" /></h2>
                <p><FormattedMessage id="privacyPolicy.thirdPartyServices.body" /></p>
            </section>
            <section id="childprivacy">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.childPrivacy.title" /></h2>
                <p><FormattedMessage id="privacyPolicy.childPrivacy.body1" /></p>
                <p><FormattedMessage id="privacyPolicy.childPrivacy.body2" /></p>
            </section>
            <section id="rights">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.rights.title" /></h2>
                <dl>
                    <dt><FormattedMessage id="privacyPolicy.rights.updatingTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="privacyPolicy.rights.updatingBody1"
                            values={{
                                settings: settingsLink,
                                reset: resetPasswordLink
                            }}
                        />
                    </dd>
                    <dd>
                        <FormattedMessage id="privacyPolicy.rights.updatingBody2" />
                    </dd>
                    <dt><FormattedMessage id="privacyPolicy.rights.marketingTitle" /></dt>
                    <dd><FormattedMessage id="privacyPolicy.rights.marketingBody" /></dd>
                    <dt><FormattedMessage id="privacyPolicy.rights.data.title" /></dt>
                    <dd>
                        <p><FormattedMessage id="privacyPolicy.rights.data.intro" /></p>
                        <ul>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.rights.data.access"
                                    values={{b: bold}}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.rights.data.objection"
                                    values={{b: bold}}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.rights.data.deletion"
                                    values={{b: bold}}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.rights.data.restriction"
                                    values={{b: bold}}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.rights.data.consent"
                                    values={{b: bold}}
                                />
                            </li>
                        </ul>
                        <p><FormattedMessage id="privacyPolicy.rights.data.exceptions" /></p>
                    </dd>
                </dl>
            </section>
            <section id="retention">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.retentionTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.retentionBody" /></p>
            </section>
            <section id="protection">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.protectionTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.protectionBody" /></p>
            </section>
            <section id="transfer">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.transferTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.transferBody1" /></p>
                <p><FormattedMessage id="privacyPolicy.transferBody2" /></p>
            </section>
            <section id="help">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.helpTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.helpBody" /></p>
            </section>
            <section id="changes">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.changesTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.changesBody" /></p>
            </section>
            <section id="contact">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="privacyPolicy.contactTitle" /></h2>
                <p><FormattedMessage id="privacyPolicy.contactBody" /></p>
                <p>
                    Scratch Foundation<br />
                    ATTN: Privacy Policy<br />
                    201 South Street<br />
                    Unit 102<br />
                    Boston, MA 02111
                </p>
            </section>
        </div>
        <nav>
            <ol>
                <li><a href="#collection"><FormattedMessage id="privacyPolicy.nav.collection" /></a></li>
                <li><a href="#usage"><FormattedMessage id="privacyPolicy.nav.usage" /></a></li>
                <li><a href="#share"><FormattedMessage id="privacyPolicy.nav.share" /></a></li>
                <li><a href="#thirdparties"><FormattedMessage id="privacyPolicy.nav.thirdParties" /></a></li>
                <li><a href="#childprivacy"><FormattedMessage id="privacyPolicy.nav.childPrivacy" /></a></li>
                <li><a href="#rights"><FormattedMessage id="privacyPolicy.nav.rights" /></a></li>
                <li><a href="#retention"><FormattedMessage id="privacyPolicy.nav.retention" /></a></li>
                <li><a href="#protection"><FormattedMessage id="privacyPolicy.nav.protection" /></a></li>
                <li><a href="#transfer"><FormattedMessage id="privacyPolicy.nav.transfer" /></a></li>
                <li><a href="#help"><FormattedMessage id="privacyPolicy.nav.help" /></a></li>
                <li><a href="#changes"><FormattedMessage id="privacyPolicy.nav.changes" /></a></li>
                <li><a href="#contact"><FormattedMessage id="privacyPolicy.nav.contact" /></a></li>
            </ol>
        </nav>
    </InformationPage>
));

render(<Page><Privacypolicy /></Page>, document.getElementById('app'));
