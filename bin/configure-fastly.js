const defaults = require('lodash.defaults');
const fastlyConfig = require('./lib/fastly-config-methods');
const languages = require('scratch-l10n').default;

const routeJson = require('../src/routes');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || '';
const RADISH_URL = process.env.RADISH_URL || '';

const fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

const extraAppRoutes = [
    // Homepage with querystring.
    // TODO: Should this be added for every route?
    '/\\?',
    // View html
    '/[^/]*.html$'
];

const routes = routeJson.map(route => {
    if (route.redirect) {
        process.stdout.write(`Updating: ${route.redirect} to `);
        route.redirect = route.redirect.replace('RADISH_URL', RADISH_URL);
        process.stdout.write(`${route.redirect}\n`);
    }
    return defaults({}, {pattern: fastlyConfig.expressPatternToRegex(route.pattern)}, route);
});

// Get the latest version, cloning it first if it is already active or locked.
const getWorkingVersion = async () => {
    const response = await fastly.getLatestActiveVersion();
    if (response.active || response.locked) {
        try {
            const cloned = await fastly.cloneVersion(response.number);
            return cloned.number;
        } catch (err) {
            throw new Error(`Failed to clone latest version: ${err}`);
        }
    }
    return response.number;
};

// The recv custom VCL: point matching app/static paths at S3, and pass
// everything else through to the dynamic backend with language + XFF handling.
const buildRecvCondition = () => {
    const notPassStatement = fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname);
    return `${'' +
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
};

const buildFetchCondition = () => {
    const passStatement = fastlyConfig.negateConditionStatement(
        fastlyConfig.getAppRouteCondition('../build/*', routes, extraAppRoutes, __dirname)
    );
    return fastlyConfig.setResponseTTL(passStatement);
};

// A REQUEST condition per route, matching its url path. Resolves to the created
// conditions keyed by route index, which the headers step references.
const setAppRouteRequestConditions = version => Promise.all(routes.map((route, id) =>
    fastly.setCondition(version, {
        name: fastlyConfig.getConditionNameForRoute(route, 'request'),
        statement: `req.url.path ~ "${route.pattern}"`,
        type: 'REQUEST',
        // Priority needs to be > 1 to not interact with http->https redirect
        priority: 10 + id
    })
));

// For each route, either a 301 redirect (response condition + response object +
// Location header) or a rewrite of the clean url to its static html shell.
const setAppRouteHeaders = (version, requestConditions) => Promise.all(routes.map((route, id) => {
    if (route.redirect) {
        const responseCondition = fastly.setCondition(version, {
            name: fastlyConfig.getConditionNameForRoute(route, 'response'),
            statement: `req.url.path ~ "${route.pattern}"`,
            type: 'RESPONSE',
            priority: id
        });
        const responseObject = fastly.setResponseObject(version, {
            name: fastlyConfig.getResponseNameForRoute(route),
            status: 301,
            response: 'Moved Permanently',
            request_condition: fastlyConfig.getConditionNameForRoute(route, 'request')
        });
        const redirectHeader = responseCondition.then(condition => fastly.setFastlyHeader(version, {
            name: fastlyConfig.getHeaderNameForRoute(route),
            action: 'set',
            ignore_if_set: 0,
            type: 'RESPONSE',
            dst: 'http.Location',
            src: `"${route.redirect}"`,
            response_condition: condition.name
        }));
        return Promise.all([responseObject, redirectHeader]);
    }
    return fastly.setFastlyHeader(version, {
        name: fastlyConfig.getHeaderNameForRoute(route, 'request'),
        action: 'set',
        ignore_if_set: 0,
        type: 'REQUEST',
        dst: 'url',
        src: `"/${route.name}.html"`,
        request_condition: requestConditions[id].name,
        priority: 10
    });
}));

// A special-case redirect whose request/response conditions share a statement,
// and whose Location is derived from the request rather than a fixed route.
const setDerivedRedirect = async (version, name, statement, locationSrc) => {
    const [requestCondition, responseCondition] = await Promise.all([
        fastly.setCondition(version, {
            name: `routes/${name} (request)`, statement: statement, type: 'REQUEST', priority: 10
        }),
        fastly.setCondition(version, {
            name: `routes/${name} (response)`, statement: statement, type: 'RESPONSE', priority: 10
        })
    ]);
    await Promise.all([
        fastly.setResponseObject(version, {
            name: `redirects/${name}`,
            status: 301,
            response: 'Moved Permanently',
            request_condition: requestCondition.name
        }),
        fastly.setFastlyHeader(version, {
            name: `redirects/${name}`,
            action: 'set',
            ignore_if_set: 0,
            type: 'RESPONSE',
            dst: 'http.Location',
            src: locationSrc,
            response_condition: responseCondition.name
        })
    ]);
};

const configureFastly = async () => {
    const version = await getWorkingVersion();
    // The request conditions gate the app-route headers; everything else depends
    // only on the version, so run it all concurrently.
    const requestConditions = setAppRouteRequestConditions(version);
    await Promise.all([
        fastly.setCustomVCL(version, 'recv-condition', buildRecvCondition()),
        fastly.setCustomVCL(version, 'fetch-condition', buildFetchCondition()),
        requestConditions.then(conditions => setAppRouteHeaders(version, conditions)),
        setDerivedRedirect(
            version, '?tip_bar=', 'req.url ~ "\\?tip_bar="', 'regsub(req.url, "tip_bar=", "tutorial=")'
        ),
        setDerivedRedirect(
            version, 'projects/embed', 'req.url.path ~ "^/projects/embed/(\\d+)"',
            '"/projects/" + re.group.1 + "/embed"'
        )
    ]);
    return version;
};

configureFastly()
    .then(async version => {
        if (!process.env.FASTLY_ACTIVATE_CHANGES) return;
        const response = await fastly.activateVersion(version);
        process.stdout.write(`Successfully configured and activated version ${response.number}\n`);
        // Purge static assets using their surrogate key.
        await fastly.purgeKey(FASTLY_SERVICE_ID, 'static-assets');
        process.stdout.write('Purged static assets.\n');
    })
    .catch(err => {
        process.stderr.write(`${err && err.stack ? err.stack : err}\n`);
        process.exit(1);
    });
