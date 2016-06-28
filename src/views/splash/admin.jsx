var React = require('react'); // eslint-disable-line

var AdminPanel = require('../../components/adminpanel/adminpanel.jsx');
var Button = require('../../components/forms/button.jsx');

require('./splash.scss');

var SplashAdmin = function (props) {
    return (
            <AdminPanel>
                <dt>Tools</dt>
                <dd>
                    <ul>
                        <li>
                            <a href="/scratch_admin/tickets">Ticket Queue</a>
                        </li>
                        <li>
                            <a href="/scratch_admin/ip-search/">IP Search</a>
                        </li>
                        <li>
                            <a href="/scratch_admin/email-search/">Email Search</a>
                        </li>
                    </ul>
                </dd>
                <dt>Homepage Cache</dt>
                <dd>
                    <ul className="cache-list">
                        <li>
                            <div className="button-row">
                                <span>Refresh row data:</span>
                                <Button onClick={props.refreshHomepageCache}
                                        className={props.homepageCacheState.status}
                                        disabled={props.homepageCacheState.disabled}>
                                    <span>{props.homepageCacheState.content}</span>
                                </Button>
                            </div>
                        </li>
                    </ul>
                </dd>
            </AdminPanel>
        );
};

module.exports = SplashAdmin;
