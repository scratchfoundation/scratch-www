const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./adminpanel.scss');

const AdminPanel = ({
    className,
    children,
    isOpen,
    onOpen,
    onClose
}) => (
    <div className={classNames('admin-panel', className, {hidden: !isOpen})}>
        {isOpen ? (
            <React.Fragment>
                <span
                    className="toggle"
                    onClick={onClose}
                >
                    x
                </span>
                <div className="admin-header">
                    <h3>Admin Panel</h3>
                </div>
                <div className="admin-content">
                    {children}
                </div>
            </React.Fragment>
        ) : (
            <span
                className="toggle"
                onClick={onOpen}
            >
                &gt;
            </span>
        )}
    </div>
);

AdminPanel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
};

module.exports = AdminPanel;
