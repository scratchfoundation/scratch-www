var defaults = require('lodash.defaults');
var fastly = require('fastly')(process.env.FASTLY_API_KEY);
var glob = require('glob');
var path = require('path');

var routes = require('../server/routes.json');
var serviceId = process.env.FASTLY_SERVICE_ID;
var s3Bucket = process.env.AWS_S3_BUCKET_NAME;

var extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '^/\\?',
    // Version output by build
    '/version\.txt$',
    // View html
    '^/[^\/]*\.html'
]

var getFastlyAPIPrefix = function (serviceId, version) {
    return '/service/' + encodeURIComponent(serviceId) + '/version/' + version;
}

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

var negateCondition = function (condition) {
    return '!(' + condition + ')';
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

var getLatestVersion = function (serviceId, cb) {
    var url = '/service/'+ encodeURIComponent(serviceId) +'/version';
    fastly.request('GET', url, function (err, versions) {
        if (err) return cb(err);
        var latestVersion = versions.reduce(function (latestVersion, version) {
            if (!latestVersion) return version;
            if (version.number > latestVersion.number) return version;
            return latestVersion;
        });
        return cb(null, latestVersion);
    });    
};


var getHeaders = function (serviceId, version, cb) {
    var url = getFastlyAPIPrefix(serviceId, version) + '/header';
    fastly.request('GET', url, function (err, headers) {
        if (err) return cb(err);
        return cb(null, headers);
    });
};

var setCondition = function (serviceId, version, name, condition, callback) {
    var putUrl = getFastlyAPIPrefix(serviceId, version) + '/condition/' + encodeURIComponent(name);
    var postUrl = getFastlyAPIPrefix(serviceId, version) + '/condition';
    var cb = callback;
    return fastly.request('PUT', putUrl, condition, function (err, response) {
        if (err && err.statusCode === 404) return fastly.request('POST', postUrl, condition, cb);
        return cb(err, response);
    });
};

var setHeader = function (serviceId, version, name, header, callback) {
    var putUrl = getFastlyAPIPrefix(serviceId, version) + '/header/' + encodeURIComponent(name);
    var postUrl = getFastlyAPIPrefix(serviceId, version) + '/header';
    var cb = callback
    return fastly.request('PUT', putUrl, header, function (err, response) {
        if (err && err.statusCode === 404) return fastly.request('POST', postUrl, header, cb);
        return cb(err, response);
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
    statement: negateCondition(notPassCondition.statement),
    type: 'REQUEST',
    priority: 10
};

var routeHeaderConditionPairs = getRouteHeaderConditionPairs(routes);

getLatestVersion(serviceId, function (err, version) {
    if (err) return console.error(err);
    if (version.active) return console.error('Latest version is active. Will not modify.');
    if (version.locked) return console.error('Latest version is locked. Cannot modify.');
    setCondition(
        serviceId, version.number, notPassCondition.name, notPassCondition,
        function (err) {
            if (err) {
                console.error('Failed to set !(Pass) request condition:');
                console.dir(err);
                console.error('Could not set bucket header without setting !(Pass) condition');
                return;
            }
            
            var bucketNameHeaderName = 'Bucket name';
            setHeader(
                serviceId, version.number, bucketNameHeaderName,
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
                    if (err) return console.error('Failed to set Bucket name header:', err);
                }
            );
        }
    );
    setCondition(
        serviceId, version.number, passCondition.name, passCondition,
        function (err) {
            if (err) return console.error('Failed to set Pass condition:', err);
            fastly.request(
                'PUT',
                getFastlyAPIPrefix(serviceId, version.number) + '/backend/femto',
                {request_condition: passCondition.name},
                function (err) {
                    if (err) return console.error('Failed to set femto backend to use Pass condition.', err)
                }
            );
            fastly.request(
                'PUT',
                getFastlyAPIPrefix(serviceId, version.number) + '/request_settings/Pass',
                {request_condition: passCondition.name},
                function (err) {
                    if (err) return console.error('Failed to set Pass request setting to use Pass condition.', err);
                }
            );
        }
    );
    var passCacheCondition = defaults({name: getPassCacheConditionName(), type: 'CACHE'}, passCondition);
    setCondition(
        serviceId, version.number, getPassCacheConditionName(), passCacheCondition,
        function (err) {
            if (err) return console.error('Failed to set Cache Pass condition:', err, passCacheCondition);
            fastly.request(
                'PUT',
                getFastlyAPIPrefix(serviceId, version.number),
                {cache_condition: getPassCacheConditionName()},
                function (err) {
                    if (err) return console.error('Failed to set Pass cache setting to use Cache Pass condition', err, cachePassCondition);
                }
            );
        }
    );
    routeHeaderConditionPairs.forEach(function (pair) {
        var condition = pair.condition;
        var header = pair.header;
        setCondition(
            serviceId, version.number, condition.name, condition,
            function (err, response) {
                if (err) return console.error('Failed to set route condition', condition.name, err);
                setHeader(
                    serviceId, version.number, header.name, header,
                    function (err) {
                        if (err) return console.error('Failed to set route rewrite header', header.name, err);
                    }
                )
            }
        );
    });
});
