const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Progression = props => {
    const childProps = {
        activeStep: props.step,
        totalSteps: React.Children.count(props.children)
    };
    return (
        <div
            className={classNames('progression', props.className)}
            {...props}
        >
            {React.Children.map(props.children, (child, id) => {
                if (id === props.step) {
                    return React.cloneElement(child, childProps);
                }
            })}
        </div>
    );
};

Progression.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    step: function (props, propName, componentName) {
        const stepValidator = (propz, name) => {
            if (propz[name] > -1 && propz[name] < propz.children.length) {
                return null;
            }
            return new Error('Prop `step` out of range');
        };
        return (
            (typeof props[propName] === 'number' ? null : new Error('Not a number')) ||
            stepValidator(props, propName, componentName)
        );
    }
};

Progression.defaultProps = {
    step: 0
};

module.exports = Progression;
