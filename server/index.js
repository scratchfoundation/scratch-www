if (typeof process.env.NEW_RELIC_LICENSE_KEY === 'string') {
    require('newrelic');
}

var compression = require('compression');
var express = require('express');
var path = require('path');
var proxy = require('express-http-proxy');
var url = require('url');

var handler = require('./handler');
var log = require('./log');
var proxies = require('./proxies.json');
var routes = require('./routes.json');

// Create server
var app = express();
app.disable('x-powered-by');

// Block POST & PUT requests in production
if (process.env.NODE_ENV === 'production') {
    app.use(function (req, res, next) {
        if (req.method === 'GET') return next();
        if (req.method === 'OPTIONS') return next();
        if (req.method === 'HEAD') return next();

        res.writeHead(405, {'content-type' : 'application/json'});
        res.end('{"error": "Method not allowed"}');
    });
}

// Server setup
app.use(log());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../build'), {
    lastModified: true,
    maxAge: '1y'
}));
app.use(function (req, res, next) {
    req._path = url.parse(req.url).path;
    next();
});

// Bind routes
for (var routeId in routes) {
    var route = routes[routeId];
    app.get(route.pattern, handler(route));
}

if (typeof process.env.SENTRY_DSN === 'string') {
    var raven = require('raven');
    app.get('/sentrythrow', function mainHandler () { throw new Error('Sentry Test'); });

    // These handlers must be applied _AFTER_ other routes have been applied
    app.use(raven.middleware.express.requestHandler(process.env.SENTRY_DSN));
    app.use(raven.middleware.express.errorHandler(process.env.SENTRY_DSN));
    app.use(function errorHandler (err, req, res, next) {
        res.append('X-Sentry-ID:' + res.sentry);
        res.status(500);
        next(err);
    });

    raven.patchGlobal(process.env.SENTRY_DSN,  function () {
        process.exit(-1);
    });
}

// Bind proxies in development
if (process.env.NODE_ENV !== 'production') {
    var proxyHost = process.env.PROXY_HOST || 'https://scratch.mit.edu';

    app.use('/', proxy(proxyHost, {
        filter: function (req) {
            for (var i in proxies) {
                if (req._path.indexOf(proxies[i]) === 0) return true;
            }
            return false;
        },
        forwardPath: function (req) {
            return req._path;
        }
    }));
}

// Start listening
var port = process.env.PORT || 8333;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
    if (proxyHost) {
        process.stdout.write('Proxy host: ' + proxyHost + '\n');
    }
});
