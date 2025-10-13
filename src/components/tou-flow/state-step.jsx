const React = require('react');
const {useCallback} = React;
const PropTypes = require('prop-types');
const {useIntl} = require('react-intl');

const Select = require('../forms/select.jsx');
const TouFlowStep = require('./tou-flow-step.jsx');
const countryData = require('../../lib/country-data');

require('./state-step.scss');

const StateStep = ({user, onSubmit, loading, error}) => {
    const intl = useIntl();

    const country = countryData.lookupCountryByName(user.country);
    const allSubdivisions = country ? countryData.subdivisionOptions[country.code] : [];
    const stateOptions = allSubdivisions.filter(subdivision => subdivision.type === 'State');

    const handleSubmit = useCallback(value => {
        const state = stateOptions.find(subdivision => subdivision.value === value.state).label;

        return onSubmit({state});
    }, [stateOptions, onSubmit]);

    return (
        <TouFlowStep
            title={intl.formatMessage({id: 'tou.stateStepTitle'})}
            description={intl.formatMessage({id: 'tou.stateStepDescription'})}
            nextButton={intl.formatMessage({id: 'tou.stateStepNextButton'})}
            onSubmit={handleSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tou.stateStepError'}) : null}
        >
            <Select
                required
                name="state"
                aria-label={intl.formatMessage({id: 'tou.stateSelector'})}
                options={[
                    {value: '', label: intl.formatMessage({id: 'tou.stateSelector'}), hidden: true},
                    ...stateOptions
                ]}
                className="state-select"
            />
        </TouFlowStep>
    );
};

StateStep.propTypes = {
    user: PropTypes.shape({
        country: PropTypes.string.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

module.exports = StateStep;
