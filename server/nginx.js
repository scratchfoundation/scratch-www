var routes = require('./routes.json');
var nginx_conf = require('routes-to-nginx-conf');

nginx_conf.generate_nginx_conf( routes, function ( v ) { process.stdout.write(v); } );

