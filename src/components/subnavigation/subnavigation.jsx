const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./subnavigation.scss');

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const SubNavigation = props => (
    <div
        className={classNames(
            [
                'sub-nav',
                props.className
            ],
            {
                'sub-nav-align-left': props.align === 'left',
                'sub-nav-align-right': props.align === 'right'
            }
        )}
    >
        {props.children}
    </div>
);

SubNavigation.propTypes = {
    align: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string
};

SubNavigation.defaultProps = {
    align: 'middle'
};

module.exports = SubNavigation;
