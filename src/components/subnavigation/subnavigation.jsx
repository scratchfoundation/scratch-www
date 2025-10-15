const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./subnavigation.scss');

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const SubNavigation = ({align = 'middle', children, className, role}) => (
    <div
        className={classNames(
            [
                'sub-nav',
                className
            ],
            {
                'sub-nav-align-left': align === 'left',
                'sub-nav-align-right': align === 'right'
            }
        )}
        role={role}
    >
        {children}
    </div>
);

SubNavigation.propTypes = {
    align: PropTypes.string,
    role: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = SubNavigation;
