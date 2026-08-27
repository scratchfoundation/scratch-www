const Fastly = require('fastly');

/*
 * Fastly configuration helpers for a particular service, built on the official
 * fastly-js client (v15+). Every method returns a Promise. Authenticates the
 * shared ApiClient on construction.
 *
 * @param {string} apiKey    Fastly API token
 * @param {string} serviceId Fastly service id
 */
module.exports = (apiKey, serviceId) => {
    Fastly.ApiClient.instance.authenticate(apiKey);

    const versionApi = new Fastly.VersionApi();
    const snippetApi = new Fastly.SnippetApi();
    const conditionApi = new Fastly.ConditionApi();
    const headerApi = new Fastly.HeaderApi();
    const responseObjectApi = new Fastly.ResponseObjectApi();
    const purgeApi = new Fastly.PurgeApi();

    const base = version => ({service_id: serviceId, version_id: version});

    const ignoreMissing = err => {
        if (err && err.status === 404) return null;
        throw err;
    };

    const needServiceId = action => {
        if (!serviceId) return Promise.reject(new Error(`Failed to ${action}. No serviceId configured.`));
        return null;
    };

    return {
        serviceId: serviceId,

        // Most recent *active* version for the service (null if none active).
        getLatestActiveVersion: () => needServiceId('get latest version') ||
            versionApi.listServiceVersions({service_id: serviceId}).then(versions =>
                versions.reduce((latestActiveSoFar, cur) => {
                    // Of [latestActiveSoFar, cur], keep whichever is active; when
                    // both are active keep the higher version number.
                    if (!cur || !cur.active) return latestActiveSoFar;
                    if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                    return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
                }, null)
            ),

        // Clone a version to create a new, editable version.
        cloneVersion: version => needServiceId('clone version') ||
            versionApi.cloneServiceVersion(base(version)),

        // Compile-check a version's generated VCL without activating it. Resolves
        // with {status, msg}; status is 'ok' when the version is valid.
        validateVersion: version => needServiceId('validate version') ||
            versionApi.validateServiceVersion(base(version)),

        // Activate a version.
        activateVersion: version => needServiceId('activate version') ||
            versionApi.activateServiceVersion(base(version)),

        // Replace a versioned VCL snippet. fastly-js updateSnippet sends no body,
        // so delete any existing snippet of this name (ignoring 404) then create.
        setSnippet: (version, snippet) => needServiceId('set snippet') ||
            snippetApi.deleteSnippet({service_id: serviceId, version_id: version, name: snippet.name})
                .catch(ignoreMissing)
                .then(() => snippetApi.createSnippet(Object.assign(base(version), {
                    name: snippet.name,
                    type: snippet.type,
                    content: snippet.content,
                    priority: snippet.priority,
                    dynamic: '0'
                }))),

        // Purge all content tagged with a surrogate key.
        purgeKey: (servId, key) => purgeApi.purgeTag({service_id: servId, surrogate_key: key}),

        // --- Listing/deletion, used by the one-time legacy cleanup script. ---

        listConditions: version => needServiceId('list conditions') ||
            conditionApi.listConditions(base(version)),
        deleteCondition: (version, name) => needServiceId('delete condition') ||
            conditionApi.deleteCondition(Object.assign(base(version), {condition_name: name})),

        listHeaders: version => needServiceId('list headers') ||
            headerApi.listHeaderObjects(base(version)),
        deleteHeader: (version, name) => needServiceId('delete header') ||
            headerApi.deleteHeaderObject(Object.assign(base(version), {header_name: name})),

        listResponseObjects: version => needServiceId('list response objects') ||
            responseObjectApi.listResponseObjects(base(version)),
        deleteResponseObject: (version, name) => needServiceId('delete response object') ||
            responseObjectApi.deleteResponseObject(Object.assign(base(version), {response_object_name: name}))
    };
};
