var classNames = require('classnames');
var React = require('react');

module.exports = React.createClass({
    displayName: 'Progression',
    propTypes: {
        step: function (props, propName, componentName) {
            var stepValidator = function (props, propName) {
                if (props[propName] > -1 && props[propName] < props.children.length) {
                    return null;
                } else {
                    return new Error('Prop `step` out of range');
                }
            };
            return (
                React.PropTypes.number.isRequired(props, propName, componentName) ||
                stepValidator(props, propName, componentName)
            );
        }
    },
    getDefaultProps: function () {
        return {
            step: 0
        };
    },
    render: function () {
        var childProps = {
            activeStep: this.props.step,
            totalSteps: React.Children.count(this.props.children)
        };
        return (
            <div {... this.props}
                 className={classNames('progression', this.props.className)}>
                {React.Children.map(this.props.children, function (child, id) {
                    if (id === this.props.step) {
                        return React.cloneElement(child, childProps);
                    }
                }, this)}
            </div>
        );
    }
});
