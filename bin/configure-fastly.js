var async = require('async');
var defaults = require('lodash.defaults');
var glob = require('glob');
var path = require('path');

var routes = require('../src/routes.json');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';

const PASS_REQUEST_CONDITION_NAME = 'Pass';
const NOT_PASS_REQUEST_CONDITION_NAME = '!(Pass)';
const PASS_CACHE_CONDITION_NAME = 'Cache Pass';
const BUCKET_NAME_HEADER_NAME = 'Bucket name';

var fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

var extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '^/\\?',
    // Version output by build
    '/version\.txt$',
    // View html
    '^/[^\/]*\.html'
];

/*
 * Given the relative path to the static directory, return an array of
 * patterns matching the files and directories there.
 */
var getStaticPaths = function (pathToStatic) {
    var staticPaths = glob.sync(path.resolve(__dirname, pathToStatic));
    return staticPaths.map( function (pathName) {
        // Reduce absolute path to relative paths like '/js'
        var base = path.dirname(path.resolve(__dirname, pathToStatic));
        return '^' + pathName.replace(base, '');
    });
};

/*
 * Given a list of express routes, return a list of patterns to match
 * the express route and a static view file associated with the route
 */
var getViewPaths = function (routes) {
    return routes.map(function (route) {
        return route.pattern;
    });
};

/*
 * Given a list of patterns for paths, OR all of them together into one
 * string suitable for a Fastly condition
 */
var pathsToCondition = function (paths) {
    return paths.reduce(function (conditionString, pattern) {
        var patternCondition = 'req.url ~ "' + pattern + '"';
        return conditionString + (conditionString ? ' || ' : '') + patternCondition;
    }, '');
};

/*
 * Combine static paths, routes, and any additional paths to a single
 * fastly condition to match req.url
 */
var getAppRouteCondition = function (pathToStatic, routes, additionalPaths) {
    var staticPaths = getStaticPaths(pathToStatic);
    var viewPaths = getViewPaths(routes);
    var allPaths = [].concat(staticPaths, viewPaths, additionalPaths);
    return pathsToCondition(allPaths);
};

var getConditionNameForView = function (view) {
    return 'routes/' + view;
};

var getHeaderNameForView = function (view) {
    return 'rewrites/' + view;
};

async.auto({
    version: function (cb) {
        fastly.getLatestVersion(function (err, response) {
            if (err) return cb(err);
            // Validate latest version before continuing
            if (response.active) return cb('Latest version is active. Will not modify.');
            if (response.locked) return cb('Latest version is locked. Cannot modify.');
            cb(null, response.number);
        });
    },
    notPassRequestCondition: ['version', function (cb, results) {
        var statement = getAppRouteCondition('../static/*', routes, extraAppRoutes);
        var condition = {
            name: NOT_PASS_REQUEST_CONDITION_NAME,
            statement: statement,
            type: 'REQUEST',
            priority: 10
        };
        fastly.setCondition(results.version, condition, cb);
    }],
    setBucketNameHeader: ['version', 'notPassRequestCondition', function (cb, results) {
        var header = {
            name: BUCKET_NAME_HEADER_NAME,
            action: 'set',
            ignore_if_set: 0,
            type: 'REQUEST',
            dst: 'http.host',
            src: '"' + S3_BUCKET_NAME + '"',
            request_condition: results.notPassRequestCondition.name,
            priority: 1
        };
        fastly.setFastlyHeader(results.version, header, cb);
    }],
    passRequestCondition: ['version', 'notPassRequestCondition', function (cb, results) {
        var condition = {
            name: PASS_REQUEST_CONDITION_NAME,
            statement: fastly.negateConditionStatement(results.notPassRequestCondition.statement),
            type: 'REQUEST',
            priority: 10
        };
        fastly.setCondition(results.version, condition, cb);
    }],
    passRequestSettingsCondition: ['version', 'passRequestCondition', function (cb, results) {
        fastly.request(
            'PUT',
            fastly.getFastlyAPIPrefix(FASTLY_SERVICE_ID, results.version) + '/request_settings/Pass',
            {request_condition: results.passRequestCondition.name},
            cb
        );
    }],
    backendCondition: ['version', 'passRequestCondition', function (cb, results) {
        fastly.request(
            'PUT',
            fastly.getFastlyAPIPrefix(FASTLY_SERVICE_ID, results.version) + '/backend/femto',
            {request_condition: results.passRequestCondition.name},
            cb
        );
    }],
    passCacheCondition: ['version', 'passRequestCondition', function (cb, results) {
        var condition = defaults(
            {name: PASS_CACHE_CONDITION_NAME, type: 'CACHE'},
            results.passRequestCondition
        );
        fastly.setCondition(results.version, condition, cb);
    }],
    passCacheSettingsCondition: ['version', 'passCacheCondition', function (cb, results) {
        fastly.request(
            'PUT',
            fastly.getFastlyAPIPrefix(FASTLY_SERVICE_ID, results.version) + '/cache_settings/Pass',
            {cache_condition: results.passCacheCondition.name},
            cb
        );
    }],
    appRouteRequestConditions: ['version', function (cb, results) {
        var conditions = {};
        async.forEachOf(routes, function (route, id, cb2) {
            var condition = {
                name: getConditionNameForView(route.view),
                statement: 'req.url ~ "' + route.pattern + '"',
                type: 'REQUEST',
                priority: id
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
    appRouteHeaders: ['version', 'appRouteRequestConditions', function (cb, results) {
        var headers = {};
        async.forEachOf(routes, function (route, id, cb2) {
            var header = {
                name: getHeaderNameForView(route.view),
                action: 'set',
                ignore_if_set: 0,
                type: 'request',
                dst: 'url',
                src: '"/' + route.view + '.html"',
                request_condition: results.appRouteRequestConditions[id].name,
                priority: 10
            };
            fastly.setFastlyHeader(results.version, header, function (err, response) {
                if (err) return cb2(err);
                headers[id] = response;
                cb2(null, response);
            });
        }, function (err) {
            if (err) return cb(err);
            cb(null, headers);
        });
    }]},
    function (err) {
        if (err) throw new Error(err);
    }
);
