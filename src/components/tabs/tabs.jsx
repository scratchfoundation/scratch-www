const PropTypes = require('prop-types');
const {useRef} = require('react');
const React = require('react');

const SubNavigation = require('../../components/subnavigation/subnavigation.jsx');

require('./tabs.scss');

/*
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
const Tabs = ({items, activeTabName}) => {
    const tabElementRefs = useRef({});

    const itemsRendered = items.map(({name, onTrigger, getContent}) => {
        const isActive = name === activeTabName;

        let tabRef;
        if (tabElementRefs.current[name]) {
            tabRef = tabElementRefs.current[name];
        } else {
            tabRef = React.createRef();
            tabElementRefs.current[name] = tabRef;
        }

        return (
            <button
                role="tab"
                aria-selected={`${isActive ? 'true' : 'false'}`}
                className={`${isActive ? 'active' : ''}`}
                onClick={onTrigger}
                tabIndex={isActive ? 0 : -1}
                key={name}
                ref={tabRef}
            >
                {getContent(isActive)}
            </button>
        );
    });

    const handleKeyDown = event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
            return;
        }
        event.preventDefault();
        const focusedIndex = Object.values(tabElementRefs.current)
            .findIndex(tabElementRef =>
                document.activeElement === tabElementRef.current
            );
        if (event.key === 'ArrowLeft') {
            let nextIndex;
            if (focusedIndex === 0) {
                nextIndex = Object.values(tabElementRefs.current).length - 1;
            } else {
                nextIndex = focusedIndex - 1;
            }
            Object.values(tabElementRefs.current)[nextIndex].current.focus();
        } else if (event.key === 'ArrowRight') {
            let nextIndex;
            if (focusedIndex === Object.values(tabElementRefs.current).length - 1) {
                nextIndex = 0;
            } else {
                nextIndex = focusedIndex + 1;
            }
            Object.values(tabElementRefs.current)[nextIndex].current.focus();
        } else if (event.key === 'Home') {
            Object.values(tabElementRefs.current)[0].current.focus();
        } else if (event.key === 'End') {
            const lastTab = Object.values(tabElementRefs.current).length - 1;
            Object.values(tabElementRefs.current)[lastTab].current.focus();
        } else if (event.key === 'Enter' || event.key === ' ') {
            items[focusedIndex].onTrigger();
        }
    };
    
    return (
        <div
            className="tab-background"
            onKeyDown={handleKeyDown}// eslint-disable-line
        >
            <SubNavigation
                role="tablist"
                className="tabs"
            >
                {itemsRendered}
            </SubNavigation>
        </div>
    );
};

Tabs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            onTrigger: PropTypes.func.isRequired,
            getContent: PropTypes.func.isRequired
        })
    ).isRequired,
    activeTabName: PropTypes.string.isRequired
};

module.exports = Tabs;
