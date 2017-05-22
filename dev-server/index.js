var express = require('express');
var proxy = require('express-http-proxy');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');

var compiler = webpack(require('../webpack.config.js'));
var handler = require('./handler');
var log = require('./log');
var routes = require('../src/routes.json').concat(require('../src/routes-dev.json'));

// Create server
var app = express();
app.disable('x-powered-by');

// Server setup
app.use(log());

// Bind routes
routes.forEach(route => {
    app.get(route.pattern, handler(route));
});

if (process.env.NODE_ENV !== 'production') {
    // serve the content using webpack
    app.use(webpackDevMiddleware(compiler));

    var proxyHost = process.env.FALLBACK || '';
    if (proxyHost !== '') {
        // Fall back to scratchr2 in development
        // This proxy middleware must come last
        app.use('/', proxy(proxyHost));
    }

} else {
    // serve the content using static directory
    app.use(express.static('./build'));
}

// Start listening
var port = process.env.PORT || 8333;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
    if (proxyHost) {
        process.stdout.write('Proxy host: ' + proxyHost + '\n');
    }
});
