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
// When this page was last updated. See 'click Cookies link' in footer-links.test.js if you update this value.
const updated = new Date('2023-07-06T12:00:00.000-04:00');

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
                        <FormattedMessage
                            id="cookies.lastUpdatedFormat"
                            values={{updated}}
                        />
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
                                    <td><FormattedMessage id="cookies.table.years.1" /></td>
                                </tr>
                                <tr>
                                    <td>scratchsessionsid</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.essential.sessionID" /></td>
                                    <td><FormattedMessage id="cookies.table.weeks.2" /></td>
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
                                    <td><FormattedMessage id="cookies.table.years.1" /></td>
                                </tr>
                                <tr>
                                    <td>explore_by</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.exploreBy" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>minilogSettings</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.minilogSettings" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>scratchlanguage</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.scratchLanguage" /></td>
                                    <td><FormattedMessage id="cookies.table.years.1" /></td>
                                </tr>
                                <tr>
                                    <td>scratchpolicyseen</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.scratchPolicySeen" /></td>
                                    <td><FormattedMessage id="cookies.table.weeks.3" /></td>
                                </tr>
                                <tr>
                                    <td>scratchtheme</td>
                                    <td><a href="/privacy_policy">Scratch</a></td>
                                    <td><FormattedMessage id="cookies.functional.scratchTheme" /></td>
                                    <td><FormattedMessage id="cookies.table.years.1" /></td>
                                </tr>
                                <tr>
                                    <td>wistia-video-progress-#</td>
                                    <td><a href="https://wistia.com/privacy">Wistia</a></td>
                                    <td><FormattedMessage id="cookies.functional.wistia" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
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
                                    <td>_ga</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.ga" /></td>
                                    <td><FormattedMessage id="cookies.table.years.2" /></td>
                                </tr>
                                <tr>
                                    <td>_gat</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.gat" /></td>
                                    <td><FormattedMessage id="cookies.table.days.1" /></td>
                                </tr>
                                <tr>
                                    <td>_gid</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.gid" /></td>
                                    <td><FormattedMessage id="cookies.table.days.1" /></td>
                                </tr>
                                <tr>
                                    <td>__utma</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.utma" /></td>
                                    <td><FormattedMessage id="cookies.table.years.2" /></td>
                                </tr>
                                <tr>
                                    <td>__utmb</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.utmb" /></td>
                                    <td><FormattedMessage id="cookies.table.days.1" /></td>
                                </tr>
                                <tr>
                                    <td>__utmc</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.utmc" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>__utmt</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.utmt" /></td>
                                    <td><FormattedMessage id="cookies.table.days.1" /></td>
                                </tr>
                                <tr>
                                    <td>__utmz</td>
                                    <td><a href="https://policies.google.com/privacy">Google Analytics</a></td>
                                    <td><FormattedMessage id="cookies.analytics.utmz" /></td>
                                    <td><FormattedMessage id="cookies.table.months.6" /></td>
                                </tr>
                                <tr>
                                    <td>loglevel</td>
                                    <td><a href="https://wistia.com/privacy">Wistia</a></td>
                                    <td><FormattedMessage id="cookies.analytics.loglevel" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>DEVICE_INFO</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.deviceInfo" /></td>
                                    <td><FormattedMessage id="cookies.table.days.180" /></td>
                                </tr>
                                <tr>
                                    <td>LogsDatabaseV2:[unique ID number]</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.youtubeLogsDatabase" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>VISITOR_INFO1_LIVE</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.visitorInfo" /></td>
                                    <td><FormattedMessage id="cookies.table.days.180" /></td>
                                </tr>
                                <tr>
                                    <td>remote_sid</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteSid" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>YSC</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.ysc" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>ytidb::LAST_RESULT_ENTRY_KEY</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.lastResultEntryKey" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>YtIdbMeta#databases</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.ytidbMetaDatabases" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-cast-available</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteCastAvailable" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-cast-installed</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteCastInstalled" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-connected-devices</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteConnectedDevices" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-device-id</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteDeviceId" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-fast-check-period</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteFastCheckPeriod" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-session-app</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteSessionApp" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>yt-remote-session-name</td>
                                    <td><a href="https://policies.google.com/privacy">YouTube</a></td>
                                    <td><FormattedMessage id="cookies.analytics.remoteSessionName" /></td>
                                    <td><FormattedMessage id="cookies.table.session" /></td>
                                </tr>
                                <tr>
                                    <td>undefined</td>
                                    <td><a href="https://wistia.com/privacy">Wistia</a></td>
                                    <td><FormattedMessage id="cookies.analytics.wistiaUndefinedCookie" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                                <tr>
                                    <td>wistia</td>
                                    <td><a href="https://wistia.com/privacy">Wistia</a></td>
                                    <td><FormattedMessage id="cookies.analytics.wistiaCookie" /></td>
                                    <td><FormattedMessage id="cookies.table.persistent" /></td>
                                </tr>
                            </tbody>
                        </table>
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
