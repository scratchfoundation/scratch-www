const React = require('react');
const PropTypes = require('prop-types');

const Form = require('../forms/form.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');
const TouNextStepButton = require('./tou-next-step-button.jsx');

require('./tou-flow-step.scss');

const TouFlowStep = ({
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
        <div className="tou-step-top-bar" />
        <div className="tou-step-inner-content">
            <ModalInnerContent>
                <div className="tou-step-info-wrapper">
                    {title && <ModalTitle
                        className="tou-step-title"
                        title={title}
                    />}
                    {description && (
                        <div className="tou-step-description">{description}</div>
                    )}
                </div>
                {children}
            </ModalInnerContent>
            <TouNextStepButton
                nextButton={nextButton}
                loading={loading}
                error={error}
                disabled={nextButtonDisabled}
            />
        </div>
    </Form>
);

TouFlowStep.propTypes = {
    title: PropTypes.node,
    description: PropTypes.node,
    children: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    error: PropTypes.node,
    nextButton: PropTypes.node,
    nextButtonDisabled: PropTypes.bool
};

module.exports = TouFlowStep;
