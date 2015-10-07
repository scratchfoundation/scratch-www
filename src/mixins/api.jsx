var defaults = require('lodash.defaults');
var xhr = require('xhr');

module.exports = {
    api: function (opts, callback) {
        opts = defaults(opts, {responseType: 'json'});
        opts.headers = defaults(opts.headers, {'X-Requested-With': 'XMLHttpRequest'});
        xhr(opts, function (err, res, body) {
            if (err) {
                // emit global "error" event
                return callback(err);
            }

            // @todo Global error handler
            callback(err, body);
        }.bind(this));
    }
};
