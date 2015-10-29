var classNames = require('classnames');
var React = require('react');

require('./subnavigation.scss');

var SubNavigation = React.createClass({
    type: 'SubNavigation',
    render: function () {
        var classes = classNames(
            'sub-nav',
            this.props.className
        );
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = SubNavigation;
