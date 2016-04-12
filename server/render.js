var defaults = require('lodash.defaults');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');

var config = require('./config');

module.exports = function (route) {
    // Route definition
    defaults(route, config);

    // Render template
    var location = path.resolve(__dirname, './template.html');
    var template = fs.readFileSync(location, 'utf8');
    return mustache.render(template, route);
};
