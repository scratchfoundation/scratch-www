const React = require('react');
const {useState, useCallback, useEffect} = React;
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;

const Progression = require('../progression/progression.jsx');
const ProfileComletionStep = require('./profile-completion-step.jsx');
const OfAgeConfirmationStep = require('./of-age-confirmation-step.jsx');
const ParentalConfirmationStep = require('./parental-confirmation-step.jsx');
const sessionActions = require('../../redux/session.js');
const api = require('../../lib/api.js');

const STEPS = {
    PROFILE_COMPLETION_STEP: 0,
    OF_AGE_CONFIRMATION_STEP: 1,
    PARENTAL_CONFIRMATION_STEP: 2
};

const ACTION_TYPES = {
    ACCEPT_TERMS_OF_USE: 'accept_terms_of_use',
    ACCEPT_TERMS_OF_USE_AND_RECORD_PARENT_EMAIL: 'accept_terms_of_use_and_record_parent_email',
    REQUEST_PARENTAL_CONSENT: 'request_parental_consent'
};

const getCurrentTouStep = user => {
    const shouldDisplayProfileCompletionStep = user && (
        !user.country ||
        (user.country === 'United States' && !user.state) ||
        !user.birthMonth ||
        !user.birthYear
    );

    // Educators go through the of age flow for granting consent to their and their students' accounts
    if (user.isEducator) {
        return STEPS.OF_AGE_CONFIRMATION_STEP;
    }

    // If the user is located in the United States, but we haven't collected their state
    // we need to do so in order to apply the correct ToU rules based on their jurisdiction
    if (shouldDisplayProfileCompletionStep) {
        return STEPS.PROFILE_COMPLETION_STEP;
    }

    // If the user is over the consent age, they are allowed to agree to the terms of use
    // through the app without parental consent
    if (!user.underConsentAge) {
        return STEPS.OF_AGE_CONFIRMATION_STEP;
    }

    // If the user is under the consent age, but does not require explicit parental consent,
    // we allow consent through the app (but collect their parent's email, if we don't have it)
    return STEPS.PARENTAL_CONFIRMATION_STEP;
};

const TouFlow = ({user, onComplete, refreshSession}) => {
    const [step, setStep] = useState(STEPS.PROFILE_COMPLETION_STEP);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const currentStep = getCurrentTouStep(user);

        setStep(prev => (currentStep === prev ? prev : currentStep));
    }, [user]);

    const handleSubmitStep = (uri, method, data, onSuccess) => {
        setError(false);
        setLoading(true);

        api(
            {
                host: '',
                uri,
                authentication: user.token,
                withCredentials: true,
                method,
                useCsrf: true,
                json: data
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                onSuccess();
            }
        );
    };
    
    const handleSubmitProfileCompletion = useCallback(value => {
        const {state, country, birthMonth, birthYear} = value;

        return handleSubmitStep(
            '/accounts/settings/',
            'PATCH',
            {state, country, birth_month: birthMonth, birth_year: birthYear},
            () => refreshSession()
        );
    }, [user, refreshSession]);

    const handleOfAgeConfirmation = useCallback(() => {
        setError(false);
        setLoading(true);

        return handleSubmitStep(
            '/accounts/consent/',
            'POST',
            {action: ACTION_TYPES.ACCEPT_TERMS_OF_USE},
            () => {
                refreshSession();
                onComplete();
            }
        );
    }, [user, onComplete, refreshSession]);

    const handleParentalConfirmation = useCallback(value => {
        // We fallback to the user's email if the user is underage
        // and we already have a parental email associated with their account
        const email = value.parentalEmail ?? user.email;

        return handleSubmitStep(
            '/accounts/consent/',
            'POST',
            {action: ACTION_TYPES.ACCEPT_TERMS_OF_USE_AND_RECORD_PARENT_EMAIL, parent_email: email},
            () => {
                refreshSession();
                onComplete();
            });
    }, [user, onComplete, refreshSession]);

    return (
        <Progression step={step}>
            <ProfileComletionStep
                user={user}
                loading={loading}
                error={error}
                onSubmit={handleSubmitProfileCompletion}
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
        country: PropTypes.string,
        birthMonth: PropTypes.number,
        birthYear: PropTypes.number,
        state: PropTypes.string,
        email: PropTypes.string,
        underConsentAge: PropTypes.bool,
        parentalConsentRequired: PropTypes.bool,
        withParentEmail: PropTypes.bool,
        isEducator: PropTypes.bool
    }),
    onComplete: PropTypes.func.isRequired,
    refreshSession: PropTypes.func.isRequired
};

const ConnectedTouFlow = connect(
    null,
    mapDispatchToProps
)(TouFlow);

module.exports = ConnectedTouFlow;
module.exports.ACTION_TYPES = ACTION_TYPES;
