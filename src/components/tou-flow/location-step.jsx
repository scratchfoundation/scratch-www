const React = require('react');
const {useCallback, useState, useMemo} = React;
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const Select = require('../forms/select.jsx');
const TouFlowStep = require('./tou-flow-step.jsx');
const countryData = require('../../lib/country-data.js');

require('./location-step.scss');

const LocationStep = ({user, onSubmit, loading, error}) => {
    const intl = useIntl();
    
    const currentCountry = countryData.lookupCountryByName(user.country);
    const [selectedCounty, setSelectedCountry] = useState(currentCountry.name);

    const allSubdivisions = currentCountry ? countryData.subdivisionOptions[currentCountry.code] : [];
    const stateOptions = useMemo(() =>
        allSubdivisions.filter(subdivision => subdivision.type === 'State'),
    [allSubdivisions]);

    const countryOptions = countryData.registrationCountryNameOptions;

    const handleSubmit = useCallback(value => {
        const state = stateOptions.find(subdivision => subdivision.value === value.state)?.label;
        const country = value.country;

        return onSubmit({state, country});
    }, [stateOptions, onSubmit]);

    const handleOnChange = useCallback((_field, value) => {
        setSelectedCountry(value);
    }, []);

    return (
        <TouFlowStep
            title={intl.formatMessage({id: 'tou.locationStepTitle'})}
            description={intl.formatMessage(
                {id: 'tou.locationStepDescription'}, {
                    needHelpLink: <a
                        className="link"
                        // TODO: Update URL once available
                        href="https://mitscratch.freshdesk.com/en/support/home"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FormattedMessage id="tou.parentalConsentRequiredPageNeedHelp" />
                    </a>
                })
            }
            nextButton={intl.formatMessage({id: 'tou.locationStepNextButton'})}
            onSubmit={handleSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tou.locationStepError'}) : null}
        >
            <div className="location-step-content">
                <Select
                    required
                    name="country"
                    aria-label={intl.formatMessage({id: 'tou.locationStepCountrySelector'})}
                    options={countryOptions}
                    value={selectedCounty}
                    onChange={handleOnChange}
                    className="country-select"
                />
                {selectedCounty === 'United States' && <Select
                    required
                    name="state"
                    aria-label={intl.formatMessage({id: 'tou.locationStepStateSelector'})}
                    options={[
                        {value: '', label: intl.formatMessage({id: 'tou.locationStepStateSelector'}), hidden: true},
                        ...stateOptions
                    ]}
                    className="state-select"
                />}
            </div>
        </TouFlowStep>
    );
};

LocationStep.propTypes = {
    user: PropTypes.shape({
        country: PropTypes.string.isRequired
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

module.exports = LocationStep;
