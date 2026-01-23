const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TosFlowStep = require('./tos-flow-step.jsx');
const Checkbox = require('../forms/checkbox.jsx');
const externalLinks = require('../../lib/external-links.js');

const OfAgeConfirmationStep = ({onSubmit, loading, error}) => {
    const intl = useIntl();
    const tosLink = (
        <a
            className="link"
            href={externalLinks.scratchHelpDesk.terms}
            target="_blank"
            rel="noreferrer"
        >
            <FormattedMessage id="general.termsOfService" />
        </a>
    );

    const privacyPolicyLink = (
        <a
            className="link"
            href={externalLinks.scratchHelpDesk.privacyPolicy}
            target="_blank"
            rel="noreferrer"
        >
            <FormattedMessage id="general.privacyPolicy" />
        </a>
    );

    return (
        <TosFlowStep
            title={intl.formatMessage({id: 'tos.ofAgeConfirmationStepTitle'})}
            description={intl.formatMessage({id: 'tos.ofAgeConfirmationStepDescription'}, {
                tosLink,
                privacyPolicyLink
            })}
            nextButton={intl.formatMessage({id: 'tos.ofAgeConfirmationStepNextButton'})}
            onSubmit={onSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tos.ofAgeConfirmationStepError'}) : null}
        >
            <div className="checkbox-group">
                <Checkbox
                    required
                    name="confirmTos"
                    className="tos-checkbox"
                    value={false}
                    valueLabel={
                        <FormattedMessage
                            id="tos.ofAgeConfirmationStepCheckbox"
                            values={{
                                tosLink,
                                privacyPolicyLink
                            }}
                        />
                    }
                    validationErrors={{
                        isTrue: intl.formatMessage({id: 'tos.ofAgeConfirmationStepValidationError'})
                    }}
                    validations={{
                        isTrue: true
                    }}
                />
            </div>
        </TosFlowStep>
    );
};

OfAgeConfirmationStep.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

module.exports = OfAgeConfirmationStep;
