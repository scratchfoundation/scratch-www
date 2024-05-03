const Fastly = require('fastly');

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 *
 * @param {string} API key
 * @param {string} Service id
 */
module.exports = function (apiKey, serviceId) {
    const fastly = Fastly(apiKey);
    fastly.serviceId = serviceId;

    /*
     * Helper method for constructing Fastly API urls
     *
     * @param {string} Service id
     * @param {number} Version
     *
     * @return {string}
     */
    fastly.getFastlyAPIPrefix = function (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    };

    /*
     * getLatestActiveVersion: Get the most recent version for the configured service
     *
     * @param {callback} Callback with signature *err, latestVersion)
     */
    fastly.getLatestActiveVersion = function (cb) {
        if (!this.serviceId) {
            return cb('Failed to get latest version. No serviceId configured');
        }
        const url = `/service/${encodeURIComponent(this.serviceId)}/version`;
        this.request('GET', url, (err, versions) => {
            if (err) {
                return cb(`Failed to fetch versions: ${err}`);
            }
            const latestVersion = versions.reduce((latestActiveSoFar, cur) => {
                // if one of [latestActiveSoFar, cur] is active and the other isn't,
                // return whichever is active. If both are not active, return
                // latestActiveSoFar.
                if (!cur || !cur.active) return latestActiveSoFar;
                if (!latestActiveSoFar || !latestActiveSoFar.active) return cur;
                // when both are active, prefer whichever has a higher version number.
                return (cur.number > latestActiveSoFar.number) ? cur : latestActiveSoFar;
            }, null);
            return cb(null, latestVersion);
        });
    };

    /*
     * setCondition: Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Condition object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setCondition = function (version, condition, cb) {
        if (!this.serviceId) {
            return cb('Failed to set condition. No serviceId configured');
        }
        const name = condition.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/condition`;
        return this.request('PUT', putUrl, condition, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, condition, (e, resp) => {
                    if (e) {
                        return cb(`Failed while inserting condition "${condition.statement}": ${e}`);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(`Failed to update condition "${condition.statement}": ${err}`);
            }
            return cb(null, response);
        });
    };

    /*
     * setFastlyHeader: Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Header object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setFastlyHeader = function (version, header, cb) {
        if (!this.serviceId) {
            cb('Failed to set header. No serviceId configured');
        }
        const name = header.name;
        const putUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/header`;
        return this.request('PUT', putUrl, header, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, header, (e, resp) => {
                    if (e) {
                        return cb(`Failed to insert header: ${e}`);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(`Failed to update header: ${err}`);
            }
            return cb(null, response);
        });
    };

    /*
     * setResponseObject: Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} Version number
     * @param {object} Response object sent to the API
     * @param {callback} Callback for fastly.request
     */
    fastly.setResponseObject = function (version, responseObj, cb) {
        if (!this.serviceId) {
            cb('Failed to set response object. No serviceId configured');
        }
        const name = responseObj.name;
        const putUrl =
            `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object/${encodeURIComponent(name)}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/response_object`;
        return this.request('PUT', putUrl, responseObj, (err, response) => {
            if (err && err.statusCode === 404) {
                this.request('POST', postUrl, responseObj, (e, resp) => {
                    if (e) {
                        return cb(`Failed to insert response object: ${e}`);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(`Failed to update response object: ${err}`);
            }
            return cb(null, response);
        });
    };

    /*
     * cloneVersion: Clone a version to create a new version
     *
     * @param {number} Version to clone
     * @param {callback} Callback for fastly.request
     */
    fastly.cloneVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to clone version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    };

    /*
     * activateVersion: Activate a version
     *
     * @param {number} Version number
     * @param {callback} Callback for fastly.request
     */
    fastly.activateVersion = function (version, cb) {
        if (!this.serviceId) return cb('Failed to activate version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
        this.request('PUT', url, cb);
    };

    /*
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version current version number for fastly service
     * @param {string}   name    name of the custom vcl file to be upserted
     * @param {string}   vcl     stringified custom vcl to be uploaded
     * @param {Function} cb      function that takes in two args: err, response
     */
    fastly.setCustomVCL = function (version, name, vcl, cb) {
        if (!this.serviceId) {
            return cb('Failed to set response object. No serviceId configured');
        }

        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl/${name}`;
        const postUrl = `${this.getFastlyAPIPrefix(this.serviceId, version)}/vcl`;
        const content = {content: vcl};
        return this.request('PUT', url, content, (err, response) => {
            if (err && err.statusCode === 404) {
                content.name = name;
                this.request('POST', postUrl, content, (e, resp) => {
                    if (e) {
                        return cb(`Failed while adding custom vcl "${name}": ${e}`);
                    }
                    return cb(null, resp);
                });
                return;
            }
            if (err) {
                return cb(`Failed to update custom vcl "${name}": ${err}`);
            }
            return cb(null, response);
        });
    };

    return fastly;
};
