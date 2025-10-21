const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TouFlowStep = require('./tou-flow-step.jsx');
const Checkbox = require('../forms/checkbox.jsx');

require('./of-age-confirmation-step.scss');

const OfAgeConfirmationStep = ({onSubmit, loading, error}) => {
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
            title={intl.formatMessage({id: 'tou.ofAgeConfirmationStepTitle'})}
            description={intl.formatMessage({id: 'tou.ofAgeConfirmationStepDescription'}, {
                touLink,
                privacyPolicyLink
            })}
            nextButton={intl.formatMessage({id: 'tou.ofAgeConfirmationStepNextButton'})}
            onSubmit={onSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tou.ofAgeConfirmationStepError'}) : null}
        >
            <div className="checkbox-group">
                <Checkbox
                    required
                    name="confirmTou"
                    value={false}
                    valueLabel={intl.formatMessage({id: 'tou.ofAgeConfirmationStepCheckbox'}, {
                        touLink,
                        privacyPolicyLink
                    })}
                    validationErrors={{
                        isTrue: intl.formatMessage({id: 'tou.ofAgeConfirmationStepValidationError'})
                    }}
                    validations={{
                        isTrue: true
                    }}
                />
            </div>
        </TouFlowStep>
    );
};

OfAgeConfirmationStep.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

module.exports = OfAgeConfirmationStep;
