module.exports = {};
var countries = module.exports.data = require('iso-3166-2').data;

var asOptions = module.exports.asOptions = Object.keys(countries).map(function (code) {
    return {value: code.toLowerCase(), label: countries[code].name};
}).sort(function (a, b) {
    return a.label < b.label ? -1 : 1;
});
