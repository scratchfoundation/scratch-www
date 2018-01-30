var classNames = require('classnames');
var React = require('react');

require('./stepnavigation.scss');

var StepNavigation = React.createClass({
    type: 'Navigation',
    render: function () {
        return (
            <ul className={classNames('step-navigation', this.props.className)}>
                {Array.apply(null, Array(this.props.steps)).map(function (v, step) {
                    return (
                        <li key={step}
                            className={classNames({
                                active: step < this.props.active,
                                selected: step === this.props.active
                            })}
                        >
                            <div className="indicator" />
                        </li>
                    );
                }.bind(this))}
            </ul>
        );
    }
});

module.exports = StepNavigation;
