const classNames = require('classnames');

const React = require('react');
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const Form = require('../forms/form.jsx');
const Input = require('../forms/input.jsx');
const TouNextStepButton = require('./tou-next-step-button.jsx');

require('./parental-consent-required-page.scss');

const ERROR_TYPE = {
    RATE_LIMIT: 429,
    VALIDATION_ERROR: 400,
    SERVER_ERROR: 500
};

const errorMessageByType = {
    [ERROR_TYPE.RATE_LIMIT]: 'tou.parentalConsentRequiredPageRateLimitError',
    [ERROR_TYPE.VALIDATION_ERROR]: 'tou.parentalConsentRequiredPageValidationError',
    [ERROR_TYPE.SERVER_ERROR]: 'tou.parentalConsentRequiredPageError'
};

// Rate limit window in hours. Defined and maintained in scratchr2.
const RATE_LIMIT_WINDOW = 1;

const ParentalConsentRequiredPage = ({user, onSubmit, loading, error, consentRequested}) => {
    const intl = useIntl();
    const defaultValue = user.withParentEmail ? user.email : '';

    const emailConfirmationSentButton = (<>
        <img
            alt="checkmark-icon"
            src="/svgs/modal/confirm.svg"
        />
        <FormattedMessage id="tou.parentalConsentRequestSentButton" />
    </>);

    const errorMessage = error ? intl.formatMessage({
        id: errorMessageByType[error] ?? errorMessageByType[ERROR_TYPE.SERVER_ERROR]
    }, {hours: RATE_LIMIT_WINDOW}) : null;

    return (
        <Form
            className="parental-consent-form"
            onValidSubmit={onSubmit}
        >
            <div className="page-inner-content">
                <div className="page-title">
                    <FormattedMessage id="tou.parentalConsentRequiredPageTitle" />
                </div>
                <div className="page-description">
                    <FormattedMessage
                        id="tou.parentalConsentRequiredPageDescription"
                        values={{
                            p: chunks => <p className="description-paragraph">{chunks}</p>,
                            needHelpLink: <a
                                // TODO: Update URL once available
                                href="https://mitscratch.freshdesk.com/en/support/home"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FormattedMessage id="tou.parentalConsentRequiredPageNeedHelp" />
                            </a>
                        }}
                    />
                </div>

                <Input
                    className="parent-email-input"
                    required
                    label={intl.formatMessage({id: 'tou.parentalConsentRequiredPageInput'})}
                    name="parentalEmail"
                    type="text"
                    validationError={intl.formatMessage({id: 'general.validationEmail'})}
                    validations="isEmail"
                    value={defaultValue}
                />

                <TouNextStepButton
                    className={classNames(
                        'request-consent-button',
                        {dark: consentRequested}
                    )}
                    errorClassName="request-consent-error"
                    nextButton={
                        consentRequested ?
                            emailConfirmationSentButton :
                            intl.formatMessage({id: 'tou.parentalConsentRequiredPageNextButton'})}
                    loading={loading}
                    error={errorMessage}
                    disabled={consentRequested}
                />
            </div>
        </Form>
    );
};

ParentalConsentRequiredPage.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        withParentEmail: PropTypes.bool
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    consentRequested: PropTypes.bool.isRequired
};


module.exports = ParentalConsentRequiredPage;
