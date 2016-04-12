var crypto = require('crypto');

var render = require('./render.js');

/**
 * Constructor
 */
function Handler (route) {
    var output = render(route);
    var checksum = crypto.createHash('md5').update(output).digest('hex');

    return function (req, res) {
        res.set({
            'Content-Type': 'text/html',
            'Cache-Control': 'public, max-age=31536000',
            'Etag': '"' + checksum + '"'
        });
        res.send(output);
    };
}

/**
 * Export a new instance
 */
module.exports = function (route) {
    return new Handler(route);
};
