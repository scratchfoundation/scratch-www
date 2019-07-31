const {
    countryOptions,
    subdivisionOptions
} = require('../../../src/lib/country-data');

describe('unit test lib/country-data.js', () => {

    test('countryOptions has the ballpark number of countries we expect', () => {
        expect(typeof countryOptions).toBe('object');
        expect(countryOptions.length > 200).toEqual(true);
        expect(countryOptions.length < 300).toEqual(true);
    });

    test('countryOptions is in alphabetical order', () => {
        // test whether countryOptions is already sorted, by:
        // 1) creating a sorted version of countryOptions
        const sortedCountryOptions = countryOptions.sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            return 1;
        });
        // 2) comparing sorted version of countryOptions to original
        expect(countryOptions.map(option => option.label))
            .toEqual(sortedCountryOptions.map(option => option.label));
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
