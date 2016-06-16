/* Turn an object into an url param string
 * urlParams({a: 1, b: 2, c: 3})
 * // a=1&b=2&c=3
 */
module.exports = function urlParams (values) {
    return Object
        .keys(values)
        .map(function (key) {
            var value = typeof values[key] === 'undefined' ? '' : values[key];
            return [key, value]
                .map(encodeURIComponent)
                .join('=');
        })
        .join('&');
};
