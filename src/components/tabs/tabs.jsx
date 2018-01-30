const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./tabs.scss');

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const Tabs = props => (
    <div className="tab-background">
        <SubNavigation className={classNames('tabs', props.className)}>
            {props.children}
        </SubNavigation>
    </div>
);

Tabs.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

module.exports = Tabs;
