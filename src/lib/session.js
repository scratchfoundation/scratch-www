const api = require('./api');

module.exports = {};

module.exports.requestSessionWithRetry = (count, resolve, reject) => {
    console.log('starting refreshSessionWithRetry');
    api({
        host: '',
        uri: '/session/'
    }, (err, body, response) => {
        if (err || (response && response.statusCode === 404)) {
            console.log('refreshSessionWithRetry: resolving with session err');
            return reject(err);
        }
        if (typeof body === 'undefined' || !body.user) {
            // Retry after 500ms, 1.5s, 3.5s, 7.5s and then stop.
            if (count > 4) {
                console.log('refreshSessionWithRetry: too many tries, resolving');
                return resolve(body);
            }
            console.log(`with count ${count}, waiting ${(250 * Math.pow(2, count))} ms`);
            return setTimeout(module.exports.requestSessionWithRetry.bind(null, count + 1, resolve, reject),
                250 * Math.pow(2, count));
        }
        console.log('refreshSessionWithRetry: session found! resolving with body:');
        // console.log(body);
        return resolve(body);
    });
};
