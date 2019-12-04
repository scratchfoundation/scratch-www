const api = require('./api');

module.exports = {};

module.exports.requestSessionWithRetry = (count, resolve, reject) => {
    api({
        host: '',
        uri: '/session/'
    }, (err, body, response) => {
        if (err || (response && response.statusCode === 404)) {
            return reject(err);
        }
        if (typeof body === 'undefined' || !body.user) {
            // Retry after 500ms, 1.5s, 3.5s, 7.5s and then stop.
            if (count > 4) {
                return resolve(body);
            }
            return setTimeout(module.exports.requestSessionWithRetry.bind(null, count + 1, resolve, reject),
                250 * Math.pow(2, count));
        }
        return resolve(body);
    });
};
