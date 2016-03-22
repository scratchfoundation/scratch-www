var defaults = require('lodash.defaults');
var xhr = require('xhr');

var jar  = require('../lib/jar.js');
var log = require('../lib/log.js');

/**
 * Component mixin that constructs requests to the scratch api.
 * Custom arguments:
 *     - useCsrf [boolean] – handles unique csrf token retrieval for POST requests. This prevents
 *       CSRF forgeries (see: https://www.squarefree.com/securitytips/web-developers.html#CSRF)
 *
 * It also takes in other arguments specified in the xhr library spec.
 */
var Api = {
    api: function (opts, callback) {
        defaults(opts, {
            host: window.env.API_HOST,
            headers: {},
            json: {},
            useCsrf: false
        });

        defaults(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest'
        });

        opts.uri = opts.host + opts.uri;

        var apiRequest = function (opts) {
            if (opts.host !== '') {
                // For IE < 10, we must use XDR for cross-domain requests. XDR does not support
                // custom headers.
                defaults(opts, {useXDR: true});
                delete opts.headers;
                if (opts.authentication) {
                    var authenticationParams = ['x-token=' + opts.authentication];
                    var parts = opts.uri.split('?');
                    var qs = (parts[1] || '').split('&').concat(authenticationParams).join('&');
                    opts.uri = parts[0] + '?' + qs;

                }
            }
            xhr(opts, function (err, res, body) {
                if (err) log.error(err);
                // Legacy API responses come as lists, and indicate to redirect the client like
                // [{success: true, redirect: "/location/to/redirect"}]
                try {
                    if ('redirect' in body[0]) window.location = body[0].redirect;
                } catch (err) {
                    // do nothing
                }
                callback(err, body);
            });
        }.bind(this);

        if (typeof jar.get('scratchlanguage') !== 'undefined') {
            opts.headers['Accept-Language'] = jar.get('scratchlanguage') + ', en;q=0.8';
        }
        if (opts.authentication) {
            opts.headers['X-Token'] = opts.authentication;
        }
        if (opts.useCsrf) {
            jar.use('scratchcsrftoken', '/csrf_token/', function (err, csrftoken) {
                if (err) return log.error('Error while retrieving CSRF token', err);
                opts.json.csrftoken = csrftoken;
                opts.headers['X-CSRFToken'] = csrftoken;
                apiRequest(opts);
            }.bind(this));
        } else {
            apiRequest(opts);
        }
    }
};

module.exports = Api;
