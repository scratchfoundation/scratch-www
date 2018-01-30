const bindAll = require('lodash.bindall');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

const Button = require('../forms/button.jsx');

require('./adminpanel.scss');

class AdminPanel extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleToggleVisibility'
        ]);
        this.state = {
            showPanel: false
        };
    }
    handleToggleVisibility (e) {
        e.preventDefault();
        this.setState({showPanel: !this.state.showPanel});
    }
    render () {
        if (!this.props.isAdmin) return false;

        if (this.state.showPanel) {
            return (
                <div
                    className="visible"
                    id="admin-panel"
                >
                    <span
                        className="toggle"
                        onClick={this.handleToggleVisibility}
                    >
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
                                        <form
                                            action="/scratch_admin/page/clear-anon-cache/"
                                            method="post"
                                        >
                                            <input
                                                name="path"
                                                type="hidden"
                                                value="/"
                                            />
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
        }
        return (
            <div
                className="hidden"
                id="admin-panel"
            >
                <span
                    className="toggle"
                    onClick={this.handleToggleVisibility}
                >
                    &gt;
                </span>
            </div>
        );
    }
}

AdminPanel.propTypes = {
    children: PropTypes.node,
    isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
    isAdmin: state.permissions.admin
});

const ConnectedAdminPanel = connect(mapStateToProps)(AdminPanel);

module.exports = ConnectedAdminPanel;
