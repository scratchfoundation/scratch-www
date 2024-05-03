const async = require('async');
const defaults = require('lodash.defaults');
const fastlyConfig = require('./lib/fastly-config-methods');
const languages = require('scratch-l10n').default;

const routeJson = require('../src/routes.json');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

const fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

const extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '/\\?',
    // View html
    '/[^/]*.html$'
];

const routes = routeJson.map(
    route => defaults({}, {pattern: fastlyConfig.expressPatternToRegex(route.pattern)}, route)
);

async.auto({
    version: function (cb) {
        fastly.getLatestActiveVersion((err, response) => {
            if (err) return cb(err);
            // Validate latest version before continuing
            if (response.active || response.locked) {
                fastly.cloneVersion(response.number, (e, resp) => {
                    if (e) return cb(`Failed to clone latest version: ${e}`);
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
        const notPassStatement = fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname);

        // For a non-pass condition, point backend at s3
        const recvCondition = `${'' +
            'if ('}${notPassStatement}) {\n` +
            `    set req.backend = F_s3;\n` +
            `    set req.http.host = "${S3_BUCKET_NAME}";\n` +
            `} else {\n` +
            `    if (!req.http.Fastly-FF) {\n` +
            `        if (req.http.X-Forwarded-For) {\n` +
            `            set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For ", " client.ip;\n` +
            `        } else {\n` +
            `            set req.http.Fastly-Temp-XFF = client.ip;\n` +
            `        }\n` +
            `    } else {\n` +
            `        set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For;\n` +
            `    }\n` +
            `    set req.grace = 60s;\n` +
            `    if (req.http.Cookie:scratchlanguage) {\n` +
            `        set req.http.Accept-Language = req.http.Cookie:scratchlanguage;\n` +
            `    } else {\n` +
            `        set req.http.Accept-Language = accept.language_lookup("${
                Object.keys(languages).join(':')}", ` +
                         `"en", ` +
                         `std.tolower(req.http.Accept-Language)` +
                     `);\n` +
            `    }\n` +
            `    if (req.url ~ "^(/projects/|/fragment/account-nav.json|/session/)" && ` +
            `!req.http.Cookie:scratchsessionsid) {\n` +
            `        set req.http.Cookie = "scratchlanguage=" req.http.Cookie:scratchlanguage;\n` +
            `    } else {\n` +
            `        return(pass);\n` +
            `    }\n` +
            `}\n`;


        fastly.setCustomVCL(
            results.version,
            'recv-condition',
            recvCondition,
            cb
        );
    }],
    fetchCustomVCL: ['version', function (results, cb) {
        const passStatement = fastlyConfig.negateConditionStatement(
            fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname)
        );
        const ttlCondition = fastlyConfig.setResponseTTL(passStatement);
        fastly.setCustomVCL(results.version, 'fetch-condition', ttlCondition, cb);
    }],
    appRouteRequestConditions: ['version', function (results, cb) {
        const conditions = {};
        async.forEachOf(routes, (route, id, cb2) => {
            const condition = {
                name: fastlyConfig.getConditionNameForRoute(route, 'request'),
                statement: `req.url.path ~ "${route.pattern}"`,
                type: 'REQUEST',
                // Priority needs to be > 1 to not interact with http->https redirect
                priority: 10 + id
            };
            fastly.setCondition(results.version, condition, (err, response) => {
                if (err) return cb2(err);
                conditions[id] = response;
                cb2(null, response);
            });
        }, err => {
            if (err) return cb(err);
            cb(null, conditions);
        });
    }],
    appRouteHeaders: ['version', 'appRouteRequestConditions', function (results, cb) {
        const headers = {};
        async.forEachOf(routes, (route, id, cb2) => {
            if (route.redirect) {
                async.auto({
                    responseCondition: function (cb3) {
                        const condition = {
                            name: fastlyConfig.getConditionNameForRoute(route, 'response'),
                            statement: `req.url.path ~ "${route.pattern}"`,
                            type: 'RESPONSE',
                            priority: id
                        };
                        fastly.setCondition(results.version, condition, cb3);
                    },
                    responseObject: function (cb3) {
                        const responseObject = {
                            name: fastlyConfig.getResponseNameForRoute(route),
                            status: 301,
                            response: 'Moved Permanently',
                            request_condition: fastlyConfig.getConditionNameForRoute(route, 'request')
                        };
                        fastly.setResponseObject(results.version, responseObject, cb3);
                    },
                    redirectHeader: ['responseCondition', function (redirectResults, cb3) {
                        const header = {
                            name: fastlyConfig.getHeaderNameForRoute(route),
                            action: 'set',
                            ignore_if_set: 0,
                            type: 'RESPONSE',
                            dst: 'http.Location',
                            src: `"${route.redirect}"`,
                            response_condition: redirectResults.responseCondition.name
                        };
                        fastly.setFastlyHeader(results.version, header, cb3);
                    }]
                }, (err, redirectResults) => {
                    if (err) return cb2(err);
                    headers[id] = redirectResults.redirectHeader;
                    cb2(null, redirectResults);
                });
            } else {
                const header = {
                    name: fastlyConfig.getHeaderNameForRoute(route, 'request'),
                    action: 'set',
                    ignore_if_set: 0,
                    type: 'REQUEST',
                    dst: 'url',
                    src: `"/${route.name}.html"`,
                    request_condition: results.appRouteRequestConditions[id].name,
                    priority: 10
                };
                fastly.setFastlyHeader(results.version, header, (err, response) => {
                    if (err) return cb2(err);
                    headers[id] = response;
                    cb2(null, response);
                });
            }
        }, err => {
            if (err) return cb(err);
            cb(null, headers);
        });
    }],
    tipbarRedirectHeaders: ['version', function (results, cb) {
        async.auto({
            requestCondition: function (cb2) {
                const condition = {
                    name: 'routes/?tip_bar= (request)',
                    statement: 'req.url ~ "\\?tip_bar="',
                    type: 'REQUEST',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseCondition: function (cb2) {
                const condition = {
                    name: 'routes/?tip_bar= (response)',
                    statement: 'req.url ~ "\\?tip_bar="',
                    type: 'RESPONSE',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseObject: ['requestCondition', function (redirectResults, cb2) {
                const responseObject = {
                    name: 'redirects/?tip_bar=',
                    status: 301,
                    response: 'Moved Permanently',
                    request_condition: redirectResults.requestCondition.name
                };
                fastly.setResponseObject(results.version, responseObject, cb2);
            }],
            redirectHeader: ['responseCondition', function (redirectResults, cb2) {
                const header = {
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
        }, (err, redirectResults) => {
            if (err) return cb(err);
            cb(null, redirectResults);
        });
    }],
    embedRedirectHeaders: ['version', function (results, cb) {
        async.auto({
            requestCondition: function (cb2) {
                const condition = {
                    name: 'routes/projects/embed (request)',
                    statement: 'req.url.path ~ "^/projects/embed/(\\d+)"',
                    type: 'REQUEST',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseCondition: function (cb2) {
                const condition = {
                    name: 'routes/projects/embed (response)',
                    statement: 'req.url.path ~ "^/projects/embed/(\\d+)"',
                    type: 'RESPONSE',
                    priority: 10
                };
                fastly.setCondition(results.version, condition, cb2);
            },
            responseObject: ['requestCondition', function (redirectResults, cb2) {
                const responseObject = {
                    name: 'redirects/projects/embed',
                    status: 301,
                    response: 'Moved Permanently',
                    request_condition: redirectResults.requestCondition.name
                };
                fastly.setResponseObject(results.version, responseObject, cb2);
            }],
            redirectHeader: ['responseCondition', function (redirectResults, cb2) {
                const header = {
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
        }, (err, redirectResults) => {
            if (err) return cb(err);
            cb(null, redirectResults);
        });
    }]
}, (err, results) => {
    if (err) throw new Error(err);
    if (process.env.FASTLY_ACTIVATE_CHANGES) {
        fastly.activateVersion(results.version, (e, resp) => {
            if (e) throw new Error(e);
            process.stdout.write(`Successfully configured and activated version ${resp.number}\n`);
            // purge static-assets using surrogate key
            fastly.purgeKey(FASTLY_SERVICE_ID, 'static-assets', error => {
                if (error) throw new Error(error);
                process.stdout.write('Purged static assets.\n');
            });
        });
    }
});
