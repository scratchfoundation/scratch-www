var React = require('react');
var classNames = require('classnames');

var StepNavigationComponents = require('../stepnavigation/stepnavigation.jsx');
var StepNavigation = StepNavigationComponents.StepNavigation;
var StepNavigationIndicator = StepNavigationComponents.StepNavigationIndicator;

require('./formset.scss');


module.exports = {
    FormStep: React.createClass({
        type: 'FormStep',
        propTypes: {
            
        },
        getDefaultProps: function () {
            return {
                navigation: null
            }
        },
        render: function () {
            var classes = classNames(
                'step',
                this.props.className
            );
            return (
                <div {... this.props} className={classes}>
                    <img className="icon" src={this.props.icon} />
                    {this.props.description}
                    {this.props.navigation}
                    {this.props.children}
                </div>
            );
        }
    }),
    FormSet: React.createClass({
        type: 'FormSet',
        propTypes: {
            step: function(props, propName, componentName) {
                var stepValidator = function (props, propName) {
                    if (props[propName] > -1 && props[propName] < props.children.length) {
                        return null;
                    } else {
                        return new Error('Prop `step` out of range');
                    }
                }
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
            var classes = classNames(
                'formset',
                this.props.className
            );
            var navigation = (
                <StepNavigation>
                    {this.props.children.map(function (child, id) {
                        return (
                            <StepNavigationIndicator key={id}
                                                     active={id <= this.props.step}
                                                     selected={id === this.props.step} />
                        );
                    }.bind(this))}
                </StepNavigation>);
            return (
                <div {... this.props} className={classes}>
                    {this.props.children.map(function (child, id) {
                        if (id === this.props.step) {
                            return child;
                        }
                    }.bind(this))}
                </div>
            );
        }
    })
};
