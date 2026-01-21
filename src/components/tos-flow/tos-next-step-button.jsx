const React = require('react');
const PropTypes = require('prop-types');
const {useIntl} = require('react-intl');
const classNames = require('classnames');

const Spinner = require('../../components/spinner/spinner.jsx');

require('./tos-next-step-button.scss');

const TosNextStepButton = ({
    nextButton,
    loading,
    error,
    disabled,
    className,
    errorClassName
}) => {
    const intl = useIntl();
    const buttonLabel = nextButton ? nextButton : intl.formatMessage({id: 'general.next'});

    return (
        <div className="tos-step-next-button-wrapper">
            <button
                type="submit"
                className={classNames('tos-step-next-button', className)}
                disabled={disabled || loading}
                aria-label={buttonLabel}
            >
                {loading ?
                    <Spinner /> :
                    <span className="tos-step-next-button-text">
                        {buttonLabel}
                    </span>
                }
            </button>
            {error && <div
                role="alert"
                className={classNames('tos-step-error', errorClassName)}
            >
                {error}
            </div>}
        </div>
    );
};


TosNextStepButton.propTypes = {
    nextButton: PropTypes.node,
    loading: PropTypes.bool,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    errorClassName: PropTypes.string
};

module.exports = TosNextStepButton;
