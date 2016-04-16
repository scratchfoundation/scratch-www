var defaults = require('lodash.defaults');
var glob = require('glob');
var path = require('path');

var routes = require('../server/routes.json');
var serviceId = process.env.FASTLY_SERVICE_ID
var s3Bucket = process.env.S3_BUCKET_NAME;

var fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, serviceId);

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

var getPassRequestConditionName = function () {
    return 'Pass';
};

var getNotPassRequestConditionName = function () {
    return '!(Pass)';
};

var getPassCacheConditionName = function () {
    return 'Cache ' + getPassRequestConditionName();
};

var getRouteHeaderConditionPairs = function (routes) {
    return routes.map(function (route, id) {
        return {
            condition: {
                name: getConditionNameForView(route.view),
                statement: 'req.url ~ "' + route.pattern + '"',
                type: 'REQUEST',
                priority: 10
            },
            header: {
                name: getHeaderNameForView(route.view),
                action: 'set',
                ignore_if_set: 0,
                type: 'request',
                dst: 'url',
                src: '"/' + route.view + '.html"',
                request_condition: getConditionNameForView(route.view),
                priority: id
            },
        }
    });
};

var notPassCondition = {
    name: getNotPassRequestConditionName(),
    statement: getAppRouteCondition('../static/*', routes, extraAppRoutes),
    type: 'REQUEST',
    priority: 10
};

var passCondition = {
    name: getPassRequestConditionName(),
    statement: fastly.negateConditionStatement(notPassCondition.statement),
    type: 'REQUEST',
    priority: 10
};

var routeHeaderConditionPairs = getRouteHeaderConditionPairs(routes);

fastly.getLatestVersion(function (err, version) {
    if (err) return console.error(err);
    if (version.active) return console.error('Latest version is active. Will not modify.');
    if (version.locked) return console.error('Latest version is locked. Cannot modify.');
    fastly.setCondition(
        version.number, notPassCondition.name, notPassCondition,
        function (err) {
            if (err) {
                console.error('Failed to set !(Pass) request condition:');
                console.dir(err);
                console.error('Could not set bucket header without setting !(Pass) condition');
                process.exit(1);
            }
            
            var bucketNameHeaderName = 'Bucket name';
            fastly.setHeader(
                version.number, bucketNameHeaderName,
                {
                    name: bucketNameHeaderName,
                    action: 'set',
                    ignore_if_set: 0,
                    type: 'REQUEST',
                    dst: 'http.host',
                    src: '"' + s3Bucket + '"',
                    request_condition: notPassCondition.name,
                    priority: 1
                },
                function (err) {
                    if (err) {
                        console.error('Failed to set Bucket name header:', err);
                        process.exit(1);
                    }
                }
            );
        }
    );
    fastly.setCondition(
        version.number, passCondition.name, passCondition,
        function (err) {
            if (err) return console.error('Failed to set Pass condition:', err);
            fastly.request(
                'PUT',
                fastly.getFastlyAPIPrefix(serviceId, version.number) + '/backend/femto',
                {request_condition: passCondition.name},
                function (err) {
                    if (err) {
                        console.error('Failed to set femto backend to use Pass condition.', err);
                        process.exit(1);
                    }
                }
            );
            fastly.request(
                'PUT',
                fastly.getFastlyAPIPrefix(serviceId, version.number) + '/request_settings/Pass',
                {request_condition: passCondition.name},
                function (err) {
                    if (err) {
                        console.error('Failed to set Pass request setting to use Pass condition.', err);
                        process.exit(1);
                    }
                }
            );
        }
    );
    var passCacheCondition = defaults({name: getPassCacheConditionName(), type: 'CACHE'}, passCondition);
    fastly.setCondition(
        version.number, getPassCacheConditionName(), passCacheCondition,
        function (err) {
            if (err) {
                console.error('Failed to set Cache Pass condition:', err, passCacheCondition);
                process.exit(1);
            }
            fastly.request(
                'PUT',
                fastly.getFastlyAPIPrefix(serviceId, version.number),
                {cache_condition: getPassCacheConditionName()},
                function (err) {
                    if (err) {
                        console.error('Failed to set Pass cache setting to use Cache Pass condition', err);
                        process.exit(1);
                    }
                }
            );
        }
    );
    routeHeaderConditionPairs.forEach(function (pair) {
        var condition = pair.condition;
        var header = pair.header;
        fastly.setCondition(
            version.number, condition.name, condition,
            function (err, response) {
                if (err) {
                    console.error('Failed to set route condition', condition.name, err);
                    process.exit(1);
                }
                fastly.setHeader(
                    version.number, header.name, header,
                    function (err) {
                        if (err) {
                            console.error('Failed to set route rewrite header', header.name, err);
                            process.exit(1);
                        }
                    }
                )
            }
        );
    });
});
