var async = require('async');
var defaults = require('lodash.defaults');
var fastlyConfig = require('./lib/fastly-config-methods');
const languages = require('scratch-l10n').default;

var routeJson = require('../src/routes.json');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

var fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

var extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '/\\?',
    // View html
    '/[^/]*.html$'
];

var routes = routeJson.map(function (route) {
    return defaults({}, {pattern: fastlyConfig.expressPatternToRegex(route.pattern)}, route);
});

async.auto({
    version: function (cb) {
        fastly.getLatestVersion(function (err, response) {
            if (err) return cb(err);
            // Validate latest version before continuing
            if (response.active || response.locked) {
                fastly.cloneVersion(response.number, function (e, resp) {
                    if (e) return cb('Failed to clone latest version: ' + e);
                    cb(null, resp.number);
                });
            } else {
                cb(null, response.number);
            }
        });
    },
    recvCustomVCL: ['version', function (results, cb) {
        // For all the routes in routes.json, construct a varnish-style regex that matches
        // on any of those route conditions.
        var notPassStatement = fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname);

        // For a non-pass condition, point backend at s3
        var recvCondition = '' +
            'if (' + notPassStatement + ') {\n' +
            '    set req.backend = F_s3;\n' +
            '    set req.http.host = "' + S3_BUCKET_NAME + '";\n' +
            '} else {\n' +
            '    if (!req.http.Fastly-FF) {\n' +
            '        if (req.http.X-Forwarded-For) {\n' +
            '            set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For ", " client.ip;\n' +
            '        } else {\n' +
            '            set req.http.Fastly-Temp-XFF = client.ip;\n' +
            '        }\n' +
            '    } else {\n' +
            '        set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For;\n' +
            '    }\n' +
            '    set req.grace = 60s;\n' +
            '    if (req.http.Cookie:scratchlanguage) {\n' +
            '        set req.http.Accept-Language = req.http.Cookie:scratchlanguage;\n' +
            '    } else {\n' +
            '        set req.http.Accept-Language = accept.language_lookup("' +
                         Object.keys(languages).join(':') + '", ' +
                         '"en", ' +
                         'std.tolower(req.http.Accept-Language)' +
                     ');\n' +
            '    }\n' +
            '    if (req.url ~ "^(/projects/|/fragment/account-nav.json|/session/)" && ' +
            '!req.http.Cookie:scratchsessionsid) {\n' +
            '        set req.http.Cookie = "scratchlanguage=" req.http.Cookie:scratchlanguage;\n' +
            '    } else {\n' +
            '        return(pass);\n' +
            '    }\n' +
            '}\n';


        fastly.setCustomVCL(
            results.version,
            'recv-condition',
            recvCondition,
            cb
        );
    }],
    fetchCustomVCL: ['version', function (results, cb) {
        var passStatement = fastlyConfig.negateConditionStatement(
            fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname)
        );
        var ttlCondition = fastlyConfig.setResponseTTL(passStatement);
        fastly.setCustomVCL(results.version, 'fetch-condition', ttlCondition, cb);
    }],
    appRouteRequestConditions: ['version', function (results, cb) {
        var conditions = {};
        async.forEachOf(routes, function (route, id, cb2) {
            var condition = {
                name: fastlyConfig.getConditionNameForRoute(route, 'request'),
                statement: 'req.url ~ "' + route.pattern + '"',
                type: 'REQUEST',
                // Priority needs to be > 1 to not interact with http->https redirect
                priority: 10 + id
            };
            fastly.setCondition(results.version, condition, function (err, response) {
                if (err) return cb2(err);
                conditions[id] = response;
                cb2(null, response);
            });
        }, function (err) {
            if (err) return cb(err);
            cb(null, conditions);
        });
    }],
    appRouteHeaders: ['version', 'appRouteRequestConditions', function (results, cb) {
        var headers = {};
        async.forEachOf(routes, function (route, id, cb2) {
            if (route.redirect) {
                async.auto({
                    responseCondition: function (cb3) {
                        var condition = {
                            name: fastlyConfig.getConditionNameForRoute(route, 'response'),
                            statement: 'req.url ~ "' + route.pattern + '"',
                            type: 'RESPONSE',
                            priority: id
                        };
                        fastly.setCondition(results.version, condition, cb3);
                    },
                    responseObject: function (cb3) {
                        var responseObject = {
                            name: fastlyConfig.getResponseNameForRoute(route),
                            status: 301,
                            response: 'Moved Permanently',
                            request_condition: fastlyConfig.getConditionNameForRoute(route, 'request')
                        };
                        fastly.setResponseObject(results.version, responseObject, cb3);
                    },
                    redirectHeader: ['responseCondition', function (redirectResults, cb3) {
                        var header = {
                            name: fastlyConfig.getHeaderNameForRoute(route),
                            action: 'set',
                            ignore_if_set: 0,
                            type: 'RESPONSE',
                            dst: 'http.Location',
                            src: '"' + route.redirect + '"',
                            response_condition: redirectResults.responseCondition.name
                        };
                        fastly.setFastlyHeader(results.version, header, cb3);
                    }]
                }, function (err, redirectResults) {
                    if (err) return cb2(err);
                    headers[id] = redirectResults.redirectHeader;
                    cb2(null, redirectResults);
                });
            } else {
                var header = {
                    name: fastlyConfig.getHeaderNameForRoute(route, 'request'),
                    action: 'set',
                    ignore_if_set: 0,
                    type: 'REQUEST',
                    dst: 'url',
                    src: '"/' + route.name + '.html"',
                    request_condition: results.appRouteRequestConditions[id].name,
                    priority: 10
                };
                fastly.setFastlyHeader(results.version, header, function (err, response) {
                    if (err) return cb2(err);
                    headers[id] = response;
                    cb2(null, response);
                });
            }
        }, function (err) {
            if (err) return cb(err);
            cb(null, headers);
        });
    }],
    tipbarRedirectHeaders: ['version', function (results, cb) {
        async.auto({
            requestCondition: function (cb2) {
                var condition = {
                    name: 'routes/?tip_bar= (request)',
                    statement: 'req.url ~ "\\?tip_bar="',
                    type: 'REQUEST',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseCondition: function (cb2) {
                var condition = {
                    name: 'routes/?tip_bar= (response)',
                    statement: 'req.url ~ "\\?tip_bar="',
                    type: 'RESPONSE',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseObject: ['requestCondition', function (redirectResults, cb2) {
                var responseObject = {
                    name: 'redirects/?tip_bar=',
                    status: 301,
                    response: 'Moved Permanently',
                    request_condition: redirectResults.requestCondition.name
                };
                fastly.setResponseObject(results.version, responseObject, cb2);
            }],
            redirectHeader: ['responseCondition', function (redirectResults, cb2) {
                var header = {
                    name: 'redirects/?tip_bar=',
                    action: 'set',
                    ignore_if_set: 0,
                    type: 'RESPONSE',
                    dst: 'http.Location',
                    src: 'regsub(req.url, "tip_bar=", "tutorial=")',
                    response_condition: redirectResults.responseCondition.name
                };
                fastly.setFastlyHeader(results.version, header, cb2);
            }]
        }, function (err, redirectResults) {
            if (err) return cb(err);
            cb(null, redirectResults);
        });
    }],
    embedRedirectHeaders: ['version', function (results, cb) {
        async.auto({
            requestCondition: function (cb2) {
                var condition = {
                    name: 'routes/projects/embed (request)',
                    statement: 'req.url ~ "^/projects/embed/(\\d+)"',
                    type: 'REQUEST',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseCondition: function (cb2) {
                var condition = {
                    name: 'routes/projects/embed (response)',
                    statement: 'req.url ~ "^/projects/embed/(\\d+)"',
                    type: 'RESPONSE',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseObject: ['requestCondition', function (redirectResults, cb2) {
                var responseObject = {
                    name: 'redirects/projects/embed',
                    status: 301,
                    response: 'Moved Permanently',
                    request_condition: redirectResults.requestCondition.name
                };
                fastly.setResponseObject(results.version, responseObject, cb2);
            }],
            redirectHeader: ['responseCondition', function (redirectResults, cb2) {
                var header = {
                    name: 'redirects/projects/embed',
                    action: 'set',
                    ignore_if_set: 0,
                    type: 'RESPONSE',
                    dst: 'http.Location',
                    src: '"/projects/" + re.group.1 + "/embed"',
                    response_condition: redirectResults.responseCondition.name
                };
                fastly.setFastlyHeader(results.version, header, cb2);
            }]
        }, function (err, redirectResults) {
            if (err) return cb(err);
            cb(null, redirectResults);
        });
    }]
}, function (err, results) {
    if (err) throw new Error(err);
    if (process.env.FASTLY_ACTIVATE_CHANGES) {
        fastly.activateVersion(results.version, function (e, resp) {
            if (e) throw new Error(e);
            process.stdout.write('Successfully configured and activated version ' + resp.number + '\n');
            if (process.env.FASTLY_PURGE_ALL) {
                fastly.purgeAll(FASTLY_SERVICE_ID, function (error) {
                    if (error) throw new Error(error);
                    process.stdout.write('Purged all.\n');
                });
            }
        });
    }
});
