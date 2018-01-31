module.exports = {};
const countries = module.exports.data = require('iso-3166-2').data;

module.exports.countryOptions = Object.keys(countries).map(code => ({
    value: code.toLowerCase(),
    label: countries[code].name
}))
    .sort((a, b) => {
        if (a.label < b.label) {
            return -1;
        }
        return 1;
    });

module.exports.subdivisionOptions = Object.keys(countries).reduce((subByCountry, code) => {
    subByCountry[code.toLowerCase()] = Object.keys(countries[code].sub).map(subCode => ({
        value: subCode.toLowerCase(),
        label: countries[code].sub[subCode].name,
        type: countries[code].sub[subCode].type
    }))
        .sort((a, b) => {
            if (a.label < b.label) {
                return -1;
            }
            return 1;
        });
    return subByCountry;
}, {});
