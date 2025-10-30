const React = require('react');
const {useState, useCallback} = React;
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;
const navigationActions = require('../../redux/navigation.js');
const api = require('../../lib/api.js');
const {ACTION_TYPES} = require('../../components/tou-flow/tou-flow.jsx');
const ParentalConsentRequiredPage = require('../../components/tou-flow/parental-consent-required-page.jsx');
const {
    CommunityGuidelinesModal
} = require('../../components/community-guidelines/community-guidelines-modal.jsx');

const ParentalConsentView = ({
    user,
    shouldReviewCommunityGuidelines,
    reviewCommunityGuidelines
}) => {
    const [loading, setLoading] = useState(false);
    const [errorCode, setErrorCode] = useState(null);
    const [consentRequested, setConsentRequested] = useState(false);

    const handleParentalConsentRequest = useCallback(value => {
        const email = value.parentalEmail;
    
        setErrorCode(null);
        setLoading(true);
    
        api(
            {
                host: '',
                uri: '/accounts/consent/',
                authentication: user.token,
                withCredentials: true,
                method: 'POST',
                useCsrf: true,
                json: {action: ACTION_TYPES.REQUEST_PARENTAL_CONSENT, parent_email: email}
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setErrorCode(res.statusCode);
                    return;
                }
                setConsentRequested(true);
            }
        );
    }, [user]);

    const handleCommunityGuidelinesReview = useCallback(() => reviewCommunityGuidelines(), [reviewCommunityGuidelines]);

    return (
        <>
            <CommunityGuidelinesModal
                isOpen={shouldReviewCommunityGuidelines && !!user.id}
                userId={`${user.id}`}
                onComplete={handleCommunityGuidelinesReview}
            />
            <ParentalConsentRequiredPage
                user={user}
                loading={loading}
                error={errorCode}
                consentRequested={consentRequested}
                onSubmit={handleParentalConsentRequest}
            />
        </>
    );
};

ParentalConsentView.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        email: PropTypes.string,
        withParentEmail: PropTypes.bool
    }),
    shouldReviewCommunityGuidelines: PropTypes.bool.isRequired,
    reviewCommunityGuidelines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: {
        ...state.session.session.user,
        withParentEmail: state.session.session.flags?.with_parent_email
    },
    shouldReviewCommunityGuidelines: state.navigation.shouldReviewCommunityGuidelines
});

const mapDispatchToProps = dispatch => ({
    reviewCommunityGuidelines: () => {
        dispatch(navigationActions.reviewCommunityGuidelines());
    }
});

const ConnectedParentalConsentView = connect(mapStateToProps, mapDispatchToProps)(ParentalConsentView);

module.exports = ConnectedParentalConsentView;
