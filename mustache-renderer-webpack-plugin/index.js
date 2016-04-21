var defaults = require('lodash.defaults');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');

render = function (template, route, config) {
    config = config || {};
    // Route definition
    defaults(route, config);

    // Render template
    return mustache.render(template, route);
};

function MustacheRendererPlugin (options) {
    if (!options.templatePath) throw new Error('MustacheRendererPlugin requires a templatePath option');
    // Read template
    var template = fs.readFileSync(options.templatePath, 'utf8');
    this.template = template;
    this.routes = options.routes || {};
    this.config = options.config || {};
    return this;
}

MustacheRendererPlugin.prototype.apply = function (compiler) {
    var template = this.template;
    var config = this.config;
    var routes = this.routes;

    compiler.plugin('emit', function (compilation, callback) {
        var outputRoutes = {};
        routes.forEach(function (route) {
            var filename = route.name + '.html';
            var content = render(template, route, config);
            outputRoutes[route.pattern] = filename;
            compilation.assets[filename] = {
                source: function () {return content;},
                size: function () {return content.length;}
            };
        });
        var routeJson = JSON.stringify(outputRoutes);
        compilation.assets['routes.json'] = {
            source: function () {return routeJson;},
            size: function () {return routeJson.length;}
        };
        callback();
    });
};

module.exports = MustacheRendererPlugin;

