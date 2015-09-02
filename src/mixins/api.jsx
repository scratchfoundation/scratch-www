var xhr = require('xhr');

module.exports = {
    api: function (opts, callback) {
        xhr(opts, function (err, res, body) {
            if (err) {
                // emit global "error" event
                return callback(err);
            }
            // @todo Global error handler
            callback(err, body);
        });
    }
};
