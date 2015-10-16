var cookie = require('cookie');
var xhr = require('xhr');

var module = module.exports = {};

module.get = function (name, callback) {
    // Get cookie by name
    var obj = cookie.parse(document.cookie) || {};

    // Handle optional callback
    if (typeof callback === 'function') {
        if (typeof obj === 'undefined') return callback('Cookie not found.');
        return callback(null, obj[name]);
    }

    return obj[name];
};

module.use = function (name, uri, callback) {
    // Attempt to get cookie
    module.get(name, function (err, obj) {
        if (typeof obj !== 'undefined') return callback(null, obj);

        // Make XHR request to cookie setter uri
        xhr({
            uri: uri
        }, function (err) {
            if (err) return callback(err);
            module.get(name, callback);
        });
    });
};
