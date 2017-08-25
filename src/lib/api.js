var defaults = require('lodash.defaults');
var xhr = require('xhr');

var jar  = require('./jar');
var log = require('./log');
var urlParams = require('./url-params');

/**
 * Helper method that constructs requests to the scratch api.
 * Custom arguments:
 *     - useCsrf [boolean] – handles unique csrf token retrieval for POST requests. This prevents
 *       CSRF forgeries (see: https://www.squarefree.com/securitytips/web-developers.html#CSRF)
 *
 * It also takes in other arguments specified in the xhr library spec.
 */

module.exports = function (opts, callback) {
    defaults(opts, {
        host: process.env.API_HOST,
        headers: {},
        responseType: 'json',
        useCsrf: false
    });

    if (opts.host === '') {
        defaults(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest'
        });
    }

    opts.uri = opts.host + opts.uri;

    if (opts.params) {
        opts.uri = [opts.uri, urlParams(opts.params)]
            .join(opts.uri.indexOf('?') === -1 ? '?' : '&');
    }

    if (opts.formData) {
        opts.body = urlParams(opts.formData);
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    var apiRequest = function (opts) {
        if (opts.host !== '') {
            // For IE < 10, we must use XDR for cross-domain requests. XDR does not support
            // custom headers.
            if ('withCredentials' in new XMLHttpRequest()) {
                opts.useXDR = false;
            } else {
                opts.useXDR = true;
                delete opts.headers;
            }
            if (opts.authentication && opts.useXDR) {
                var authenticationParams = ['x-token=' + opts.authentication];
                var parts = opts.uri.split('?');
                var qs = (parts[1] || '').split('&').concat(authenticationParams).join('&');
                opts.uri = parts[0] + '?' + qs;

            }
        }
        xhr(opts, function (err, res, body) {
            if (err) log.error(err);
            if (opts.responseType === 'json' && typeof body === 'string') {
                // IE doesn't parse responses as JSON without the json attribute,
                // even with responseType: 'json'.
                // See https://github.com/Raynos/xhr/issues/123
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    // Not parseable anyway, don't worry about it
                }
            }
            // Legacy API responses come as lists, and indicate to redirect the client like
            // [{success: true, redirect: "/location/to/redirect"}]
            try {
                if ('redirect' in body[0]) window.location = body[0].redirect;
            } catch (err) {
                // do nothing
            }
            callback(err, body, res);
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
            opts.headers['X-CSRFToken'] = csrftoken;
            apiRequest(opts);
        }.bind(this));
    } else {
        apiRequest(opts);
    }
};
