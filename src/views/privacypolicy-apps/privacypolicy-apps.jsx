const React = require('react');

const FormattedMessage = require('react-intl').FormattedMessage;
const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const PrivacyPolicyApps = props => (
    <InformationPage title={props.intl.formatMessage({id: 'privacyApps.title'})}>
        <div className="inner info-inner">
            <section>
                <p className="lastupdate">
                    <i>
                        <FormattedMessage id="privacyApps.updated" />
                    </i>
                </p>
                <p className="intro">
                    <FormattedMessage id="privacyApps.intro" />
                </p>
            </section>
            <section id="collection">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.collectionHeader" />
                    </h3>
                    <p>
                        <FormattedMessage
                            id="privacyApps.collectionParagraph"
                            values={{
                                privacyPolicyLink: (
                                    <a href="/privacy_policy/">
                                        <FormattedMessage id="privacyApps.privacyPolicyLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                </dl>
            </section>
            <section id="usage">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.usageHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.usageIntro" />
                    </p>
                    <dt>
                        <FormattedMessage id="privacyApps.analyticsTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.analyticsDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.researchTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage
                            id="privacyApps.researchDescription"
                            values={{
                                researchPageLink: (
                                    <a href="/research/">
                                        <FormattedMessage id="privacyApps.researchPageLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.legalTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage
                            id="privacyApps.legalDescription"
                            values={{
                                termsOfUseLink: (
                                    <a href="/terms_of_use/">
                                        <FormattedMessage id="privacyApps.termsOfUseLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </dd>
                </dl>
            </section>
            <section id="processing">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.processingHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.processingParagraph" />
                    </p>
                </dl>
            </section>
            <section id="sharing">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.sharingHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.sharingIntro" />
                    </p>
                    <dt>
                        <FormattedMessage id="privacyApps.serviceProvidersTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.serviceProvidersDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.researchTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.researchSharingDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.mergerTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.mergerDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.legalTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.legalSharingDescription" />
                    </dd>
                </dl>
            </section>
            <section id="community">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.communityHeader" />
                    </h3>
                    <p>
                        <FormattedMessage
                            id="privacyApps.communityParagraph"
                            values={{
                                privacyPolicyLink: (
                                    <a href="/privacy_policy/">
                                        <FormattedMessage id="privacyApps.privacyPolicyLinkText" />
                                    </a>
                                )
                            }}
                        />
                    </p>
                </dl>
            </section>
            <section id="students">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.studentsHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.coppa" />
                    </p>
                    <p>
                        <FormattedMessage id="privacyApps.ferpa" />
                    </p>
                </dl>
            </section>
            <section id="eea">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.eeaHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.eeaIntro" />
                    </p>
                    <dt>
                        <FormattedMessage id="privacyApps.accessTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.accessDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.objectionTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.objectionDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.deletionTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage
                            id="privacyApps.deletionDescription"
                            values={{
                                helpEmail: (
                                    <a href="mailto:help@scratch.mit.edu">
                                        help@scratch.mit.edu
                                    </a>
                                )
                            }}
                        />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.restrictionTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.restrictionDescription" />
                    </dd>
                    <dt>
                        <FormattedMessage id="privacyApps.withdrawalTitle" />
                    </dt>
                    <dd>
                        <FormattedMessage id="privacyApps.withdrawalDescription" />
                    </dd>
                    <p>
                        <FormattedMessage
                            id="privacyApps.eeaComplaint"
                            values={{
                                helpEmail: (
                                    <a href="mailto:help@scratch.mit.edu">
                                        help@scratch.mit.edu
                                    </a>
                                )
                            }}
                        />
                    </p>
                </dl>
            </section>
            <section id="retention">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.retentionHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.retentionParagraph" />
                    </p>
                </dl>
            </section>
            <section id="protect">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.protectHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.protectParagraph" />
                    </p>
                </dl>
            </section>
            <section id="international-transfer">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.internationalTransferHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.internationalTransferParagraph" />
                    </p>
                </dl>
            </section>
            <section id="notifications">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.notificationsHeader" />
                    </h3>
                    <p>
                        <FormattedMessage id="privacyApps.notificationsParagraph" />
                    </p>
                </dl>
            </section>
            <section id="contact">
                <dl>
                    <span className="nav-spacer" />
                    <h3>
                        <FormattedMessage id="privacyApps.contactHeader" />
                    </h3>
                    <p>
                        <FormattedMessage
                            id="privacyApps.contactIntro"
                            values={{
                                helpEmail: (
                                    <a href="mailto:help@scratch.mit.edu">
                                        help@scratch.mit.edu
                                    </a>
                                )
                            }}
                        />
                    </p>
                    <p>
                        Scratch Foundation<br />
                        ATTN: Privacy Policy<br />
                        201 South Street<br />
                        Boston, MA, 02111
                    </p>
                </dl>
            </section>
        </div>
    </InformationPage>
);

PrivacyPolicyApps.propTypes = {
    intl: intlShape
};

const IntlPrivacyPolicyApps = injectIntl(PrivacyPolicyApps);

render(<Page><IntlPrivacyPolicyApps /></Page>, document.getElementById('app'));
