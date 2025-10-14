const React = require('react');
const {useState, useCallback} = React;
const PropTypes = require('prop-types');
const connect = require('react-redux').connect;

const Progression = require('../progression/progression.jsx');
const StateStep = require('./state-step.jsx');
const sessionActions = require('../../redux/session.js');
const api = require('../../lib/api.js');


const TouFlow = ({user, onComplete, refreshSession}) => {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const shouldDisplayStateStep =
    user && user.country === 'United States' && !user.state;

    const handleSubmitState = useCallback(value => {
        const {state} = value;
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
                json: {state}
            },
            (err, body, res) => {
                setLoading(false);
                if (err || res.statusCode !== 200) {
                    setError(true);
                    return;
                }
                refreshSession();
                setStep(prev => prev + 1);
                onComplete();
            }
        );
    }, [user, onComplete, refreshSession]);
    
    return (
        <Progression step={step}>
            {shouldDisplayStateStep && (
                <StateStep
                    user={user}
                    loading={loading}
                    error={error}
                    onSubmit={handleSubmitState}
                />
            )}
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
        state: PropTypes.string
    }),
    onComplete: PropTypes.func.isRequired,
    refreshSession: PropTypes.func.isRequired
};

const ConnectedTouFlow = connect(
    null,
    mapDispatchToProps
)(TouFlow);

module.exports = ConnectedTouFlow;
