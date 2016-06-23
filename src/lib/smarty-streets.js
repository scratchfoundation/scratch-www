var defaults = require('lodash.defaults');
var api = require('./api');

module.exports = function smartyStreetApi (params, callback) {
    defaults(params, {
        'auth-id': process.env.SMARTY_STREETS_API_KEY
    });
    api({
        host: 'https://api.smartystreets.com',
        uri: '/street-address',
        params: params
    }, function (err, body, res) {
        if (err) return callback(err);
        if (res.statusCode !== 200) {
            return callback(
                'There was an error contacting the address validation server.'
            );
        }
        return callback(err, body);
    });
};
