const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

require('./stepnavigation.scss');

const StepNavigation = props => (
    <ul className={classNames('step-navigation', props.className)}>
        {Array(...Array(props.steps)).map((v, step) => (
            <li
                className={classNames({
                    active: step < props.active,
                    selected: step === props.active
                })}
                key={step}
            >
                <div className="indicator" />
            </li>
        ))}
    </ul>
);

StepNavigation.propTypes = {
    active: PropTypes.number,
    className: PropTypes.string,
    steps: PropTypes.number
};

module.exports = StepNavigation;
