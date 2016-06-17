module.exports = {};
var countries = module.exports.data = require('iso-3166-2').data;

module.exports.countryOptions = Object.keys(countries).map(function (code) {
    return {value: code.toLowerCase(), label: countries[code].name};
}).sort(function (a, b) {
    return a.label < b.label ? -1 : 1;
});

module.exports.subdivisionOptions =
Object.keys(countries).reduce(function (subByCountry, code) {
    subByCountry[code.toLowerCase()] = Object.keys(countries[code].sub).map(function (subCode) {
        return {
            value: subCode.toLowerCase(),
            label: countries[code].sub[subCode].name,
            type: countries[code].sub[subCode].type
        };
    }).sort(function (a, b) {
        return a.label < b.label ? -1 : 1;
    });
    return subByCountry;
}, {});
