var compression = require('compression');
var express = require('express');
var path = require('path');

var handler = require('./handler');
var log = require('./log');
var routes = require('./routes.json');

// Server setup
var app = express();
app.disable('x-powered-by');
app.use(log());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../build'), {
    lastModified: true,
    maxAge: '1y'
}));

// Bind routes
for (var item in routes) {
    var route = routes[item];
    app.get(route.pattern, handler(route));
}

// Start listening
var port = process.env.PORT || 8888;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
});
