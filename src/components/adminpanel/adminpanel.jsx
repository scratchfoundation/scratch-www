var React = require('react');

var Button = require('../../components/forms/button.jsx');
var Session = require('../../mixins/session.jsx');

require('./adminpanel.scss');

var AdminPanel = React.createClass({
    type: 'AdminPanel',
    mixins: [
        Session
    ],
    getInitialState: function () {
        return {
            showPanel: false
        };
    },
    handleToggleVisibility: function (e) {
        e.preventDefault();
        this.setState({showPanel: !this.state.showPanel});
    },
    render: function () {
        // make sure user is present before checking if they're an admin. Don't show anything if user not an admin.
        var showAdmin = false;
        if (this.state.session.user) {
            showAdmin = this.state.session.permissions.admin;
        }

        if (!showAdmin) return false;

        if (this.state.showPanel) {
            return (
                <div id="admin-panel" className="visible">
                    <span
                        className="toggle"
                        onClick={this.handleToggleVisibility}>

                        x
                    </span>
                    <div className="admin-header">
                        <h3>Admin Panel</h3>
                    </div>
                    <div className="admin-content">
                        <dl>
                            {this.props.children}
                            <dt>Page Cache</dt>
                            <dd>
                                <ul className="cache-list">
                                    <li>
                                        <form method="post" action="/scratch_admin/page/clear-anon-cache/">
                                            <input type="hidden" name="path" value="/" />
                                            <div className="button-row">
                                                <span>For anonymous users:</span>
                                                <Button type="submit">
                                                    <span>Clear</span>
                                                </Button>
                                            </div>
                                        </form>
                                  </li>
                                </ul>
                            </dd>
                        </dl>
                    </div>
                </div>
            );
        } else {
            return (
                <div id="admin-panel" className="hidden">
                    <span
                        className="toggle"
                        onClick={this.handleToggleVisibility}>

                        &gt;
                    </span>
                </div>
            );
        }
    }
});

module.exports = AdminPanel;
