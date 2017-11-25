import classNames from 'classnames';
import React from 'react';

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

export default StepNavigation;
