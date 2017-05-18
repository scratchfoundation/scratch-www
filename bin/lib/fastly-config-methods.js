var glob = require('glob');
var path = require('path');

var FastlyConfigMethods = {
    /*
     * Given the relative path to the static directory, return an array of
     * patterns matching the files and directories there.
     */
    getStaticPaths: function (rootDir, pathToStatic) {
        var staticPaths = glob.sync(path.resolve(rootDir, pathToStatic));
        return staticPaths.filter(function (pathName) {
            // Exclude view html, resolve everything else in the build
            return path.extname(pathName) !== '.html';
        }).map(function (pathName) {
            // Reduce absolute path to relative paths like '/js'
            var base = path.dirname(path.resolve(rootDir, pathToStatic));
            return pathName.replace(base, '') + (path.extname(pathName) ? '' : '/');
        });
    },

    /*
     * Given a list of express routes, return a list of patterns to match
     * the express route and a static view file associated with the route
     */
    getViewPaths: function (routes) {
        return routes.reduce(function (paths, route) {
            var path = route.routeAlias || route.pattern;
            if (paths.indexOf(path) === -1) {
                paths.push(path);
            }
            return paths;
        }, []);
    },

    /*
     * Translate an express-style pattern e.g. /path/:arg/ to a regex
     * all :arguments become .+?
     */
    expressPatternToRegex: function (pattern) {
        pattern = pattern.replace(/(:\w+)(\([^\)]+\))/gi, '$2');
        return pattern.replace(/(:\w+)/gi, '.+?');
    },

    /*
     * Given a list of patterns for paths, OR all of them together into one
     * string suitable for a Fastly condition
     */
    pathsToCondition: function (paths) {
        return 'req.url~"^(' + paths.reduce(function (conditionString, pattern) {
            return conditionString + (conditionString ? '|' : '') + pattern;
        }, '') + ')"';
    },

    /*
     * Helper method to NOT a condition statement
     */
    negateConditionStatement: function (statement) {
        return '!(' + statement + ')';
    },

    /*
     * Combine static paths, routes, and any additional paths to a single
     * fastly condition to match req.url
     */
    getAppRouteCondition: function (pathToStatic, routes, additionalPaths, rootDir) {
        var staticPaths = FastlyConfigMethods.getStaticPaths(rootDir, pathToStatic);
        var viewPaths = FastlyConfigMethods.getViewPaths(routes);
        var allPaths = [].concat(staticPaths, viewPaths, additionalPaths);
        return FastlyConfigMethods.pathsToCondition(allPaths);
    },

    getConditionNameForRoute: function (route, type) {
        return 'routes/' + route.pattern + ' (' + type + ')';
    },

    getHeaderNameForRoute: function (route) {
        if (route.name) return 'rewrites/' + route.name;
        if (route.redirect) return 'redirects/' + route.pattern;
    },

    getResponseNameForRoute: function (route) {
        return 'redirects/' + route.pattern;
    },

    /**
     * Returns custom vcl configuration as a string for setting the backend
     * of a request to the given backend/host.
     *
     * @param {string} backend   name of the backend declared in fastly
     * @param {string} host      name of the s3 bucket to be set as the host
     * @param {string} condition condition under which backend should be set
     */
    setBackend: function (backend, host, condition) {
        return '' +
            'if (' + condition + ') {\n' +
            '    set req.backend = ' + backend + ';\n' +
            '    set req.http.host = \"' + host + '\";\n' +
            '}\n';
    },

    /**
     * Returns custom vcl configuration as a string for headers that
     * should be added for the condition in which a request is forwarded.
     *
     * @param {string} condition condition under which to set pass headers
     */
    setForwardHeaders: function (condition) {
        return '' +
            'if (' + condition + ') {\n' +
            '    if (!req.http.Fastly-FF) {\n' +
            '        if (req.http.X-Forwarded-For) {\n' +
            '            set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For \", \" client.ip;\n' +
            '        } else {\n' +
            '            set req.http.Fastly-Temp-XFF = client.ip;\n' +
            '        }\n' +
            '    } else {\n' +
            '        set req.http.Fastly-Temp-XFF = req.http.X-Forwarded-For;\n' +
            '    }\n' +
            '    set req.grace = 60s;\n' +
            '    return(pass);\n' +
            '}\n';
    },

    /**
     * Returns custom vcl configuration as a string that sets the varnish
     * Time to Live (TTL) for responses that come from s3.
     *
     * @param {string} condition condition under which the response should be set
     */
    setResponseTTL: function (condition) {
        return '' +
            'if (' + condition + ') {\n' +
            '    set beresp.ttl = 0s;\n' +
            '    set beresp.grace = 0s;\n' +
            '    return(pass);\n' +
            '}\n';
    }
};

module.exports = FastlyConfigMethods;
