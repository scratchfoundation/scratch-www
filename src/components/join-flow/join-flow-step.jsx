const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');

const NextStepButton = require('./next-step-button.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');

require('./join-flow-step.scss');

const JoinFlowStep = ({
    children,
    className,
    description,
    headerImgSrc,
    innerContentClassName,
    nextButton,
    onSubmit,
    title,
    waiting
}) => (
    <form onSubmit={onSubmit}>
        {headerImgSrc && (
            <div className="join-flow-header-image">
                <img src={headerImgSrc} />
            </div>
        )}
        <div>
            <ModalInnerContent
                className={classNames(
                    'join-flow-inner-content',
                    className,
                    innerContentClassName
                )}
            >
                {title && (
                    <ModalTitle
                        className="join-flow-title"
                        title={title}
                    />
                )}
                {description && (
                    <div className="join-flow-description">
                        {description}
                    </div>
                )}
                {children}
            </ModalInnerContent>
        </div>
        <NextStepButton
            content={nextButton}
            waiting={waiting}
        />
    </form>
);

JoinFlowStep.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    description: PropTypes.string,
    headerImgSrc: PropTypes.string,
    innerContentClassName: PropTypes.string,
    nextButton: PropTypes.node,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    waiting: PropTypes.bool
};

module.exports = JoinFlowStep;
