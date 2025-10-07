const classNames = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const Progression = ({
    children,
    className,
    step = 0,
    ...restProps
}) => {
    const childProps = {
        activeStep: step,
        totalSteps: React.Children.count(children)
    };

    return (
        <div
            className={classNames('progression', className)}
            {...restProps}
        >
            {React.Children.map(children, (child, id) => {
                if (id === step) {
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

module.exports = Progression;
