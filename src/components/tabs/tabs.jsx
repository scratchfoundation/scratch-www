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
        return (
            <SubNavigation className="tabs">
                {this.props.children}
            </SubNavigation>
        );
    }
});

module.exports = Tabs;
