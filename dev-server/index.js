var express = require('express');
var proxy = require('express-http-proxy');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');

var compiler = webpack(require('../webpack.config.js'));
var handler = require('./handler');
var log = require('./log');
var routes = require('../src/routes.json');

// Create server
var app = express();
app.disable('x-powered-by');

// Server setup
app.use(log());

// Bind routes
for (var routeId in routes) {
    var route = routes[routeId];
    app.get(route.pattern, handler(route));
}

app.use(webpackDevMiddleware(compiler));

var proxyHost = process.env.FALLBACK || '';
if (proxyHost !== '') {
    // Fall back to scratchr2 in development
    // This proxy middleware must come last
    app.use('/', proxy(proxyHost));
}

// Start listening
var port = process.env.PORT || 8333;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
    if (proxyHost) {
        process.stdout.write('Proxy host: ' + proxyHost + '\n');
    }
});
