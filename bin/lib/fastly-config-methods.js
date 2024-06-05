const glob = require('glob');
const path = require('path');

const FastlyConfigMethods = {
    /*
     * Given the relative path to the static directory, return an array of
     * patterns matching the files and directories there.
     */
    getStaticPaths: function (rootDir, pathToStatic) {
        const staticPaths = glob.sync(path.resolve(rootDir, pathToStatic));
        return staticPaths.filter(pathName =>
            // Exclude view html, resolve everything else in the build
            path.extname(pathName) !== '.html'
        ).map(pathName => {
            // Reduce absolute path to relative paths like '/js'
            const base = path.dirname(path.resolve(rootDir, pathToStatic));
            return pathName.replace(base, '') + (path.extname(pathName) ? '' : '/');
        });
    },

    /*
     * Given a list of express routes, return a list of patterns to match
     * the express route and a static view file associated with the route
     */
    getViewPaths: function (routes) {
        return routes.reduce((paths, route) => {
            const p = route.routeAlias || route.pattern;
            if (paths.indexOf(p) === -1) {
                paths.push(p);
            }
            return paths;
        }, []);
    },

    /*
     * Translate an express-style pattern to regex one in two ways:
     *
     * 1. /path/:arg/ – all :arg's become .+?
     * 2. /path/:arg([regex]) – :arg is removed, leaving just /path/([regex])
     */
    expressPatternToRegex: function (pattern) {
        pattern = pattern.replace(/(:\w+)(\([^)]+\))/gi, '$2');
        return pattern.replace(/(:\w+)/gi, '.+?');
    },

    /*
     * Given a list of patterns for paths, OR all of them together into one
     * string suitable for a Fastly condition
     */
    pathsToCondition: function (paths) {
        return `req.url~"^(${
            paths.reduce((conditionString, pattern) => conditionString + (conditionString ? '|' : '') + pattern, '')
        })"`;
    },

    /*
     * Helper method to NOT a condition statement
     */
    negateConditionStatement: function (statement) {
        return `!(${statement})`;
    },

    /*
     * Combine static paths, routes, and any additional paths to a single
     * fastly condition to match req.url
     */
    getAppRouteCondition: function (pathToStatic, routes, additionalPaths, rootDir) {
        const staticPaths = FastlyConfigMethods.getStaticPaths(rootDir, pathToStatic);
        const viewPaths = FastlyConfigMethods.getViewPaths(routes);
        const allPaths = [].concat(staticPaths, viewPaths, additionalPaths);
        return FastlyConfigMethods.pathsToCondition(allPaths);
    },

    getConditionNameForRoute: function (route, type) {
        return `routes/${route.pattern} (${type})`;
    },

    getHeaderNameForRoute: function (route) {
        if (route.name) return `rewrites/${route.name}`;
        if (route.redirect) return `redirects/${route.pattern}`;
    },

    getResponseNameForRoute: function (route) {
        return `redirects/${route.pattern}`;
    },

    /*
     * Returns custom vcl configuration as a string that sets the varnish
     * Time to Live (TTL) for responses that come from s3.
     *
     * @param {string} condition condition under which the response should be set
     */
    setResponseTTL: function (condition) {
        return `${'' +
            'if ('}${condition}) {\n` +
            `    if (req.url ~ "^(/projects/|/fragment/account-nav.json|/session/)" && ` +
            `!req.http.Cookie:scratchsessionsid) {\n` +
            `        set beresp.http.Vary = "Accept-Encoding, Accept-Language";\n` +
            `        unset beresp.http.set-cookie;\n` +
            `        return(deliver);\n` +
            `    } else {\n` +
            `        set beresp.ttl = 0s;\n` +
            `        set beresp.grace = 0s;\n` +
            `        return(pass);\n` +
            `    }\n` +
            `}\n`;
    }
};

module.exports = FastlyConfigMethods;
