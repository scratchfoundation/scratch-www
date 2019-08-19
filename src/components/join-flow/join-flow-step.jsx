const classNames = require('classnames');
const React = require('react');
const PropTypes = require('prop-types');

const NextStepButton = require('./next-step-button.jsx');
const ModalTitle = require('../modal/base/modal-title.jsx');
const ModalInnerContent = require('../modal/base/modal-inner-content.jsx');
const InfoButton = require('../info-button/info-button.jsx');

require('./join-flow-step.scss');

const JoinFlowStep = ({
    children,
    innerClassName,
    description,
    descriptionClassName,
    footerContent,
    headerImgSrc,
    infoMessage,
    nextButton,
    onSubmit,
    title,
    waiting
}) => (
    <form onSubmit={onSubmit}>
        <div className="join-flow-outer-content">
            {headerImgSrc && (
                <div className="join-flow-header-image">
                    <img src={headerImgSrc} />
                </div>
            )}
            <div>
                <ModalInnerContent
                    className={classNames(
                        'join-flow-inner-content',
                        innerClassName
                    )}
                >
                    {title && (
                        <ModalTitle
                            className="join-flow-title"
                            title={title}
                        />
                    )}
                    {description && (
                        <div
                            className={classNames(
                                'join-flow-description',
                                descriptionClassName
                            )}
                        >
                            {description}
                            {infoMessage && (
                                <InfoButton message={infoMessage} />
                            )}
                        </div>
                    )}
                    {children}
                </ModalInnerContent>
            </div>
            {footerContent && (
                <div className="join-flow-footer-message">
                    {footerContent}
                </div>
            )}
            <NextStepButton
                content={nextButton}
                waiting={waiting}
            />
        </div>
    </form>
);

JoinFlowStep.propTypes = {
    children: PropTypes.node,
    description: PropTypes.string,
    descriptionClassName: PropTypes.string,
    footerContent: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    headerImgSrc: PropTypes.string,
    infoMessage: PropTypes.string,
    innerClassName: PropTypes.string,
    nextButton: PropTypes.node,
    onSubmit: PropTypes.func,
    title: PropTypes.string,
    waiting: PropTypes.bool
};

module.exports = JoinFlowStep;
