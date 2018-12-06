const bindAll = require('lodash.bindall');
const classNames = require('classnames');
const connect = require('react-redux').connect;
const PropTypes = require('prop-types');
const React = require('react');

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
        return (
            <div
                className={classNames(
                    'admin-panel', this.props.className, {
                        hidden: !this.state.showPanel
                    }
                )}
            >
                {this.state.showPanel ? (
                    <React.Fragment>
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
                            {this.props.children}
                        </div>
                    </React.Fragment>
                ) : (
                    <span
                        className="toggle"
                        onClick={this.handleToggleVisibility}
                    >
                        &gt;
                    </span>
                )}
            </div>
        );
    }
}

AdminPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
    isAdmin: state.permissions.admin
});

const ConnectedAdminPanel = connect(mapStateToProps)(AdminPanel);

module.exports = ConnectedAdminPanel;
