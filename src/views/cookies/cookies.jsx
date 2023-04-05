const React = require('react');
const injectIntl = require('react-intl').injectIntl;
const FormattedMessage = require('react-intl').FormattedMessage;

const Page = require('../../components/page/www/page.jsx');
const render = require('../../lib/render.jsx');

const InformationPage = require('../../components/informationpage/informationpage.jsx');

const bold = chunks => <b>{chunks}</b>;
const privacyPolicyLink = chunks => <a href="/privacy_policy">{chunks}</a>;
const manageLink = chunks => <a href="http://www.allaboutcookies.org/manage-cookies">{chunks}</a>;
const googlePoliciesLink = chunks => <a href="https://www.google.com/policies/privacy/partners">{chunks}</a>;
const optOutLink = chunks => <a href="https://tools.google.com/dlpage/gaoptout">{chunks}</a>;

require('./cookies.scss');

const Cookies = injectIntl(() => (
    <InformationPage
        title={
            <FormattedMessage id="cookies.title" />
        }
    >
        <div className="inner info-inner">
            <section>
                <p className="lastupdate">
                    <i>
                        <FormattedMessage id="cookies.lastUpdated" />
                    </i>
                </p>
                <p className="intro">
                    <FormattedMessage
                        id="cookies.intro1"
                        values={{
                            b: bold,
                            privacy: privacyPolicyLink
                        }}
                    />
                </p>
                <p className="intro">
                    <FormattedMessage
                        id="cookies.intro2"
                        values={{
                            b: bold
                        }}
                    />
                </p>
            </section>
            <section id="types">
                <dl>
                    <span className="nav-spacer" />
                    <h2><FormattedMessage id="cookies.types.title" /></h2>
                    <dt><FormattedMessage id="cookies.types.essentialTitle" /></dt>
                    <dd><FormattedMessage id="cookies.types.essentialIntro" /></dd>
                    <dd>
                        <table className="cookies-table">
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="cookies.table.name" /></th>
                                    <th><FormattedMessage id="cookies.table.provider" /></th>
                                    <th><FormattedMessage id="cookies.table.purpose" /></th>
                                    <th><FormattedMessage id="cookies.table.expiration" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>scratchcsrftoken</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.essential.csrf" /></td>
                                    <td>1 year</td>
                                    {/* how to get this localized? */}
                                </tr>
                                <tr>
                                    <td>scratchsessionid</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.essential.sessionID" /></td>
                                    <td>Session</td>
                                </tr>
                            </tbody>
                        </table>
                    </dd>
                    <dt><FormattedMessage id="cookies.types.functionalTitle" /></dt>
                    <dd><FormattedMessage id="cookies.types.functionalIntro" /></dd>
                    <dd>
                        <table className="cookies-table">
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="cookies.table.name" /></th>
                                    <th><FormattedMessage id="cookies.table.provider" /></th>
                                    <th><FormattedMessage id="cookies.table.purpose" /></th>
                                    <th><FormattedMessage id="cookies.table.expiration" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>permissions</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.permissions" /></td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <td>explore_by</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.exploreBy" /></td>
                                    <td>Session</td>
                                </tr>
                                <tr>
                                    <td>minilogSettings</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.minilogSettings" /></td>
                                    <td>Persistent</td>
                                </tr>
                                <tr>
                                    <td>scratchlanguage</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.scratchLanguage" /></td>
                                    <td>1 year</td>
                                </tr>
                                <tr>
                                    <td>wistia-video-progress-#</td>
                                    <td><a href="https://wistia.com/privacy">Wistia</a></td>
                                    <td><FormattedMessage id="cookies.functional.wistia" /></td>
                                    <td>Persistent</td>
                                </tr>
                            </tbody>
                        </table>
                    </dd>
                    <dt><FormattedMessage id="cookies.types.analyticsTitle" /></dt>
                    <dd>
                        <FormattedMessage
                            id="cookies.types.analyticsIntro"
                            values={{
                                policies: googlePoliciesLink,
                                optout: optOutLink
                            }}
                        />
                    </dd>
                </dl>
            </section>
            <section id="manage">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="cookies.manageTitle" /></h2>
                <p>
                    <FormattedMessage
                        id="cookies.manageBody"
                        values={{
                            a: manageLink
                        }}
                    />
                </p>
            </section>
            <section id="contact">
                <span className="nav-spacer" />
                <h2><FormattedMessage id="cookies.contactTitle" /></h2>
                <p><FormattedMessage id="cookies.contactIntro" /></p>
                <p>
                Scratch Foundation<br />
                ATTN: Cookie Policy<br />
                201 South Street<br />
                Suite 102<br />
                Boston, MA 02111<br />
                </p>
            </section>
        </div>
        <nav>
            <ol>
                <li><a href="#types"><FormattedMessage id="cookies.nav.types" /></a></li>
                <li><a href="#manage"><FormattedMessage id="cookies.nav.manage" /></a></li>
                <li><a href="#contact"><FormattedMessage id="cookies.nav.contact" /></a></li>
            </ol>
        </nav>
    </InformationPage>
));

render(<Page><Cookies /></Page>, document.getElementById('app'));
