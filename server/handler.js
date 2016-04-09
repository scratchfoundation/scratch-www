var crypto = require('crypto');
var defaults = require('lodash.defaults');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');

var config = require('./config');

/**
 * Constructor
 */
function Handler (route) {
    // Handle redirects
    if (route.redirect) {
        return (req, res) => res.redirect(route.redirect);
    } 

    // Route definition
    defaults(route, config);

    // Render template
    var location = path.resolve(__dirname, './template.html');
    var template = fs.readFileSync(location, 'utf8');
    var output = mustache.render(template, route);
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
