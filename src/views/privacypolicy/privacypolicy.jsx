const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const injectIntl = require('react-intl').injectIntl;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

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
                            b: chunks => <b>{chunks}</b>,
                            a: chunks => <a href="/contact-us">{chunks}</a>
                        }}
                    />
                </p>
                <p className="callout">
                    <FormattedMessage
                        id="privacyPolicy.offlineEditor"
                        values={{
                            a: chunks => <a href="/download">{chunks}</a>
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
                                b: chunks => <b>{chunks}</b>
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
                                        b: chunks => <b>{chunks}</b>
                                    }}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.teacherAccount"
                                    values={{
                                        b: chunks => <b>{chunks}</b>
                                    }}
                                />
                            </li>
                            <li>
                                <FormattedMessage
                                    id="privacyPolicy.studentAccount"
                                    values={{
                                        b: chunks => <b>{chunks}</b>
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
                                a: chunks => <a href="/cookies">{chunks}</a>
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
                                a: chunks => <a href="/research">{chunks}</a>
                            }}
                        />
                    </dd>
                    <dt><FormattedMessage id="privacyPolicy.usage.legalTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="privacyPolicy.usage.legalBody"
                            values={{
                                terms: chunks => <a href="/terms_of_use">{chunks}</a>,
                                guidelines: chunks => <a href="/community_guidelines">{chunks}</a>
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
                <p>
                    <FormattedMessage
                        id="privacyPolicy.childPrivacy.body"
                        values={{
                            br: <br />
                        }}
                    />
                </p>
            </section>
            <section id="rights">
                <span className="nav-spacer" />
                <h2>Your Rights and Choices</h2>
                <p />
                <dl>
                    <dt>Updating Your Information</dt>
                    <dd>
                        You can update your password, email address, and country
                        through the <a href="/accounts/settings">Account
                            Settings</a> page. You can also reset your password
                        through the <a href="/accounts/password_change">Account
                            Reset</a> page. You cannot change your username, but you
                        can make a new account and manually copy your projects
                        to the new account.
                    </dd>
                    <dd>
                        If you want to delete your account, login to Scratch,
                        and then click your username in the top right-hand
                        corner. Select &#34;Account Settings,&#34; then click
                        the &#34;I want to delete my account&#34; link at the
                        bottom of the page.  Deleting your account hides all
                        information from public view, but does not remove all of
                        your information from our servers.  If you want to have
                        all of your information removed from our servers, please
                        contact help@scratch.mit.edu for assistance.
                    </dd>
                    <dt>Marketing Communications</dt>
                    <dd>
                        If you decide at any time that you no longer wish to
                        receive marketing communications from us, please follow
                        the unsubscribe instructions provided in any of the
                        communications. You may also opt out from receiving
                        email from us by sending your request to us by email at
                        help@scratch.mit.edu. Please be aware that, even after
                        you opt out from receiving marketing communications from
                        us, you may continue to receive administrative messages
                        from us regarding the Site.
                    </dd>
                    <dt>Your Data Protection Rights (EEA)</dt>
                    <dd>
                        In certain jurisdictions, you have the right to request
                        access and receive information about the Personal
                        Information we maintain about you, to update and correct
                        inaccuracies in your Personal Information, to restrict
                        or object to the processing of your Personal
                        Information, to have the information blocked,
                        anonymized, or deleted, as appropriate, or to exercise
                        your right to data portability to easily transfer your
                        Personal Information to another company. Those rights
                        may be limited in some circumstances by local law
                        requirements. In addition to the above-mentioned rights,
                        you also have the right to lodge a complaint with a
                        competent supervisory authority subject to applicable
                        law.
                    </dd>
                    <dd>
                        Where required by law, we obtain your consent for the
                        processing of certain Personal Information collected by
                        cookies or similar technologies, or used to send you
                        direct marketing communications, or when we carry out
                        other processing activities for which consent may be
                        required. If we rely on consent for the processing of
                        your Personal Information, you have the right to
                        withdraw it at any time and free of charge. When you do
                        so, this will not affect the lawfulness of the
                        processing before your consent withdrawal.
                    </dd>
                    <dd>
                        To update your preferences, ask us to remove your
                        information from our mailing lists, or submit a request
                        to exercise your rights under applicable law, please
                        contact us as specified in the “How to Contact Us”
                        section below.
                    </dd>
                </dl>
            </section>
            <section id="retention">
                <span className="nav-spacer" />
                <h2>Data Retention</h2>
                <p>
                    We take measures to delete your Personal Information or keep
                    it in a form that does not allow you to be identified when
                    this information is no longer necessary for the purposes for
                    which we process it, unless we are required by law to keep
                    this information for a longer period. When determining the
                    retention period, we take into account various criteria,
                    such as the type of services requested by or provided to
                    you, the nature and length of our relationship with you,
                    possible re-enrolment with our services, the impact on the
                    services we provide to you if we delete some information
                    from or about you, mandatory retention periods provided by
                    law and the statute of limitations.
                </p>
            </section>
            <section id="protection">
                <span className="nav-spacer" />
                <h2>How does the Scratch Team protect my personal information?</h2>
                <p>
                    The Scratch Team has in place administrative, physical, and
                    technical procedures that are intended to protect the
                    information we collect on the Scratch website against
                    accidental or unlawful destruction, accidental loss,
                    unauthorized alteration, unauthorized disclosure or access,
                    misuse, and any other unlawful form of processing of the
                    Personal Information in our possession. For example, we
                    use SSL/TLS for all data transfer and strictly limit access
                    to the Scratch servers and the data we store on them. However,
                    as effective as these measures are, no security system is
                    impenetrable. We cannot completely guarantee the security of
                    our databases, nor can we guarantee that the information you
                    supply will not be intercepted while being transmitted to us
                    over the Internet.
                </p>
            </section>
            <section id="changes">
                <span className="nav-spacer" />
                <h2>Notifications of changes to the Privacy Policy</h2>
                <p>
                    We review our security measures and Privacy Policy on a
                    periodic basis, and we may modify our policies as
                    appropriate. If we make material changes, we will notify you
                    through the Site or by sending you an email or other
                    communication. We encourage you to review our Privacy Policy
                    on a regular basis. The “Last Updated” date at the top of
                    this page indicates when this Privacy Policy was last
                    revised. Your continued use of the Site following these
                    changes means that you accept the revised Privacy Policy.
                </p>
            </section>
            <section id="transfer">
                <span className="nav-spacer" />
                <h2>International Cross-Border Data Transfer</h2>
                <p>
                    Scratch is based in the United States. Personal Information
                    that we collect may be transferred to, and stored at, any of
                    our affiliates, partners, or service providers which may be
                    inside or outside the European Economic Area, including the
                    United States. By submitting your personal data, you agree
                    to such transfers.
                </p>
            </section>
            <section id="help">
                <span className="nav-spacer" />
                <h2>What can I do to help protect privacy on Scratch?</h2>
                <p>
                    Please do not share personal contact information (such as
                    your name, physical address, email address, or phone number)
                    in projects, comments, profiles, studios, or forum posts.
                    Please let us know if you see this kind of information by
                    using the “Report” link which appears on the page. It is
                    also important that you maintain the security and control
                    of your account credentials, and not share your password
                    with anyone.
                </p>
            </section>
            <section id="contact">
                <span className="nav-spacer" />
                <h2>Contact Us</h2>
                <p>
                    The Code-to-Learn Foundation d/b/a The Scratch Foundation is
                    the entity responsible for the processing of your Personal
                    Information. If you have any questions about this Privacy
                    Policy, or if you would like to exercise your rights to your
                    Personal Information, you may contact us at
                    help@scratch.mit.edu or via mail at:
                </p>
                <p>
                    Scratch Foundation<br />
                    ATTN: Privacy Policy<br />
                    7315 Wisconsin Ave.<br />
                    4th Floor West<br />
                    Bethesda, MD 20814
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
                <li><a href="#changes"><FormattedMessage id="privacyPolicy.nav.changes" /></a></li>
                <li><a href="#transfer"><FormattedMessage id="privacyPolicy.nav.transfer" /></a></li>
                <li><a href="#help"><FormattedMessage id="privacyPolicy.nav.help" /></a></li>
                <li><a href="#contact"><FormattedMessage id="privacyPolicy.nav.contact" /></a></li>
            </ol>
        </nav>
    </InformationPage>
));

render(<Page><Privacypolicy /></Page>, document.getElementById('app'));
