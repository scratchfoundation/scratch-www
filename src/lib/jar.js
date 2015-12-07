var cookie = require('cookie');
var xhr = require('xhr');

/**
 * Module that handles coookie interactions.
 *     (Cookies?!?! Jar?!?! Get it?!?! WE'RE AMAZING!!!!)
 *
 * get(name, callback) – can be sync or async, as callback is optional
 * set(name, value) – synchronously sets the cookie
 * use(name, uri, callback) – can by sync or async, gets cookie from the uri if not there.
 */
var Jar = {
    get: function (name, callback) {
    // Get cookie by name
    var obj = cookie.parse(document.cookie) || {};

        // Handle optional callback
        if (typeof callback === 'function') {
            if (typeof obj === 'undefined') return callback('Cookie not found.');
            return callback(null, obj[name]);
        }

        return obj[name];
    },
    use: function (name, uri, callback) {
        // Attempt to get cookie
        Jar.get(name, function (err, obj) {
            if (typeof obj !== 'undefined') return callback(null, obj);

            // Make XHR request to cookie setter uri
            xhr({
                uri: uri
            }, function (err) {
                if (err) return callback(err);
                Jar.get(name, callback);
            });
        });
    },
    set: function (name, value) {
        var obj = cookie.serialize(name, value);
        var expires = '; expires=' + new Date(new Date().setYear(new Date().getFullYear() + 1)).toUTCString();
        var path = '; path=/';
        document.cookie = obj + expires + path;
    }
};

module.exports = Jar;
