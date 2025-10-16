const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TouFlowStep = require('./tou-flow-step.jsx');
const Checkbox = require('../forms/checkbox.jsx');
const Input = require('../forms/input.jsx');

require('./parental-confirmation-step.scss');

const ParentalConfirmationStep = ({user, onSubmit, loading, error}) => {
    const intl = useIntl();
    const touLink = (
        <a
            className="link"
            href="/terms_of_use"
            target="_blank"
        >
            <FormattedMessage id="general.termsOfUse" />
        </a>
    );
    
    const privacyPolicyLink = (
        <a
            className="link"
            href="/privacy_policy"
            target="_blank"
        >
            <FormattedMessage id="general.privacyPolicy" />
        </a>
    );
    

    return (
        <TouFlowStep
            title={intl.formatMessage({id: 'tou.parentalConfirmationStepTitle'})}
            description={intl.formatMessage({id: 'tou.parentalConfirmationStepDescription'}, {
                touLink,
                privacyPolicyLink,
                br: <br />
            })}
            nextButton={intl.formatMessage({id: 'tou.parentalConfirmationStepNextButton'})}
            onSubmit={onSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tou.parentalConfirmationStepError'}) : null}
        >
            <div className="confirmation-section">
                {user.withParentEmail && <Input
                    required
                    label={intl.formatMessage({id: 'tou.parentalConfirmationStepInput'})}
                    name="parentalEmail"
                    type="text"
                    validationError={intl.formatMessage({id: 'general.validationEmail'})}
                    validations="isEmail"
                    value={user.email}
                />}
                <Checkbox
                    required
                    name="confirmTou"
                    value={false}
                    valueLabel={
                        <FormattedMessage
                            id="tou.parentalConfirmationStepCheckbox"
                            values={{
                                touLink,
                                privacyPolicyLink
                            }}
                        />
                    }
                    validationErrors={{
                        isTrue: intl.formatMessage({id: 'tou.parentalConfirmationStepValidationError'})
                    }}
                    validations={{
                        isTrue: true
                    }}
                />
            </div>
        </TouFlowStep>
    );
};

ParentalConfirmationStep.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        withParentEmail: PropTypes.bool
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};


module.exports = ParentalConfirmationStep;
