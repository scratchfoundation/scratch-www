const {
    countryInfo,
    countryOptions,
    lookupCountryInfo,
    dupeCommonCountries,
    registrationCountryOptions,
    subdivisionOptions
} = require('../../../src/lib/country-data');

describe('unit test lib/country-data.js', () => {

    test('countryInfo has the ballpark number of countries we expect', () => {
        expect(typeof countryInfo).toBe('object');
        expect(countryInfo.length > 200).toEqual(true);
        expect(countryInfo.length < 300).toEqual(true);
    });

    test('countryOptions() maintains number of items', () => {
        expect(typeof countryOptions).toBe('function');
        const myCountryOptions = countryOptions(countryInfo, 'name');
        const numCountries = countryInfo.length;
        expect(myCountryOptions.length).toEqual(numCountries);
    });

    test('countryOptions() called with value=name will use correct display strings and country name', () => {
        expect(typeof countryOptions).toBe('function');
        const myCountryOptions = countryOptions(countryInfo, 'name');

        const eswatiniInfo = myCountryOptions.find(country => country.value === 'Swaziland');
        expect(eswatiniInfo).toBeTruthy();
        expect(eswatiniInfo.label).toEqual('Eswatini');

        const swedenInfo = myCountryOptions.find(country => country.value === 'Sweden');
        expect(swedenInfo).toBeTruthy();
        expect(swedenInfo.label).toEqual('Sweden');
    });

    test('countryOptions() called with value==code will use correct display strings and country code', () => {
        expect(typeof countryOptions).toBe('function');
        const myCountryOptions = countryOptions(countryInfo, 'code');
        const szInfo = myCountryOptions
            .find(country => country.value === 'sz');
        expect(szInfo).toBeTruthy();
        expect(szInfo.label).toEqual('Eswatini');
    });

    test('lookupCountryInfo() will find country info', () => {
        expect(typeof lookupCountryInfo).toBe('function');
        const eswatiniInfo = lookupCountryInfo('sz');
        expect(eswatiniInfo.name).toEqual('Swaziland');
        expect(eswatiniInfo.display).toEqual('Eswatini');
        expect(eswatiniInfo.code).toEqual('sz');
    });

    test('calling dupeCommonCountries() will duplicate the requested country info at start of array', () => {
        expect(typeof dupeCommonCountries).toBe('function');
        const countryInfoWithCommon = dupeCommonCountries(countryInfo, ['ca', 'gb']);

        // test that the two entries have been added to the start of the array
        const numCountries = countryInfo.length;
        expect(countryInfoWithCommon.length).toEqual(numCountries + 2);
        expect(countryInfoWithCommon[0]).toEqual({code: 'ca', name: 'Canada'});
        expect(countryInfoWithCommon[1]).toEqual({code: 'gb', name: 'United Kingdom'});

        // test that there are now two entries for Canada
        const canadaItems = countryInfoWithCommon.reduce((acc, thisCountry) => (
            thisCountry.code === 'ca' ? [...acc, thisCountry] : acc
        ), []);
        expect(canadaItems.length).toEqual(2);
        // test that there are now two entries for UK
        const ukItems = countryInfoWithCommon.reduce((acc, thisCountry) => (
            thisCountry.code === 'gb' ? [...acc, thisCountry] : acc
        ), []);
        expect(ukItems.length).toEqual(2);
    });

    test('registrationCountryOptions object places USA and UK at start, with display name versions', () => {
        expect(typeof registrationCountryOptions).toBe('object');
        const numCountries = countryInfo.length;

        // test that the two entries have been added to the start of the array, and that
        // the name of the USA includes "America"
        expect(registrationCountryOptions.length).toEqual(numCountries + 2);
        expect(registrationCountryOptions[0]).toEqual({value: 'us', label: 'United States of America'});
        expect(registrationCountryOptions[1]).toEqual({value: 'gb', label: 'United Kingdom'});

        // test that there are now two entries for USA
        const usaOptions = registrationCountryOptions.reduce((acc, thisCountry) => (
            thisCountry.value === 'us' ? [...acc, thisCountry] : acc
        ), []);
        expect(usaOptions.length).toEqual(2);
        // test that there are now two entries for UK
        const ukOptions = registrationCountryOptions.reduce((acc, thisCountry) => (
            thisCountry.value === 'gb' ? [...acc, thisCountry] : acc
        ), []);
        expect(ukOptions.length).toEqual(2);
    });

    test('subdivisionOptions object should include correct info for sample country', () => {
        expect(typeof subdivisionOptions).toBe('object');
        // 71 subdivisions in Bangladesh
        expect(subdivisionOptions.bd.length > 50).toEqual(true);
        expect(subdivisionOptions.bd.length < 100).toEqual(true);
        const nilphamari = subdivisionOptions.bd.find(item => item.label === 'Nilphamari');
        expect(nilphamari).toEqual({
            label: 'Nilphamari',
            value: 'bd-46',
            type: 'District'
        });
    });
});
