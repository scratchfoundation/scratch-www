var classNames = require('classnames');
var SubNavigation = require('../../components/subnavigation/subnavigation.jsx');
var React = require('react');

require('./tabs.scss');

/**
 * Container for a custom, horizontal list of navigation elements
 * that can be displayed within a view or component.
 */
var Tabs = React.createClass({
    type: 'Tabs',
    render: function () {
        var classes = classNames(
            'tabs',
            this.props.className
        );
        return (
            <div className='tab-background'>
                <SubNavigation className={classes}>
                    {this.props.children}
                </SubNavigation>
            </div>
        );
    }
});

module.exports = Tabs;
