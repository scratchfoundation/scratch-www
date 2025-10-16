const React = require('react');
const {useState, useCallback, useEffect} = React;
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;

const Progression = require('../progression/progression.jsx');
const LocationStep = require('./location-step.jsx');
const OfAgeConfirmationStep = require('./of-age-confirmation-step.jsx');
const ParentalConfirmationStep = require('./parental-confirmation-step.jsx');
const ParentalConsentRequestStep = require('./parental-consent-request-step.jsx');
const sessionActions = require('../../redux/session.js');
const api = require('../../lib/api.js');

const STEPS = {
    STATE_STEP: 0,
    OF_AGE_CONFIRMATION_STEP: 1,
    PARENTAL_CONFIRMATION_STEP: 2,
    PARENTAL_CONSENT_REQUEST_STEP: 3
};

const getCurrentTouStep = user => {
    const shouldDisplayStateStep =
        user && user.country === 'United States' && !user.state;

    if (!shouldDisplayStateStep) {
        if (!user.underConsentAge) {
            return STEPS.OF_AGE_CONFIRMATION_STEP;
        }

        if (user.parentalConsentRequired) {
            return STEPS.PARENTAL_CONSENT_REQUEST_STEP;
        }

        return STEPS.PARENTAL_CONFIRMATION_STEP;
    }

    return STEPS.STATE_STEP;
};

const TouFlow = ({user, onComplete, refreshSession}) => {
    const [step, setStep] = useState(STEPS.STATE_STEP);
    const [consentRequested, setConsentRequested] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const currentStep = getCurrentTouStep(user);

        setStep(prev => (currentStep === prev ? prev : currentStep));
    }, [user]);

    const handleSubmitState = useCallback(value => {
        const {state, country} = value;
        setError(false);
        setLoading(true);

        api(
            {
                host: '',
                uri: '/accounts/settings/',
                authentication: user.token,
                withCredentials: true,
                method: 'PATCH',
                useCsrf: true,
                json: {state, country}
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                refreshSession();
            }
        );
    }, [user, refreshSession]);

    const handleOfAgeConfirmation = useCallback(() => {
        setError(false);
        setLoading(true);

        api(
            {
                host: '',
                uri: '/accounts/consent/',
                authentication: user.token,
                withCredentials: true,
                method: 'POST',
                useCsrf: true,
                json: {
                    action: 'accept_terms_of_use'
                }
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                onComplete();
            }
        );
    }, [user, onComplete]);

    const handleParentalConfirmation = useCallback(value => {
        const email = value.parentalEmail ?? user.email;

        setError(false);
        setLoading(true);

        api(
            {
                host: '',
                uri: '/accounts/consent/',
                authentication: user.token,
                withCredentials: true,
                method: 'POST',
                useCsrf: true,
                json: {
                    action: 'accept_terms_of_use_and_notify_parent',
                    parent_email: email
                }
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                onComplete();
            }
        );
    }, [user, onComplete]);

    const handleParentalConsentRequest = useCallback(value => {
        const email = value.parentalEmail;

        setError(false);
        setLoading(true);

        api(
            {
                host: '',
                uri: '/accounts/consent/',
                authentication: user.token,
                withCredentials: true,
                method: 'POST',
                useCsrf: true,
                json: {
                    action: 'request_parental_consent',
                    parent_email: email
                }
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                setConsentRequested(true);
            }
        );
    }, [user]);
    
    return (
        <Progression step={step}>
            <LocationStep
                user={user}
                loading={loading}
                error={error}
                onSubmit={handleSubmitState}
            />
            <OfAgeConfirmationStep
                loading={loading}
                error={error}
                onSubmit={handleOfAgeConfirmation}
            />
            <ParentalConfirmationStep
                user={user}
                loading={loading}
                error={error}
                onSubmit={handleParentalConfirmation}
            />
            <ParentalConsentRequestStep
                user={user}
                loading={loading}
                error={error}
                consentRequested={consentRequested}
                onSubmit={handleParentalConsentRequest}
            />
        </Progression>
    );
};

const mapDispatchToProps = dispatch => ({
    refreshSession: () => {
        dispatch(sessionActions.refreshSession());
    }
});

TouFlow.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        state: PropTypes.string,
        email: PropTypes.string,
        underConsentAge: PropTypes.bool,
        parentalConsentRequired: PropTypes.bool,
        withParentEmail: PropTypes.bool
    }),
    onComplete: PropTypes.func.isRequired,
    refreshSession: PropTypes.func.isRequired
};

const ConnectedTouFlow = connect(
    null,
    mapDispatchToProps
)(TouFlow);

module.exports = ConnectedTouFlow;
