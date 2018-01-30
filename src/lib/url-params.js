/* Turn an object into an url param string
 * urlParams({a: 1, b: 2, c: 3})
 * // a=1&b=2&c=3
 */
const params = values => (
    Object.keys(values).map(key => {
        const value = typeof values[key] === 'undefined' ? '' : values[key];
        const encodeKeyValuePair = val => (
            [key, val].map(encodeURIComponent).join('=')
        );
        if (Array.isArray(value)) {
            return value.map(encodeKeyValuePair).join('&');
        }
        return encodeKeyValuePair(value);
    })
        .join('&')
);

module.exports = params;
