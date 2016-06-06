/* Turn an object into an url param string
 * urlParams({a: 1, b: 2, c: 3})
 * // a=1&b=2&c=3
 */
module.exports = function urlParams (values) {
    return Object
        .keys(values)
        .map(function (key) {
            return [key, values[key]]
                .map(encodeURIComponent)
                .join('=');
        })
        .join('&');
};
