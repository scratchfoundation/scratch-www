const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./tabs.scss');

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const Tabs = ({ items, activeTabName }) => {
    const itemsRendered = items.map(({ name, onTrigger, getContent }) => {
        const isActive = name === activeTabName
        return (
            <li 
                className={`${isActive ? 'active' : ''}`}
                onClick={onTrigger}
                key={name}
            >
                {getContent(isActive)}
            </li>
        )
    })
    return (
        <div className="tab-background">
            <SubNavigation className="tabs">
                {itemsRendered}
            </SubNavigation>
        </div>
    )
};

Tabs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            onTrigger: PropTypes.func.isRequired,
            getContent: PropTypes.func.isRequired
        })
    ).isRequired,
    activeTabName: PropTypes.string.isRequired,
};

module.exports = Tabs;
