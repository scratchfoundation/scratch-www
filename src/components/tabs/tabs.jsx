const classNames = require('classnames');
const PropTypes = require('prop-types');
const { useRef } = require('react');
const React = require('react');

const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./tabs.scss');

const TabItem = ({ children, ...props }) => {
    const tabItemRef = useRef()
    
    return <li ref={tabItemRef} {...props}>{children}</li>
}

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const Tabs = ({ items, activeTabName }) => {
    let activeIndex
    const itemsRendered = items.map(({ name, onTrigger, getContent }, index) => {
        const isActive = name === activeTabName
        activeIndex = index
        return (
            <li 
                className={`${isActive ? 'active' : ''}`}
                onClick={onTrigger}
                tabIndex={isActive ? 0 : -1}
                key={name}
            >
                {getContent(isActive)}
            </li>
        )
    })

    const handleKeyDown = event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
            return
        }
        event.preventDefault()
        console.log(
            'hi'
        )
    }

    return (
        <div className="tab-background" onKeyDown={handleKeyDown}>
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
