const React = require('react');
const PropTypes = require('prop-types');
const {useIntl} = require('react-intl');

const Spinner = require('../../components/spinner/spinner.jsx');

require('./tou-next-step-button.scss');

const TouNextStepButton = ({
    nextButton,
    loading,
    error
}) => {
    const intl = useIntl();
    const buttonLabel = nextButton ? nextButton : intl.formatMessage({id: 'general.next'});

    return (
        <div className="tou-step-next-button-wrapper">
            {error && <div
                role="alert"
                className="tou-step-error"
            >
                {error}
            </div>}
            <button
                type="submit"
                className="tou-step-next-button"
                disabled={loading}
                aria-label={buttonLabel}
            >
                {loading ?
                    <Spinner /> :
                    <span className="tou-step-next-button-text">
                        {buttonLabel}
                    </span>
                }
            </button>
        </div>
    );
};


TouNextStepButton.propTypes = {
    nextButton: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.string
};

module.exports = TouNextStepButton;
