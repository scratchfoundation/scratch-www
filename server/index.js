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
for (var rId in routes) {
    var route = routes[rId];
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
    for (var pId in proxies) {
        var proxyRoute = proxies[pId];
        app.use(proxyRoute.root, proxy(proxyRoute.proxy, {
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
});
