var classNames = require('classnames');
var React = require('react');

module.exports = {
    StepNavigationIndicator: React.createClass({
        type: 'StepNavigationIndicator',
        propTypes: {
            selected: React.PropTypes.bool,
            active: React.PropTypes.bool
        },
        getDefaultProps: function () {
            return {
                selected: false,
                active: false
            };
        },
        render: function () {
            var classes = classNames(
                'indicator',
                {
                    'selected': this.props.selected,
                    'active': this.props.selected
                },
                this.props.className
            );
            return (
                <li {... this.props} className={classes} />
            );
        }
    }),
    StepNavigation: React.createClass({
        type: 'Navigation',
        render: function () {
            var classes = classNames(
                'step-navigation',
                this.props.className);
            return (
                <ul className={classes}>
                    {this.props.children}
                </ul>
            );
        }
    })
};
