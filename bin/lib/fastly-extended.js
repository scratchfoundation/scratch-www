const Fastly = require('fastly');

/*
 * Fastly configuration helpers for a particular service, built on the official
 * fastly-js client (v15+). Each method keeps the callback signature the callers
 * rely on -- `(...args, cb)` invoking `cb(err, result)` -- so the client bump is
 * isolated to this file.
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

    // Settle a promise into the (err, result) callback the callers expect.
    const toCallback = (promise, cb) => promise.then(
        result => cb(null, result),
        err => cb(err)
    );

    // Update first, create on a 404. Mirrors the previous PUT-then-POST upsert.
    const upsert = (update, create) => update().catch(err => {
        if (err && err.status === 404) return create();
        throw err;
    });

    const base = version => ({service_id: serviceId, version_id: version});

    return {
        // Most recent *active* version for the service (null if none active).
        getLatestActiveVersion: cb => {
            if (!serviceId) return cb('Failed to get latest version. No serviceId configured');
            return toCallback(
                versionApi.listServiceVersions({service_id: serviceId}).then(versions =>
                    versions.reduce((latestActiveSoFar, cur) => {
                        // if one of [latestActiveSoFar, cur] is active and the other isn't,
                        // return whichever is active. If both are not active, return
                        // latestActiveSoFar.
                        if (!cur || !cur.active) return latestActiveSoFar;
                        if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                        // when both are active, prefer whichever has a higher version number.
                        return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
                    }, null)
                ),
                cb
            );
        },

        // Clone a version to create a new, editable version.
        cloneVersion: (version, cb) => {
            if (!serviceId) return cb('Failed to clone version. No serviceId configured.');
            return toCallback(versionApi.cloneServiceVersion(base(version)), cb);
        },

        // Activate a version.
        activateVersion: (version, cb) => {
            if (!serviceId) return cb('Failed to activate version. No serviceId configured.');
            return toCallback(versionApi.activateServiceVersion(base(version)), cb);
        },

        // Upsert a condition.
        setCondition: (version, condition, cb) => {
            if (!serviceId) return cb('Failed to set condition. No serviceId configured');
            const fields = Object.assign(base(version), condition);
            return toCallback(upsert(
                () => conditionApi.updateCondition(Object.assign({condition_name: condition.name}, fields)),
                () => conditionApi.createCondition(fields)
            ), cb);
        },

        // Upsert a header.
        setFastlyHeader: (version, header, cb) => {
            if (!serviceId) return cb('Failed to set header. No serviceId configured');
            const fields = Object.assign(base(version), header);
            return toCallback(upsert(
                () => headerApi.updateHeaderObject(Object.assign({header_name: header.name}, fields)),
                () => headerApi.createHeaderObject(fields)
            ), cb);
        },

        // Upsert a response object.
        setResponseObject: (version, responseObject, cb) => {
            if (!serviceId) return cb('Failed to set response object. No serviceId configured');
            const fields = Object.assign(base(version), responseObject);
            return toCallback(upsert(
                () => responseObjectApi.updateResponseObject(
                    Object.assign({response_object_name: responseObject.name}, fields)
                ),
                () => responseObjectApi.createResponseObject(fields)
            ), cb);
        },

        // Upsert a custom VCL include.
        setCustomVCL: (version, name, vcl, cb) => {
            if (!serviceId) return cb('Failed to set custom VCL. No serviceId configured');
            const fields = Object.assign(base(version), {name: name, content: vcl});
            return toCallback(upsert(
                () => vclApi.updateCustomVcl(Object.assign({vcl_name: name}, fields)),
                () => vclApi.createCustomVcl(fields)
            ), cb);
        },

        // Purge all content tagged with a surrogate key.
        purgeKey: (servId, key, cb) => toCallback(
            purgeApi.purgeTag({service_id: servId, surrogate_key: key}),
            cb
        )
    };
};
