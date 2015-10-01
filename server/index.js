var compression = require('compression');
var express = require('express');
var proxy = require('express-http-proxy');
var _path = require('path');

var handler = require('./handler');
var log = require('./log');
var routes = require('./routes.json');

// Server setup
var app = express();
app.disable('x-powered-by');
app.use(log());
app.use(compression());

// Bind routes
for (var routeId in routes) {
    var route = routes[routeId];
    if ( route.static ) {
        app.use( express.static( eval( route.resolve ), route.attributes ) );
    } else {
        app.get(route.pattern, handler(route));
    }
}

// Bind proxies in development
if ( process.env.ENVIRONMENT == 'development' ) {
    var proxies = require('./proxies.json');
    var url = require('url');
    var proxyHost = process.env.PROXY_HOST || 'http://localhost';
    proxyHost += ':' + (process.env.PROXY_PORT || 8080);
    for (var proxyId in proxies) {
        var proxyRoute = proxies[proxyId];
        app.use(proxyRoute.root, proxy(proxyRoute.proxy || proxyHost, {
            filter: function (req) {
                return proxyRoute.paths.indexOf(url.parse(req.url).path) > -1;
            },
            forwardPath: function (req) {
                return url.parse(req.url).path;
            }
        }));
    }
}

// Start listening
var port = process.env.PORT || 8333;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
    if (proxyHost) {
        process.stdout.write('Proxy host: ' + proxyHost + '\n');
    }
});
