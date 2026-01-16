const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const TosFlowStep = require('./tos-flow-step.jsx');
const Checkbox = require('../forms/checkbox.jsx');
const Input = require('../forms/input.jsx');
const externalLinks = require('../../lib/external-links.js');

require('./parental-confirmation-step.scss');

const ParentalConfirmationStep = ({user, onSubmit, loading, error}) => {
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
            title={intl.formatMessage({id: 'tos.parentalConfirmationStepTitle'})}
            description={intl.formatMessage({id: 'tos.parentalConfirmationStepDescription'}, {
                tosLink,
                privacyPolicyLink,
                p: chunks => <p className="description-paragraph">{chunks}</p>
            })}
            nextButton={intl.formatMessage({id: 'tos.parentalConfirmationStepNextButton'})}
            onSubmit={onSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tos.parentalConfirmationStepError'}) : null}
        >
            <div className="confirmation-section">
                {!user.withParentEmail && <Input
                    required
                    className="parent-email-input"
                    label={intl.formatMessage({id: 'tos.parentalConfirmationStepInput'})}
                    name="parentalEmail"
                    type="text"
                    validationError={intl.formatMessage({id: 'general.validationEmail'})}
                    validations="isEmail"
                />}
                <Checkbox
                    required
                    className="tos-checkbox"
                    name="confirmTos"
                    value={false}
                    valueLabel={
                        <FormattedMessage
                            id="tos.parentalConfirmationStepCheckbox"
                            values={{
                                tosLink,
                                privacyPolicyLink
                            }}
                        />
                    }
                    validationErrors={{
                        isTrue: intl.formatMessage({id: 'tos.parentalConfirmationStepValidationError'})
                    }}
                    validations={{
                        isTrue: true
                    }}
                />
            </div>
        </TosFlowStep>
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
