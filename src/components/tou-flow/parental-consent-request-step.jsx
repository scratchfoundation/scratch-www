const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TouFlowStep = require('./tou-flow-step.jsx');
const Input = require('../forms/input.jsx');

require('./parental-consent-request-step.scss');

const ParentalConsentRequestStep = ({user, onSubmit, loading, error, consentRequested}) => {
    const intl = useIntl();
    const defaultValue = user.withParentEmail ? user.email : '';

    const emailConfirmationSentButton = (<>
        <img
            alt="checkmark-icon"
            src="/svgs/modal/confirm.svg"
        />
        <FormattedMessage id="tou.parentalConsentRequestSentButton" />
    </>);
    
    return (
        <TouFlowStep
            title={intl.formatMessage({id: 'tou.parentalConsentRequestStepTitle'})}
            description={intl.formatMessage({id: 'tou.parentalConsentRequestStepDescription'}, {
                br: <br />
            })}
            nextButton={
                consentRequested ?
                    emailConfirmationSentButton :
                    intl.formatMessage({id: 'tou.parentalConsentRequestStepNextButton'})}
            onSubmit={onSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tou.parentalConsentRequestStepError'}) : null}
            nextButtonDisabled={consentRequested}
        >
            <Input
                className="parent-email-input"
                required
                label={intl.formatMessage({id: 'tou.parentalConsentRequestStepInput'})}
                name="parentalEmail"
                type="text"
                validationError={intl.formatMessage({id: 'general.validationEmail'})}
                validations="isEmail"
                value={defaultValue}
            />
        </TouFlowStep>
    );
};

ParentalConsentRequestStep.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        withParentEmail: PropTypes.bool
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    consentRequested: PropTypes.bool.isRequired
};


module.exports = ParentalConsentRequestStep;
