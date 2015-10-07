var defaults = require('lodash.defaults');
var xhr = require('xhr');
var log = require('../log.js');

module.exports = {
    api: function (opts, callback) {
        opts = defaults(opts, {json: {}});
        opts.headers = defaults(opts.headers, {'X-Requested-With': 'XMLHttpRequest'});
        xhr(opts, function (err, res, body) {
            if (err) {
                log.error(err);
                callback(err);
            } else {
                callback(err, body);
            }
        });
    }
};
