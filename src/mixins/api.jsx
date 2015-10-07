var cookie = require('cookie');
var defaults = require('lodash.defaults');
var xhr = require('xhr');
var log = require('../log.js');

module.exports = {
    getCsrf: function (callback) {
        var obj = cookie.parse(document.cookie) || {};
        if (typeof obj.scratchcsrftoken === 'undefined') return callback('Cookie not found.');
        callback(null, obj.scratchcsrftoken);
    },
    useCsrf: function (callback) {
        this.getCsrf(function (err, csrftoken) {
            if (csrftoken) return callback(null, csrftoken);
            xhr({
                'uri': '/csrf_token/'
            }, function (err) {
                if (err) return callback(err);
                this.getCsrf(function (err, csrftoken) {
                    if (err) return callback(err);
                    callback(err, csrftoken);
                });
            }.bind(this));
        }.bind(this));
    },
    api: function (opts, callback) {
        defaults(opts, {
            headers: {},
            json: {},
            useCsrf: false
        });

        defaults(opts.headers, {
            'X-Requested-With': 'XMLHttpRequest'
        });

        var apiRequest = function (opts) {
            xhr(opts, function (err, res, body) {
                if (err) log.error(err);
                callback(err, body);
            });
        }.bind(this);

        if (opts.useCsrf) {
            this.useCsrf(function (err, csrftoken) {
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
