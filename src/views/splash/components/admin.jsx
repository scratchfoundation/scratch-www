var React = require('react');

var AdminPanel = require('../../../components/adminpanel/adminpanel.jsx');
var Button = require('../../../components/forms/button.jsx');

require('./splash.scss');

var SplashAdmin = React.createClass({
    type: 'SplashAdmin',
    render: function () {
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
                                <Button onClick={this.props.refreshHomepageCache}
                                        className={this.props.homepageCacheState.status}
                                        disabled={this.props.homepageCacheState.disabled}>
                                    <span>{this.props.homepageCacheState.content}</span>
                                </Button>
                            </div>
                        </li>
                    </ul>
                </dd>
            </AdminPanel>
        );
    }
});

module.exports = SplashAdmin;
