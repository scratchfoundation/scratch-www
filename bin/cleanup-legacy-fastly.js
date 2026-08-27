/*
 * One-time cleanup: remove the per-route Fastly objects that the generated
 * app-routes-* snippets replace.
 *
 * The previous configure-fastly created one condition + header per route (plus a
 * response object per redirect). Those are now handled entirely by the generated
 * snippets, but they linger on the service (carried forward by version cloning)
 * and, because the main VCL weaves UI objects in at its #FASTLY macros, they stay
 * active -- so they must be removed once the snippets are in place.
 *
 * Only objects whose names carry the generated prefixes are deleted:
 *   - conditions:       "routes/..."
 *   - headers:          "rewrites/..." or "redirects/..."
 *   - response objects: "redirects/..."
 * Everything else (feature/infra conditions, headers, and response objects) is
 * left untouched.
 *
 * Dry-run by default: it clones the active version and reports what it WOULD
 * delete. Set CLEANUP_APPLY=true to actually delete, and FASTLY_ACTIVATE_CHANGES
 * to activate the cleaned version.
 */

const {describeFastlyError} = require('./lib/fastly-errors');

const FASTLY_SERVICE_ID = process.env.FASTLY_SERVICE_ID || '';
const APPLY = process.env.CLEANUP_APPLY === 'true';

const fastly = require('./lib/fastly-extended')(process.env.FASTLY_API_KEY, FASTLY_SERVICE_ID);

const nameOf = obj => (obj && obj.name) || '';
const isRouteCondition = name => (/^routes\//).test(name);
const isRouteHeader = name => (/^(rewrites|redirects)\//).test(name);
const isRouteResponseObject = name => (/^redirects\//).test(name);

// Get the latest version, cloning it first if it is already active or locked.
const getWorkingVersion = async () => {
    const response = await fastly.getLatestActiveVersion();
    if (!response) throw new Error('Failed to find an active version to build from.');
    if (response.active || response.locked) {
        const cloned = await fastly.cloneVersion(response.number);
        return cloned.number;
    }
    return response.number;
};

// Delete a list of objects one at a time via del(version, name), logging each.
const deleteAll = async (version, objects, del, label) => {
    for (const obj of objects) {
        await del(version, nameOf(obj));
        process.stdout.write(`  deleted ${label}: ${nameOf(obj)}\n`);
    }
};

const cleanup = async () => {
    const version = await getWorkingVersion();

    const [conditions, headers, responseObjects] = await Promise.all([
        fastly.listConditions(version),
        fastly.listHeaders(version),
        fastly.listResponseObjects(version)
    ]);

    const staleConditions = conditions.filter(c => isRouteCondition(nameOf(c)));
    const staleHeaders = headers.filter(h => isRouteHeader(nameOf(h)));
    const staleResponseObjects = responseObjects.filter(r => isRouteResponseObject(nameOf(r)));

    process.stdout.write(
        `Version ${version}: ${staleConditions.length} conditions, ${staleHeaders.length} headers, ` +
        `${staleResponseObjects.length} response objects match the generated prefixes.\n`
    );

    if (!APPLY) {
        process.stdout.write('Dry run (set CLEANUP_APPLY=true to delete). Nothing changed.\n');
        return null;
    }

    // Delete dependents (response objects, headers) before the conditions they
    // reference.
    await deleteAll(version, staleResponseObjects, fastly.deleteResponseObject, 'response object');
    await deleteAll(version, staleHeaders, fastly.deleteHeader, 'header');
    await deleteAll(version, staleConditions, fastly.deleteCondition, 'condition');

    const validation = await fastly.validateVersion(version);
    if (validation.status !== 'ok') {
        throw new Error(`Version ${version} failed validation: ${validation.msg}`);
    }
    return version;
};

cleanup()
    .then(async version => {
        if (!version || !process.env.FASTLY_ACTIVATE_CHANGES) return;
        const response = await fastly.activateVersion(version);
        process.stdout.write(`Successfully cleaned up and activated version ${response.number}\n`);
    })
    .catch(err => {
        process.stderr.write(`${describeFastlyError(err)}\n`);
        process.exit(1);
    });
