const api = require('./api');

module.exports = {};

/*
requestSessionWithRetry()

Retries the session api call until it has either reached the limit of number of
retries, or received a successful response with that contains a 'user' field in
its body.

Each time it retries, it will double its previous waiting time, and subtract
that time from the totalDelayMS parameter.

example of what this might look like:

1st call:
receives params: retriesLeft=3 and totalDelayMS=3500
performs api call
delay until next call: 3500 / (2^3 - 1) = 500ms
next call params: retriesLeft=2, totalDelayMS=3000

2nd call:
receives params: retriesLeft=2 and totalDelayMS=3000
performs api call
delay until next call: 3000 / (2^2 - 1) = 1000ms
next call: retriesLeft=1, totalDelayMS=2000

3rd call:
receives params: retriesLeft=1, totalDelayMS=2000
performs api call
delay until next call: 2000 / (2^1 - 1) = 2000ms
next call: retriesLeft=0, totalDelayMS=0

4th call:
receives params: retriesLeft=0, totalDelayMS=0
performs api call
returns the response, even if it is undefined or empty

total api calls: 4
total delay time: 3500ms
*/
module.exports.requestSessionWithRetry = (resolve, reject, retriesLeft, totalDelayMS) => {
    api({
        host: '',
        uri: '/session/'
    }, (err, body, response) => {
        if (err || (response && response.statusCode === 404)) {
            return reject(err);
        }
        if (typeof body === 'undefined' || body === null || !body.user) {
            if (retriesLeft < 1) {
                return resolve(body);
            }
            const nextTimeout = totalDelayMS / (Math.pow(2, retriesLeft) - 1);
            return setTimeout(
                module.exports.requestSessionWithRetry.bind(
                    null, resolve, reject, retriesLeft - 1, totalDelayMS - nextTimeout
                ),
                nextTimeout
            );
        }
        return resolve(body);
    });
};

module.exports.requestSession = (resolve, reject) => (
    module.exports.requestSessionWithRetry(resolve, reject, 0, 0)
);
