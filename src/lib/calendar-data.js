const getBirthMonthOptions = (intl, placeholder = 'null') => ([
    {value: placeholder, label: intl.formatMessage({id: 'general.month'}), disabled: true},
    {value: '1', label: intl.formatMessage({id: 'general.monthJanuary'})},
    {value: '2', label: intl.formatMessage({id: 'general.monthFebruary'})},
    {value: '3', label: intl.formatMessage({id: 'general.monthMarch'})},
    {value: '4', label: intl.formatMessage({id: 'general.monthApril'})},
    {value: '5', label: intl.formatMessage({id: 'general.monthMay'})},
    {value: '6', label: intl.formatMessage({id: 'general.monthJune'})},
    {value: '7', label: intl.formatMessage({id: 'general.monthJuly'})},
    {value: '8', label: intl.formatMessage({id: 'general.monthAugust'})},
    {value: '9', label: intl.formatMessage({id: 'general.monthSeptember'})},
    {value: '10', label: intl.formatMessage({id: 'general.monthOctober'})},
    {value: '11', label: intl.formatMessage({id: 'general.monthNovember'})},
    {value: '12', label: intl.formatMessage({id: 'general.monthDecember'})}
]);

const getBirthYearOptions = (intl, placeholder = 'null') => {
    const curYearRaw = (new Date()).getYear();
    const curYear = curYearRaw + 1900;
    // including both 1900 and current year, there are (curYearRaw + 1) options.
    const numYearOptions = curYearRaw + 1;
    const birthYearOptions = Array(numYearOptions).fill()
        .map((defaultVal, i) => (
            {value: String(curYear - i), label: String(curYear - i)}
        ));
    birthYearOptions.unshift({ // set placeholder as first option
        disabled: true,
        value: placeholder,
        label: intl.formatMessage({id: 'general.year'})
    });
    return birthYearOptions;
};

module.exports = {getBirthMonthOptions, getBirthYearOptions};
