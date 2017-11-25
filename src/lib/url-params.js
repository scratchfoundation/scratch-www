/* Turn an object into an url param string
 * urlParams({a: 1, b: 2, c: 3})
 * // a=1&b=2&c=3
 */
export default function urlParams (values) {
    return Object
        .keys(values)
        .map(function (key) {
            var value = typeof values[key] === 'undefined' ? '' : values[key];
            function encodeKeyValuePair (value) {
                return [key, value]
                    .map(encodeURIComponent)
                    .join('=');
            }
            if (Array.isArray(value)) {
                return value.map(encodeKeyValuePair).join('&');
            } else {
                return encodeKeyValuePair(value);
            }
        })
        .join('&');
};
