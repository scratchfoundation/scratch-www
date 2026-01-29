const React = require('react');
const {useCallback, useState, useMemo} = React;
const PropTypes = require('prop-types');
const {useIntl, FormattedMessage} = require('react-intl');

const Select = require('../forms/select.jsx');
const TosFlowStep = require('./tos-flow-step.jsx');
const countryData = require('../../lib/country-data.js');
const externalLinks = require('../../lib/external-links.js');
const {getBirthMonthOptions, getBirthYearOptions} = require('../../lib/calendar-data.js');

require('./profile-completion-step.scss');

const ProfileCompletionStep = ({user, onSubmit, loading, error}) => {
    const intl = useIntl();

    const currentCountry = user.country ?? '';
    const currentBirthMonth = user.birthMonth ?? '';
    const currentBirthYear = user.birthYear ?? '';
    // Even though we just started gathering the state and existing users will not have it
    // There is a possibility in which the user updated the state through the account settings,
    // but the birth year/month is missing from the info. In that case, we would only want to display the
    // birth date section
    const currentState = user.state ?? '';

    const [selectedCountry, setSelectedCountry] = useState(currentCountry ?? '');

    const countryInfo = useMemo(() => countryData.lookupCountryByName(selectedCountry), [selectedCountry]);

    const allSubdivisions = countryInfo && countryData.subdivisionOptions[countryInfo.code] ?
        countryData.subdivisionOptions[countryInfo.code] :
        [];
    const stateOptions = useMemo(() =>
        allSubdivisions.filter(subdivision => subdivision.type === 'State'),
    [allSubdivisions]);

    const countryOptions = countryData.registrationCountryNameOptions;
    const birthMonthOptions = getBirthMonthOptions(intl, '');
    const birthYearOptions = getBirthYearOptions(intl, '');

    const handleSubmit = useCallback(value => {
        const state = stateOptions.find(subdivision => subdivision.value === value.state)?.label;
        const country = value.country;
        const birthMonth = value.birthMonth;
        const birthYear = value.birthYear;

        return onSubmit({state, country, birthMonth, birthYear});
    }, [stateOptions, onSubmit]);

    const handleOnChange = useCallback((_field, value) => {
        setSelectedCountry(value);
    }, []);

    return (
        <TosFlowStep
            title={intl.formatMessage({id: 'tos.profileCompletionStepTitle'})}
            description={intl.formatMessage(
                {id: 'tos.profileCompletionStepDescription'}, {
                    needHelpLink: <a
                        className="link"
                        href={externalLinks.scratchHelpDesk.needHelp}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FormattedMessage id="tos.parentalConsentRequiredPageNeedHelp" />
                    </a>
                })
            }
            nextButton={intl.formatMessage({id: 'tos.profileCompletionStepNextButton'})}
            onSubmit={handleSubmit}
            loading={loading}
            error={error ? intl.formatMessage({id: 'tos.profileCompletionStepError'}) : null}
        >
            <div className="profile-completion-step-content">
                {/*
                    Display the section if at least one of the fields is missing,
                    but allow for updating only the missing field
                */}
                {(!currentBirthYear || !currentBirthMonth) &&
                    <div className="date-of-birth-section">
                        <div className="section-label">
                            <FormattedMessage id="tos.profileCompletionStepBirthDate" />
                        </div>
                        <div className="section-selectors">
                            {!currentBirthMonth &&
                                <Select
                                    required
                                    name="birthMonth"
                                    aria-label={intl.formatMessage({id: 'general.month'})}
                                    options={birthMonthOptions}
                                    value={currentBirthMonth}
                                    className="month-select"
                                />
                            }
                            {!currentBirthYear &&
                                <Select
                                    required
                                    name="birthYear"
                                    aria-label={intl.formatMessage({id: 'general.year'})}
                                    options={birthYearOptions}
                                    value={currentBirthYear}
                                    className="year-select"
                                />
                            }
                        </div>
                    </div>
                }
                {
                    /*
                        - Display the section if the country is missing or if the country is US and the state is missing
                        - Always allow for updating the country field
                        - Allow updating the state field only if the selected country is US
                    */
                }
                {(!currentCountry || (currentCountry === 'United States' && !currentState)) &&
                    <div className="location-section">
                        <div className="section-label">
                            <FormattedMessage id="tos.profileCompletionStepLocation" />
                        </div>
                        <div>

                            <Select
                                required
                                name="country"
                                aria-label={intl.formatMessage({id: 'tos.profileCompletionStepCountrySelector'})}
                                options={[
                                    {
                                        value: '',
                                        label: intl.formatMessage({id: 'tos.profileCompletionStepCountrySelector'}),
                                        hidden: true
                                    },
                                    ...countryOptions
                                ]}
                                value={selectedCountry}
                                onChange={handleOnChange}
                                className="country-select"
                            />
                            {selectedCountry === 'United States' && <Select
                                required
                                name="state"
                                aria-label={intl.formatMessage({id: 'tos.profileCompletionStepStateSelector'})}
                                options={[{
                                    value: '',
                                    label: intl.formatMessage({id: 'tos.profileCompletionStepStateSelector'}),
                                    hidden: true
                                },
                                ...stateOptions
                                ]}
                                value={currentState}
                                className="state-select"
                            />}
                        </div>
                    </div>
                }
            </div>
        </TosFlowStep>
    );
};

ProfileCompletionStep.propTypes = {
    user: PropTypes.shape({
        country: PropTypes.string,
        state: PropTypes.string,
        birthMonth: PropTypes.number,
        birthYear: PropTypes.number
    }),
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
};

module.exports = ProfileCompletionStep;
