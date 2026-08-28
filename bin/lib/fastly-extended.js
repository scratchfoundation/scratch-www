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
    const apiClient = Fastly.ApiClient.instance;
    apiClient.authenticate(apiKey);

    const versionApi = new Fastly.VersionApi();
    const snippetApi = new Fastly.SnippetApi();
    const conditionApi = new Fastly.ConditionApi();
    const headerApi = new Fastly.HeaderApi();
    const responseObjectApi = new Fastly.ResponseObjectApi();
    const purgeApi = new Fastly.PurgeApi();

    const base = version => ({service_id: serviceId, version_id: version});

    const needServiceId = action => {
        if (!serviceId) return Promise.reject(new Error(`Failed to ${action}. No serviceId configured.`));
        return null;
    };

    // Most recent version for the service by version number (null if none exist).
    const getLatestVersion = () => needServiceId('get latest version') ||
        versionApi.listServiceVersions({service_id: serviceId}).then(versions =>
            (versions || []).reduce((latest, cur) => {
                if (!cur) return latest;
                return (!latest || cur.number > latest.number) ? cur : latest;
            }, null)
        );

    // Clone a version to create a new, editable version.
    const cloneVersion = version => needServiceId('clone version') ||
        versionApi.cloneServiceVersion(base(version));

    // Resolve to a version number that is safe to edit. If the latest version is
    // still a draft (neither active nor locked) it is returned as-is, so repeated
    // runs accumulate into one version; otherwise it is cloned into a fresh draft.
    // Reuse-vs-clone can be steered from the Fastly web UI by leaving a draft
    // open or activating/locking it.
    const getWorkingVersion = () => getLatestVersion().then(latest => {
        if (!latest) throw new Error('Failed to find a version to build from.');
        if (!latest.active && !latest.locked) return latest.number;
        return cloneVersion(latest.number).then(cloned => cloned.number);
    });

    // Update a versioned snippet's content in place, preserving its id. The
    // generated client's updateSnippet sends no request body, so call the update
    // endpoint directly with the same content/type/priority form params that
    // createSnippet sends, reusing the client's callApi so auth and
    // (de)serialization stay consistent.
    const updateSnippetInPlace = (version, snippet) => apiClient.callApi(
        '/service/{service_id}/version/{version_id}/snippet/{name}', 'PUT',
        {service_id: serviceId, version_id: version, name: snippet.name},
        {}, {}, {},
        {type: snippet.type, content: snippet.content, priority: snippet.priority},
        null, ['token'], ['application/x-www-form-urlencoded'], ['application/json'],
        Fastly.SnippetResponse, 'https://api.fastly.com'
    ).then(response => response.data);

    return {
        serviceId: serviceId,

        getLatestVersion: getLatestVersion,
        cloneVersion: cloneVersion,
        getWorkingVersion: getWorkingVersion,

        // Compile-check a version's generated VCL without activating it. Resolves
        // with {status, msg}; status is 'ok' when the version is valid.
        validateVersion: version => needServiceId('validate version') ||
            versionApi.validateServiceVersion(base(version)),

        // Activate a version.
        activateVersion: version => needServiceId('activate version') ||
            versionApi.activateServiceVersion(base(version)),

        // Upsert a versioned VCL snippet, preserving its id when it already
        // exists: update in place, falling back to create when there is no
        // snippet of this name yet (404).
        setSnippet: (version, snippet) => needServiceId('set snippet') ||
            updateSnippetInPlace(version, snippet).catch(err => {
                if (err && err.status === 404) {
                    return snippetApi.createSnippet(Object.assign(base(version), {
                        name: snippet.name,
                        type: snippet.type,
                        content: snippet.content,
                        priority: snippet.priority,
                        dynamic: '0'
                    }));
                }
                throw err;
            }),

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
