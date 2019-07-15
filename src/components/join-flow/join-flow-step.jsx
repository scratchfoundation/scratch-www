const React = require('react');
const PropTypes = require('prop-types');

const NextStepButton = require('./next-step-button.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');

require('./join-flow-step.scss');

const JoinFlowStep = ({
    children,
    description,
    onSubmit,
    title,
    waiting
}) => (
    <form onSubmit={onSubmit}>
        <div>
            <ModalInnerContent className="join-flow-inner-content">
                {title && (
                    <ModalTitle
                        className="join-flow-title"
                        title={title}
                    />
                )}
                {description && (
                    <p>
                        <span>
                            {description}
                        </span>
                    </p>
                )}
                {children}
            </ModalInnerContent>
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
