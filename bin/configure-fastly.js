const defaults = require('lodash.defaults');
const fastlyConfig = require('./lib/fastly-config-methods');
const {routesToSnippets} = require('./lib/routes-to-vcl');
const {describeFastlyError} = require('./lib/fastly-errors');

const routeJson = require('../src/routes');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const RADISH_URL = process.env.RADISH_URL || '';

const fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

// Substitute RADISH_URL into any redirect target, then convert express-style
// route patterns to the VCL regexes the generated snippets use.
const routes = routeJson.map(route => {
    if (route.redirect) {
        route.redirect = route.redirect.replace('RADISH_URL', RADISH_URL);
    }
    return defaults({}, {pattern: fastlyConfig.expressPatternToRegex(route.pattern)}, route);
});

// Render routes into VCL snippets and write them to the working version.
const setAppRouteSnippets = version => {
    const snippets = routesToSnippets(routes);
    return Promise.all(snippets.map(snippet => fastly.setSnippet(version, snippet)));
};

const configureFastly = async () => {
    const version = await fastly.getWorkingVersion();
    await setAppRouteSnippets(version);
    // Compile-check the generated VCL before anything tries to activate it.
    const validation = await fastly.validateVersion(version);
    if (validation.status !== 'ok') {
        throw new Error(`Version ${version} failed validation: ${validation.msg}`);
    }
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
        process.stderr.write(`${describeFastlyError(err)}\n`);
        process.exit(1);
    });
