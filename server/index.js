var compression = require('compression');
var express = require('express');
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
for (var item in routes) {
    var route = routes[item];
    if ( route.static ) {
        app.use( express.static( eval( route.resolve ), route.attributes ) );
    } else {
        app.get(route.pattern, handler(route));
    }
}

// Start listening
var port = process.env.PORT || 8888;
app.listen(port, function () {
    process.stdout.write('Server listening on port ' + port + '\n');
});
