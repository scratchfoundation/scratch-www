const React = require('react');
const PropTypes = require('prop-types');

const Form = require('../forms/form.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');
const TosNextStepButton = require('./tos-next-step-button.jsx');

require('./tos-flow-step.scss');

const TosFlowStep = ({
    title,
    description,
    children,
    onSubmit,
    loading,
    error,
    nextButton,
    nextButtonDisabled
}) => (
    <Form onValidSubmit={onSubmit}>
        <div className="tos-step-top-bar" />
        <div className="tos-step-inner-content">
            <ModalInnerContent>
                <div className="tos-step-info-wrapper">
                    {title && <ModalTitle
                        className="tos-step-title"
                        title={title}
                    />}
                    {description && (
                        <div className="tos-step-description">{description}</div>
                    )}
                </div>
                {children}
            </ModalInnerContent>
            <TosNextStepButton
                nextButton={nextButton}
                loading={loading}
                error={error}
                disabled={nextButtonDisabled}
            />
        </div>
    </Form>
);

TosFlowStep.propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.node,
    nextButton: PropTypes.node,
    nextButtonDisabled: PropTypes.bool
};

module.exports = TosFlowStep;
