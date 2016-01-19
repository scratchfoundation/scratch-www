var defaults = require('lodash.defaults');
var xhr = require('xhr');

var jar  = require('../lib/jar.js');
var log = require('../lib/log.js');

var CookieMixinFactory = require('./cookieMixinFactory.jsx');

/**
 * Component mixin that constructs requests to the scratch api.
 * Custom arguments:
 *     - useCsrf [boolean] – handles unique csrf token retrieval for POST requests. This prevents
 *       CSRF forgeries (see: https://www.squarefree.com/securitytips/web-developers.html#CSRF)
 *
 * It also takes in other arguments specified in the xhr library spec.
 */
var Api = {
    mixins: [
        // Provides useScratchcsrftoken
        CookieMixinFactory('scratchcsrftoken', '/csrf_token/')
    ],
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
            }
            xhr(opts, function (err, res, body) {
                if (err) log.error(err);
                // Legacy API responses come as lists, and indicate to redirect the client like
                // [{success: true, redirect: "/location/to/redirect"}]
                if (body && body[0] && 'redirect' in body[0]) window.location = body[0].redirect;
                callback(err, body);
            });
        }.bind(this);

        if (typeof jar.get('scratchlanguage') !== 'undefined') {
            opts.headers['Accept-Language'] = jar.get('scratchlanguage') + ', en;q=0.8';
        }
        if (opts.useCsrf) {
            this.useScratchcsrftoken(function (err, csrftoken) {
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
