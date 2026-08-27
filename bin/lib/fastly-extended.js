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
    const conditionApi = new Fastly.ConditionApi();
    const headerApi = new Fastly.HeaderApi();
    const responseObjectApi = new Fastly.ResponseObjectApi();
    const vclApi = new Fastly.VclApi();
    const purgeApi = new Fastly.PurgeApi();

    // Update first, create on a 404. Mirrors the previous PUT-then-POST upsert.
    const upsert = (update, create) => update().catch(err => {
        if (err && err.status === 404) return create();
        throw err;
    });

    const base = version => ({service_id: serviceId, version_id: version});

    return {
        // Most recent *active* version for the service (null if none active).
        getLatestActiveVersion: () => {
            if (!serviceId) {
                return Promise.reject(new Error('Failed to get latest version. No serviceId configured.'));
            }
            return versionApi.listServiceVersions({service_id: serviceId}).then(versions =>
                versions.reduce((latestActiveSoFar, cur) => {
                    // if one of [latestActiveSoFar, cur] is active and the other isn't,
                    // return whichever is active. If both are not active, return
                    // latestActiveSoFar.
                    if (!cur || !cur.active) return latestActiveSoFar;
                    if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                    // when both are active, prefer whichever has a higher version number.
                    return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
                }, null)
            );
        },

        // Clone a version to create a new, editable version.
        cloneVersion: version => {
            if (!serviceId) return Promise.reject(new Error('Failed to clone version. No serviceId configured.'));
            return versionApi.cloneServiceVersion(base(version));
        },

        // Activate a version.
        activateVersion: version => {
            if (!serviceId) return Promise.reject(new Error('Failed to activate version. No serviceId configured.'));
            return versionApi.activateServiceVersion(base(version));
        },

        // Upsert a condition.
        setCondition: (version, condition) => {
            if (!serviceId) return Promise.reject(new Error('Failed to set condition. No serviceId configured.'));
            const fields = Object.assign(base(version), condition);
            return upsert(
                () => conditionApi.updateCondition(Object.assign({condition_name: condition.name}, fields)),
                () => conditionApi.createCondition(fields)
            );
        },

        // Upsert a header.
        setFastlyHeader: (version, header) => {
            if (!serviceId) return Promise.reject(new Error('Failed to set header. No serviceId configured.'));
            const fields = Object.assign(base(version), header);
            return upsert(
                () => headerApi.updateHeaderObject(Object.assign({header_name: header.name}, fields)),
                () => headerApi.createHeaderObject(fields)
            );
        },

        // Upsert a response object.
        setResponseObject: (version, responseObject) => {
            if (!serviceId) return Promise.reject(new Error('Failed to set response object. No serviceId configured.'));
            const fields = Object.assign(base(version), responseObject);
            return upsert(
                () => responseObjectApi.updateResponseObject(
                    Object.assign({response_object_name: responseObject.name}, fields)
                ),
                () => responseObjectApi.createResponseObject(fields)
            );
        },

        // Upsert a custom VCL include.
        setCustomVCL: (version, name, vcl) => {
            if (!serviceId) return Promise.reject(new Error('Failed to set custom VCL. No serviceId configured.'));
            const fields = Object.assign(base(version), {name: name, content: vcl});
            return upsert(
                () => vclApi.updateCustomVcl(Object.assign({vcl_name: name}, fields)),
                () => vclApi.createCustomVcl(fields)
            );
        },

        // Purge all content tagged with a surrogate key.
        purgeKey: (servId, key) => purgeApi.purgeTag({service_id: servId, surrogate_key: key})
    };
};
