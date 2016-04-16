var async = require('async');
var defaults = require('lodash.defaults');
var glob = require('glob');
var path = require('path');

var routes = require('../server/routes.json');
var serviceId = process.env.FASTLY_SERVICE_ID
var s3Bucket = process.env.S3_BUCKET_NAME;

var fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, serviceId);

const PASS_REQUEST_CONDITION_NAME = 'Pass';
const NOT_PASS_REQUEST_CONDITION_NAME = '!(Pass)'
const PASS_CACHE_CONDITION_NAME = 'Cache Pass';
const BUCKET_NAME_HEADER_NAME = 'Bucket name';

var extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '^/\\?',
    // Version output by build
    '/version\.txt$',
    // View html
    '^/[^\/]*\.html'
];

var getStaticPaths = function (pathToStatic) {
    // Given the relative path to the static directory, return an array of
    // patterns matching the files and directories there.
    var staticPaths = glob.sync(path.resolve(__dirname, pathToStatic));
    return staticPaths.map( function (pathName) {
        // Reduce absolute path to relative paths like '/js'
        var base = path.dirname(path.resolve(__dirname, pathToStatic));
        return '^' + pathName.replace(base, '');
    });
}

var getViewPaths = function (routes) {
    // Given a list of express routes, return a list of patterns to match
    // the express route and a static view file associated with the route
    return routes.map(function (route) {
        return route.pattern;
    });
}

var pathsToCondition = function (paths) {
    // Given a list of patterns for paths, OR all of them together into one
    // string suitable for a Fastly condition
    return paths.reduce(function(conditionString, pattern) {
        var patternCondition = 'req.url ~ "' + pattern + '"';
        return conditionString + (conditionString ? ' || ' : '') + patternCondition;
    }, '');
}

var getAppRouteCondition = function (pathToStatic, routes, additionalPaths) {
    var staticPaths = getStaticPaths(pathToStatic);
    var viewPaths = getViewPaths(routes);
    var allPaths = [].concat(staticPaths, viewPaths, additionalPaths);
    return pathsToCondition(allPaths);
}

var getConditionNameForView = function (view) {
    return 'routes/' + view;
};

var getHeaderNameForView = function (view) {
    return 'rewrites/' + view;
}

var notPassCondition = {
    name: NOT_PASS_REQUEST_CONDITION_NAME,
    statement: getAppRouteCondition('../static/*', routes, extraAppRoutes),
    type: 'REQUEST',
    priority: 10
};
var passCondition = {
    name: PASS_REQUEST_CONDITION_NAME,
    statement: fastly.negateConditionStatement(notPassCondition.statement),
    type: 'REQUEST',
    priority: 10
};
var passCacheCondition = defaults({name: PASS_CACHE_CONDITION_NAME, type: 'CACHE'}, passCondition);
var bucketNameHeader = {
    name: BUCKET_NAME_HEADER_NAME,
    action: 'set',
    ignore_if_set: 0,
    type: 'REQUEST',
    dst: 'http.host',
    src: '"' + s3Bucket + '"',
    request_condition: NOT_PASS_REQUEST_CONDITION_NAME,
    priority: 1
};

async.waterfall([
    fastly.getLatestVersion.bind(fastly),
    function (version, next) {
        if (version.active) return next('Latest version is active. Will not modify.');
        if (version.locked) return next('Latest version is locked. Cannot modify.');
        async.parallel([
            function (cb) {
                async.series([
                    async.apply(fastly.setCondition.bind(fastly), version.number, notPassCondition),
                    async.apply(fastly.setFastlyHeader.bind(fastly), version.number, bucketNameHeader)
                ], cb)
            },
            function (cb) {
                async.series([
                    async.apply(fastly.setCondition.bind(fastly), version.number, passCondition),
                    function (cb) {
                        async.parallel([
                            async.apply(
                                fastly.request.bind(fastly), 'PUT',
                                fastly.getFastlyAPIPrefix(serviceId, version.number) + '/request_settings/Pass',
                                {request_condition: PASS_REQUEST_CONDITION_NAME}
                             ),
                            async.apply(
                                fastly.request.bind(fastly), 'PUT',
                                fastly.getFastlyAPIPrefix(serviceId, version.number) + '/backend/femto',
                                {request_condition: PASS_REQUEST_CONDITION_NAME}
                            )
                        ], cb)
                    }
                ], cb)
            },
            function (cb) {
                async.series([
                    async.apply(fastly.setCondition.bind(fastly), version.number, passCacheCondition),
                    async.apply(
                        fastly.request.bind(fastly), 'PUT',
                        fastly.getFastlyAPIPrefix(serviceId, version.number) + '/cache_settings/Pass',
                        {request_condition: PASS_CACHE_CONDITION_NAME}
                    ),
                ], cb)
            },
            function (cb) {
                async.forEachOf(routes, function (route, id, cb) {
                    var condition = {
                        name: getConditionNameForView(route.view),
                        statement: 'req.url ~ "' + route.pattern + '"',
                        type: 'REQUEST',
                        priority: 10
                    };
                    var header = {
                        name: getHeaderNameForView(route.view),
                        action: 'set',
                        ignore_if_set: 0,
                        type: 'request',
                        dst: 'url',
                        src: '"/' + route.view + '.html"',
                        request_condition: getConditionNameForView(route.view),
                        priority: id
                    };
                    async.series([
                        async.apply(fastly.setCondition.bind(fastly), version.number, condition),
                        async.apply(fastly.setFastlyHeader.bind(fastly), version.number, header)
                    ], cb);
                }, cb)
            }
        ], next);
    }], function (err, responses) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    }
);