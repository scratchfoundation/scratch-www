module.exports = {};
const countries = module.exports.data = require('iso-3166-2').data;

const orderByLabel = (a, b) => {
    if (a.label < b.label) {
        return -1;
    }
    return 1;
};

/**
 * countryOptions is an array like:
 * [
 *    {'value': 'af', 'label': 'Afghanistan'},
 *    {'value': 'ad', 'label': 'Andorra'},
 *    ...
 * ]
 */
module.exports.countryOptions =
    Object.keys(countries).map(code => (
        {
            value: code.toLowerCase(),
            label: countries[code].name
        }
    ))
        .sort(orderByLabel);

/* subdivisionOptions is an array like:
 * [
 *    {'ad':
 *       [
 *          {'value': 'ad-07', 'label': 'Andorra la Vella', 'type': 'Parish'},
 *          {'value': 'ad-02', 'label': 'Canillo', 'type': 'Parish'},
 *          ...
 *       ]
 *    },
 *    ...
 *    {'zw':
 *       [
 *          {'value': 'zw-bu', 'label': 'Bulawayo', 'type': 'Province'},
 *          {'value': 'zw-ma', 'label': 'Manicaland', 'type': 'Province'},
 *          ...
 *       ]
 *    },
 *    ...
 * ]
 */
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
