const Fastly = require('fastly');
const {fastlyMockRequest, mockServiceId} = require('./fastly-mock-request.js');

/*
 * Fastly library extended to allow configuration for a particular service
 * and some helper methods.
 */
class FastlyExtended {

    /**
     * @param {string} apiKey Fastly API key
     * @param {*} serviceId Fastly service ID
     */
    constructor (apiKey, serviceId) {
        this.fastly = Fastly(apiKey);
        this.serviceId = serviceId;

        if (serviceId === mockServiceId) {
            console.log(`Fastly Service ID is "${mockServiceId}" so Fastly requests will be simulated and logged.`);
            this.fastly.request = fastlyMockRequest;
        }
    }

    /**
     * Helper method for constructing Fastly API urls
     *
     * @param {string} servId Service id
     * @param {number} version Version
     *
     * @return {string} Fastly API URL prefix for the given service and version
     */
    getFastlyAPIPrefix (servId, version) {
        return `/service/${encodeURIComponent(servId)}/version/${version}`;
    }

    /**
     * Get the most recent version for the configured service
     *
     * @param {function(string?, number=):void} cb Callback with signature `(errString, latestVersion) => void`
     * @returns {void}
     */
    getLatestActiveVersion = function (cb) {
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

    /**
     * Upsert a Fastly condition entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} condition Condition object sent to the API
     * @param {function(string?, any=):void} cb Callback with signature `(errString, responseBody) => void`
     * @returns {void}
     */
    setCondition (version, condition, cb) {
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
    }

    /**
     * Upsert a Fastly header entry
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} header Header object sent to the API
     * @param {function(string?, any=):void} cb Callback with signature `(errString, responseBody) => void`
     * @returns {void}
     */
    setFastlyHeader (version, header, cb) {
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
    }

    /**
     * Upsert a Fastly response object
     * Attempts to PUT and POSTs if the PUT request is a 404
     *
     * @param {number} version Version number
     * @param {object} responseObj Response object sent to the API
     * @param {function(string?, any=):void} cb Callback with signature `(errString, responseBody) => void`
     * @returns {void}
     */
    setResponseObject (version, responseObj, cb) {
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
    }

    /**
     * Clone a version to create a new version
     *
     * @param {number} version Version to clone
     * @param {function(any?, any=):void} cb Callback for fastly.request
     * @returns {void}
     */
    cloneVersion (version, cb) {
        if (!this.serviceId) return cb('Failed to clone version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/clone`;
        this.request('PUT', url, cb);
    }

    /**
     * Activate a version
     *
     * @param {number} version Version number
     * @param {function(any?, any=):void} cb Callback for fastly.request
     * @returns {void}
     */
    activateVersion (version, cb) {
        if (!this.serviceId) return cb('Failed to activate version. No serviceId configured.');
        const url = `${this.getFastlyAPIPrefix(this.serviceId, version)}/activate`;
        this.request('PUT', url, cb);
    }

    /**
     * Upsert a custom vcl file. Attempts a PUT, and falls back
     * to POST if not there already.
     *
     * @param {number}   version current version number for fastly service
     * @param {string}   name    name of the custom vcl file to be upserted
     * @param {string}   vcl     stringified custom vcl to be uploaded
     * @param {function(string?, any=):void} cb Callback with signature `(errString, responseBody) => void`
     * @returns {void}
     */
    setCustomVCL (version, name, vcl, cb) {
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
    }

    /**
     * Purge a surrogate key from Fastly's cache for a given service
     * @param {string} serviceId Fastly Service ID
     * @param {string} key Surrogate key to purge
     * @param {function(any?, any=):void} cb Results callback with signature `(err, responseBody) => void`
     */
    purgeKey (serviceId, key, cb) {
        this.fastly.purgeKey(serviceId, key, cb);
    }

    /**
     * Issue a Fastly API request
     * @param {string} method HTTP method ("GET", "PUT", etc.) for the request
     * @param {string} url Fastly API URL to request
     * @param {Record.<string,any> | function(string?, any=):void} callbackOrData Form data to send with the request,
     *    or callback if no data
     * @param {function(any?, any=):void} [callback] Results callback with signature `(err, responseBody) => void`
     */
    request (method, url, callbackOrData, callback) {
        this.fastly.request(method, url, callbackOrData, callback);
    }
}

module.exports = (apiKey, serviceId) => new FastlyExtended(apiKey, serviceId);
