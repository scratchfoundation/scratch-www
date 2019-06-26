const React = require('react');
const PropTypes = require('prop-types');

const NextStepButton = require('./next-step-button.jsx');

const JoinFlowStep = ({
    children,
    description,
    onSubmit,
    title,
    waiting
}) => (
    <form onSubmit={onSubmit}>
        <div>
            {title && (
                <h2>
                    {title}
                </h2>
            )}
            {description && (
                <p>
                    <span>
                        {description}
                    </span>
                </p>
            )}
            {children}
        </div>
        <NextStepButton waiting={waiting} />
    </form>
);

JoinFlowStep.propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    waiting: PropTypes.bool
};

module.exports = JoinFlowStep;
