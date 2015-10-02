var defaults = require('lodash.defaults');
var xhr = require('xhr');

module.exports = {
    ERR_500: 500,
    api: function (opts, callback) {
        opts = defaults(opts, {responseType: 'json'});
        opts.headers = defaults(opts.headers, {'X-Requested-With': 'XMLHttpRequest'});
        xhr(opts, function (err, res, body) {
            if (err) {
                // emit global "error" event
                return callback(err);
            }
            if (res.statusCode == 500) {
                return callback(this.ERR_500);
            }

            // @todo Global error handler
            callback(err, body);
        }.bind(this));
    }
};
