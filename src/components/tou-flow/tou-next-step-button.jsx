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
                aria-label={nextButton ? nextButton : intl.formatMessage({id: 'general.next'})}
            >
                {loading ?
                    <Spinner /> :
                    <span className="tou-step-next-button-text">
                        {nextButton ? nextButton : intl.formatMessage({id: 'general.next'})}
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
