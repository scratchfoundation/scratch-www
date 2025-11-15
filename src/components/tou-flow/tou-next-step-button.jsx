const React = require('react');
const PropTypes = require('prop-types');
const {useIntl} = require('react-intl');
const classNames = require('classnames');

const Spinner = require('../../components/spinner/spinner.jsx');

require('./tou-next-step-button.scss');

const TouNextStepButton = ({
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
        <div className="tou-step-next-button-wrapper">
            <button
                type="submit"
                className={classNames('tou-step-next-button', className)}
                disabled={disabled || loading}
                aria-label={buttonLabel}
            >
                {loading ?
                    <Spinner /> :
                    <span className="tou-step-next-button-text">
                        {buttonLabel}
                    </span>
                }
            </button>
            {error && <div
                role="alert"
                className={classNames('tou-step-error', errorClassName)}
            >
                {error}
            </div>}
        </div>
    );
};


TouNextStepButton.propTypes = {
    nextButton: PropTypes.node,
    loading: PropTypes.bool,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    errorClassName: PropTypes.string
};

module.exports = TouNextStepButton;
